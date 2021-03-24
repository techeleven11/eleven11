'use strict';
app.controller('auctionLeagueController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', 'Upload', '$window', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, Upload, $window) {
    $scope.env = environment;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        if (!localStorage.hasOwnProperty('Auctionleague_back_url')) {
            localStorage.setItem('Auctionleague_back_url', document.referrer);
        }
        $rootScope.pageSize = 10;
        $rootScope.pageNo = 1;
        $scope.user_details = $localStorage.user_details;
        $scope.RoundID = getQueryStringValue('RoundID');
        $scope.ContestGUID = getQueryStringValue('League'); //Contest GUID
        $scope.SelectedUserGUID = $scope.user_details.UserGUID;
        $scope.EmptyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

        /*Funcion to get joined user teams*/
        $scope.userTeams = [];
        $scope.TeamPageNo = 1;
        $scope.TeamPageSize = 15;
        $rootScope.UserContestTeams = [];
        $scope.getUserTeam = function () {
            var $data = {};
            $scope.TeamPlayers = []; //user team list array
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.RoundID = $scope.RoundID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'UserTeamName,TotalPoints,UserWinningAmount,FirstName,Username,UserGUID,UserTeamPlayers,UserTeamID,UserRank';
            $data.OrderBy = 'UserRank';
            $data.Sequence = 'ASC';
            $data.PageNo = $scope.TeamPageNo;
            $data.PageSize = $scope.TeamPageSize;
            appDB
                .callPostForm('auctionDrafts/getJoinedContestsUsers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.data.totalRecords = data.Data.TotalRecords;
                            if (data.Data.hasOwnProperty('Records')) {
                                for (var i in data.Data.Records) {
                                    data.Data.Records[i].TotalPoints = parseFloat(data.Data.Records[i].TotalPoints);
                                    data.Data.Records[i].UserWinningAmount = parseFloat(data.Data.Records[i].UserWinningAmount);
                                    $scope.userTeams.push(data.Data.Records[i]);
                                    if (data.Data.Records[i].UserGUID == $scope.user_details.UserGUID) {
                                        $rootScope.UserContestTeams.push(data.Data.Records[i].UserTeamGUID);
                                    }
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
            $data.RoundID = $scope.RoundID;
            $data.ContestGUID = $scope.ContestGUID; //Contest GUID
            $data.Params = 'SeriesID,AuctionStatus,SeriesName,LeagueJoinDateTime,GameType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,TeamNameLocal,TeamNameVisitor,IsConfirm,CashBonusContribution,GameTimeLive'
            appDB
                .callPostForm('auctionDrafts/getContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.Contest = data.Data;
                            $scope.getUserTeam();
                            $scope.pointSystem();
                            $scope.getMatchScore();
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
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        $scope.fantasyScoreCard = function (PlayerGUID) {
            $scope.fantasyScores = [];
            var $data = {};
            $data.RoundID = $scope.RoundID;
            $data.SeriesID = $scope.Contest.SeriesID;
            $data.PlayerGUID = PlayerGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.Params = 'TeamName,TeamFlagLocal,TeamFlagVisitor,MatchLocation,PlayerBattingStyle,PlayerBowlingStyle,PlayerID,PlayerRole,PlayerPic,PlayerCountry,MatchType,MatchNo,MatchDateTime,SeriesName,TeamGUID,PointsData,TotalPoints';
            appDB
                .callPostForm('sports/draftPlayersPoint', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.IsRecords = data.status;
                            $scope.fantasyScores = data.Data.Records;
                            $scope.openPopup('fantasyScorePopup');
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        $scope.Back = function () {
            window.location.href = localStorage.getItem('Auctionleague_back_url');
            localStorage.removeItem('Auctionleague_back_url');
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

        $rootScope.numDifferentiation = function (value) {
            var val = Math.abs(value)
            if (val >= 10000000) {
                val = (val / 10000000) + ' Crs';
            } else if (val >= 100000) {
                val = (val / 100000) + ' Lacs';
            } else if (val == 1000000000) {
                val = (val / 10000000) + ' Crs';
            }
            return val;
        }
        /**
         * get live match score in acution draft
         */
        $scope.MatchDetails = [];
        $scope.getMatchScore = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.RoundID = $scope.RoundID;
            $data.Params = 'MatchScoreDetails,MatchTypeByApi,MatchDisplay,ContestAvailable,TeamPlayersAvailable,MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,TeamGUIDVisitor,TeamGUIDLocal'
            appDB
                .callPostForm('sports/getMatchAuction', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.MatchDetails = data.Data;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

    } else {
        window.location.href = base_url;
    }
}]);