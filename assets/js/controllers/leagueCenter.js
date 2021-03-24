'use strict';

app.controller('LeagueCenterController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr) {
    $scope.env = environment;
    $scope.GamesType = $localStorage.GamesType;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        if (!localStorage.hasOwnProperty('leagueCenter_back_url')) {
            localStorage.setItem('leagueCenter_back_url', document.referrer);
        }
        $scope.NextData = true;
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
        $scope.ContestDetails = [];
        $scope.Statics = [];
        $scope.LeagueCenter = function (ResetStatus) {
            if (ResetStatus) {
                $scope.PageNo = 1;
                $scope.ContestDetails = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
                // $scope.Statics = [];
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) {
                return false;
            }
            $rootScope.loader.isLoading = false;
            if ($scope.NextData) {
                $scope.NextData = false;
                var $data = {};
                $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
                $data.MatchGUID = ''; //Match GUID
                $data.Params = 'MatchStartDateTimeUTC,TotalUserWinning,MyTotalJoinedContest,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
                $data.PageNo = $scope.PageNo;
                $data.PageSize = $scope.PageSize;
                $data.SessionKey = $localStorage.user_details.SessionKey;
                $data.Filter = 'MyJoinedMatch';
                // $data.getJoinedMatches = 'Yes';
                $data.Status = $scope.Status;
                $data.MyJoinedMatchesCount = 1;
                $data.OrderBy = 'MatchStartDateTime';
                $data.Sequence = ($scope.Status != 'Pending') ? 'DESC' : 'ASC';
                appDB
                    .callPostForm($rootScope.apiPrefix+'sports/getMatches', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.ContestsTotalCount = data.Data.TotalRecords;
                                $scope.Statics = data.Data.Statics;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        data.Data.Records[i].MatchStartDateTimeNew = new Date(data.Data.Records[i].MatchStartDateTime);
                                        $scope.ContestDetails.push(data.Data.Records[i]);
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
                        });
            }
        }

        $scope.goLobby = function (MatchGUID, Page) {
            if (Page == 'upcoming') {
                localStorage.LeagueMatchGUID = MatchGUID;
                window.location.href = base_url + 'lobby';
            } else {
                window.location.href = base_url + 'showContest?MatchGUID=' + MatchGUID + '&Status=' + Page;
            }

        }

        $scope.Back = function () {
            window.location.href = localStorage.getItem('leagueCenter_back_url');
            localStorage.removeItem('leagueCenter_back_url');
        }

    } else {
        var toast = toastr.error('Please sign again to continue.', {
            closeButton: true
        });
        toastr.refreshTimer(toast, 5000);
        setTimeout(function () {
            window.location.href = base_url;
        }, 500);
    }


}]);