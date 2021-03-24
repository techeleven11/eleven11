'use strict';

app.controller('draftLeagueCenterController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', '$filter', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, $filter) {
    $scope.env = environment;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.isLoggedIn = $localStorage.isLoggedIn;
        $scope.base_url = base_url;
        $scope.PageNo = 1;
        $scope.PageSize = 15;
        $scope.activeTab = 'upcoming';
        $scope.Status = 'Pending';
        $scope.activeMenuTab = function (tab) {
            $scope.activeTab = tab;
            if ($scope.activeTab == 'upcoming') {
                $scope.Status = 'Pending';
            } else if ($scope.activeTab == 'running') {
                $scope.Status = 'Running';
            } else {
                $scope.Status = 'Completed';
            }
            $scope.LeagueCenter(true);
        }

        /*function to get joined match Status*/
        $scope.MatchList = [];
        $scope.Statics = [];
        $scope.NextData = true;
        $scope.LeagueCenter = function (ResetStatus) {
            if (ResetStatus) {
                $scope.PageNo = 1;
                $scope.MatchTotalCount = 0;
                $scope.MatchList = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
                $scope.Statics = [];
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) { return false; }
            if ($scope.NextData) {
                $scope.NextData = false;

                var $data = {};
                $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
                $data.Params = 'SeriesName,StatusID,MatchStartDateTime,Status,isJoinedContest,TotalUserWinning,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor';
                $data.PageNo = $scope.PageNo;
                $data.PageSize = $scope.PageSize;
                $data.Status = $scope.Status;
                $data.OrderBy = 'MatchStartDateTime';
                $data.Sequence = 'DESC';
                $data.MyJoinedContest = 'Yes';
                $data.Privacy = "All";
                $data.Filter = 'MyJoinedMatch';
                appDB
                    .callPostForm('SnakeDrafts/getMatches', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.Statics = data.Data.Statics;
                                if (data.Data.hasOwnProperty('Records') && data.Data.TotalRecords > 0) {
                                    $scope.MatchTotalCount = data.Data.TotalRecords;
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        // var date = data.Data.Records[i].MatchStartDateTime;
                                        // data.Data.Records[i].MatchStartDateTimeUTC = $filter('convertIntoUserTimeZone')(date);
                                        $scope.MatchList.push(data.Data.Records[i]);
                                    }
                                    $scope.PageNo++;
                                } else {
                                    $scope.LoadMoreFlag = false;
                                }
                            } else {
                                $scope.data.noRecords = true;
                            }
                        },
                        function errorCallback(data) {
                            $scope.NextData = true;
                            $scope.checkResponseCode(data);
                        });
            }
        }

        /*To get User joined contest */

        $scope.MatchGUID = getQueryStringValue('MatchGUID');
        $scope.NextData = true;
        $scope.JoinedContest = function (status) {
            if (status) {
                $scope.PageNo = 1;
                $scope.data.dataList = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) {
                return false
            }
            if ($scope.NextData) {
                $scope.NextData = false;
                var $data = {};
                $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
                $data.MatchGUID = $scope.MatchGUID;
                $data.Params = 'MatchGUID,IsConfirm,SeriesName,SeriesGUID,UserInvitationCode,ContestID,LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution';
                $data.PageNo = $scope.PageNo;
                $data.PageSize = $scope.PageSize;
                $data.Keyword = $scope.Keyword;
                $data.JoinedContestStatusID = 'Yes';
                $data.ContestCompleteCancelled = 'Yes';
                $data.MyJoinedContest = 'Yes';
                $data.Privacy = 'All';
                $data.LeagueType = 'Draft';
                $data.IsSeriesStarted = 'Yes';
                $data.TotalJoinedByRound = "Yes";
                appDB
                    .callPostForm('SnakeDrafts/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.UserJoinedContestTotalCount = data.Data.TotalRecords;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined) * 100 / parseInt(data.Data.Records[i].ContestSize);
                                        $scope.data.dataList.push(data.Data.Records[i]);
                                    }
                                    $scope.PageNo++;
                                } else {
                                    $scope.LoadMoreFlag = false;
                                }
                            } else {
                                $scope.data.noRecords = true;
                            }
                        },
                        function errorCallback(data) {
                            $scope.NextData = true;
                            $scope.checkResponseCode(data);
                        });
            }
        }

        $scope.showWinningPayout = function (Winnings) {
            $scope.CustomizeWinning = Winnings;
            $scope.openPopup('PayoutBreakUp');
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