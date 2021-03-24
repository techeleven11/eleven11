app.controller('createSnakeDraftTeamController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', '$timeout', '$filter', '$http', 'socket', '$interval', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, $timeout, $filter, $http, socket, $interval) {
    $scope.env = environment;
    $scope.data.pageSize = 15;
    $scope.data.pageNo = 1;
    $scope.coreLogic = Mobiweb.helpers;

    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.MatchGUID = getQueryStringValue('MatchGUID');
        $scope.ContestGUID = getQueryStringValue('League');
        $scope.SearchSquadPlayer = '';
        $scope.TotalPlayers = 100;
        $scope.TotalAssistantPlayers = 0;
        $scope.counter = 120;
        $scope.WkCount = 1;
        $scope.BatCount = 4;
        $scope.BowlCount = 4;
        $scope.AllCount = 2;
        $scope.DraftLiveRound = 1;
        $scope.draft_silder_visible = true;
        $scope.PriorityArray = [];
        for (var i = 1; i <= 100; i++) {
            $scope.PriorityArray.push({ value: i, status: false })
        }
        // swal("Draft Completed", "Please submit your team.", {
        //     icon: "success",
        // });
        /**
          * Socket code start here
          */
        $scope.LiveSnakeUserInfo = [];
        $scope.DraftPlayer = true;
        socket.on('connect', function () {
            console.log("Connected");
            var UserInfo = {
                UserGUID: $scope.user_details.UserGUID,
                ContestGUID: $scope.ContestGUID,
                MatchGUID: $scope.MatchGUID
            }
            socket.emit('DraftName', UserInfo);
            socket.on('DraftPlayerStatus', function (data) {
                $scope.AllPlayers = data.auctionGetPlayer.Data.Records;
                $scope.filter();
                $scope.$apply();
            });

            socket.on('DraftUserChange', function (data) {
                localStorage.setItem('DateTime_' + $scope.ContestGUID, data.Datetime);
                $scope.LiveSnakeUserInfo = data.getBidPlayerData.Data;
                localStorage.setItem('LiveUserInfo_' + $scope.ContestGUID, JSON.stringify($scope.LiveSnakeUserInfo));
                $interval.cancel($scope.interval);
                var timer_reset = function () {
                    $scope.getTimeInSecond(localStorage.getItem('DateTime_' + $scope.ContestGUID));
                }
                timer_reset();
                $scope.interval = $interval(timer_reset, 1000);
                $scope.DraftLiveRound = $scope.LiveSnakeUserInfo.DraftNextRound;
                $scope.SliderRound = $scope.DraftLiveRound - 1;
                $scope.DraftPlayer = true;
                if ($scope.LiveSnakeUserInfo.DraftLiveRound != data.getBidPlayerData.Data.DraftNextRound) {
                    $scope.draft_silder_visible = true;
                    $('.round_team').slick('slickGoTo', $scope.SliderRound);
                }
                $timeout(function () {
                    $scope.userPlayRounds = $scope.userPlayRounds;
                    $scope.draft_silder_visible = true;
                }, 10);
                $scope.ContestInfo.AuctionStatus = 'Running';
                $scope.$apply();
            });


            socket.on('draftJoinedContestUser', function (data) {
                var UserGUID = data.UserGUID;
                var Status = data.UserStatus;
                if (UserGUID != undefined && UserGUID != undefined) {
                    for (var i in $scope.userPlayRounds) {
                        for (var j in $scope.userPlayRounds[i].Users) {
                            if ($scope.userPlayRounds[i].Users[j].UserGUID == UserGUID) {
                                $scope.userPlayRounds[i].Users[j].AuctionUserStatus = Status;
                            }
                        }
                    }
                }
                if ($scope.ContestInfo.AuctionStatus == 'Pending' && data.draftJoinedContestUser.Data[0].Users.length != $scope.TotalJoinedUsers) {
                    $scope.getUserPlayRound();
                    $scope.getSnakeDraftUsers();
                    $timeout(function () {
                        $(".selectpicker").selectpicker('render');
                        $(".selectpicker").selectpicker('refresh');
                    }, 2000);
                } else if (UserGUID == $scope.user_details.UserGUID && Status == 'Online' && $scope.ContestInfo.AuctionStatus != 'Completed') {
                    $scope.DraftPlayer = true;
                    $scope.seriesAllPlayers();
                    $scope.getSnakeDraftUsers();
                    $timeout(function () {
                        $(".selectpicker").selectpicker('render');
                        $(".selectpicker").selectpicker('refresh');
                    }, 2000);
                }
                $scope.$apply();
            });

            socket.on('DraftBidSuccess', function (data) {
                var BidUserInfo = data.responseData.Data;
                $scope.successMessageShow(BidUserInfo.Player.PlayerName + " is selected by " + BidUserInfo.User.FirstName + ".");

                if (BidUserInfo.User.UserGUID == $scope.user_details.UserGUID) {
                    $scope.getMySquad($scope.user_details.UserGUID);
                } else if (BidUserInfo.User.UserGUID == $scope.LiveSnakeUserInfo.UserGUID && $scope.LiveSnakeUserInfo.UserGUID == $scope.OtherUserGUID) {
                    $scope.getMySquad($scope.OtherUserGUID);
                }
                $scope.selectPlayer('');
                $scope.livePlayerInfo = [];
                $scope.ContestInfo.AuctionStatus = BidUserInfo.DraftStatus;
                if (BidUserInfo.DraftStatus == 'Completed') {
                    $timeout(function () {
                        swal("Draft Completed", "Please submit your team.", {
                            icon: "success",
                        });
                    }, 5000);
                    $scope.timer_stop();
                    localStorage.removeItem('DateTime_' + $scope.ContestGUID);
                    $scope.counter = 0;
                    $interval.cancel($scope.interval);
                    $scope.DraftPlayer = false;
                    localStorage.removeItem('LiveUserInfo_' + $scope.ContestGUID);
                }
                $scope.$apply();
            })

            socket.on('DraftBidError', function (data) {
                if ($scope.LiveSnakeUserInfo.UserGUID == data.UserGUID && data.UserGUID == $scope.user_details.UserGUID && data.Message == 'Draft player already sold') {
                    $scope.errorMessageShow("This player is already selected by other user, Please select a new Player.");
                } else if (data.UserGUID == $scope.user_details.UserGUID && data.Message == 'User not in live') {
                    location.reload();
                }
            })

        });

        /**
         * Bid timer
         */
        var mytimeout = '';
        $scope.onTimeout = function () {
            if ($scope.counter > 0) {
                $scope.counter--;
                mytimeout = $timeout($scope.onTimeout, 1000);
            }
            if ($scope.counter == 0) {
                $scope.timer_stop();
            }
        }
        /**
         * Timer stop
         */
        $scope.timer_stop = function () {
            $scope.DraftPlayer = true;
            // $timeout.cancel(mytimeout);
        }
        /**
         * Add player for draft
         */
        $scope.draftPlayerForSnake = function (player) {
            if (player.PlayerGUID) {
                var data = {
                    MatchGUID: $scope.MatchGUID,
                    SeriesID: $scope.ContestInfo.SeriesID,
                    ContestGUID: $scope.ContestGUID,
                    PlayerGUID: player.PlayerGUID,
                    UserGUID: $scope.user_details.UserGUID,
                    PlayerStatus: 'Sold'
                }
                socket.emit('DraftBid', data);
            } else {
                $scope.errorMessageShow('Please select a player for draft.');
            }
        }
        /**
         * Get time difference in second
         */
        $scope.getTimeInSecond = function (date) {
            var a = moment(date).format("s");
            var date = $filter('convertIntoUserTimeZone')(date);
            var diffInSeconds = Math.abs(moment().diff(date) / 1000);
            var days = Math.floor(diffInSeconds / 60 / 60 / 24);
            var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
            var minutes = Math.floor(diffInSeconds / 60 % 60);
            var seconds = Math.floor(diffInSeconds % 60);
            var total_second = ((minutes * 60) + seconds);
            if (total_second < (120 + parseInt(a))) {
                $scope.counter = (120 + parseInt(a)) - total_second;
            } else {
                $scope.counter = 0;
            }
        }
        /**
         * After refresh set running user info
         */
        $scope.setRunningValues = function (info) {
            if ($scope.ContestUserList) {
                for (var i in $scope.ContestUserList) {
                    if ($scope.ContestUserList[i].UserGUID == info.UserGUID) {
                        $scope.LiveSnakeUserInfo = { FirstName: $scope.ContestUserList[i].FirstName, UserGUID: info.UserGUID };
                    }
                }
                $scope.SliderRound = Number(info.DraftLiveRound) - 1;
                $timeout(function () {
                    $('.round_team').slick('slickGoTo', $scope.SliderRound);
                }, 10);
                if (info.UserLiveInTimeSeconds < 120) {
                    localStorage.setItem('DateTime_' + $scope.ContestGUID, info.DraftUserLiveTime);
                    var timer_reset = function () {
                        $scope.getTimeInSecond(localStorage.getItem('DateTime_' + $scope.ContestGUID));
                    }
                    timer_reset();
                    $interval(timer_reset, 1000);
                    // $scope.counter = 119 - info.UserLiveInTimeSeconds;
                    // $scope.onTimeout();
                    // $scope.timer_reset(localStorage.getItem('DateTime_'+$scope.ContestGUID))
                }
            }
        }

        /**
         * End here
         */
        /**
         * get Series all players
         */
        $scope.activeAllPlayersTab = 'wk';
        $scope.AllPlayers = [];
        $scope.PlayerForAssiant = [];
        $scope.seriesAllPlayers = function () {
            $scope.data.listLoading = true;
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID;
            $data.SessionKey = $scope.user_details.SessionKey;
            $data.ContestGUID = $scope.ContestGUID;
            $data.PlayerBidStatus = 'Yes';
            $data.Params = 'PlayerStatus,PlayerID,PlayerRole,PlayerPic,PlayerCountry,PlayerBornPlace,PlayerBattingStyle,PlayerBowlingStyle,MatchType,MatchNo,MatchDateTime,SeriesName,TeamGUID,PlayerBattingStats,PlayerBowlingStats,IsPlaying,PointsData,PlayerSalary,TeamNameShort,PlayerSalaryCredit,TeamName';
            appDB
                .callPostForm('SnakeDrafts/getPlayers', $data)
                .then(
                    function successCallback(data) {
                        $scope.data.listLoading = false;
                        if ($scope.checkResponseCode(data) && data.Data.TotalRecords > 0) {
                            $scope.AllPlayers = data.Data.Records;
                            $scope.AllPlayers.forEach((element, index) => {
                                element.IsAdded = false;
                                element.PlayerPosition = "Player";
                                element.ShowStatus = true;
                            });
                            $scope.getMyPreSquad();
                            $scope.getLeagueTeams();
                        }
                    },
                    function errorCallback(data) {
                        $scope.data.listLoading = false;
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * select player info & show info
         */
        $scope.livePlayerInfo = [];
        $scope.selectPlayer = function (player) {
            if (player != '' && $scope.MySquadStructure[player.PlayerRole].min == $scope.MySquadStructure[player.PlayerRole].occupied && $scope.MySquadPlayers.length < $scope.mininumPlayerCount && $scope.LiveSnakeUserInfo.UserGUID == $scope.user_details.UserGUID && $scope.LiveSnakeUserInfo != '') {
                swal("Minimum Criteria for " + player.PlayerRole + " is fulfilled. Please select player for another position untill you complete the minimum criteria of " + $scope.mininumPlayerCount + " Players. (You can select extra " + $scope.DraftTeamPlayerLimit + " players after it).\n\n MINIMUM CRITERIA : WK - " + $scope.WkCount + ", BAT - " + $scope.BatCount + ", BOWL - " + $scope.BowlCount + ", AR - " + $scope.AllCount, {
                    icon: "error",
                    html: true
                });
                $scope.livePlayerInfo = [];
                $scope.DraftPlayer = true;
                return false;
            }
            if (player == '') {
                player.TeamName = '-';
                player.PlayerRole = '-';
                player.PlayerPic = '';
                $scope.DraftPlayer = true;
            } else if (player != '' && $scope.LiveSnakeUserInfo.UserGUID == $scope.user_details.UserGUID && $scope.LiveSnakeUserInfo != '') {
                $scope.DraftPlayer = false;
            }
            player.PlayerBattingStyle = (player.PlayerBattingStyle) ? player.PlayerBattingStyle : '-';
            player.PlayerBowlingStyle = (player.PlayerBowlingStyle) ? player.PlayerBowlingStyle : '-';
            player.Matches = '0';
            player.Runs = '0';
            player.Hundreds = '0';
            player.Fifties = '0';
            player.Average = '0';
            player.StrikeRate = '0';
            if (player.PlayerBattingStats) {
                if (player.PlayerBattingStats.T20i && $scope.ContestInfo.MatchType === 't20i') {
                    player.Matches = (player.PlayerBattingStats.T20i.Matches) ? player.PlayerBattingStats.T20i.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.T20i.Runs) ? player.PlayerBattingStats.T20i.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.T20i.Hundreds) ? player.PlayerBattingStats.T20i.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.T20i.Fifties) ? player.PlayerBattingStats.T20i.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.T20i.Average) ? player.PlayerBattingStats.T20i.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.T20i.StrikeRate) ? player.PlayerBattingStats.T20i.StrikeRate : '0';
                } else if (player.PlayerBattingStats.T20 && $scope.ContestInfo.MatchType === 't20') {
                    player.Matches = (player.PlayerBattingStats.T20.Matches) ? player.PlayerBattingStats.T20.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.T20.Runs) ? player.PlayerBattingStats.T20.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.T20.Hundreds) ? player.PlayerBattingStats.T20.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.T20.Fifties) ? player.PlayerBattingStats.T20.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.T20.Average) ? player.PlayerBattingStats.T20.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.T20.StrikeRate) ? player.PlayerBattingStats.T20.StrikeRate : '0';
                } else if (player.PlayerBattingStats.ODI && $scope.ContestInfo.MatchType === 'odi') {
                    player.Matches = (player.PlayerBattingStats.ODI.Matches) ? player.PlayerBattingStats.ODI.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.ODI.Runs) ? player.PlayerBattingStats.ODI.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.ODI.Hundreds) ? player.PlayerBattingStats.ODI.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.ODI.Fifties) ? player.PlayerBattingStats.ODI.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.ODI.Average) ? player.PlayerBattingStats.ODI.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.ODI.StrikeRate) ? player.PlayerBattingStats.ODI.StrikeRate : '0';
                } else if (player.PlayerBattingStats.ListA && $scope.ContestInfo.MatchType === 'list a') {
                    player.Matches = (player.PlayerBattingStats.ListA.Matches) ? player.PlayerBattingStats.ListA.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.ListA.Runs) ? player.PlayerBattingStats.ListA.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.ListA.Hundreds) ? player.PlayerBattingStats.ListA.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.ListA.Fifties) ? player.PlayerBattingStats.ListA.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.ListA.Average) ? player.PlayerBattingStats.ListA.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.ListA.StrikeRate) ? player.PlayerBattingStats.ListA.StrikeRate : '0';
                } else if (player.PlayerBattingStats.FirstClass && $scope.ContestInfo.MatchType === 'first class') {
                    player.Matches = (player.PlayerBattingStats.FirstClass.Matches) ? player.PlayerBattingStats.FirstClass.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.FirstClass.Runs) ? player.PlayerBattingStats.FirstClass.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.FirstClass.Hundreds) ? player.PlayerBattingStats.FirstClass.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.FirstClass.Fifties) ? player.PlayerBattingStats.FirstClass.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.FirstClass.Average) ? player.PlayerBattingStats.FirstClass.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.FirstClass.StrikeRate) ? player.PlayerBattingStats.FirstClass.StrikeRate : '0';
                } else if (player.PlayerBattingStats.Test && $scope.ContestInfo.MatchType === 'test') {
                    player.Matches = (player.PlayerBattingStats.Test.Matches) ? player.PlayerBattingStats.Test.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.Test.Runs) ? player.PlayerBattingStats.Test.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.Test.Hundreds) ? player.PlayerBattingStats.Test.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.Test.Fifties) ? player.PlayerBattingStats.Test.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.Test.Average) ? player.PlayerBattingStats.Test.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.Test.StrikeRate) ? player.PlayerBattingStats.Test.StrikeRate : '0';
                }
            }
            player.Wickets = '0';
            player.BowlAverage = '0';
            player.Economy = '-';
            if (player.PlayerBowlingStats) {
                if (player.PlayerBowlingStats.T20i && $scope.ContestInfo.MatchType === 't20i') {
                    player.Wickets = (player.PlayerBowlingStats.T20i.Wickets) ? player.PlayerBowlingStats.T20i.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.T20i.Average) ? player.PlayerBowlingStats.T20i.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.T20i.Economy) ? player.PlayerBowlingStats.T20i.Economy : '-';
                } else if (player.PlayerBowlingStats.T20 && $scope.ContestInfo.MatchType === 't20') {
                    player.Wickets = (player.PlayerBowlingStats.T20.Wickets) ? player.PlayerBowlingStats.T20.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.T20.Average) ? player.PlayerBowlingStats.T20.Average : "0";
                    player.Economy = (player.PlayerBowlingStats.T20.Economy) ? player.PlayerBowlingStats.T20.Economy : '-';
                } else if (player.PlayerBowlingStats.ODI && $scope.ContestInfo.MatchType === 'odi') {
                    player.Wickets = (player.PlayerBowlingStats.ODI.Wickets) ? player.PlayerBowlingStats.ODI.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.ODI.Average) ? player.PlayerBowlingStats.ODI.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.ODI.Economy) ? player.PlayerBowlingStats.ODI.Economy : '-';
                } else if (player.PlayerBowlingStats.ListA && $scope.ContestInfo.MatchType === 'list a') {
                    player.Wickets = (player.PlayerBowlingStats.ListA.Wickets) ? player.PlayerBowlingStats.ListA.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.ListA.Average) ? player.PlayerBowlingStats.ListA.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.ListA.Economy) ? player.PlayerBowlingStats.ListA.Economy : '-';
                } else if (player.PlayerBowlingStats.FirstClass && $scope.ContestInfo.MatchType === 'first class') {
                    player.Wickets = (player.PlayerBowlingStats.FirstClass.Wickets) ? player.PlayerBowlingStats.FirstClass.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.FirstClass.Average) ? player.PlayerBowlingStats.FirstClass.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.FirstClass.Economy) ? player.PlayerBowlingStats.FirstClass.Economy : '-';
                } else if (player.PlayerBowlingStats.Test && $scope.ContestInfo.MatchType === 'test') {
                    player.Wickets = (player.PlayerBowlingStats.Test.Wickets) ? player.PlayerBowlingStats.Test.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.Test.Average) ? player.PlayerBowlingStats.Test.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.Test.Economy) ? player.PlayerBowlingStats.Test.Economy : '-';
                }
            }
            $scope.livePlayerInfo = player;
        }
        /**
         * Open modal popup for editing pre-assistant team
         */
        $scope.openSquardPlayerModal = function () {
            $scope.PlayerForAssiant = [];
            for (var i in $scope.PriorityArray) {
                $scope.PriorityArray[i].status = false;
            }
            $scope.searchSquadPlayer = "";
            $scope.resetTeamStructure();
            $scope.TotalAssistantPlayers = 0;
            $scope.AllPlayers.forEach((element, index) => {
                element.IsAdded = false;
                element.ShowStatus = true;
                element.PlayerPosition = "Player";
                element.Priority = '';
                element.showPlayer = true;
                $scope.PlayerForAssiant.push(element);
            });
            $scope.clearPreAssiFilter();
            angular.forEach($scope.Squadplayers, function (value, key) {
                $scope.addRemovePlayer(value.PlayerGUID, false, value, value.AuctionDraftAssistantPriority);
            });
            $scope.openPopup('select_pre_draft_player');
        }
        /**
         * Pre-Draft Team Player
         */
        $scope.Squadplayers = [];
        $scope.activePreSqardTab = 'wk';
        $scope.getMyPreSquad = function () {
            $scope.data.listLoading = true;
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID; //  Series Id
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.ContestGUID = $scope.ContestGUID;
            $data.MySquadPlayer = 'Yes';
            // $data.IsAssistant = 'Yes';
            $data.PlayerBidStatus = 'Yes';
            $data.IsPreTeam = 'Yes';
            $data.UserGUID = $scope.user_details.UserGUID;
            $data.OrderBy = 'AuctionDraftAssistantPriority';
            $data.Sequence = 'ASC';
            $data.Params = 'PlayerBattingStyle,PlayerBowlingStyle,PlayerBattingStats,PlayerBowlingStats,AuctionDraftAssistantPriority,PlayerID,PlayerRole,PlayerPic,BidCredit,UserTeamGUID,UserTeamName,IsAssistant';
            appDB
                .callPostForm('SnakeDrafts/getPlayers', $data)
                .then(
                    function successCallback(data) {
                        $scope.data.listLoading = false;
                        if ($scope.checkResponseCode(data) && data.Data.TotalRecords > 0) {
                            $scope.Squadplayers = data.Data.Records;
                            $scope.AssistantStatus = (data.Data.IsAssistant == 'Yes') ? true : false;
                            $scope.UserTeamGUID = data.Data.UserTeamGUID;
                            $scope.UserTeamName = data.Data.UserTeamName;
                            $scope.edit = true;
                        } else {
                            $scope.UserTeamGUID = '';
                            $scope.UserTeamName = '';
                            $scope.AssistantStatus = false;
                            $scope.TotalAssistantPlayers = 0;
                            $rootScope.searchPlayer = '';
                            $scope.edit = false;
                        }
                    },
                    function errorCallback(data) {
                        $scope.data.listLoading = false;
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * Add/remove pre team player
         */
        $rootScope.addRemovePlayer = function (PlayerGUID, IsAdded, playerDetails, Priority) {
            if ($scope.TotalAssistantPlayers <= $scope.TotalPlayers) {
                if (Priority == '' || Priority == undefined) {
                    $scope.errorMessageShow('Please select player Priority');
                    return false;
                } else if ($scope.checkPriority(Priority, PlayerGUID)) {
                    for (var i in $scope.PlayerForAssiant) {
                        if ($scope.PlayerForAssiant[i].PlayerGUID == PlayerGUID) {
                            $scope.PlayerForAssiant[i].Priority = '';
                        }
                    }
                    $scope.errorMessageShow('Priority is already selected on another player.');
                    return false;
                }

                //to add player from team 
                for (var i in $scope.PlayerForAssiant) {
                    if ($scope.PlayerForAssiant[i].PlayerGUID == PlayerGUID && IsAdded == false) {
                        if ($scope.teamStructure['Batsman'].occupied + $scope.teamStructure['WicketKeeper'].occupied + $scope.teamStructure['AllRounder'].occupied + $scope.teamStructure['Bowler'].occupied == $scope.TotalPlayers) {
                            $scope.errorMessageShow('You cannot add more than ' + $scope.TotalPlayers + ' players');
                            return false;
                        } else {
                            if (playerDetails.PlayerRole == 'WicketKeeper') {
                                // if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                        'PlayerGUID': playerDetails.PlayerGUID,
                                        'PlayerPosition': playerDetails.PlayerPosition,
                                        'PlayerName': playerDetails.PlayerName,
                                        'PlayerRole': 'WicketKeeper'
                                    });
                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                    $scope.PlayerForAssiant[i].IsAdded = true;
                                    $scope.PlayerForAssiant[i].Priority = Priority;
                                    $scope.PlayerForAssiant[i].SelectedPriority = { value: Priority };
                                    $scope.TotalAssistantPlayers++;
                                    for (var i in $scope.PriorityArray) {
                                        if ($scope.PriorityArray[i].value == Priority) {
                                            $scope.PriorityArray[i].status = true;
                                        }
                                    }
                                // } else {
                                //     $scope.errorMessageShow('You cannot add more than ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole);
                                // }

                            } else if (playerDetails.PlayerRole == 'Batsman') {
                                // if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {

                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                        'PlayerGUID': playerDetails.PlayerGUID,
                                        'PlayerPosition': playerDetails.PlayerPosition,
                                        'PlayerName': playerDetails.PlayerName,
                                        'PlayerRole': 'Batsman',
                                    });
                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                    $scope.PlayerForAssiant[i].IsAdded = true;
                                    $scope.PlayerForAssiant[i].Priority = Priority;
                                    $scope.PlayerForAssiant[i].SelectedPriority = { value: Priority };
                                    $scope.TotalAssistantPlayers++;
                                    for (var i in $scope.PriorityArray) {
                                        if ($scope.PriorityArray[i].value == Priority) {
                                            $scope.PriorityArray[i].status = true;
                                        }
                                    }
                                // } else {
                                //     $scope.errorMessageShow('You cannot add more than ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole);
                                // }
                            } else if (playerDetails.PlayerRole == 'Bowler') {
                                // if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                        'PlayerGUID': playerDetails.PlayerGUID,
                                        'PlayerPosition': playerDetails.PlayerPosition,
                                        'PlayerName': playerDetails.PlayerName,
                                        'PlayerRole': 'Bowler',
                                    });
                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                    $scope.PlayerForAssiant[i].IsAdded = true;
                                    $scope.PlayerForAssiant[i].Priority = Priority;
                                    $scope.PlayerForAssiant[i].SelectedPriority = { value: Priority };
                                    $scope.TotalAssistantPlayers++;
                                    for (var i in $scope.PriorityArray) {
                                        if ($scope.PriorityArray[i].value == Priority) {
                                            $scope.PriorityArray[i].status = true;
                                        }
                                    }
                                // } else {
                                //     $scope.errorMessageShow('You cannot add more than ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole);
                                // }
                            } else if (playerDetails.PlayerRole == 'AllRounder') {
                                // if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                        'PlayerGUID': playerDetails.PlayerGUID,
                                        'PlayerPosition': playerDetails.PlayerPosition,
                                        'PlayerName': playerDetails.PlayerName,
                                        'PlayerPic': playerDetails.PlayerPic
                                    });
                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                    $scope.PlayerForAssiant[i].IsAdded = true;
                                    $scope.PlayerForAssiant[i].Priority = Priority;
                                    $scope.PlayerForAssiant[i].SelectedPriority = { value: Priority };
                                    $scope.TotalAssistantPlayers++;
                                    for (var i in $scope.PriorityArray) {
                                        if ($scope.PriorityArray[i].value == Priority) {
                                            $scope.PriorityArray[i].status = true;
                                        }
                                    }
                                // } else {
                                //     $scope.errorMessageShow('You cannot add more than ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole);
                                // }
                            }
                        }
                    } else {
                        //to remove player from team
                        if (playerDetails.PlayerRole == 'WicketKeeper' && $scope.PlayerForAssiant[i].PlayerGUID == playerDetails.PlayerGUID) {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        $scope.PlayerForAssiant[i].IsAdded = false;
                                        $scope.PlayerForAssiant[i].Priority = '';
                                        $scope.PlayerForAssiant[i].SelectedPriority = '';
                                        $scope.TotalAssistantPlayers--;
                                        for (var i in $scope.PriorityArray) {
                                            if ($scope.PriorityArray[i].value == Priority) {
                                                $scope.PriorityArray[i].status = false;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (playerDetails.PlayerRole == 'Batsman' && $scope.PlayerForAssiant[i].PlayerGUID == playerDetails.PlayerGUID) {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        $scope.PlayerForAssiant[i].IsAdded = false;
                                        $scope.PlayerForAssiant[i].Priority = '';
                                        $scope.PlayerForAssiant[i].SelectedPriority = '';
                                        $scope.TotalAssistantPlayers--;
                                        for (var i in $scope.PriorityArray) {
                                            if ($scope.PriorityArray[i].value == Priority) {
                                                $scope.PriorityArray[i].status = false;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (playerDetails.PlayerRole == 'Bowler' && $scope.PlayerForAssiant[i].PlayerGUID == playerDetails.PlayerGUID) {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        $scope.PlayerForAssiant[i].IsAdded = false;
                                        $scope.PlayerForAssiant[i].Priority = '';
                                        $scope.PlayerForAssiant[i].SelectedPriority = '';
                                        $scope.TotalAssistantPlayers--;
                                        for (var i in $scope.PriorityArray) {
                                            if ($scope.PriorityArray[i].value == Priority) {
                                                $scope.PriorityArray[i].status = false;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (playerDetails.PlayerRole == 'AllRounder' && $scope.PlayerForAssiant[i].PlayerGUID == playerDetails.PlayerGUID) {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        $scope.PlayerForAssiant[i].IsAdded = false;
                                        $scope.PlayerForAssiant[i].Priority = '';
                                        $scope.PlayerForAssiant[i].SelectedPriority = '';
                                        $scope.TotalAssistantPlayers--;
                                        for (var i in $scope.PriorityArray) {
                                            if ($scope.PriorityArray[i].value == Priority) {
                                                $scope.PriorityArray[i].status = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                $scope.errorMessageShow('Sorry,you can not select more than ' + $scope.TotalPlayers + ' players.');
            }
        }

        /**
         * save/update pre user team 
         */
        $rootScope.SaveTeam = function () {
            var selected_players = [];
            for (var i in $scope.PlayerForAssiant) {
                if ($scope.PlayerForAssiant[i].IsAdded) {
                    selected_players.push({
                        'PlayerGUID': $scope.PlayerForAssiant[i].PlayerGUID,
                        'PlayerPosition': $scope.PlayerForAssiant[i].PlayerPosition,
                        'PlayerName': $scope.PlayerForAssiant[i].PlayerName,
                        'PlayerID': $scope.PlayerForAssiant[i].PlayerID,
                        'PlayerRole': $scope.PlayerForAssiant[i].PlayerRole,
                        'AuctionDraftAssistantPriority': $scope.PlayerForAssiant[i].Priority
                    });
                }
            }
            $scope.data.listLoading = true;
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID;
            $data.SeriesID = $scope.ContestInfo.SeriesID;
            $data.SessionKey = $localStorage.user_details.SessionKey; //   User session key
            $data.ContestGUID = $scope.ContestGUID;
            $data.UserTeamPlayers = selected_players; //   User selected players
            $data.UserTeamType = 'Draft'; //   User team name
            $data.IsPreTeam = 'Yes';
            if ($scope.edit == true && $scope.UserTeamGUID != '') {
                var $url = 'SnakeDrafts/editUserTeam';
                $data.UserTeamGUID = $scope.UserTeamGUID;
                $data.UserTeamName = $scope.UserTeamName; //   User team name
            } else {
                var $url = 'SnakeDrafts/addUserTeam';
            }

            $http.post($scope.env.api_url + $url, $.param($data), contentType).then(function (response) {
                var response = response.data;
                $scope.data.listLoading = false;
                if ($scope.checkResponseCode(response)) {
                    $scope.successMessageShow(response.Message);
                    $scope.closePopup('select_pre_draft_player');
                    $scope.getMyPreSquad();
                }
            });
        }
        $scope.ContestUserList = [];
        $scope.TotalJoinedUsers = 0;
        /**
         * Get auction user list
         */
        $scope.getSnakeDraftUsers = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID;
            $data.SeriesID = $scope.ContestInfo.SeriesID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'FirstName,Username,UserGUID,ProfilePic,AuctionTimeBank,AuctionBudget,AuctionUserStatus';
            appDB
                .callPostForm('SnakeDrafts/getJoinedContestsUsers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.ContestUserList = data.Data.Records;
                            $scope.TotalJoinedUsers = data.Data.TotalRecords;
                            $scope.getContest();
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * Change Pre assistant team status
         */
        $scope.changeAssistantStatus = function (status) {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.UserTeamGUID = $scope.UserTeamGUID;
            $data.IsAssistant = (status) ? 'Yes' : 'No';
            appDB
                .callPostForm('SnakeDrafts/assistantTeamOnOff', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        /**
         * Get contest info
         */
        $scope.ContestInfo = [];
        $scope.mininumPlayerCount = 0;
        $scope.getContest = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'MatchType,SeriesName,LeagueJoinDateTime,Status,AuctionStatus,LeagueJoinDateTimeUTC,DraftTeamPlayerLimit,DraftPlayerSelectionCriteria';
            $data.DraftSeriesType = "Yes";
            appDB
                .callPostForm('SnakeDrafts/getContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.ContestInfo = data.Data;
                            $scope.ContestInfo.MatchType = angular.lowercase($scope.ContestInfo.MatchType);
                            $scope.WkCount = ($scope.ContestInfo.DraftPlayerSelectionCriteria.Wk) ? $scope.ContestInfo.DraftPlayerSelectionCriteria.Wk : $scope.WkCount;
                            $scope.BatCount = ($scope.ContestInfo.DraftPlayerSelectionCriteria.Bat) ? $scope.ContestInfo.DraftPlayerSelectionCriteria.Bat : $scope.BatCount;
                            $scope.AllCount = ($scope.ContestInfo.DraftPlayerSelectionCriteria.Ar) ? $scope.ContestInfo.DraftPlayerSelectionCriteria.Ar : $scope.AllCount;
                            $scope.BowlCount = ($scope.ContestInfo.DraftPlayerSelectionCriteria.Bowl) ? $scope.ContestInfo.DraftPlayerSelectionCriteria.Bowl : $scope.BowlCount;
                            if ($scope.ContestInfo.AuctionStatus == 'Running') {
                                $scope.getUserDraftInLive();
                            }
                            $scope.mininumPlayerCount = parseInt($scope.WkCount) + parseInt($scope.BatCount) + parseInt($scope.AllCount) + parseInt($scope.BowlCount);
                            $scope.DraftTeamPlayerLimit = parseInt($scope.ContestInfo.DraftTeamPlayerLimit) - parseInt($scope.mininumPlayerCount);
                            $scope.getMySquad($scope.user_details.UserGUID);
                            $scope.resetOtherUserSquadStructure();
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * Reset Mysqaud player count
         */
        $scope.resetMySquadStructure = function () {
            $scope.MySquadStructure = {
                "WicketKeeper": {
                    "min": $scope.WkCount,
                    "max": 15,
                    "occupied": 0,
                },
                "Batsman": {
                    "min": $scope.BatCount,
                    "max": 18,
                    "occupied": 0,
                },
                "Bowler": {
                    "min": $scope.BowlCount,
                    "max": 18,
                    "occupied": 0,
                },
                "AllRounder": {
                    "min": $scope.AllCount,
                    "max": 16,
                    "occupied": 0,
                }
            };
        }
        /**
         * Reset Othersqaud player count
         */
        $scope.resetOtherUserSquadStructure = function () {
            $scope.OtherUserSquadStructure = {
                "WicketKeeper": {
                    "min": $scope.WkCount,
                    "max": 15,
                    "occupied": 0,
                },
                "Batsman": {
                    "min": $scope.BatCount,
                    "max": 18,
                    "occupied": 0,
                },
                "Bowler": {
                    "min": $scope.BowlCount,
                    "max": 18,
                    "occupied": 0,
                },
                "AllRounder": {
                    "min": $scope.AllCount,
                    "max": 16,
                    "occupied": 0,
                }
            };
        }

        /**
         * Get my squad 
         */
        $scope.MySquadPlayers = [];
        $scope.OtherUserSquadPlayers = [];
        $scope.OtherSquadUserName = '';
        $scope.OtherUserGUID = '';
        $scope.IsOtherUserSquadSubmitted = 'No';
        $scope.activeMySquadTab = 'wk';
        $scope.activeOtherSquadTab = 'wk';
        $scope.getMySquad = function (UserGUID) {
            if (UserGUID == '') {
                $scope.IsOtherUserSquadSubmitted = 'No';
                $scope.resetOtherUserSquadStructure();
                $scope.OtherUserGUID = '';
                $scope.OtherUserSquadPlayers = [];
                $scope.OtherSquadUserName = '';
                return false;
            } else if (UserGUID != $scope.user_details.UserGUID) {
                $scope.IsOtherUserSquadSubmitted = 'No';
                $scope.OtherUserSquadPlayers = [];
                for (var i in $scope.ContestUserList) {
                    if (UserGUID == $scope.ContestUserList[i].UserGUID) {
                        $scope.OtherSquadUserName = $scope.ContestUserList[i].FirstName;
                    }
                }
            } else if (UserGUID == $scope.user_details.UserGUID) {
                $scope.resetMySquadStructure();
            }
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID; //  Series Id
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.ContestGUID = $scope.ContestGUID;
            $data.MySquadPlayer = 'Yes';
            $data.IsAssistant = 'No';
            $data.IsPreTeam = 'No';
            $data.PlayerBidStatus = 'Yes';
            $data.UserGUID = UserGUID;
            $data.Params = 'PlayerBattingStyle,PlayerBowlingStyle,PlayerBattingStats,PlayerBowlingStats,PlayerPosition,AuctionTopPlayerSubmitted,PlayerID,PlayerRole,PlayerPic,BidCredit,UserTeamGUID,UserTeamName,IsAssistant';
            appDB
                .callPostForm('SnakeDrafts/getPlayers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data) && data.Data.TotalRecords > 0) {
                            if ($scope.user_details.UserGUID == UserGUID) {
                                $scope.MySquadPlayers = data.Data.Records;
                                $scope.AuctionTopPlayerSubmitted = data.Data.AuctionTopPlayerSubmitted;
                                $scope.PostTeamGUID = data.Data.UserTeamGUID;
                                $scope.resetMySquadStructure();
                                for (var i in $scope.MySquadPlayers) {
                                    if ($scope.ContestInfo.AuctionStatus == 'Completed') {
                                        if ($scope.MySquadPlayers[i].PlayerPosition == 'Captain') {
                                            $scope.Captain = $scope.MySquadPlayers[i].PlayerGUID;
                                        } else if ($scope.MySquadPlayers[i].PlayerPosition == 'ViceCaptain') {
                                            $scope.ViceCaptain = $scope.MySquadPlayers[i].PlayerGUID;
                                        }
                                    }
                                    if ($scope.MySquadPlayers[i].PlayerRole == 'WicketKeeper') {
                                        $scope.MySquadStructure['WicketKeeper'].occupied++;
                                    } else if ($scope.MySquadPlayers[i].PlayerRole == 'Bowler') {
                                        $scope.MySquadStructure['Bowler'].occupied++;
                                    } else if ($scope.MySquadPlayers[i].PlayerRole == 'AllRounder') {
                                        $scope.MySquadStructure['AllRounder'].occupied++;
                                    } else if ($scope.MySquadPlayers[i].PlayerRole == 'Batsman') {
                                        $scope.MySquadStructure['Batsman'].occupied++;
                                    }
                                }
                            } else {
                                $scope.IsOtherUserSquadSubmitted = data.Data.AuctionTopPlayerSubmitted;
                                $scope.OtherUserSquadPlayers = data.Data.Records;
                                $scope.resetOtherUserSquadStructure();
                                for (var i in $scope.OtherUserSquadPlayers) {
                                    if ($scope.OtherUserSquadPlayers[i].PlayerRole == 'WicketKeeper') {
                                        $scope.OtherUserSquadStructure['WicketKeeper'].occupied++;
                                    } else if ($scope.OtherUserSquadPlayers[i].PlayerRole == 'Bowler') {
                                        $scope.OtherUserSquadStructure['Bowler'].occupied++;
                                    } else if ($scope.OtherUserSquadPlayers[i].PlayerRole == 'AllRounder') {
                                        $scope.OtherUserSquadStructure['AllRounder'].occupied++;
                                    } else if ($scope.OtherUserSquadPlayers[i].PlayerRole == 'Batsman') {
                                        $scope.OtherUserSquadStructure['Batsman'].occupied++;
                                    }
                                }
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        /*
         Description : To Select captain
         */

        $scope.selectCaptain = function (PlayerGUID) {
            for (var i = 0; i < $scope.MySquadPlayers.length; i++) {
                if ($scope.MySquadPlayers[i].PlayerGUID == PlayerGUID) {

                    if ($scope.MySquadPlayers[i].PlayerPosition != 'Captain') {
                        $scope.MySquadPlayers[i].PlayerPosition = 'Captain';
                        $scope.Captain = $scope.MySquadPlayers[i].PlayerGUID;
                    }
                } else {
                    if ($scope.MySquadPlayers[i].PlayerPosition != 'ViceCaptain') {
                        $scope.MySquadPlayers[i].PlayerPosition = 'Player';
                    }
                }
            }
            $timeout(function () {
                $(".selectpickerViceCapatin").val($scope.ViceCaptain);
                $(".selectpickerCaptain").val($scope.Captain);
                $(".selectpickerCaptain").selectpicker('render');
                $(".selectpickerViceCapatin").selectpicker('render');
                $(".selectpickerCaptain").selectpicker('refresh');
                $(".selectpickerViceCapatin").selectpicker('refresh');
            }, 500);
            $scope.MySquadPlayers = $scope.MySquadPlayers;
        }
        /*
         Description : To Select vice captain
         */

        $scope.selectViceCaptain = function (PlayerGUID) {
            for (var i = 0; i < $scope.MySquadPlayers.length; i++) {
                if ($scope.MySquadPlayers[i].PlayerGUID == PlayerGUID) {

                    if ($scope.MySquadPlayers[i].PlayerPosition != 'ViceCaptain') {
                        $scope.MySquadPlayers[i].PlayerPosition = 'ViceCaptain';
                        $scope.ViceCaptain = $scope.MySquadPlayers[i].PlayerGUID;
                    }
                } else {
                    if ($scope.MySquadPlayers[i].PlayerPosition != 'Captain') {
                        $scope.MySquadPlayers[i].PlayerPosition = 'Player';
                    }
                }
            }
            $timeout(function () {
                $(".selectpickerViceCapatin").val($scope.ViceCaptain);
                $(".selectpickerCaptain").val($scope.Captain);
                $(".selectpickerCaptain").selectpicker('render');
                $(".selectpickerViceCapatin").selectpicker('render');
                $(".selectpickerCaptain").selectpicker('refresh');
                $(".selectpickerViceCapatin").selectpicker('refresh');
            }, 500);
        }

        $rootScope.CreateDraftTeam = function () {
            var PlayerList = [];
            for (var i in $scope.MySquadPlayers) {
                PlayerList.push({
                    'PlayerGUID': $scope.MySquadPlayers[i].PlayerGUID,
                    'PlayerPosition': $scope.MySquadPlayers[i].PlayerPosition,
                    'PlayerName': $scope.MySquadPlayers[i].PlayerName,
                    'PlayerID': $scope.MySquadPlayers[i].PlayerID,
                });
            }
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID; //   Series GUID
            $data.SessionKey = $localStorage.user_details.SessionKey; //   User session key
            $data.UserTeamPlayers = PlayerList; //   User selected players
            $data.UserTeamGUID = $scope.PostTeamGUID;
            var $url = 'SnakeDrafts/draftTeamPlayersSubmit';
            $http.post($scope.env.api_url + $url, $.param($data), contentType).then(function (response) {
                var response = response.data;
                if ($scope.checkResponseCode(response)) {
                    $scope.successMessageShow(response.Message);
                    $scope.closePopup('selectCaptainViceCaptainModal');
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                }
            });
        }

        $scope.resetTeamStructure = function () {
            $scope.teamStructure = {
                "WicketKeeper": {
                    "min": $scope.WkCount,
                    "max": 90,
                    "occupied": 0,
                    player: [],
                    "icon": "flaticon1-pair-of-gloves"
                },
                "Batsman": {
                    "min": $scope.BatCount,
                    "max": 93,
                    "occupied": 0,
                    player: [],
                    "icon": "flaticon1-ball"
                },
                "Bowler": {
                    "min": $scope.BowlCount,
                    "max": 93,
                    "occupied": 0,
                    player: [],
                    "icon": "flaticon1-tennis-ball"
                },
                "AllRounder": {
                    "min": $scope.AllCount,
                    "max": 91,
                    "occupied": 0,
                    player: [],
                    "icon": "flaticon1-ball"
                },
                "Extra": {
                    "min": 3,
                    "max": 3,
                    occupied: 0,
                    player: []
                },
                "ready": false
            };
            $scope.TotalAssistantPlayers = 0;
            $scope.playerCount = 100;
        }

        $scope.shortPlayerRole = function (PlayerRole) {
            switch (PlayerRole) {
                case 'WicketKeeper':
                    return 'WK';
                case 'Batsman':
                    return 'BAT';
                case 'Bowler':
                    return 'BOWL';
                case 'AllRounder':
                    return 'AR';
            }
        }

        /**
         * Get User play round
         */
        $scope.userPlayRounds = [];
        $scope.getUserPlayRound = function () {
            var $data = {};
            $scope.draft_silder_visible = false;
            $data.MatchGUID = $scope.MatchGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.ContestGUID = $scope.ContestGUID;
            appDB
                .callPostForm('SnakeDrafts/getRounds', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.userPlayRounds = data.Data;
                            $scope.DraftLiveRound = data.DraftLiveRound;
                            $scope.SliderRound = $scope.DraftLiveRound - 1;
                            $scope.draft_silder_visible = true;
                            $timeout(function () {
                                $('.round_team').slick('slickGoTo', $scope.SliderRound);
                            }, 1000);
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * Get league team list
         */
        $scope.teamList = [];
        $scope.getLeagueTeams = function () {
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID; //  Series Id
            $data.SessionKey = $localStorage.user_details.SessionKey;
            appDB
                .callPostForm('SnakeDrafts/getTeams', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.teamList = data.Data.Records;
                            $timeout(function () {
                                $(".selectpicker").selectpicker('render');
                                $(".selectpicker").selectpicker('refresh');
                            }, 2000);
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * Player list filter
         */
        $scope.FilterPlayerPosition = '';
        $scope.FilterPlayerTeam = '';
        $scope.filter = function () {
            $scope.AllPlayers.forEach((element, index) => {
                element.ShowStatus = false;
                if ($scope.FilterPlayerTeam == '' && $scope.FilterPlayerPosition == '') {
                    element.ShowStatus = true;
                } else if ($scope.FilterPlayerPosition != '' && $scope.FilterPlayerTeam != '' && element.PlayerRole == $scope.FilterPlayerPosition && element.TeamNameShort == $scope.FilterPlayerTeam) {
                    element.ShowStatus = true;
                } else if ($scope.FilterPlayerPosition != '' && $scope.FilterPlayerTeam == '' && element.PlayerRole == $scope.FilterPlayerPosition) {
                    element.ShowStatus = true;
                } else if ($scope.FilterPlayerTeam != '' && $scope.FilterPlayerPosition == '' && element.TeamNameShort == $scope.FilterPlayerTeam) {
                    element.ShowStatus = true;
                }
            });
        }
        /**
         * Clear player list filter
         */
        $scope.clear = function () {
            $scope.FilterPlayerPosition = '';
            $scope.FilterPlayerTeam = '';
            $timeout(function () {
                $(".selectpicker").selectpicker('refresh');
            }, 200);
            $scope.filter();
        }
        /**
         * Check Priority is selected
         */
        $scope.checkPriority = function (value, PlayerGUID) {
            for (var i in $scope.PlayerForAssiant) {
                if ($scope.PlayerForAssiant[i].Priority == value && $scope.PlayerForAssiant[i].PlayerGUID != PlayerGUID) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Get first name of user
         */
        $scope.getFirstName = function (name) {
            let data = name.split(' ');
            return data[0];
        }
        /**
         * Pre-assitant filter
         */
        $scope.FilterPreAssiPlayerPosition = '';
        $scope.FilterPreAssiPlayerTeam = '';
        $scope.filterPreAssi = function () {
            $scope.PlayerForAssiant.forEach((element, index) => {
                element.showPlayer = false;
                if ($scope.FilterPreAssiPlayerTeam == '' && $scope.FilterPreAssiPlayerPosition == '') {
                    element.showPlayer = true;
                } else if ($scope.FilterPreAssiPlayerPosition != '' && $scope.FilterPreAssiPlayerTeam != '' && element.PlayerRole == $scope.FilterPreAssiPlayerPosition && element.TeamNameShort == $scope.FilterPreAssiPlayerTeam) {
                    element.showPlayer = true;
                } else if ($scope.FilterPreAssiPlayerPosition != '' && $scope.FilterPreAssiPlayerTeam == '' && element.PlayerRole == $scope.FilterPreAssiPlayerPosition) {
                    element.showPlayer = true;
                } else if ($scope.FilterPreAssiPlayerTeam != '' && $scope.FilterPreAssiPlayerPosition == '' && element.TeamNameShort == $scope.FilterPreAssiPlayerTeam) {
                    element.showPlayer = true;
                }
            });
        }
        /**
         * Clear pre-assistant filter
         */
        $scope.clearPreAssiFilter = function () {
            $scope.FilterPreAssiPlayerPosition = '';
            $scope.FilterPreAssiPlayerTeam = '';
            $timeout(function () {
                $(".selectpicker").selectpicker('refresh');
            }, 200);
            $scope.filterPreAssi();
        }

        $scope.getUserDraftInLive = function () {
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID; 
            $data.ContestGUID = $scope.ContestGUID;
            appDB
                .callPostForm('SnakeDrafts/checkUserDraftInlive', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.setRunningValues(data.Data);
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /**
         * active all player
         */
        $scope.gotoTab = function (type) {
            $scope.activeAllPlayersTab = type;
        }
        /**
         * active my sqard player
         */
        $scope.gotoTab1 = function (type) {
            $scope.activeMySquadTab = type;
        }
        /**
         * active pre assistant player
         */
        $scope.gotoTab2 = function (type) {
            $scope.activePreSqardTab = type;
        }
        /**
         * active other user player tab
         */
        $scope.gotoTab3 = function (type) {
            $scope.activeOtherSquadTab = type;
        }
        /**
         * Open final team popup
         */
        $scope.openTeamSubmitPopup = function () {
            $timeout(function () {
                $(".selectpickerViceCapatin").val($scope.ViceCaptain);
                $(".selectpickerCaptain").val($scope.Captain);
                $(".selectpickerCaptain").selectpicker('render');
                $(".selectpickerViceCapatin").selectpicker('render');
                $(".selectpickerCaptain").selectpicker('refresh');
                $(".selectpickerViceCapatin").selectpicker('refresh');
            }, 500);
            $scope.openPopup('selectCaptainViceCaptainModal');
        }
        /**
         * open player info modal
         */
        $scope.openPlayerInfo = function(player){
            
            player.PlayerBattingStyle = (player.PlayerBattingStyle) ? player.PlayerBattingStyle : '-';
            player.PlayerBowlingStyle = (player.PlayerBowlingStyle) ? player.PlayerBowlingStyle : '-';
            player.Matches = '0';
            player.Runs = '0';
            player.Hundreds = '0';
            player.Fifties = '0';
            player.Average = '0';
            player.StrikeRate = '0';
            if (player.PlayerBattingStats) {
                if (player.PlayerBattingStats.T20i && $scope.ContestInfo.MatchType === 't20i') {
                    player.Matches = (player.PlayerBattingStats.T20i.Matches) ? player.PlayerBattingStats.T20i.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.T20i.Runs) ? player.PlayerBattingStats.T20i.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.T20i.Hundreds) ? player.PlayerBattingStats.T20i.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.T20i.Fifties) ? player.PlayerBattingStats.T20i.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.T20i.Average) ? player.PlayerBattingStats.T20i.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.T20i.StrikeRate) ? player.PlayerBattingStats.T20i.StrikeRate : '0';
                } else if (player.PlayerBattingStats.T20 && $scope.ContestInfo.MatchType === 't20') {
                    player.Matches = (player.PlayerBattingStats.T20.Matches) ? player.PlayerBattingStats.T20.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.T20.Runs) ? player.PlayerBattingStats.T20.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.T20.Hundreds) ? player.PlayerBattingStats.T20.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.T20.Fifties) ? player.PlayerBattingStats.T20.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.T20.Average) ? player.PlayerBattingStats.T20.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.T20.StrikeRate) ? player.PlayerBattingStats.T20.StrikeRate : '0';
                } else if (player.PlayerBattingStats.ODI && $scope.ContestInfo.MatchType === 'odi') {
                    player.Matches = (player.PlayerBattingStats.ODI.Matches) ? player.PlayerBattingStats.ODI.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.ODI.Runs) ? player.PlayerBattingStats.ODI.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.ODI.Hundreds) ? player.PlayerBattingStats.ODI.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.ODI.Fifties) ? player.PlayerBattingStats.ODI.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.ODI.Average) ? player.PlayerBattingStats.ODI.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.ODI.StrikeRate) ? player.PlayerBattingStats.ODI.StrikeRate : '0';
                } else if (player.PlayerBattingStats.ListA && $scope.ContestInfo.MatchType === 'list a') {
                    player.Matches = (player.PlayerBattingStats.ListA.Matches) ? player.PlayerBattingStats.ListA.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.ListA.Runs) ? player.PlayerBattingStats.ListA.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.ListA.Hundreds) ? player.PlayerBattingStats.ListA.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.ListA.Fifties) ? player.PlayerBattingStats.ListA.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.ListA.Average) ? player.PlayerBattingStats.ListA.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.ListA.StrikeRate) ? player.PlayerBattingStats.ListA.StrikeRate : '0';
                } else if (player.PlayerBattingStats.FirstClass && $scope.ContestInfo.MatchType === 'first class') {
                    player.Matches = (player.PlayerBattingStats.FirstClass.Matches) ? player.PlayerBattingStats.FirstClass.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.FirstClass.Runs) ? player.PlayerBattingStats.FirstClass.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.FirstClass.Hundreds) ? player.PlayerBattingStats.FirstClass.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.FirstClass.Fifties) ? player.PlayerBattingStats.FirstClass.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.FirstClass.Average) ? player.PlayerBattingStats.FirstClass.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.FirstClass.StrikeRate) ? player.PlayerBattingStats.FirstClass.StrikeRate : '0';
                } else if (player.PlayerBattingStats.Test && $scope.ContestInfo.MatchType === 'test') {
                    player.Matches = (player.PlayerBattingStats.Test.Matches) ? player.PlayerBattingStats.Test.Matches : '0';
                    player.Runs = (player.PlayerBattingStats.Test.Runs) ? player.PlayerBattingStats.Test.Runs : '0';
                    player.Hundreds = (player.PlayerBattingStats.Test.Hundreds) ? player.PlayerBattingStats.Test.Hundreds : '0';
                    player.Fifties = (player.PlayerBattingStats.Test.Fifties) ? player.PlayerBattingStats.Test.Fifties : '0';
                    player.Average = (player.PlayerBattingStats.Test.Average) ? player.PlayerBattingStats.Test.Average : '0';
                    player.StrikeRate = (player.PlayerBattingStats.Test.StrikeRate) ? player.PlayerBattingStats.Test.StrikeRate : '0';
                }
            }
            player.Wickets = '0';
            player.BowlAverage = '0';
            player.Economy = '-';
            if (player.PlayerBowlingStats) {
                if (player.PlayerBowlingStats.T20i && $scope.ContestInfo.MatchType === 't20i') {
                    player.Wickets = (player.PlayerBowlingStats.T20i.Wickets) ? player.PlayerBowlingStats.T20i.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.T20i.Average) ? player.PlayerBowlingStats.T20i.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.T20i.Economy) ? player.PlayerBowlingStats.T20i.Economy : '-';
                } else if (player.PlayerBowlingStats.T20 && $scope.ContestInfo.MatchType === 't20') {
                    player.Wickets = (player.PlayerBowlingStats.T20.Wickets) ? player.PlayerBowlingStats.T20.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.T20.Average) ? player.PlayerBowlingStats.T20.Average : "0";
                    player.Economy = (player.PlayerBowlingStats.T20.Economy) ? player.PlayerBowlingStats.T20.Economy : '-';
                } else if (player.PlayerBowlingStats.ODI && $scope.ContestInfo.MatchType === 'odi') {
                    player.Wickets = (player.PlayerBowlingStats.ODI.Wickets) ? player.PlayerBowlingStats.ODI.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.ODI.Average) ? player.PlayerBowlingStats.ODI.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.ODI.Economy) ? player.PlayerBowlingStats.ODI.Economy : '-';
                } else if (player.PlayerBowlingStats.ListA && $scope.ContestInfo.MatchType === 'list a') {
                    player.Wickets = (player.PlayerBowlingStats.ListA.Wickets) ? player.PlayerBowlingStats.ListA.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.ListA.Average) ? player.PlayerBowlingStats.ListA.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.ListA.Economy) ? player.PlayerBowlingStats.ListA.Economy : '-';
                } else if (player.PlayerBowlingStats.FirstClass && $scope.ContestInfo.MatchType === 'first class') {
                    player.Wickets = (player.PlayerBowlingStats.FirstClass.Wickets) ? player.PlayerBowlingStats.FirstClass.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.FirstClass.Average) ? player.PlayerBowlingStats.FirstClass.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.FirstClass.Economy) ? player.PlayerBowlingStats.FirstClass.Economy : '-';
                } else if (player.PlayerBowlingStats.Test && $scope.ContestInfo.MatchType === 'test') {
                    player.Wickets = (player.PlayerBowlingStats.Test.Wickets) ? player.PlayerBowlingStats.Test.Wickets : '0';
                    player.BowlAverage = (player.PlayerBowlingStats.Test.Average) ? player.PlayerBowlingStats.Test.Average : '0';
                    player.Economy = (player.PlayerBowlingStats.Test.Economy) ? player.PlayerBowlingStats.Test.Economy : '-';
                }
            }
            $scope.playerDetailsInfo = player;
            $scope.openPopup('playerInfo');
        }

        $scope.MatchDetails = {};
        $scope.matchDetails = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'MatchStartDateTimeUTC,MatchScoreDetails,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,TeamGUIDVisitor,TeamGUIDLocal';
            appDB
                .callPostForm('sports/getMatch', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.MatchDetails = data.Data;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
    } else {
        window.location.href = base_url;
    }

}]);

app.directive('snakeSlickCustomCarousel', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        //scope: true,
        link: {
            post: function (scope, elem, attr) {
                $timeout(function () {
                    $('.round_team').slick({
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        touchMove: false
                    });
                }, 50);

            }
        }
    }
}]);

