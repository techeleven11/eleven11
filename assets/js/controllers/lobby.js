'use strict';
app.directive('createContest', function () {
    return {
        restrict: 'E',
        controller: 'createContestController',
        templateUrl: 'createContest.php',
        link: function (scope, element, attributes) {
            scope.contest_size = 2;
            scope.closeContestPopup = function () {
                scope.closePopup('creat_contest');
                scope.contestError = false;
                scope.calculation_error = false;
                scope.calculation_error_msg = false;
                delete scope.winnings;
                scope.number_of_winners = '';
                scope.total_winning_amount = 0;
                scope.contest_sizes = 2;
                scope.submitted = false;
                scope.clearPopup();
            }
            scope.isSetUp = false;
            scope.clearContent = function () {

            }
            scope.clearPopup = function () {
                scope.ContestName = '';
                scope.NoOfWinners = '';
                scope.EntryFee = 0;
                scope.is_multientry = false;
                scope.winnings = false;
                //scope.contest_sizes = 0;
                $(".selectpicker").selectpicker('render');
                scope.ContestSize = 2;
                scope.ContestWinningAmount = 0;
                scope.clearForm();
                scope.submitted = false;
            }
        }
    };
});
app.controller('lobbyController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$filter', 'appDB', 'toastr', '$timeout', function ($scope, $rootScope, $location, environment, $localStorage, $filter, appDB, toastr, $timeout) {
    $scope.env = environment;
    $scope.data.pageSize = 20;
    $scope.data.pageNo = 1;
    $scope.coreLogic = Mobiweb.helpers;
    $scope.ContestsTotalCount = 0;
    $scope.UserTeamsTotalCount = 0;
    $scope.UserJoinedContestTotalCount = 0;
    $scope.GamesType = $localStorage.GamesType;


    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.MatchGUID = '';
        $scope.selected_series = '';
        $scope.UserInvitationCode = '';
        /*To manage Tabs*/
        $scope.activeTab = 'normal';
        $scope.gotoTab = function (tab) {
            $scope.activeTab = tab;
            if ($scope.activeTab === 'normal') {
                if ($scope.MatchesDetail.TeamPlayersAvailable == 'Yes' && $scope.MatchesDetail.MatchDisplay == 'Enable') {
                    $scope.getContests(true);
                }
            } else if ($scope.activeTab === 'joined') {
                $scope.JoinedContest(true);
            } else {
                $scope.UsersTeamList();
            }
        }
        /*Function to get all series*/
        $scope.seriesList = [];
        $scope.Series = function () {
            var $data = {};
            $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate';
            $data.OrderBy = 'SeriesStartDate';
            $data.Sequence = 'ASC';
            $data.StatusID = 2;
            appDB.callPostForm($rootScope.apiPrefix + 'sports/getSeries', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.seriesList = data.Data;
                            if ($localStorage.hasOwnProperty('SeriesGUID') && $localStorage.SeriesGUID != '') {
                                $scope.selected_series = $localStorage.SeriesGUID;
                                $scope.getMatches($localStorage.SeriesGUID);
                            } else {
                                $scope.getMatches();
                            }
                            $timeout(function () {
                                $(".selectpicker").selectpicker('render');
                                $("#series").selectpicker('refresh');
                            }, 1000);

                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /*Change series */
        $scope.changeSeries = function (SeriesGUID) {
            $localStorage.MatchGUID = '';
            $scope.MatchGUID = '';
            $localStorage.SeriesGUID = SeriesGUID;
            $scope.getMatches(SeriesGUID);
        }
        /*Fuction for clear filter info */
        $scope.clear_filter = function () {
            $scope.selected_series = '';
            $scope.cut_off = '';
            $scope.entry_fee_range = '';
            $scope.contestSizeRange = '';
            $scope.contest_type = '';
            $scope.activeTab = 'normal';
            $localStorage.SeriesGUID = '';
            $localStorage.MatchGUID = '';
            $scope.search_data = [];
            $('.selectpicker').val('');
            $('.selectpicker').selectpicker('render');
            $('#series').val('');
            $("#series").selectpicker('render');
            $scope.getMatches();
        }
        /* Function for search contest */
        $scope.searchContest = function (search) {
            $scope.Keyword = search;
            if ($scope.activeTab === 'normal' || $scope.activeTab === 'joined') {
                $scope.filter();
            } else {
                $scope.UsersTeamList();
            }

        }
        /*Function to get matches */
        $scope.MatchesList = [];
        $scope.getMatches = function (SelectedSeries) {
            var $data = {};
            $scope.silder_visible = false;
            $data.SeriesGUID = SelectedSeries; // Selected series ID
            $data.Params = 'MatchTypeByApi,MatchDisplay,ContestAvailable,TeamPlayersAvailable,SeriesName,MatchType,MatchNo,MatchStartDateTime,MatchStartDateTimeUTC,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
            $data.Status = 'Pending';
            $data.PageSize = 15;
            $data.PageNo = 1;
            $data.Filter = 'AddDays';
            $data.SessionKey = $localStorage.user_details.SessionKey;
            appDB
                .callPostForm($rootScope.apiPrefix + 'sports/getMatches', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.MatchesList = data.Data;
                            if (data.Data.Records) {
                                if (localStorage.hasOwnProperty('LeagueMatchGUID')) {
                                    $scope.MatchGUID = localStorage.LeagueMatchGUID;
                                    $localStorage.MatchGUID = localStorage.LeagueMatchGUID;
                                    $scope.activeTab = 'joined'
                                    localStorage.removeItem('LeagueMatchGUID')
                                } else if ($localStorage.hasOwnProperty('MatchGUID') && $localStorage.MatchGUID != '') {
                                    $scope.MatchGUID = $localStorage.MatchGUID;
                                } else {
                                    $scope.MatchGUID = data.Data.Records[0].MatchGUID;
                                    $localStorage.MatchGUID = $scope.MatchGUID;
                                }
                                var MatchLive = true;
                                for (let i in $scope.MatchesList.Records) {
                                    if ($scope.MatchesList.Records[i].MatchGUID == $localStorage.MatchGUID) {
                                        MatchLive = false;
                                    }
                                }
                                if (MatchLive) {
                                    $scope.MatchGUID = data.Data.Records[0].MatchGUID;
                                    $localStorage.MatchGUID = $scope.MatchGUID;
                                    if (localStorage.hasOwnProperty('redirect_form_notify') && localStorage.redirect_form_notify === true) {
                                        swal('Notification Alert', 'This match is already started.', {
                                            buttons: false,
                                            timer: 3000
                                        });
                                    }
                                }
                                localStorage.removeItem('redirect_form_notify');
                                $scope.matchCenterDetails();
                                $scope.silder_visible = true;

                            } else {
                                $scope.MatchesDetail = {};
                                $scope.userTeamList = [];
                                $scope.Contests = [];
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        /*Function to get another match info */
        $scope.selectMatch = function (MatchInfo, Status) {
            if (Status || MatchInfo.TeamPlayersAvailable === 'No' || MatchInfo.ContestAvailable === 'No' || MatchInfo.MatchDisplay == 'Disable') {
                $scope.errorMessageShow('This match will be open soon.');
                return false;
            }
            $scope.MatchGUID = MatchInfo.MatchGUID;
            $localStorage.MatchGUID = MatchInfo.MatchGUID;
            $scope.activeTab = 'normal';
            $scope.matchCenterDetails();
        }

        /*Function to get mactch center details*/
        $scope.MatchesDetail = {};
        $scope.matchCenterDetails = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'MatchTypeByApi,MatchDisplay,ContestAvailable,TeamPlayersAvailable,MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,TeamGUIDVisitor,TeamGUIDLocal';
            appDB
                .callPostForm($rootScope.apiPrefix + 'sports/getMatch', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.MatchesDetail = data.Data;
                            $rootScope.CurrentSelectedMatchDetail = data.Data;
                            if ($scope.checkTimeLeft($scope.MatchesDetail.MatchStartDateTimeUTC) || $scope.MatchesDetail.MatchDisplay == 'Disable') {
                                $scope.errorMessageShow('This match will be open soon.');
                                $scope.ContestsTotalCount = 0;
                                $scope.UserJoinedContestTotalCount = 0;
                                $scope.UserTeamsTotalCount = 0;
                                $scope.Contests = [];
                                $scope.data.dataList = [];
                                $scope.userTeamList = [];
                                $scope.MatchGUID = '';
                                $localStorage.MatchGUID = '';
                                return false;
                            }
                            if ($scope.activeTab == 'normal') {
                                // if($scope.MatchesDetail.TeamPlayersAvailable == 'Yes' && $scope.MatchesDetail.MatchDisplay == 'Enable'){
                                $scope.getContests(true);
                                // }/
                            } else if ($scope.activeTab == 'joined') {
                                $scope.JoinedContest(true);
                            }
                            $scope.UsersTeamList();
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /*
         Description : To get user created team list
         */
        $scope.userTeamList = [];
        $scope.UsersTeamList = function () {
            if ($scope.MatchGUID == '') {
                return false;
            }
            var $data = {};
            $rootScope.loader.isLoading = false;
            $scope.userTeamList = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'UserTeamName,UserTeamPlayers,TotalJoinedContests';
            $data.Keyword = $scope.Keyword;
            $data.UserTeamType = 'Normal';
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        if ($scope.checkResponseCode(data)) {
                            if (data.Data.hasOwnProperty('Records')) {
                                var userTeamList = data.Data.Records;
                                for (var j in userTeamList) {
                                    for (var i in userTeamList[j].UserTeamPlayers) {
                                        if (userTeamList[j].UserTeamPlayers[i].PlayerPosition === 'Captain') {
                                            userTeamList[j].Captain = userTeamList[j].UserTeamPlayers[i].PlayerName;
                                        } else if (userTeamList[j].UserTeamPlayers[i].PlayerPosition === 'ViceCaptain') {
                                            userTeamList[j].ViceCaptain = userTeamList[j].UserTeamPlayers[i].PlayerName;
                                        }
                                    }
                                    $scope.userTeamList.push(userTeamList[j]);
                                }
                                $scope.UserTeamsTotalCount = data.Data.TotalRecords;
                            } else {
                                $scope.userTeamList = [];
                                $scope.UserTeamsTotalCount = 0;
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                        $scope.checkResponseCode(data);
                    });

        }
        $scope.search_data = [];
        /*Change filter*/
        $scope.filter = function () {
            $scope.search_data = [];
            if ($scope.contest_type) {
                if ($scope.search_data.length > 0) {
                    $scope.search_data[0].ContestType = $scope.contest_type;
                } else {
                    $scope.search_data.push({ 'ContestType': $scope.contest_type });
                }

            }
            if ($scope.Keyword) {
                if ($scope.search_data.length > 0) {
                    $scope.search_data[0].ContestName = $scope.Keyword;
                } else {
                    $scope.search_data.push({ 'ContestName': $scope.Keyword });
                }
            }
            if ($scope.contestSizeRange) {
                if ($scope.search_data.length > 0) {
                    $scope.search_data[0].ContestSize = $scope.contestSizeRange;
                } else {
                    $scope.search_data.push({ 'ContestSize': $scope.contestSizeRange });
                }
            }
            if ($scope.entry_fee_range) {
                if ($scope.search_data.length > 0) {
                    $scope.search_data[0].EntryFee = $scope.entry_fee_range;
                } else {
                    $scope.search_data.push({ 'EntryFee': $scope.entry_fee_range });
                }
            }

            if ($scope.activeTab === 'normal') {
                $scope.getContests(true);
            } else if ($scope.activeTab === 'joined') {
                $scope.JoinedContest(true);
            } else {
                $scope.UsersTeamList();
            }
        }
        /*function to get contests according to matches*/
        $scope.Contests = [];
        $scope.Nextdata = true;
        $rootScope.loader = {};
        $scope.getContests = function (status) {
            if ($scope.activeTab != 'normal' || $scope.MatchGUID == '') {
                return false;
            }
            if (status) {
                $scope.data.pageNo = 1;
                $scope.Contests = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.Nextdata == false) {
                return false
            }
            var $data = {};
            var SearchJSON = JSON.stringify($scope.search_data[0]);
            $data.MatchGUID = $scope.MatchGUID; // Selected MatchGUID
            $data.SessionKey = $localStorage.user_details.SessionKey; // User SessionKey
            $data.PageNo = $scope.data.pageNo; // Page Number
            $data.PageSize = $scope.data.pageSize; // Page Size
            $data.Params = 'WinningType,WinningRatio,WinUpTo,UnfilledWinningPercent,SmartPool,MatchStartDateTime,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,TeamNameLocal,TeamNameVisitor,IsConfirm,CashBonusContribution';
            $data.Keyword = (SearchJSON != '' || SearchJSON != undefined) ? SearchJSON : $scope.Keyword;
            $data.ContestFull = 'No';
            $data.Status = 'Pending';
            $data.StatusID = 1;
            $data.Privacy = 'No';
            $data.OrderBy = 'TotalJoined';
            $data.Sequence = 'DESC';
            $rootScope.loader.isLoading = false;
            if ($scope.Nextdata) {
                $scope.Nextdata = false;
                appDB
                    .callPostForm($rootScope.apiPrefix + 'contest/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.Nextdata = true;
                            $rootScope.loader.isLoading = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.ContestsTotalCount = data.Data.TotalRecords;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        data.Data.Records[i].WinUpTo = Number(data.Data.Records[i].WinUpTo).toFixed(1);
                                        data.Data.Records[i].EntryFee = Number(data.Data.Records[i].EntryFee);
                                        data.Data.Records[i].ContestSize = (data.Data.Records[i].ContestSize == 'Unlimited') ? data.Data.Records[i].ContestSize : Number(data.Data.Records[i].ContestSize);
                                        data.Data.Records[i].WinningAmount = Number(data.Data.Records[i].WinningAmount);
                                        if (data.Data.Records[i].ContestSize == 'Unlimited') {
                                            data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined * 10);
                                        } else {
                                            data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined) * 100 / parseInt(data.Data.Records[i].ContestSize);
                                        }
                                        $scope.Contests.push(data.Data.Records[i]);
                                    }
                                    $scope.data.pageNo++;
                                } else {
                                    $scope.LoadMoreFlag = false;
                                }

                            } else {
                                $scope.data.noRecords = true;
                            }
                        },
                        function errorCallback(data) {
                            $rootScope.loader.isLoading = true;
                            $scope.Nextdata = true;
                            $scope.checkResponseCode(data);
                        });
            }
        }

        /*To Check Team to Join Contest*/
        $scope.SelectTeamToJoinContest = function (ContestInfo, type) {
            $rootScope.ContestInfo = ContestInfo;
            if (parseInt($scope.profileDetails.TotalCash) < parseInt(ContestInfo.EntryFee)) {
                $scope.openPopup('add_more_money');
            } else {
                if ($scope.userTeamList.length <= 0) {
                    /*Redirect to create team*/
                    window.location.href = base_url + 'createTeam?MatchGUID=' + $scope.MatchGUID + '&League=' + ContestInfo.ContestGUID + '&UserInvitationCode=' + $scope.UserInvitationCode;
                } else {
                    $scope.ContestGUID = ContestInfo.ContestGUID;
                    $scope.type = type;
                    $(".selectpickerTeam").selectpicker('render');
                    $scope.openPopup('joinLeaguePopup');
                }
            }
        }

        /*
         Description : To get user team details on ground
         */

        $scope.ViewTeamOnGround = function (UserTeamGUID) {
            var $data = {};
            $scope.TeamPlayers = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.UserTeamGUID = UserTeamGUID; //User Team GUID
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = "PlayerGUID,PlayerName,PlayerPic,PlayerCountry,PlayerPosition,PlayerRole,UserTeamPlayers";
            $data.UserTeamType = 'Normal';
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            document.getElementById("mySidenav").style.width = "58%";
                            $scope.TeamPlayers = data.Data;
                            if ($scope.GamesType == 'Cricket') {
                                $scope.teamStructure = {
                                    "WicketKeeper": {
                                        "min": 1,
                                        "max": 1,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-pair-of-gloves"
                                    },
                                    "Batsman": {
                                        "min": 3,
                                        "max": 5,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-ball"
                                    },
                                    "Bowler": {
                                        "min": 3,
                                        "max": 5,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-tennis-ball"
                                    },
                                    "AllRounder": {
                                        "min": 1,
                                        "max": 3,
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

                                angular.forEach($scope.TeamPlayers.UserTeamPlayers, function (value, key) {
                                    if (value.PlayerRole == 'WicketKeeper') {

                                        $scope.teamStructure['WicketKeeper'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['WicketKeeper'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Batsman') {
                                        $scope.teamStructure['Batsman'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Batsman'].occupied++;
                                    }
                                    if (value.PlayerRole == 'AllRounder') {
                                        $scope.teamStructure['AllRounder'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['AllRounder'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Bowler') {
                                        $scope.teamStructure['Bowler'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Bowler'].occupied++;
                                    }
                                });
                            }

                            if ($scope.GamesType == 'Football') {
                                $scope.teamStructure = {
                                    "Goalkeeper": {
                                        "min": 1,
                                        "max": 1,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-pair-of-gloves"
                                    },
                                    "Defender": {
                                        "min": 3,
                                        "max": 5,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-ball"
                                    },
                                    "Midfielder": {
                                        "min": 3,
                                        "max": 5,
                                        "occupied": 0,
                                        player: [],
                                        "icon": "flaticon1-tennis-ball"
                                    },
                                    "Striker": {
                                        "min": 1,
                                        "max": 3,
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

                                angular.forEach($scope.TeamPlayers.UserTeamPlayers, function (value, key) {
                                    if (value.PlayerRole == 'Goalkeeper') {

                                        $scope.teamStructure['Goalkeeper'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Goalkeeper'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Defender') {
                                        $scope.teamStructure['Defender'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Defender'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Midfielder') {
                                        $scope.teamStructure['Midfielder'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Midfielder'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Striker') {
                                        $scope.teamStructure['Striker'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'PlayerPic': value.PlayerPic,
                                            'Points': value.PointCredits,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.MatchesDetail.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Striker'].occupied++;
                                    }
                                });
                            }

                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        $scope.closeNav = function () {
            document.getElementById("mySidenav").style.width = "0";
        }

        /*To get User joined contest */

        $scope.JoinedContest = function (status) {
            if ($scope.activeTab != 'joined' || $scope.MatchGUID == '') {
                return false;
            }
            if (status) {
                $scope.data.pageNo = 1;
                $scope.data.dataList = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true) {
                return false
            }

            var SearchJSON = JSON.stringify($scope.search_data[0]);
            var $data = {};

            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'WinningType,UnfilledWinningPercent,SmartPool,IsConfirm,ContestType,MatchStartDateTime,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution,UserInvitationCode';
            $data.PageNo = $scope.data.pageNo;
            $data.PageSize = $scope.data.pageSize;
            $data.Keyword = (SearchJSON != '' || SearchJSON != undefined) ? SearchJSON : $scope.Keyword;
            $data.JoinedContestStatusID = 'Yes';
            $data.Status = 'Pending';
            $data.MyJoinedContest = 'Yes';
            $data.Privacy = 'All';
            $data.OrderBy = 'TotalJoined';
            $data.Sequence = 'DESC';
            // if ($scope.NextData) {
            //     console.log($data); 
            $rootScope.loader.isLoading = false;
            // $scope.NextData = false;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getContests', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        // $scope.NextData = true;
                        if ($scope.checkResponseCode(data)) {
                            $scope.UserJoinedContestTotalCount = data.Data.TotalRecords;
                            if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                $scope.LoadMoreFlag = true;
                                for (var i in data.Data.Records) {
                                    data.Data.Records[i].EntryFee = Number(data.Data.Records[i].EntryFee);
                                    data.Data.Records[i].WinningAmount = Number(data.Data.Records[i].WinningAmount);
                                    if (data.Data.Records[i].ContestSize == 'Unlimited') {
                                        data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined * 10);
                                    } else {
                                        data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined) * 100 / parseInt(data.Data.Records[i].ContestSize);
                                    }
                                    $scope.data.dataList.push(data.Data.Records[i]);
                                }
                                $scope.data.pageNo++;
                            } else {
                                $scope.LoadMoreFlag = false;
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                        // $scope.NextData = true;
                        $scope.checkResponseCode(data);
                    });
            // }
        }

        /*To join Contest*/
        $scope.join = {};
        $scope.joinSubmitted = false;
        $rootScope.JoinContest = function (form) {
            $scope.joinSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            var $data = {};
            $data = $scope.join;
            $data.ContestGUID = $scope.ContestGUID;
            $data.MatchGUID = $scope.MatchGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            if ($scope.UserInvitationCode) {
                $data.UserInvitationCode = $scope.UserInvitationCode;
            }
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/join', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('joinLeaguePopup');
                            $scope.closePopup('joinPrivateContestPopup');
                            if ($scope.UserInvitationCode) {
                                $scope.UserInvitationCode = '';
                            }
                            var toast = toastr.success(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                            setTimeout(function () {
                                $scope.data.pageNo = 1;
                                $scope.getWalletDetails();
                                $scope.activeTab = 'normal';
                                $scope.getContests(true);
                            }, 1000);
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        /*
         Description : To check private contest and join
         */
        $scope.codeSubmitted = false;
        $scope.checkContestCode = function (form, UserInvitationCode) {
            $scope.codeSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; // User SessionKey
            $data.Params = 'IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,TotalJoined,CustomizeWinning';
            $data.UserInvitationCode = UserInvitationCode;
            $data.MatchGUID = $scope.MatchesDetail.MatchGUID;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getPrivateContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            var Contests = data.Data;
                            if (Object.keys(Contests).length == 0) {
                                $scope.warningMessageShow('Invalid Contest Code');
                            } else {
                                // $scope.UsersTeamList();
                                $scope.SelectTeamToJoinContest(Contests);
                            }
                            $scope.data.listLoading = false;
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        $rootScope.InviteCode = '';
        $scope.openinvitationModal = function (invitationCode) {
            $rootScope.InviteCode = invitationCode;
            $scope.openPopup('invitationModal');
        }

        $scope.addMoreCash = function (amount) {
            $scope.amount += amount;
        }

        $rootScope.copyText = function () {
            /* Get the text field */
            var copyText = document.getElementById("invite_code");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            $scope.successMessageShow('Copied the code');
        }

        $rootScope.createTeam = function (MatchGUID, ContestGUID) {
            if ($scope.UserTeamsTotalCount < 6) {
                if (MatchGUID != '' && ContestGUID != '' && $scope.UserInvitationCode != '') {
                    window.location.href = base_url + 'createTeam?MatchGUID=' + MatchGUID + '&League=' + ContestGUID + '&UserInvitationCode=' + $scope.UserInvitationCode;
                } else if (MatchGUID != '' && ContestGUID != '') {
                    window.location.href = base_url + 'createTeam?MatchGUID=' + MatchGUID + '&League=' + ContestGUID;
                } else {
                    window.location.href = base_url + 'createTeam?MatchGUID=' + $scope.MatchGUID;
                }

            } else {
                $scope.errorMessageShow('Sorry, You can\'t create more than 6 teams.');
            }
        }

        $rootScope.activeInviteTab = 'viaSms';

        $rootScope.inviteInviteTab = function (tab) {
            $rootScope.activeInviteTab = tab;
        }
        /*function to invite friend*/
        $scope.inviteField = {};

        $scope.inviteSubmitted = false;
        $scope.InviteFriend = function (form, ReferType, InviteCode) {
            $scope.inviteSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey;
            if (ReferType == 'Phone') {
                $data.PhoneNumber = $scope.inviteField.PhoneNumber;
            } else {
                $data.Email = $scope.inviteField.Email;
            }
            $data.ReferType = ReferType;
            $data.InviteCode = InviteCode;
            appDB
                .callPostForm('users/InviteContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.successMessageShow(data.Message);
                            $scope.closePopup('invitationModal');
                            $scope.inviteField = {};
                            $scope.inviteSubmitted = false;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        /**
         * Sort by Entry fee and payouts
         */
        $scope.propertyName = '';
        $scope.reverse = false;
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
        $scope.propertyNameByTeam = 'UserTeamName';
        $scope.reverse1 = false;
        $scope.sortByTeam = function (propertyName) {
            $scope.reverse1 = ($scope.propertyNameByTeam === propertyName) ? !$scope.reverse1 : false;
            $scope.propertyNameByTeam = propertyName;
        };

        $scope.showWinningPayout = function (ContestInfo) {
            $scope.SmartPool = ContestInfo.SmartPool;
            $scope.CustomizeWinning = ContestInfo.CustomizeWinning;
            $scope.IsVirtualContest = ContestInfo.WinningType == 'Free Join Contest' ? 'Yes' : 'No';
            $scope.openPopup('PayoutBreakUp');
        }
        /**
         * Check time for match
         */
        $scope.checkTimeLeft = function (date) {
            var date = $filter('convertIntoUserTimeZone')(date);
            var diffInSeconds = Math.abs(moment().diff(date) / 1000);
            var days = Math.floor(diffInSeconds / 60 / 60 / 24);
            // if (days > (parseInt($scope.MatchesList.UpcomingMatchesTime) / 24)) {
            //     return true;
            // } else {
            return false;
            // }
        }
    } else {
        window.location.href = base_url;
    }

}]);

app.controller('createContestController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr) {
    $scope.env = environment;

    $scope.coreLogic = Mobiweb.helpers;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.ContestFormat = 'Head to Head';

        $rootScope.MatchGUID = $localStorage.MatchGUID; //Match GUID

        /*create contest calculations starts*/
        $scope.clearForm = function () {
            $scope.showField = false;
            $scope.choices = [];
            $scope.choices.push({
                row: 0,
                select_1: 1,
                select_2: 1,
                amount: 0.00,
                percent: 0
            });

            if ($scope.NoOfWinners && $scope.contest_sizes) {
                if ($scope.numbers == '') {
                    for (var i = 1; i <= parseInt($scope.NoOfWinners); i++) {
                        $scope.numbers.push(i);
                    }
                } else {
                    for (var i = 1; i <= parseInt($scope.NoOfWinners); i++) {
                        $scope.numbers.push(i)
                        $scope.numbers.splice(i);
                    }
                }
            }
        }
        $scope.totalPercentage = 0; // For Contest Creation Belives total Percentage is 0
        $scope.totalPersonCount = 0; // For Contest Creation Belives total Person count is 0
        $scope.currentSelectedMatch = 0; //To maintain current Selected Match Id
        /*------------calculate entryFee-------------------*/
        $scope.adminPercent = 10;
        $scope.ContestSize = 2;
        $scope.showSeries = true;
        $scope.contestError = false;
        $scope.contestErrorMsg = '';

        /*Function to Fetch Matches*/
        $scope.$watch('ContestSize', function (newValue, oldValue) {
            $scope.NoOfWinners = '';

            if (newValue != oldValue) {
                if (typeof newValue == 'undefined') {
                    $scope.EntryFee = 0.00;
                    return false;
                }
                if (newValue > 100) {
                    $scope.ContestSize = 100;
                } else if ($scope.ContestSize.match(/^0[0-9].*$/)) {
                    $scope.ContestSize = $scope.ContestSize.replace(/^0+/, '');
                }


                if (parseInt($scope.ContestSize) > 0) {
                    $scope.totalEntry = $scope.ContestWinningAmount / $scope.ContestSize;
                    $scope.EntryFee = ($scope.totalEntry * $scope.adminPercent / 100 + $scope.totalEntry).toFixed(2);
                } else {
                    $scope.EntryFee = 0;
                }

            }
        });

        $scope.$watch('ContestWinningAmount', function (newValue, oldValue) {
            if (newValue != oldValue) {
                if (typeof newValue == 'undefined') {
                    $scope.EntryFee = 0.00;
                    return false;
                }
                if (newValue > 10000) {
                    $scope.ContestWinningAmount = 10000;
                    $scope.errorMessageShow('Max winning limit is reached');
                }
                //                    if ($scope.ContestWinningAmount.match(/^0[0-9].*$/)) {
                //                        $scope.ContestWinningAmount = $scope.ContestWinningAmount.replace(/^0+/, '');
                //                    }
                if (parseInt($scope.ContestSize) > 0) {
                    $scope.totalEntry = $scope.ContestWinningAmount / $scope.ContestSize;
                    $scope.EntryFee = ($scope.totalEntry * $scope.adminPercent / 100 + $scope.totalEntry).toFixed(2);
                } else {
                    $scope.EntryFee = 0;
                }
                $scope.clearForm();
            }
        });

        /*------------calculate Percent and Amount-------------------*/
        $scope.choices = [];
        $scope.amount = 0.00;

        $scope.changePercent = function (x) {
            /*Remove Error First*/
            $scope.calculation_error = false;
            $scope.calculation_error_msg = '';
            /*Remove Error First*/
            if (x != 0 && x > 0) {
                let tempPersnCount1 = ($scope.choices[x].select_2 - $scope.choices[x].select_1) + 1;
                let tempPersnCount0 = ($scope.choices[x - 1].select_2 - $scope.choices[x - 1].select_1) + 1;
                if ((parseFloat(($scope.ContestWinningAmount * $scope.choices[x].percent) / 100) / tempPersnCount1) > (parseFloat($scope.ContestWinningAmount * $scope.choices[x - 1].percent / 100) / tempPersnCount0)) {
                    $scope.choices[x].percent = '';
                    $scope.choices[x].amount = parseFloat(0);
                    return false;
                }
            }
            let total = 0;
            for (var i = 0; i < $scope.choices.length; i++) {
                total = total + parseFloat($scope.choices[i].percent);
            }
            if (total > 100) {
                $scope.choices[x].percent = '';
                $scope.calculation_error = true;
                $scope.calculation_error_msg = 'Sum of percentage can not be more then 100%';
                $scope.choices[x].amount = parseFloat(0);
                return false;
            }

            for (var i = 0; i < $scope.choices.length; i++) {
                if (i == 0) {
                    $scope.WinningPersent = $scope.choices[i].percent;
                }
                if (i === x) {
                    let persenCount = 0;
                    if (parseInt($scope.choices[i].select_2) == parseInt($scope.choices[i].select_1)) {
                        persenCount = 1;
                    } else {
                        persenCount = ($scope.choices[i].select_2 - $scope.choices[i].select_1) + 1;
                    }
                    $scope.winnersAmount = $scope.ContestWinningAmount * $scope.choices[i].percent / 100;
                    let amount = ($scope.winnersAmount / persenCount).toFixed(2);
                    let fractionNumber = amount.split('.');
                    amount = fractionNumber[0] + '.' + fractionNumber[1].slice(0, 1);
                    $scope.choices[i].amount = amount;
                    $scope.choices[i].percent = $scope.choices[i].percent.toString();
                    if ($scope.choices[i].percent.match(/^0[0-9].*$/)) {
                        $scope.ContestWinningAmount = $scope.ContestWinningAmount.replace(/^0+/, '');
                    }
                    $scope.choices[i].percent = $scope.choices[i].percent.replace(/^0+/, '');
                }
            }
        }
        $scope.customizeMultieams = function () {
            $scope.calculation_error = false;
            $scope.calculation_error_msg = '';
            if ($scope.ContestSize == null || $scope.ContestSize < 3) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Contest size must be greater then 2!";
                $scope.EntryType = 'Single';
                return false;
            }
        }
        $scope.customizeWin = function () {
            $scope.calculation_error = false;
            $scope.calculation_error_msg = '';
            if ($scope.winnings == "") {
                $scope.showField = false;
                $scope.NoOfWinners = '';
                return false;
            }
            if ($scope.ContestWinningAmount == null || $scope.ContestWinningAmount < 1) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Please enter total winning amount!";
                $scope.winnings = false;
                return false;
            }
            if ($scope.ContestSize == null || $scope.ContestSize < 2) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Contest size must be greater or equals to 2";
                $scope.winnings = false;
                return false;
            }
        }
        $scope.changeWinAmount = function () {
            $scope.calculation_error = false;
            $scope.calculation_error_msg = '';
            if ($scope.ContestWinningAmount == null || $scope.ContestWinningAmount < 1) {
                $scope.winnings = false;
            }
        }
        $scope.changeWinners = function () {
            $scope.EntryType = 'Single';
            $scope.calculation_error = false;
            $scope.calculation_error_msg = '';
            if ($scope.ContestSize == null || $scope.ContestSize < 2) {
                $scope.winnings = false;
            }
            $scope.showField = false;
            $scope.contestError = false;
            $scope.clearForm();
        }
        /*---------------add and remove Field-------------------*/
        $scope.select_1 = 1;
        var x = 0;
        $scope.choices.push({
            row: x,
            select_1: 1,
            select_2: 1,
            amount: 0.00,
            percent: 0
        });
        $scope.addField = function () {
            x = x + 1;
            $scope.numbers1 = [];

            var select2_value = "";
            $scope.percent_error = false;
            var lastIndex = $scope.choices.length - 1;
            if ($scope.choices[lastIndex].percent == 0) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Last percentage is blank!";
                return false;
            }
            if ($scope.totalPercentage == 100) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Amount has been distributed already!";
                return false;
            }
            for (var k = 0; $scope.choices.length > k; k++) {

                if (k == $scope.choices.length - 1) {
                    if ($scope.choices[k].percent) {
                        select2_value = ($scope.choices[k].select_2 + 1);
                        for (var j = ($scope.choices[k].select_2 + 1); j <= parseInt($scope.NoOfWinners); j++) {
                            $scope.numbers1.push(j)
                        }
                    } else {
                        $scope.percent_error = true;
                        return false;
                    }
                }
            }
            if (select2_value <= parseInt($scope.NoOfWinners)) {
                $scope.choices.push({
                    row: x,
                    select_1: select2_value,
                    select_2: select2_value,
                    numbers: $scope.numbers1,
                    percent: 0,
                    amount: 0.00
                });
            } else {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "All Winners has been selected already!";
            }

        }
        $scope.$watch('choices', function (n, o, scope) {
            var totalPercentagetemp = 0;
            var isRemoval = false;
            var removalIndex = 0;
            /*Code to track Changes in top rows and if any remove below rows*/
            if ($scope.choices.length > 1) {
                for (var counter = 0; counter < $scope.choices.length; counter++) {
                    if (counter < o.length - 1 && (o[counter].amount != n[counter].amount || o[counter].select_2 != o[counter].select_2)) {
                        isRemoval = true;
                        removalIndex = counter + 1;
                    }
                }
            }
            if (isRemoval == true) {
                var numberOfRows = $scope.choices.length;
                if (removalIndex <= numberOfRows - 1) {
                    var removeElementCount = numberOfRows - removalIndex;
                    $scope.choices.splice(removalIndex, removeElementCount);
                }

            }
            /*Code to track Changes in top rows and if any remove below rows*/

            /*Total Percentage Count and Handler*/
            for (var counter = 0; counter < $scope.choices.length; counter++) {
                totalPercentagetemp += parseFloat($scope.choices[counter].percent);
            }
            if (totalPercentagetemp > 100) {
                $scope.choices = 0;
                return false;
            }
            $scope.totalPercentage = totalPercentagetemp;
            /*Total Percentage count and handler*/

            /*Total Person count and Handler*/
            let personCount = 0;
            for (var i = 0; i < $scope.choices.length; i++) {
                if ($scope.choices[i].select_1 == $scope.choices[i].select_2) {
                    personCount++;
                } else {
                    personCount += parseInt(($scope.choices[i].select_2 - $scope.choices[i].select_1) + 1);
                }
            }
            $scope.totalPersonCount = personCount;
            /*Total Person Count and Handler*/
        }, true);

        /*Handle Contest Size*/
        $scope.$watch('NoOfWinners', function (newValue, oldValue) {
            if (newValue == 0) {
                $scope.NoOfWinners = 1;
            } else if (parseInt(newValue) > parseInt($scope.ContestSize)) {
                $scope.NoOfWinners = oldValue;
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "No. of Winners cann\'t be more than Contest size!";
                return false;
            }
        });

        /*Handle Contest Size*/
        $scope.$watch('ContestFormat', function (newValue, oldValue) {
            if (newValue == 'Head to Head' || oldValue == 'Head to Head') {
                $scope.ContestSize = '2';
            }
        });



        $rootScope.removeField = function (index) {
            if (index == 0) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "You can not remove first row.";
                return false;
            }
            if (index < $scope.choices.length - 1) {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "While having row beneath you can not delete current row.";
                return false;
            }
            if (index >= 0) {
                $scope.choices.splice(index, 1);
                $scope.calculation_error = false;
                $scope.calculation_error_msg = '';
            }
        }



        /*------------ show  and hide form-------------------*/
        $scope.showField = false;
        $scope.numbers = [];
        $rootScope.Showform = function () {

            if ($scope.NoOfWinners == '' || $scope.NoOfWinners == '0') {
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Please enter proper winner count!";
                return false;
            }

            if ($scope.NoOfWinners && $scope.ContestSize) {
                if ($scope.numbers == '') {
                    for (var i = 1; i <= parseInt($scope.NoOfWinners); i++) {
                        $scope.numbers.push(i);
                    }
                } else {
                    for (var i = 1; i <= parseInt($scope.NoOfWinners); i++) {
                        $scope.numbers.push(i)
                        $scope.numbers.splice(i);
                    }
                }
                $scope.choices[0].numbers = $scope.numbers;
                if (parseInt($scope.ContestSize) >= parseInt($scope.NoOfWinners)) {
                    $scope.error = false;
                    $scope.showField = true;
                } else {
                    $scope.error = true;
                    $scope.showField = false;
                    return false;
                }
            } else {
                $scope.error = true;
                $scope.showField = false;
                $scope.calculation_error = true;
                $scope.calculation_error_msg = "Please enter proper winner count!";
                return false;
            }
        }
        /*create contest calculations ends*/

        $scope.contestPrizeParser = function ($choices) {
            let response = [];
            let valueArray = [];
            for (var $i = 0; $i < $scope.choices.length; $i++) {
                valueArray.push({
                    'From': $scope.choices[$i].select_1,
                    'To': $scope.choices[$i].select_2,
                    'Percent': $scope.choices[$i].percent,
                    'WinningAmount': $scope.choices[$i].amount
                });
            }
            response = valueArray;
            return response;
        }

        $scope.GameTimeLive = 0;
        $scope.getTime = function (selectID) {
            //$scope.GameTimeLive = 0;
            if (selectID == "Safe") {
                $scope.GameTimeLive = 2;
            } else if (selectID == "Advance") {
                $scope.GameTimeLive = 40;
            } else {
                $scope.GameTimeLive = 0;
            }
        }
        /*
         Description : To create private Contest
         */
        $scope.createContestField = {};
        $scope.submitted = false;
        $scope.CreateContest = function (form) {
            $scope.helpers = Mobiweb.helpers;
            $scope.submitted = true;
            if (!form.$valid) {
                return false;
            }

            var $data = {};

            $scope.createContestField.SessionKey = $localStorage.user_details.SessionKey;
            $scope.createContestField.SeriesGUID = $scope.MatchesDetail.SeriesGUID;
            $scope.createContestField.MatchGUID = $localStorage.MatchGUID;
            $scope.createContestField.Privacy = 'Yes';
            $scope.createContestField.IsPaid = ($scope.EntryFee == 0) ? 'No' : 'Yes';
            $scope.createContestField.ContestFormat = $scope.ContestFormat;
            $scope.createContestField.ContestName = $scope.ContestName;
            $scope.createContestField.ContestType = 'Normal';
            $scope.createContestField.WinningAmount = $scope.ContestWinningAmount;
            $scope.createContestField.EntryFee = $scope.EntryFee;
            $scope.createContestField.NoOfWinners = $scope.NoOfWinners;
            $scope.createContestField.ShowJoinedContest = 'Yes';
            $scope.createContestField.AdminPercent = $scope.adminPercent;
            $scope.createContestField.GameTimeLive = 0;
            $scope.createContestField.CashBonusContribution = 0;
            $scope.createContestField.EntryType = $scope.EntryType;
            $scope.createContestField.percent = $scope.WinningPersent;
            $scope.createContestField.IsPrivacyNameDisplay = $rootScope.profileDetails.IsPrivacyNameDisplay;
            if ($scope.ContestFormat == 'Head to Head') {
                $scope.createContestField.ContestSize = 2;
            } else {
                $scope.createContestField.ContestSize = $scope.ContestSize;
            }
            if ($scope.winnings) {
                $scope.createContestField.CustomizeWinning = JSON.stringify($scope.contestPrizeParser($scope.choices));
            }
            $data = $scope.createContestField;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/add', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            var Contests = data.Data;
                            $scope.CreateContestForm = {};
                            $scope.closePopup('create_contest');
                            $scope.submitted = false;
                            $scope.successMessageShow(data.Message);
                            $scope.UserInvitationCode = Contests.ContestGUID.UserInvitationCode;
                            $scope.SelectTeamToJoinContest(Contests.ContestGUID);
                            // $scope.getContests();
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

        }


    }
}]);

app.directive('slickCustomCarousel', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: {
            post: function (scope, elem, attr) {
                $timeout(function () {
                    $('.slider').slick({
                        dots: true,
                        infinite: false,
                        speed: 300,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });

                }, 1);

            }
        }
    }
}]);

