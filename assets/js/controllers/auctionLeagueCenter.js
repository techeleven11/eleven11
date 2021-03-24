'use strict';

app.controller('auctionLeagueCenterController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', '$filter', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, $filter) {
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
        $scope.Series = [];
        $scope.Statics = [];
        $scope.NextData = true;
        $scope.LeagueCenter = function (ResetStatus) {
            if (ResetStatus) {
                $scope.PageNo = 1;
                $scope.SeriesTotalCount = 0;
                $scope.Series = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
                $scope.Statics = [];
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) { return false; }
            if ($scope.NextData) {
                $scope.NextData = false;

                var $data = {};
                $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
                $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate,Status,SeriesID,SeriesMatchStartDate,SeriesEndDateUTC,isJoinedContest,TotalUserWinning';
                $data.PageNo = $scope.PageNo;
                $data.PageSize = $scope.PageSize;
                $data.MyJoinedSeries = 'Yes';
                $data.DraftAuctionPlay = 'Yes';
                $data.Status = $scope.Status;
                $data.OrderBy = 'SeriesMatchStartDate';
                $data.Sequence = 'ASC';
                $data.MyJoinedSeriesCount = 'Yes';
                $data.IsPlayerOrTimeAvl= "Yes";
                appDB
                    .callPostForm('auctionDrafts/getSeriesRounds', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.Statics = data.Data.Statics;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records.length > 0) {
                                    $scope.SeriesTotalCount = data.Data.TotalRecords;
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        var date = data.Data.Records[i].SeriesMatchStartDate;
                                        data.Data.Records[i].SeriesMatchStartDateUTC = $filter('convertIntoUserTimeZone')(date);
                                        $scope.Series.push(data.Data.Records[i]);
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

        $scope.RoundID = getQueryStringValue('RoundID');
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
                $data.RoundID = $scope.RoundID;
                $data.Params = 'RoundID,IsConfirm,SeriesName,SeriesGUID,UserInvitationCode,ContestID,LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution';
                $data.PageNo = $scope.PageNo;
                $data.PageSize = $scope.PageSize;
                $data.Keyword = $scope.Keyword;
                $data.JoinedContestStatusID = 'Yes';
                $data.Status = 'Pending';
                $data.MyJoinedContest = 'Yes';
                $data.Privacy = 'All';
                $data.LeagueType = 'Auction';
                $data.IsSeriesStarted = 'Yes';
                appDB
                    .callPostForm('auctionDrafts/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.UserJoinedContestTotalCount = data.Data.TotalRecords;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        if (i == 0) {
                                            $scope.SeriesName = data.Data.Records[i].SeriesName;
                                        }
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

    } else {
        window.location.href = base_url;
    }
}]);