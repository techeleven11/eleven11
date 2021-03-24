app.controller('HomeController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', '$sce', 'toastr', '$http', '$timeout', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, $sce, toastr, $http, $timeout) {
    $scope.env = environment;
    if (!$localStorage.hasOwnProperty('user_details')) {
        $(window).on('load', function () {
            $scope.activeTabs('cricket');
            $scope.getTestimonials();
        });
        $rootScope.loader = {};
        $scope.activeTab = 'cricket';
        $scope.activeTabs = function (tabs) {
            $scope.activeTab = tabs;
            if (tabs == 'cricket') {
                $scope.getMatches();
                $scope.Series();
            } else {
                $scope.getMatchesFootball();
                $scope.FootballSeries();
            }
        }
        /*Function to get matches */
        $scope.MatchesList = [];
        $scope.getMatches = function (SeriesGUID) {
            var $data = {};
            $scope.silder_visible = false;
            $data.Params = 'MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
            $data.Status = 'Pending';
            $data.PageSize = 3;
            $data.PageNo = 1;
            $rootScope.loader.isLoading = false;
            $data.Filter = 'AddDays';
            if (SeriesGUID) {
                $data.SeriesGUID = SeriesGUID;
            }
            appDB
                .callPostForm('sports/getMatches', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        if (data.ResponseCode == 200) {
                            $scope.MatchesList = data.Data.Records;
                            $scope.silder_visible = true;
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                    });
        }

        $scope.seriesList = [];
        $scope.Series = function () {
            $rootScope.loader.isLoading = false;
            var $data = {};
            $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate';
            $data.OrderBy = 'SeriesStartDate';
            $data.Sequence = 'ASC';
            $data.StatusID = 2;
            appDB.callPostForm('sports/getSeries', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        if (data.ResponseCode == 200) {
                            $scope.seriesList = data.Data;
                            $timeout(function () {
                                $(".selectpicker").selectpicker('render');
                                $("#series").selectpicker('refresh');
                            }, 1000);
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                    });
        }


        $scope.FootballMatchesList = [];
        $scope.getMatchesFootball = function (SeriesGUID) {
            var $data = {};
            $scope.silder_visible = false;
            $rootScope.loader.isLoading = false;
            $data.Params = 'MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
            $data.Status = 'Pending';
            $data.PageSize = 3;
            $data.Filter = 'AddDays';
            $data.PageNo = 1;
            if (SeriesGUID) {
                $data.SeriesGUID = SeriesGUID;
            }
            appDB
                .callPostForm('football/sports/getMatches', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        if (data.ResponseCode == 200) {
                            $scope.FootballMatchesList = data.Data.Records;
                            $scope.silder_visible = true;
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                    });
        }

        $scope.FootballSeries = function () {
            $rootScope.loader.isLoading = false;
            var $data = {};
            $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate';
            $data.OrderBy = 'SeriesStartDate';
            $data.Sequence = 'ASC';
            $data.StatusID = 2;
            appDB.callPostForm('football/sports/getSeries', $data)
                .then(
                    function successCallback(data) {
                        $rootScope.loader.isLoading = true;
                        if (data.ResponseCode == 200) {
                            $scope.seriesList = data.Data;
                            $timeout(function () {
                                $(".selectpicker").selectpicker('render');
                                $("#series").selectpicker('refresh');
                            }, 1000);
                        }
                    },
                    function errorCallback(data) {
                        $rootScope.loader.isLoading = true;
                    });
        }

        $scope.getSeriesByMatch = function (SeriesGUID) {

            if ($scope.activeTab == 'cricket') {
                $scope.getMatches(SeriesGUID);
            } else {
                $scope.getMatchesFootball(SeriesGUID);
            }
        }

        $scope.downloadFormSubmitted = false;
        $scope.info = {};
        $scope.info.PhoneNumber = '';
        $scope.WidgetIdAppLink = '';
        $scope.CaptchaEnabledSendLink = 'No';
        $scope.AppLinkCaptchaResponse = '';
        $scope.SendLink = function (form) {
            var $data = {};
            $scope.downloadFormSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.CaptchaEnabledSendLink == 'Yes' && $scope.AppLinkCaptchaResponse == '') { //if string is empty
                $scope.errorMessageShow('Please resolve the captcha and submit!');
                return false
            } else {
                if (!/^\d{10}$/.test($scope.info.PhoneNumber)) {
                    $scope.errorMessageShow("Invalid number; must be ten digits")
                    return false
                }
                if ($scope.CaptchaEnabledSendLink == 'Yes' && $scope.AppLinkCaptchaResponse != '') {
                    $data["g-recaptcha-response"] = $scope.AppLinkCaptchaResponse;
                    $data.RequestType = 'WEB';
                }
                $data.PhoneNumber = $scope.info.PhoneNumber;
                appDB
                    .callPostForm('utilities/sendAppLink', $data)
                    .then(
                        function successCallback(data) {
                            if (data.ResponseCode == 200) {
                                var toast = toastr.success(data.Message, {
                                    closeButton: true
                                });
                                toastr.refreshTimer(toast, 5000);
                                $scope.info.PhoneNumber = '';
                                $scope.downloadFormSubmitted = false;
                            } else {
                                var toast = toastr.error(data.Message, {
                                    closeButton: true
                                });
                                toastr.refreshTimer(toast, 5000);
                            }
                        },
                        function errorCallback(data) {
                            if ($scope.CaptchaEnabledSendLink == 'No' && data.CaptchaEnable == 'Yes') {
                                $scope.CaptchaEnabledSendLink = data.CaptchaEnable;
                                $timeout(function () {
                                    $scope.WidgetIdAppLink = grecaptcha.render(document.getElementById('AppLinkCaptchaEnabled'), {
                                        'sitekey': $scope.CaptchaSITEKey,
                                        'callback': AppLinkCaptchaCallback,
                                    });
                                }, 500)
                            } else if (data.CaptchaEnable == 'Yes') {
                                $scope.AppLinkCaptchaResponse = '';
                                grecaptcha.reset($scope.WidgetIdAppLink)
                            }
                            var toast = toastr.error(data.Message, {
                                closeButton: true
                            });
                            toastr.refreshTimer(toast, 5000);
                        }
                    );
            }
        }
        var AppLinkCaptchaCallback = function (response) {
            $scope.AppLinkCaptchaResponse = response;
        }
        /**
         * Get Testimonials lists
         */
        $scope.Testimonials = [];
        $scope.testimonial_silder_visible = false;
        $scope.getTestimonials = function () {
            var $data = {};
            $data.PostType = 'Testimonial';
            appDB
                .callPostForm('utilities/getPosts', $data)
                .then(
                    function success(data) {
                        if (data.ResponseCode == 200) {
                            $scope.Testimonials = data.Data.Records;
                            $scope.testimonial_silder_visible = true;
                        }
                    },
                    function error(data) {
                    });
        }
        /**
         * redirect to login/signup pages
         */
        $scope.goToLogin = function (PageName) {
            $localStorage.loginPage = PageName;
            window.location.href = base_url + 'authenticate';
        }

        $scope.loadVideo = function () {
            $("#loadVideoLink").html('<iframe width="100%" height="350" src="https://www.youtube.com/embed/dzDnlvU1eTk?rel=0" frameborder="0" allow="autoplay"></iframe>');
            $("#howto-play_video").modal('show');
        }
        /**
         * download APK
         */
        $scope.redirectToDownloadApp = function () {
            if (/android/i.test(navigator.userAgent)) {
                // window.open('http://fsl11.com/android/FSL11.apk','_blank','Download');
                var link = document.createElement("a");
                link.setAttribute('name', 'download_link');
                link.setAttribute('download', '');
                link.href = 'https://fsl11.com/android/FSL11.apk';
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.open('https://apps.apple.com/in/app/fsl11/id1491443219','_blank');
            } else {
                window.location.href = base_url + 'download-fantasy-cricket-app';
            }

        }
    } else {
        window.location.href = base_url + 'lobby';
    }
}]);

app.directive('homeSlickCustomCarousel', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: {
            post: function (scope, elem, attr) {
                $timeout(function () {
                    $('.homeSlider').slick({
                        dots: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        speed: 500,
                        prevArrow: '<button class="PrevArrow"></button>',
                        nextArrow: '<button class="NextArrow"></button>',
                    });
                }, 1);

            }
        }
    }
}]);
app.directive('testimonialSlider', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: {
            post: function (scope, elem, attr) {
                $timeout(function () {
                    $('#clientSlider').slick({
                        dots: false,
                        infinite: false,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
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

                }, 1000);

            }
        }
    }
}]);