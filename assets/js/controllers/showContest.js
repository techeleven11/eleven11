'use strict';
app.controller('showContestController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', 'Upload', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, Upload) {
    $scope.env = environment;
    $scope.GamesType = $localStorage.GamesType;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {

        $scope.pageSize = 15;
        $scope.pageNo = 1;
        $scope.user_details = $localStorage.user_details;
        $scope.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
        $scope.Status = getQueryStringValue('Status');


        /*To get User joined contest */

        $scope.JoinedContest = function (status) {
            if (status) {
                $scope.pageNo = 1;
                $scope.Contests = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true) { return false }
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'WinningType,UnfilledWinningPercent,SmartPool,IsConfirm,ContestType,MatchStartDateTime,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution,UserInvitationCode';
            $data.PageNo = $scope.pageNo;
            $data.PageSize = $scope.pageSize;
            $data.Keyword = $scope.Keyword;
            $data.JoinedContestStatusID = 'Yes';
            $data.ContestCompleteCancelled = 'Yes';
            //                $data.Status = $scope.Status;
            $data.MyJoinedContest = 'Yes';
            //                $data.Privacy = 'No';
            appDB
                .callPostForm($rootScope.apiPrefix + 'contest/getContests', $data)
                .then(
                    function successCallback(data) {
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
                                    data.Data.Records[i].ContestSize = (data.Data.Records[i].ContestSize == 'Unlimited') ? data.Data.Records[i].ContestSize : Number(data.Data.Records[i].ContestSize);
                                    $scope.Contests.push(data.Data.Records[i]);
                                }
                                $scope.pageNo++;
                            } else {
                                $scope.LoadMoreFlag = false;
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

        }
        /**
         * Sort by Entry fee and payouts
         */
        $scope.propertyName = 'EntryFee';
        $scope.reverse = true;
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.showWinningPayout = function (ContestInfo) {
            $scope.SmartPool = ContestInfo.SmartPool;
            $scope.CustomizeWinning = ContestInfo.CustomizeWinning;
            $scope.IsVirtualContest = ContestInfo.WinningType == 'Free Join Contest' ? 'Yes' : 'No';
            $scope.openPopup('PayoutBreakUp');
        }

        /*Function to get mactch details*/
        $scope.MatchDetails = {};
        $scope.matchDetails = function () {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
            $data.MatchGUID = $scope.MatchGUID; //Match GUID
            $data.Params = 'MatchStartDateTimeUTC,MatchScoreDetails,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,TeamGUIDVisitor,TeamGUIDLocal';
            appDB
                .callPostForm($rootScope.apiPrefix + 'sports/getMatch', $data)
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