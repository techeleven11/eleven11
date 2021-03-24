'use strict';
app.controller('leagueController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', 'Upload', '$timeout', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, Upload, $timeout) {
    $scope.env = environment;
    $scope.GamesType = $localStorage.GamesType;
    /*
     Description : To get user team details on ground
     */

    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        if (!localStorage.hasOwnProperty('league_back_url')) {
            localStorage.setItem('league_back_url', document.referrer);
        }
        $rootScope.pageSize = 15;
        $rootScope.pageNo = 1;
        $scope.user_details = $localStorage.user_details;
        $scope.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
        $scope.ContestGUID = getQueryStringValue('League'); //Contest GUID
        $scope.SelectedUserGUID = $scope.user_details.UserGUID;
        /*
         Description : To get user created team list
         */
        $rootScope.userTeamList = [];
        $scope.UsersTeamList = function () {
            var $data = {};

            $rootScope.userTeamList = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
            $data.Params = 'UserTeamName';
            $data.Keyword = $scope.Keyword;
            $data.UserTeamType = 'Normal';
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            if (data.Data.hasOwnProperty('Records')) {
                                for (var i in data.Data.Records) {
                                    $scope.data.dataList.push(data.Data.Records[i]);
                                    if ($rootScope.UserContestTeams.includes(data.Data.Records[i].UserTeamGUID)) {
                                        data.Data.Records[i].checked = true;
                                    } else {
                                        data.Data.Records[i].checked = false;
                                    }
                                    $rootScope.userTeamList.push(data.Data.Records[i]);
                                }
                            } else {
                                $rootScope.userTeamList = [];
                            }
                            $scope.UserTeamsTotalCount = data.Data.TotalRecords;
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

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
            $data.ContestGUID = getQueryStringValue('League');
            $data.MatchGUID = getQueryStringValue('MatchGUID');
            $data.SessionKey = $localStorage.user_details.SessionKey;

            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/join', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {

                            $scope.successMessageShow(data.Message);
                            setTimeout(function () {
                                window.location.href = "league?MatchGUID=" + getQueryStringValue('MatchGUID') + "&League=" + getQueryStringValue('League');
                            }, 200);
                        } else {
                            $scope.data.noRecords = true;
                        }

                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        $scope.viewJoinButton = false;
        if (getQueryStringValue('Source') && getQueryStringValue('Source') == 'ViewLeague') {
            $scope.viewJoinButton = true;
        } else {
            $scope.viewJoinButton = false;
        }

        $scope.ViewTeamOnGround = function (UserTeamGUID, UserGUID) {
            $scope.SelectedUserGUID = UserGUID;
            $scope.SelectedUserTeamGUID = UserTeamGUID;
            $scope.teamStructure = {};
            var $data = {};
            $data.UserGUID = UserGUID;
            $scope.TeamPlayers = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.UserTeamGUID = UserTeamGUID; //User Team GUID
            $data.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
            $data.UserTeamType = 'Normal';
            $data.Params = "PlayerGUID,PlayerName,PlayerCountry,PlayerPosition,PlayerRole,UserTeamPlayers,UserRank,UserGUID";
            $data.ContestGUID = getQueryStringValue('League');
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        if (data.ResponseCode == 200) {
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
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['WicketKeeper'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Batsman') {
                                        $scope.teamStructure['Batsman'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Batsman'].occupied++;
                                    }
                                    if (value.PlayerRole == 'AllRounder') {
                                        $scope.teamStructure['AllRounder'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['AllRounder'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Bowler') {
                                        $scope.teamStructure['Bowler'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
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
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Goalkeeper'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Defender') {
                                        $scope.teamStructure['Defender'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Defender'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Midfielder') {
                                        $scope.teamStructure['Midfielder'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Midfielder'].occupied++;
                                    }
                                    if (value.PlayerRole == 'Striker') {
                                        $scope.teamStructure['Striker'].player.push({
                                            'PlayerGUID': value.PlayerGUID,
                                            'PlayerPosition': value.PlayerPosition,
                                            'PlayerName': value.PlayerName,
                                            'Points': value.PointCredits,
                                            //                                                    'Points': ($scope.Contest.Status == 'Pending') ? parseFloat(value.PlayerSalaryCredit) : parseFloat(value.Points),
                                            'PlayerPic': value.PlayerPic,
                                            'SelectedPlayerTeam': (value.TeamGUID == $scope.Contest.TeamGUIDLocal) ? 'A' : 'B'
                                        });
                                        $scope.teamStructure['Striker'].occupied++;
                                    }
                                });
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                        if (data.ResponseCode == 500) {
                            var toast = toastr.warning(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                            $scope.data.noRecords = true;
                        }
                        if (data.ResponseCode == 501) {
                            var toast = toastr.warning(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                            $scope.data.noRecords = true;
                        }
                        if (data.ResponseCode == 502) {
                            var toast = toastr.warning(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                            setTimeout(function () {
                                localStorage.clear();
                                window.location.reload();
                            }, 1000);
                        }
                    },
                    function errorCallback(data) {
                        if (typeof data == 'object') {
                            var toast = toastr.error(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                            $scope.data.noRecords = true;
                        }
                    });
        }

        /*Funcion to get joined user teams*/
        $scope.userTeams = [];
        $scope.TeamPageNo = 1;
        $scope.TeamPageSize = 50;
        $rootScope.UserContestTeams = [];
        $scope.getUserTeam = function (status) {
            if (status) {
                $scope.TeamPageNo = 1;
                $scope.Contests = [];
                $rootScope.UserContestTeams = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true) {
                return false
            }
            var $data = {};
            $scope.TeamPlayers = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
            $data.ContestGUID = getQueryStringValue('League'); //Contest GUID
            $data.Params = 'SmartPoolWinning,SmartPool,UserTeamName,TotalPoints,UserWinningAmount,FirstName,Username,UserGUID,UserTeamPlayers,UserTeamID,UserRank';
            $data.OrderBy = 'UserRank';
            $data.Sequence = 'ASC';
            $data.PageNo = $scope.TeamPageNo;
            $data.PageSize = $scope.TeamPageSize;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getJoinedContestsUsers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            // $scope.userTeams = data.Data.Records; 
                            $scope.data.totalRecords = data.Data.TotalRecords;
                            if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                $scope.LoadMoreFlag = true;
                                for (var i in data.Data.Records) {
                                    data.Data.Records[i].TotalPoints = parseFloat(data.Data.Records[i].TotalPoints);
                                    data.Data.Records[i].UserWinningAmount = parseFloat(data.Data.Records[i].UserWinningAmount);
                                    $scope.userTeams.push(data.Data.Records[i]);
                                    if (data.Data.Records[i].UserGUID == $scope.user_details.UserGUID) {
                                        $rootScope.UserContestTeams.push(data.Data.Records[i].UserTeamGUID);
                                    }
                                }
                                if ($scope.TeamPageNo == 1) {
                                    angular.forEach($scope.userTeams, function (value, key) {
                                        if ($scope.Contest.Status == 'Completed' && value.UserRank == 1) {
                                            $scope.ViewTeamOnGround(value.UserTeamGUID, value.UserGUID);
                                        } else if (value.UserGUID == $localStorage.user_details.UserGUID && $scope.Contest.Status != 'Completed') {
                                            $scope.ViewTeamOnGround(value.UserTeamGUID, $localStorage.user_details.UserGUID);
                                        }
                                    });
                                }
                                $scope.TeamPageNo++;
                            } else {
                                $scope.LoadMoreFlag = false;
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }



        /*function to get contests according to matches*/
        $scope.Contest = [];
        $rootScope.Contest = [];
        $scope.getContests = function () {
            var $data = {};
            $data.MatchGUID = getQueryStringValue('MatchGUID'); // Selected MatchGUID
            $data.ContestGUID = getQueryStringValue('League'); // Selected ContestGUID
            $data.SessionKey = $localStorage.user_details.SessionKey; // User SessionKey
            $data.SessionKey = $localStorage.user_details.SessionKey; // User SessionKey
            $data.Params = 'WinningType,UnfilledWinningPercent,SmartPool,MatchStartDateTimeUTC,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,MatchScoreDetails,ShowJoinedContest,TeamGUIDVisitor,TeamGUIDLocal';
            $data.Keyword = $scope.Keyword;

            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.Contest = data.Data;
                            $rootScope.Contest = data.Data;

                            if ($scope.Contest.CustomizeWinning.length == 0) {
                                $scope.Contest.CustomizeWinning.push({
                                    'From': 1,
                                    'To': $scope.Contest.NoOfWinners,
                                    'WinningAmount': $scope.Contest.WinningAmount,
                                    'percent': 100
                                });
                            }
                            $scope.getUserTeam(true);

                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        $scope.pointSystem = function () {
            $scope.points = [];
            var $data = {};
            if ($scope.GamesType == 'Cricket') {
                $data.StatusID = 1;
            }
            appDB
                .callPostForm($rootScope.apiPrefix + 'sports/getPoints', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            if ($scope.GamesType == 'Cricket') {
                                $scope.points = data.Data.Records;

                                for (var i = 0; i < $scope.points.length; i++) {
                                    $scope.points[i].Sort = parseInt($scope.points[i].Sort);
                                }
                                $rootScope.pointsArray = [];
                                if ($scope.Contest.MatchType.includes('T20')) {
                                    angular.forEach($scope.points, function (value, key) {
                                        $rootScope.pointsArray.push({
                                            'PointsTypeGUID': value.PointsTypeGUID,
                                            'PointsTypeDescprition': value.PointsTypeDescprition,
                                            'Points': parseFloat(value.PointsT20),
                                            'PointsType': value.PointsType,
                                            'PointsInningType': value.PointsInningType,
                                            'Sort': parseInt(value.Sort)
                                        });
                                    });
                                }
                                if ($scope.Contest.MatchType.includes('ODI')) {
                                    angular.forEach($scope.points, function (value, key) {
                                        $rootScope.pointsArray.push({
                                            'PointsTypeGUID': value.PointsTypeGUID,
                                            'PointsTypeDescprition': value.PointsTypeDescprition,
                                            'Points': parseFloat(value.PointsODI),
                                            'PointsType': value.PointsType,
                                            'PointsInningType': value.PointsInningType,
                                            'Sort': parseInt(value.Sort)
                                        });
                                    });
                                }
                                if ($scope.Contest.MatchType.includes('Test')) {
                                    angular.forEach($scope.points, function (value, key) {
                                        $rootScope.pointsArray.push({
                                            'PointsTypeGUID': value.PointsTypeGUID,
                                            'PointsTypeDescprition': value.PointsTypeDescprition,
                                            'Points': parseFloat(value.PointsTEST),
                                            'PointsType': value.PointsType,
                                            'PointsInningType': value.PointsInningType,
                                            'Sort': parseInt(value.Sort)
                                        });
                                    });
                                }
                            }
                            if ($scope.GamesType == 'Football') {
                                $scope.points = data.Data.Records;
                                $rootScope.pointsArray = $scope.points;
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        $scope.fantasyScoreCard = function (PlayerGUID) {
            $rootScope.fantasyScores = [];
            $rootScope.Headers = [];
            $rootScope.FootballHeaders = false;
            var $data = {};
            $data.MatchGUID = getQueryStringValue('MatchGUID');
            $data.SessionKey = $localStorage.user_details.SessionKey;
            if (PlayerGUID !== '') {
                $data.PlayerGUID = PlayerGUID
            } else {
                $data.IsPlaying = 'Yes';
            }
            $data.Params = 'PlayerID,PlayerRole,PlayerPic,PlayerCountry,PlayerBornPlace,PlayerBattingStyle,PlayerBowlingStyle,MatchType,MatchNo,MatchDateTime,SeriesName,TeamGUID,PlayerBattingStats,PlayerBowlingStats,IsPlaying,PointsData,TotalPoints';
            appDB
                .callPostForm($rootScope.apiPrefix + 'sports/getPlayers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $rootScope.fantasyScores = data.Data;
                            if ($scope.GamesType == 'Football' && $rootScope.fantasyScores.Records.length > 0) {
                                var PointsData = $scope.getPointDataArray();
                                if(PointsData.length > 0){
                                    $rootScope.FootballHeaders = true;
                                    PointsData.forEach(e => {
                                        let index = $rootScope.FootballPointHeader.map(e1 => {
                                            return e1.PointsTypeGUID;
                                        }).indexOf(e.PointsTypeShortDescription);
                                        if (index != -1) {
                                            $rootScope.Headers.push($scope.FootballPointHeader[index]);
                                        }
                                    })
                                }
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }


        setInterval(function () {
            if ($rootScope.Contest.Status == 'Running') {
                window.location.reload();
            }
        }, 120000);

        $scope.switchTeamPopup = function () {
            $scope.UsersTeamList();
            $scope.openPopup('switchTeamModal');
        }
        $rootScope.switchTeamsButton = false;
        $rootScope.selectSwitchTeam = function (UserTeamGUID) {
            var total_switch_teams = $rootScope.UserContestTeams.length;
            var count = 0;
            for (var i in $rootScope.userTeamList) {
                if ($rootScope.userTeamList[i].checked) {
                    count++;
                }
            }
            if (total_switch_teams == count) {
                $rootScope.switchTeamsButton = false;
            } else if (total_switch_teams < count) {
                for (var i in $rootScope.userTeamList) {
                    if ($rootScope.userTeamList[i].UserTeamGUID == UserTeamGUID) {
                        $rootScope.userTeamList[i].checked = false;
                    }
                }
                $rootScope.switchTeamsButton = false;
                var toast = toastr.warning('You can only select ' + total_switch_teams + ' team for switch.', {
                    closeButton: true
                });
                toastr.refreshTimer(toast, 5000);
            } else {
                $rootScope.switchTeamsButton = true;
            }
        }

        $rootScope.switchTeam = function () {
            var $data = {};
            var changedTeamGUID = [];
            for (var i in $rootScope.userTeamList) {
                if ($rootScope.userTeamList[i].checked) {
                    changedTeamGUID.push($rootScope.userTeamList[i].UserTeamGUID);
                }
            }
            $data.UserTeamGUID = JSON.stringify(changedTeamGUID);
            $data.OldUserTeamGUID = JSON.stringify($rootScope.UserContestTeams);
            $data.ContestGUID = $scope.ContestGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/switchUserTeam', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('switchTeamModal');
                            window.location.reload();
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        $scope.getTeamName = function (str) {
            return str.substr(6, 1);
        }

        /**
         * Sort by Leaderboard 
         */
        $scope.propertyName = '';
        $scope.reverse = false;
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.Back = function () {
            window.location.href = localStorage.getItem('league_back_url');
            localStorage.removeItem('league_back_url');
        }

        $scope.showWinningPayout = function (ContestInfo) {
            $scope.SmartPool = ContestInfo.SmartPool;
            $scope.CustomizeWinning = ContestInfo.CustomizeWinning;
            $scope.IsVirtualContest = ContestInfo.WinningType == 'Free Join Contest'?'Yes':'No';
            $scope.openPopup('PayoutBreakUp');
        }

        /**
         * Show player fanstay point
         */
        $rootScope.FootballPointHeader = [
            { "PointsTypeGUID": "SB", 'Name': 'SB', 'Desc': 'Starting Bonus' },
            { "PointsTypeGUID": "PlayedTime", 'Name': 'PT', 'Desc': 'Played Time' },
            { "PointsTypeGUID": "RC", 'Name': 'RC', 'Desc': 'Red Card' },
            { "PointsTypeGUID": "YC",'Name':'YC','Desc': 'Yellow Card' },
            { "PointsTypeGUID": "CleanSheet", 'Name': 'CT', 'Desc': 'Clean Sheet' },
            { "PointsTypeGUID": "Every2ShotsOnGoal", "Name": "E2SG", "Desc": 'Every 2 Shots On Goal' },
            { "PointsTypeGUID": "EveryGoal", 'Name': 'EG', 'Desc': 'Every Goal' },
            { "PointsTypeGUID": "EveryGoalAssist", 'Name': 'EGA', 'Desc': 'Every Goal Assists' },
            { "PointsTypeGUID": "GoalsConceded", 'Name': 'GC', 'Desc': 'Goals Conceded' },
            { "PointsTypeGUID": "OwnGoal", 'Name': 'OG', 'Desc': 'Own Goal' },
            { "PointsTypeGUID": "PenaltyMissed", 'Name': 'PM', 'Desc': 'Penalty Missed' },
            { "PointsTypeGUID": "ShotSaved", 'Name': 'SS', 'Desc': 'Shot Saved' },
            { "PointsTypeGUID": "TacklesMade", 'Name': 'TM', 'Desc': 'Tackles Made' },
            { "PointsTypeGUID": "EveryPassesCompleted10", 'Name': 'EPC10', 'Desc': 'Every Passed Completed 10' },
            { "PointsTypeGUID": "EveryPenaltySavedGK", 'Name': 'EPSG', 'Desc': 'Every Penalty Saved GK' }
        ];
        $scope.showPlayerFanstayPoint = function (PlayerGUID) {
            $scope.fantasyScoreCard(PlayerGUID);
            $scope.pointSystem();
            $scope.openPopup('fantasyScorePopup');
            $timeout(function () {
                $('[data-toggle="tooltip"]').tooltip();
            }, 2000);
        }
        /**
         * get point data array
         */
        $scope.getPointDataArray = function(index=0){
            var data = $rootScope.fantasyScores.Records[index].PointsData;
            if(data.length > 0){
                return data;
            }else if($rootScope.fantasyScores.Records.length > 1){
                return $scope.getPointDataArray(index+1);
            }else{
                return false;
            }
        }
    } else {
        window.location.href = base_url;
    }
}]);