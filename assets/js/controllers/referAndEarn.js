'use strict';

app.controller('inviteController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$timeout', 'appDB', 'toastr', function ($scope, $rootScope, $location, environment, $localStorage, $timeout, appDB, toastr) {
    $scope.env = environment;
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;
        $scope.isLoggedIn = $localStorage.isLoggedIn;
        $scope.base_url = base_url;
        $scope.referral_url = base_url + $localStorage.user_details.ReferralCode;

        $scope.activeTab = 'viaSms';
        $scope.inviteTab = function (tab) {
            $scope.inviteSubmitted = false;
            $scope.activeTab = tab;
        }

        /*function to invite friend*/
        $scope.inviteField = {};
        $scope.CaptchaEnabledReferEarn = 'No';
        $scope.ReferEarnCaptchaResponse = '';
        $scope.WidgetIdReferEarn = '';
        $scope.inviteSubmitted = false;
        $scope.InviteFriend = function (form, ReferType) {
            $scope.inviteSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            var $data = {};
            if ($scope.CaptchaEnabledReferEarn == 'Yes' && $scope.ReferEarnCaptchaResponse != '') {
                $data["g-recaptcha-response"] = $scope.ReferEarnCaptchaResponse;
                $data.RequestType = 'WEB';
            }
            $data.SessionKey = $localStorage.user_details.SessionKey;
            if (ReferType == 'Phone') {
                $data.PhoneNumber = $scope.inviteField.PhoneNumber;
            } else {
                $data.Email = $scope.inviteField.Email;
            }
            $data.ReferType = ReferType;
            appDB
                .callPostForm('users/referEarn', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.successMessageShow(data.Message);
                            $scope.inviteField = {};
                            $scope.inviteSubmitted = false;
                            $scope.CaptchaEnabledReferEarn = 'No';
                        }
                    },
                    function errorCallback(data) {
                        if ($scope.CaptchaEnabledReferEarn == 'No' && data.CaptchaEnable == 'Yes') {
                            $scope.CaptchaEnabledReferEarn = data.CaptchaEnable;
                            $timeout(function () {
                                $scope.WidgetIdReferEarn = grecaptcha.render(document.getElementById($scope.activeTab == 'viaSms' ? 'ReferEarnCaptchaEnabledMobile' : 'ReferEarnCaptchaEnabledEmail'), {
                                    'sitekey': $scope.CaptchaSITEKey,
                                    'callback': ReferEarnCaptchaCallback,
                                });
                            }, 500)
                        } else if (data.CaptchaEnable == 'Yes') {
                            $scope.ReferEarnCaptchaResponse = '';
                            grecaptcha.reset($scope.WidgetIdReferEarn)
                        }
                        $scope.checkResponseCode(data);
                    });

        }

        var ReferEarnCaptchaCallback = function (response) {
            $scope.ReferEarnCaptchaResponse = response;
        }

        $scope.MyRefferalUsers = function (form, ReferType) {
            var $data = {};
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm('users/getRefferalUsers', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.Refferals = data.Data.Response;
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