'use strict';
app.controller('snakeLeagueController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', 'Upload', '$window', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, Upload, $window) {
    $scope.env = environment;

    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        if (!localStorage.hasOwnProperty('Snakeleague_back_url')) {
            localStorage.setItem('Snakeleague_back_url', document.referrer);
        }
        $scope.user_details = $localStorage.user_details;
        $scope.MatchGUID = getQueryStringValue('MatchGUID'); 
        $scope.ContestGUID = getQueryStringValue('League'); //Contest GUID
        $scope.SelectedUserGUID = $scope.user_details.UserGUID;
        $scope.EmptyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17];
        /*Funcion to get joined user teams*/
        $scope.userTeams = [];
        $scope.getUserTeam = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; 
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'UserTeamName,TotalPoints,UserWinningAmount,FirstName,Username,UserGUID,UserTeamPlayers,UserTeamID,UserRank';
            $data.OrderBy = 'UserRank';
            $data.Sequence = 'ASC';
            appDB
                .callPostForm('SnakeDrafts/getJoinedContestsUsers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.data.totalRecords = data.Data.TotalRecords;
                            if (data.Data.hasOwnProperty('Records')) {
                                for (var i in data.Data.Records) {
                                    data.Data.Records[i].TotalPoints = parseFloat(data.Data.Records[i].TotalPoints);
                                    data.Data.Records[i].UserWinningAmount = parseFloat(data.Data.Records[i].UserWinningAmount);
                                    $scope.userTeams.push(data.Data.Records[i]);
                                }
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        /*function to get contests according to matches*/
        $scope.Contest = [];
        $scope.getContest = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'MatchType,SeriesID,AuctionStatus,SeriesName,LeagueJoinDateTime,GameType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,TeamNameLocal,TeamNameVisitor,IsConfirm,CashBonusContribution,GameTimeLive'
            // $data.MatchType = "Yes";
            appDB
                .callPostForm('SnakeDrafts/getContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.Contest = data.Data;
                            $scope.Contest.MatchType = angular.lowercase($scope.Contest.MatchType);
                            $scope.getUserTeam();
                            $scope.pointSystem();
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        $scope.pointSystem = function () {
            $scope.points = [];
            var $data = {};
            $data.StatusID = 1;
            appDB
                .callPostForm('sports/getPoints', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.points = data.Data.Records;
                            for (var i = 0; i < $scope.points.length; i++) {
                                $scope.points[i].Sort = parseInt($scope.points[i].Sort);
                            }
                            $scope.pointsArray = [];
                            if ($scope.Contest.MatchType == 't20') {
                                angular.forEach($scope.points, function (value, key) {
                                    $scope.pointsArray.push({
                                        'PointsTypeGUID': value.PointsTypeGUID,
                                        'PointsTypeDescprition': value.PointsTypeDescprition,
                                        'Points': parseFloat(value.PointsT20),
                                        'PointsType': value.PointsType,
                                        'PointsInningType': value.PointsInningType,
                                        'Sort': parseInt(value.Sort)
                                    });
                                });
                            }
                            if ($scope.Contest.MatchType == 'odi') {
                                angular.forEach($scope.points, function (value, key) {
                                    $scope.pointsArray.push({
                                        'PointsTypeGUID': value.PointsTypeGUID,
                                        'PointsTypeDescprition': value.PointsTypeDescprition,
                                        'Points': parseFloat(value.PointsODI),
                                        'PointsType': value.PointsType,
                                        'PointsInningType': value.PointsInningType,
                                        'Sort': parseInt(value.Sort)
                                    });
                                });
                            }
                            if ($scope.Contest.MatchType == 'test') {
                                angular.forEach($scope.points, function (value, key) {
                                    $scope.pointsArray.push({
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
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        $scope.fantasyScoreCard = function (PlayerGUID) {
            $scope.fantasyScores = [];
            var $data = {};
            $data.MatchGUID = $scope.MatchGUID;
            $data.PlayerGUID = PlayerGUID;
            $data.SeriesID = $scope.Contest.SeriesID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.Params = 'TeamName,TeamFlagLocal,TeamFlagVisitor,MatchLocation,PlayerBattingStyle,PlayerBowlingStyle,PlayerID,PlayerRole,PlayerPic,PlayerCountry,MatchType,MatchNo,MatchDateTime,SeriesName,TeamGUID,PointsData,TotalPoints';
            appDB
                .callPostForm('sports/getPlayers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.fantasyScores = data.Data.Records;
                            $scope.openPopup('fantasyScorePopup');
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        $scope.Back = function () {
            window.location.href = localStorage.getItem('Snakeleague_back_url');
            localStorage.removeItem('Snakeleague_back_url');
        }

        $scope.showWinningPayout = function (Winnings) {
            $scope.CustomizeWinning = Winnings;
            $scope.openPopup('PayoutBreakUp');
        }

        $scope.showPlaying11 = function (Players, PlayerGUID) {
            $scope.SelectedUserGUID = PlayerGUID;
            $scope.Playing11 = Players;
            $scope.openPopup('showPlayerList');
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