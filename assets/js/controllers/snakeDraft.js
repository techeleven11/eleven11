app.controller('snakeDraftController', ['$scope', '$rootScope', 'environment', '$localStorage', 'appDB', '$timeout', function ($scope, $rootScope, environment, $localStorage, appDB, $timeout) {
    $scope.env = environment;
    $scope.data.pageSize = 15;
    $scope.data.pageNo = 1;
    $scope.coreLogic = Mobiweb.helpers;
    $scope.ContestsTotalCount = 0;
    $scope.UserTeamsTotalCount = 0;
    $scope.UserJoinedContestTotalCount = 0;

    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $rootScope.selected_series = {};
        $rootScope.ContestGUID = '';
        $rootScope.selected_match = {};

        /*To manage Tabs*/
        $scope.activeTab = 'normal';
        $scope.gotoTab = function (tab) {
            $scope.activeTab = tab;
            if ($rootScope.selected_match.MatchDisplay == 'Enable') {
                if (tab == 'normal') {
                    $scope.getContests(true);
                } else if (tab == 'joined') {
                    $scope.JoinedContest(true);
                }
            }
        }

        /*Function to get all series*/
        $scope.seriesList = [];
        $scope.Series = function () {
            $scope.silder_visible = false;
            var $data = {};
            $data.Params = 'SeriesMatchStartDate,SeriesStartDateUTC,AuctionDraftStatus,SeriesName,SeriesGUID,StatusID,SeriesStartDate,Status,SeriesID';
            $data.OrderBy = 'SeriesStartDate';
            $data.Sequence = 'ASC';
            $data.AuctionDraftStatusID = 1;
            $data.DraftAuctionPlay = 'Yes';
            appDB.callPostForm('sports/getRounds', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.seriesList = data.Data;
                            $rootScope.selected_series = data.Data.Records[0];
                            $scope.silder_visible = true;
                            if ($rootScope.selected_series.AuctionDraftStatus == 'Completed' || $rootScope.selected_series.AuctionDraftStatus == 'Running') {
                                $scope.activeTab = 'joined';
                                $scope.JoinedContest(true);
                            } else {
                                $scope.getContests(true);
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        $scope.selectMatch = function (match) {
            if (match.MatchDisplay == 'Disable') {
                $scope.errorMessageShow('This match will be open soon.');
                return false;
            }
            $rootScope.selected_match = match;
            if ($rootScope.selected_match.Status == 'Completed' || $rootScope.selected_match.status == 'Running') {
                $scope.activeTab = 'joined';
                $scope.JoinedContest(true);
            } else {
                $scope.activeTab = 'normal';
                $scope.getContests(true);
            }
        }

        /* function to get contests according to matches */
        $scope.Contests = [];
        $scope.Nextdata = true;
        $scope.getContests = function (status) {
            if ($scope.activeTab != 'normal') {
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
            if ($scope.Nextdata) {
                $scope.Nextdata = false;
                $data = {};
                // $data.RoundID = $rootScope.selected_series.RoundID; // RoundID
                $data.MatchGUID = $rootScope.selected_match.MatchGUID;
                $data.SessionKey = $scope.user_details.SessionKey; // User SessionKey
                $data.PageNo = $scope.data.pageNo; // Page Number
                $data.PageSize = $scope.data.pageSize; // Page Size
                $data.Params = 'LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,TeamNameLocal,TeamNameVisitor,IsConfirm,CashBonusContribution,GameTimeLive,DraftTeamPlayerLimit,DraftPlayerSelectionCriteria';
                $data.Keyword = $scope.Keyword;
                $data.ContestFull = 'No';
                $data.Status = ['1', '2', '5'];
                $data.StatusID = 1;
                $data.Privacy = 'No';
                $data.AuctionStatus = 'Pending';
                $data.LeagueType = 'Draft';
                appDB
                    .callPostForm('SnakeDrafts/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.Nextdata = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.ContestsTotalCount = data.Data.TotalRecords;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined) * 100 / parseInt(data.Data.Records[i].ContestSize);
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
                            $scope.Nextdata = true;
                            $scope.checkResponseCode(data);
                        });
            }
        }

        /*To get User joined contest */

        var $data = {};
        $scope.JoinedContest = function (status) {
            if ($scope.activeTab != 'joined') {
                return false;
            }
            if (status) {
                $scope.data.pageNo = 1;
                $scope.data.dataList = [];
                $scope.LoadMoreFlag = true;
                $scope.data.noRecords = false;
            }
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.Nextdata == false) {
                return false
            }
            if ($scope.Nextdata) {
                $scope.Nextdata = false;
                var $data = {};
                $data.SessionKey = $scope.user_details.SessionKey; //user session key
                // $data.RoundID = $rootScope.selected_series.RoundID; //RoundID
                $data.MatchGUID = $rootScope.selected_match.MatchGUID;
                $data.Params = 'IsConfirm,UserInvitationCode,ContestID,LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution';
                $data.PageNo = $scope.data.pageNo;
                $data.PageSize = $scope.data.pageSize;
                $data.Keyword = $scope.Keyword;
                $data.JoinedContestStatusID = 'Yes';
                $data.Status = 'Pending';
                $data.MyJoinedContest = 'Yes';
                $data.Privacy = 'All';
                $data.LeagueType = 'Draft';
                $data.IsSeriesStarted = 'Yes';
                appDB
                    .callPostForm('SnakeDrafts/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.Nextdata = true;
                            if ($scope.checkResponseCode(data)) {
                                $scope.UserJoinedContestTotalCount = data.Data.TotalRecords;
                                if (data.Data.hasOwnProperty('Records') && data.Data.Records != '') {
                                    $scope.LoadMoreFlag = true;
                                    for (var i in data.Data.Records) {
                                        data.Data.Records[i].joinedpercent = parseInt(data.Data.Records[i].TotalJoined) * 100 / parseInt(data.Data.Records[i].ContestSize);
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
                            $scope.Nextdata = true;
                            $scope.checkResponseCode(data);
                        });
            }
        }

        /*To join Contest*/
        $scope.check_balance_amount = function (ContestInfo) {
            $rootScope.ContestInfo = ContestInfo;
            if (parseInt($scope.profileDetails.TotalCash) < parseInt(ContestInfo.EntryFee)) {
                $scope.openPopup('add_more_money');
            } else {
                $scope.openPopup('joinLeaguePopup');
            }
        }

        $rootScope.JoinContest = function () {
            var $data = {};
            $data.ContestGUID = $rootScope.ContestInfo.ContestGUID;
            $data.MatchGUID = $rootScope.selected_match.MatchGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            let url = 'SnakeDrafts/join';
            if ($scope.UserInvitationCode) {
                $data.UserInvitationCode = $scope.UserInvitationCode;
                url = 'SnakeDrafts/joinInvite';
            }
            appDB
                .callPostForm(url, $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('joinLeaguePopup');
                            $scope.successMessageShow(data.Message);
                            setTimeout(function () {
                                $scope.data.pageNo = 1;
                                $scope.getWalletDetails();
                                if ($rootScope.selected_match.AuctionDraftStatus == 'Completed' || $scope.UserInvitationCode != '') {
                                    $scope.activeTab = 'joined';
                                    $scope.JoinedContest(true);
                                } else {
                                    $scope.activeTab = 'normal';
                                    $scope.getContests(true);
                                }
                            }, 1000);
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }
        /* Function for search contest */
        $scope.searchContest = function (search) {
            $scope.Keyword = search;
            if ($scope.activeTab === 'normal') {
                $scope.getContests(true);
            } else if ($scope.activeTab === 'joined') {
                $scope.JoinedContest(true);
            }
        }


        $scope.showWinningPayout = function (Winnings) {
            $scope.CustomizeWinning = Winnings;
            $scope.openPopup('PayoutBreakUp');
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
            $data.Params = 'IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,TotalJoined,CustomizeWinning,DraftTeamPlayerLimit,DraftPlayerSelectionCriteria';
            $data.UserInvitationCode = UserInvitationCode;
            $data.MatchGUID = $rootScope.selected_match.MatchGUID;
            appDB
                .callPostForm('SnakeDrafts/getPrivateContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            var Contests = data.Data;
                            if (Object.keys(Contests).length == 0) {
                                $scope.errorMessageShow('Invalid League Code');
                            } else {
                                $scope.closePopup('joinPrivateContestPopup');
                                $scope.check_balance_amount(Contests);
                            }
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        $rootScope.InviteCode = '';
        $scope.openinvitationModal = function (invitationCode) {
            $rootScope.InviteCode = invitationCode;
            $scope.openPopup('invitationModal');
        }
        /**
         * Copy invite code
         */
        $rootScope.copyText = function () {
            /* Get the text field */
            var copyText = document.getElementById("invite_code");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");
            $scope.closePopup('invitationModal');
            /* Alert the copied text */
            $scope.successMessageShow('Copied the code');
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
                .callPostForm('auctionDrafts/InviteContest', $data)
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

        $rootScope.activeInviteTab = 'viaSms';
        $rootScope.inviteInviteTab = function (tab) {
            $rootScope.activeInviteTab = tab;
        }

        /**
         * get match list
         */
        $scope.MatchesList = [];
        $scope.getMatches = function () {
            var $data = {};
            $scope.silder_visible = false;
            $data.SeriesGUID = ''; // Selected series ID
            $data.Params = 'ContestAvailable,TeamPlayersAvailable,SeriesID,SeriesGUID,SeriesName,MatchType,MatchNo,MatchStartDateTime,MatchStartDateTimeUTC,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
            $data.Status = 'Pending';
            $data.PageSize = 15;
            $data.PageNo = 1;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.IsPlayerOrTimeAvl = "Yes";
            appDB
                .callPostForm('SnakeDrafts/getMatches', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.MatchesList = data.Data;
                            $scope.silder_visible = true;
                            $rootScope.selected_match = $scope.MatchesList.Records[0];
                            if ($rootScope.selected_match.MatchDisplay == 'Enable') {
                                $scope.getContests(true);
                            }
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

app.directive('createDraftContest', function () {
    return {
        restrict: 'E',
        controller: 'createDraftContestController',
        templateUrl: 'createDraftContest.php',
        link: function (scope, element, attributes) {
            scope.closeContestPopup = function () {
                scope.closePopup('create_draft_contest');
                delete scope.winnings;
                scope.clearPopup();
            }
            scope.isSetUp = false;
            scope.clearPopup = function () {
                scope.ContestName = '';
                scope.NoOfWinners = '';
                scope.EntryFee = 0;
                scope.GameType = '';
                scope.winnings = false;
                scope.ContestFormat = 'League';
                scope.ContestSize = 2;
                scope.ContestWinningAmount = 0;
                scope.leagueDateTime = '';
                scope.submitted = false;
            }
        }
    };
});

app.controller('createDraftContestController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr) {
    $scope.env = environment;
    $scope.coreLogic = Mobiweb.helpers;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.ContestFormat = 'League';
        $scope.adminPercent = 15;
        $scope.ContestSize = 2;

        $scope.$watch('ContestSize', function (newValue, oldValue) {
            $scope.NoOfWinners = '';

            if (newValue != oldValue) {

                if ($scope.ContestSize.match(/^0[0-9].*$/)) {
                    $scope.ContestSize = $scope.ContestSize.replace(/^0+/, '');
                }

                if (parseInt($scope.ContestSize) > 0) {
                    /**
                     * calculate contest winning amount 
                     */
                    // var TotalWinningAmount = (newValue * $scope.EntryFee);
                    // $scope.ContestWinningAmount = Math.ceil(TotalWinningAmount - (TotalWinningAmount * $scope.adminPercent) / 100);
                    /**
                     * calcualte entry fee
                     */
                    let totalEntry = $scope.ContestWinningAmount / newValue;
                    $scope.EntryFee = (totalEntry * $scope.adminPercent / 100 + totalEntry).toFixed(2);
                } else {
                    $scope.EntryFee = 0;
                    $scope.ContestWinningAmount = 0;
                }
                $scope.winnings = false;
            }
        });

        $scope.$watch('winnings', function (newValue, oldValue) {

            if (newValue) {
                var $data = {};
                $data.SessionKey = $localStorage.user_details.SessionKey;
                $data.UserGUID = $localStorage.user_details.UserGUID;
                $data.WinningAmount = $scope.ContestWinningAmount;
                $data.ContestSize = $scope.ContestSize;
                $data.EntryFee = $scope.EntryFee;
                $data.IsPaid = ($scope.EntryFee == 0) ? 'No' : 'Yes';
                appDB
                    .callPostForm('contest/WinningBreakups', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.choices = data.Data;
                                for (var i in $scope.choices) {
                                    if (i == 0) {
                                        $scope.SelectedWinners = $scope.choices[i].NoOfWinners;
                                    }
                                }
                            } else {
                                $scope.choices = [];
                            }
                        },
                        function errorCallback(data) {
                            $scope.checkResponseCode(data)
                        });
            }
        });
        // $scope.$watch('EntryFee', function (newValue, oldValue) {
        //     if (newValue != oldValue) {
        //         if (typeof newValue == 'undefined') {
        //             $scope.EntryFee = 0;
        //             return false;
        //         }
        //         if (parseInt($scope.ContestSize) > 0) {
        //             var TotalWinningAmount = (newValue * $scope.ContestSize);
        //             $scope.ContestWinningAmount = Math.ceil(TotalWinningAmount - (TotalWinningAmount * $scope.adminPercent) / 100);
        //             // $scope.EntryFee = ($scope.totalEntry * $scope.adminPercent / 100 + $scope.totalEntry).toFixed(2);
        //         } else {
        //             $scope.EntryFee = 0;
        //             $scope.ContestWinningAmount = 0;
        //         }
        //         $scope.winnings = false;
        //         $scope.clearForm();
        //     }
        // });

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

                if (parseInt($scope.ContestSize) > 0) {
                    let totalEntry = $scope.ContestWinningAmount / $scope.ContestSize;
                    $scope.EntryFee = (totalEntry * $scope.adminPercent / 100 + totalEntry).toFixed(2);
                } else {
                    $scope.EntryFee = 0;
                }
                $scope.winnings = false;
            }
        });

        $scope.createContestField = {};
        $scope.submitted = false;
        $scope.CreateDraftContest = function (form) {
            $scope.helpers = Mobiweb.helpers;
            $scope.submitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.EntryFee < 100) {
                $scope.errorMessageShow("Entry fee must be greater than 100.");
                return false;
            }
            if (!$scope.winnings && $scope.EntryFee != 0) {
                $scope.errorMessageShow("Please select customize winnings.");
                return false;
            }
            var CustomizeWinning = [];
            for (var i in $scope.choices) {
                if ($scope.choices[i].NoOfWinners == $scope.SelectedWinners) {
                    CustomizeWinning = $scope.choices[i].Winners;
                    $scope.NoOfWinners = $scope.choices[i].NoOfWinners;
                }
            }
            var $data = {};

            $scope.createContestField.SessionKey = $localStorage.user_details.SessionKey;
            $scope.createContestField.MatchGUID = $rootScope.selected_match.MatchGUID;
            $scope.createContestField.SeriesID = $rootScope.selected_match.SeriesID;
            $scope.createContestField.MatchStartDate = $rootScope.selected_match.MatchStartDateTime;
            $scope.createContestField.Privacy = 'Yes';
            $scope.createContestField.IsPaid = ($scope.EntryFee == 0) ? 'No' : 'Yes';
            $scope.createContestField.ContestFormat = $scope.ContestFormat;
            $scope.createContestField.ContestName = $scope.ContestName;
            $scope.createContestField.ContestType = 'Normal';
            $scope.createContestField.LeagueType = 'Draft';
            $scope.createContestField.WinningAmount = $scope.ContestWinningAmount;
            $scope.createContestField.EntryFee = $scope.EntryFee;
            $scope.createContestField.NoOfWinners = ($scope.NoOfWinners) ? $scope.NoOfWinners : 0;
            $scope.createContestField.ShowJoinedContest = 'Yes';
            $scope.createContestField.CashBonusContribution = 0;
            $scope.createContestField.EntryType = 'Single';
            $scope.createContestField.IsConfirm = 'No';
            $scope.createContestField.ContestSize = $scope.ContestSize;
            $scope.createContestField.LeagueJoinDateTime = $scope.leagueDateTime;
            $scope.createContestField.AdminPercent = $scope.adminPercent;
            $scope.createContestField.MinimumUserJoined = 1;
            if ($scope.winnings) {
                $scope.createContestField.CustomizeWinning = JSON.stringify(CustomizeWinning);
            }
            $data = $scope.createContestField;
            appDB
                .callPostForm('SnakeDrafts/add', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            var Contests = data.Data;
                            $scope.CreateContestForm = {};
                            $scope.closePopup('create_draft_contest');
                            $scope.submitted = false;
                            $scope.successMessageShow(data.Message);
                            $scope.UserInvitationCode = Contests.UserInvitationCode;
                            $scope.check_balance_amount(Contests);
                        } else {
                            $scope.data.noRecords = true;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

        }

        $scope.ShowCustomizeWinningPopup = function (Winnings) {
            $scope.CustomizeWinningBreakups = Winnings;
            $scope.openPopup('CustomizeWinningPopup');
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