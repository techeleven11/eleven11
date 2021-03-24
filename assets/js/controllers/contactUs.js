'use strict';

app.controller('contactController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', '$timeout', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, $timeout, toastr) {
    $scope.env = environment;
    $scope.contactForm = {};
    $scope.submitted = false;
    $scope.isLoggedIn = ($localStorage.isLoggedIn) ? true : false;
    $scope.type = getQueryStringValue('type');
    $scope.contactUS = function (form) {
        var $data = {};
        $scope.submitted = true;
        if (!form.$valid) {
            return false;
        }
        $data = $scope.contactForm;
        appDB
            .callPostForm('utilities/contact', $data)
            .then(
                function successCallback(data) {
                    if ($scope.checkResponseCode(data)) {
                        $scope.successMessageShow(data.Message);
                    }
                },
                function errorCallback(data) {
                    $scope.checkResponseCode(data)
                }
            );
    }

    $scope.WidgetIdAppLink = '';
    $scope.CaptchaEnabledSendLink = 'No';
    $scope.AppLinkCaptchaResponse = '';
    $scope.downloadFormSubmitted = false;
    $scope.info = {};
    $scope.info.PhoneNumber = '';
    $scope.SendLink = function (form) {
        var $data = {};
        $scope.downloadFormSubmitted = true;
        if (!form.$valid) {
            return false;
        }
        if ($scope.CaptchaEnabledSendLink == 'Yes' && $scope.AppLinkCaptchaResponse == '') { //if string is empty
            $scope.errorMessageShow("Please resolve the captcha and submit!")
        } else {
            if(!/^\d{10}$/.test($scope.info.PhoneNumber)){
                $scope.errorMessageShow("Invalid number; must be ten digits")
                return false
            }
            if($scope.CaptchaEnabledSendLink == 'Yes' && $scope.AppLinkCaptchaResponse != ''){
                $data["g-recaptcha-response"] = $scope.AppLinkCaptchaResponse;
                $data.RequestType = 'WEB';
            }
            $data.PhoneNumber = $scope.info.PhoneNumber;
            appDB
                .callPostForm('utilities/sendAppLink', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.successMessageShow(data.Message);
                            $scope.info.PhoneNumber = '';
                            $scope.downloadFormSubmitted = false;
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
                        $scope.checkResponseCode(data)
                    }
                );
        }
    }

    var AppLinkCaptchaCallback = function (response) {
        $scope.AppLinkCaptchaResponse = response;
    }

    $scope.Testimonials = [];
    $scope.testimonial_silder_visible = false;
    $scope.getTestimonials = function () {
        var $data = {};
        $data.PostType = 'Testimonial';
        appDB
            .callPostForm('utilities/getPosts', $data)
            .then(
                function success(data) {
                    if ($scope.checkResponseCode(data)) {
                        $scope.Testimonials = data.Data.Records;
                        $scope.testimonial_silder_visible = true;
                    }
                },
                function error(data) {
                    $scope.checkResponseCode(data)
                });
    }
    /**
     * redirect to login/signup pages
     */
    $scope.goToLogin = function (PageName) {
        $localStorage.loginPage = PageName;
    }

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
        $data.PageSize = 6;
        $data.PageNo = 1;
        $data.Filter = 'AddDays';
        if (SeriesGUID) {
            $data.SeriesGUID = SeriesGUID;
        }
        appDB
            .callPostForm('sports/getMatches', $data)
            .then(
                function successCallback(data) {
                    if ($scope.checkResponseCode(data)) {
                        $scope.MatchesList = data.Data.Records;
                        $scope.silder_visible = true;
                    }
                },
                function errorCallback(data) {
                    $scope.checkResponseCode(data)
                });
    }

    $scope.seriesList = [];
    $scope.Series = function () {
        var $data = {};
        $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate';
        $data.OrderBy = 'SeriesStartDate';
        $data.Sequence = 'ASC';
        $data.StatusID = 2;
        appDB.callPostForm('sports/getSeries', $data)
            .then(
                function successCallback(data) {
                    if ($scope.checkResponseCode(data)) {
                        $scope.seriesList = data.Data;
                        $timeout(function () {
                            $(".selectpicker").selectpicker('render');
                            $("#series").selectpicker('refresh');
                        }, 1000);
                    }
                },
                function errorCallback(data) {
                    $scope.checkResponseCode(data)
                });
    }


    $scope.FootballMatchesList = [];
    $scope.getMatchesFootball = function (SeriesGUID) {
        var $data = {};
        $scope.silder_visible = false;
        $data.Params = 'MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,Status,StatusID';
        $data.Status = 'Pending';
        $data.PageSize = 6;
        $data.Filter = 'AddDays';
        $data.PageNo = 1;
        if (SeriesGUID) {
            $data.SeriesGUID = SeriesGUID;
        }
        appDB
            .callPostForm('football/sports/getMatches', $data)
            .then(
                function successCallback(data) {
                    if (data.ResponseCode == 200) {
                        $scope.FootballMatchesList = data.Data.Records;
                        $scope.silder_visible = true;
                    }
                },
                function errorCallback(data) {

                });
    }

    $scope.FootballSeries = function () {
        var $data = {};
        $data.Params = 'SeriesName,SeriesGUID,StatusID,SeriesStartDate';
        $data.OrderBy = 'SeriesStartDate';
        $data.Sequence = 'ASC';
        $data.StatusID = 2;
        appDB.callPostForm('football/sports/getSeries', $data)
            .then(
                function successCallback(data) {
                    if (data.ResponseCode == 200) {
                        $scope.seriesList = data.Data;
                        $timeout(function () {
                            $(".selectpicker").selectpicker('render');
                            $("#series").selectpicker('refresh');
                        }, 1000);
                    }
                },
                function errorCallback(data) {
                });
    }

    $scope.getSeriesByMatch = function (SeriesGUID) {

        if ($scope.activeTab == 'cricket') {
            $scope.getMatches(SeriesGUID);
        } else {
            $scope.getMatchesFootball(SeriesGUID);
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
                }, 1);

            }
        }
    }
}]);

app.directive('screenshotSlider', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        link: {
            post: function (scope, elem, attr) {
                $timeout(function () {
                    $('.step_test').slick({
                        dots: false,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        touchMove: false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    // centerMode: true,
                                    variableWidth: false,
                                }
                            },
                            {
                                breakpoint: 520,
                                settings: {
                                    slidesToShow: 1,
                                    autoplay: true,
                                    arrows: false,
                                    // centerMode: true,
                                    variableWidth: false,
                                }
                            }

                        ]
                    });
                }, 100);

            }
        }
    }
}]);