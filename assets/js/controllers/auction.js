app.controller('auctionController', ['$scope', '$rootScope', 'environment', '$localStorage', 'appDB', '$timeout', function ($scope, $rootScope, environment, $localStorage, appDB, $timeout) {
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

        /*To manage Tabs*/
        $scope.activeTab = 'normal';
        $scope.gotoTab = function (tab) {
            $scope.activeTab = tab;
            if ($rootScope.selected_series.SeriesDisplay == 'Enable') {
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
            $data.OrderBy = 'SeriesMatchStartDate';
            $data.Sequence = 'ASC';
            $data.Status = 'Pending';
            $data.DraftAuctionPlay = 'Yes';
            $data.IsPlayRounds = "Yes";
            $data.SessionKey = $scope.user_details.SessionKey;
            $data.IsPlayerOrTimeAvl = "Yes";
            $data.Filter = 'AddDays';
            appDB.callPostForm('auctionDrafts/getSeriesRounds', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data) && data.Data.hasOwnProperty('Records') && data.Data.Records.length > 0) {
                            $scope.seriesList = data.Data;
                            $rootScope.selected_series = data.Data.Records[0];
                            $scope.silder_visible = true;
                            if ($rootScope.selected_series.AuctionDraftStatus == 'Completed' || $rootScope.selected_series.AuctionDraftStatus == 'Running') {
                                $scope.activeTab = 'joined';
                                $scope.JoinedContest(true);
                            } else if ($rootScope.selected_series.SeriesDisplay == 'Enable') {
                                $scope.activeTab = 'normal';
                                $scope.getContests(true);
                            }
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }


        $scope.selectSeries = function (series) {
            if (series.SeriesDisplay == 'Disable') {
                $scope.errorMessageShow('This serie will be open soon.');
                return false;
            }
            $rootScope.selected_series = series;
            if ($rootScope.selected_series.AuctionDraftStatus == 'Completed' || $rootScope.selected_series.AuctionDraftStatus == 'Running') {
                $scope.activeTab = 'joined';
                $scope.JoinedContest(true);
            } else {
                $scope.activeTab = 'normal';
                $scope.getContests(true);
            }
        }

        /* function to get contests according to matches */
        $scope.Contests = [];
        $scope.NextData = true;
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
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) { return false }
            if ($scope.NextData) {
                $scope.NextData = false;

                $data = {};
                $data.RoundID = $rootScope.selected_series.RoundID; // Selected RoundID
                $data.SessionKey = $scope.user_details.SessionKey; // User SessionKey
                $data.PageNo = $scope.data.pageNo; // Page Number
                $data.PageSize = $scope.data.pageSize; // Page Size
                $data.Params = 'LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,TeamNameLocal,TeamNameVisitor,IsConfirm,CashBonusContribution,GameTimeLive';
                $data.Keyword = $scope.Keyword;
                $data.ContestFull = 'No';
                $data.Status = ['1', '2', '5'];
                $data.StatusID = 1;
                $data.Privacy = 'No';
                $data.AuctionStatus = 'Pending';
                $data.LeagueType = 'Auction';
                $data.TotalJoinedByRound = 'Yes';
                appDB
                    .callPostForm('auctionDrafts/getContests', $data)
                    .then(
                        function successCallback(data) {
                            $scope.NextData = true;
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
                            $scope.NextData = true;
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
            if ($scope.LoadMoreFlag == false || $scope.data.noRecords == true || $scope.NextData == false) { return false }
            if ($scope.NextData) {
                $scope.NextData = false;

                var $data = {};
                $data.SessionKey = $scope.user_details.SessionKey; //user session key
                $data.RoundID = $rootScope.selected_series.RoundID; //RoundID
                $data.Params = 'UserInvitationCode,IsConfirm,ContestID,LeagueJoinDateTime,ContestType,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,Status,TotalJoined,CustomizeWinning,CashBonusContribution';
                $data.PageNo = $scope.data.pageNo;
                $data.PageSize = $scope.data.pageSize;
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
                            $scope.NextData = true;
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
            $data.SeriesID = $rootScope.selected_series.SeriesID;
            $data.RoundID = $rootScope.selected_series.RoundID;
            $data.SessionKey = $scope.user_details.SessionKey;
            let url = 'auctionDrafts/join';
            if ($scope.UserInvitationCode) {
                $data.UserInvitationCode = $scope.UserInvitationCode;
                url = 'auctionDrafts/joinInvite'
            }
            appDB
                .callPostForm(url, $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('joinLeaguePopup');
                            $scope.successMessageShow(data.Message);
                            setTimeout(function () {
                                $scope.getWalletDetails();
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

        $rootScope.InviteCode = '';
        $scope.openinvitationModal = function (invitationCode) {
            $rootScope.InviteCode = invitationCode;
            $scope.openPopup('invitationModal');
        }
        /**
         * Copy invite code
         */
        $rootScope.copyText = function () {
            var copyText = document.getElementById("invite_code");
            copyText.select();

            document.execCommand("copy");
            $scope.closePopup('invitationModal');
            $scope.successMessageShow('Copied the code');
        }

        $rootScope.activeInviteTab = 'viaSms';
        $rootScope.inviteInviteTab = function (tab) {
            $rootScope.activeInviteTab = tab;
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
            $data.SessionKey = $scope.user_details.SessionKey; // User SessionKey
            $data.Params = 'IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,TotalJoined,CustomizeWinning';
            $data.UserInvitationCode = UserInvitationCode;
            $data.RoundID = $rootScope.selected_series.RoundID;
            appDB
                .callPostForm('auctionDrafts/getPrivateContest', $data)
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
    } else {
        window.location.href = base_url;
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


app.directive('createAuctionContest', function () {
    return {
        restrict: 'E',
        controller: 'createAuctionContestController',
        templateUrl: 'createPrivateAuctionContest.php',
        link: function (scope, element, attributes) {
            scope.contest_size = 2;
            scope.closeContestPopup = function () {
                scope.closePopup('create_auction_contest');
                delete scope.winnings;
                scope.submitted = false;
                scope.clearPopup();
            }
            scope.isSetUp = false;
            scope.clearPopup = function () {
                scope.ContestName = '';
                scope.NoOfWinners = '';
                scope.EntryFee = 0;
                scope.GameType = '';
                scope.winnings = false;
                scope.leagueDateTime = '';
                scope.ContestFormat = 'League';
                scope.ContestSize = 2;
                scope.ContestWinningAmount = 0;
                scope.submitted = false;
            }
        }
    };
});

app.controller('createAuctionContestController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr) {
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
                if (newValue != undefined) {
                    $scope.ContestSize = newValue.replace(/^0+/, '');
                }

                if (parseInt($scope.ContestSize) > 0) {
                    /**
                     * contest winning amount calcuatation 
                     */
                    // var TotalWinningAmount = (newValue * $scope.EntryFee);
                    // $scope.ContestWinningAmount = Math.ceil(TotalWinningAmount - (TotalWinningAmount * $scope.adminPercent) / 100);
                    /**
                     * entry fee calculation
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
        /**
         * Create private contest
         */
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
            $scope.createContestField.SeriesID = $rootScope.selected_series.SeriesID;
            $scope.createContestField.RoundID = $rootScope.selected_series.RoundID;
            $scope.createContestField.Privacy = 'Yes';
            $scope.createContestField.IsPaid = ($scope.EntryFee == 0) ? 'No' : 'Yes';
            $scope.createContestField.ContestFormat = $scope.ContestFormat;
            $scope.createContestField.ContestName = $scope.ContestName;
            $scope.createContestField.ContestType = 'Normal';
            $scope.createContestField.LeagueType = 'Auction';
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
                .callPostForm('auctionDrafts/add', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            var Contests = data.Data;
                            $scope.CreateContestForm = {};
                            $scope.closeContestPopup('create_auction_contest');
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