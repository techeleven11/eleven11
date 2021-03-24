"use strict";
app.factory('$remember', function () {
    return function (name, values) {
        var cookie = name + '=';

        cookie += values + ';';

        var date = new Date();
        date.setDate(date.getDate() + 1);

        cookie += 'expires=' + date.toString() + ';';

        document.cookie = cookie;
    }
});
app.controller('authController', ['$scope', '$localStorage', '$sessionStorage', '$rootScope', '$location', 'toastr', 'appDB', 'environment', '$remember', '$cookies', '$cookieStore', '$timeout', function ($scope, $localStorage, $sessionStorage, $rootScope, $location, toastr, appDB, environment, $remember, $cookies, $cookieStore, $timeout) {
    if (!$localStorage.hasOwnProperty('user_details')) {
        $scope.loginType = 'email';
        $rootScope.activeTabLogin = $localStorage.hasOwnProperty('loginPage') ? $localStorage.loginPage : 'login';
        $rootScope.changeTabLogin = function (tab) {
            $rootScope.activeTabLogin = tab;
            if (tab == 'login') {
                $scope.loginType = 'email';
            } else if (tab == 'signup' && $scope.CaptchaEnabledSignup == 'Yes') {
                $scope.SignupCaptchaResponse = '';
                $timeout(function () {
                    grecaptcha.reset($scope.WidgetIdSignup);
                }, 500)
            }
        }
        /**
         * watch to check login type
         */
        $scope.$watch('loginType', function (newValue, oldValue) {
            if (newValue != oldValue) {
                if (newValue == 'email' && $scope.CaptchaEnable == 'Yes') {
                    $scope.SigninCaptchaResponse = '';
                    $timeout(function () {
                        $scope.WidgetIdSignin = grecaptcha.render(document.getElementById('CaptchaEnabled'), {
                            'sitekey': $scope.CaptchaSITEKey,
                            'callback': verifyCallback,
                        });
                    }, 500)
                }
            }
        });

        $scope.loginData = {};
        if ($cookies.get('remeber_me')) {
            var rem_info = JSON.parse($cookies.get('remeber_me'));
            $scope.loginData.Keyword = rem_info.Keyword;
            $scope.loginData.Password = rem_info.Password;
            $scope.loginData.remeber_me = rem_info.remeber_me;
        }
        /**
         * Login with Phone number
         */
        $scope.isOtp = false;
        $scope.loginDataPhone = {};
        $scope.OtpSignIn = function (form) {
            var $data = {};
            $scope.helpers = Mobiweb.helpers;
            $scope.login_error = false;
            $scope.login_message = ''; //login message
            $scope.LoginSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.CaptchaEnable == 'Yes' && $scope.SigninCaptchaResponse == '') { //if string is empty
                $scope.errorMessageShow("Please resolve the captcha and submit!")
            } else {
                $scope.loginDataPhone.DeviceType = 'Native';
                $scope.loginDataPhone.Source = 'Otp';
                if ($scope.CaptchaEnable == 'Yes') {
                    $scope.loginDataPhone["g-recaptcha-response"] = $scope.SigninCaptchaResponse;
                    $scope.loginDataPhone.RequestType = 'WEB';
                }
                var $data = $scope.loginDataPhone;
                appDB
                    .callPostForm('signin/OtpSignIn', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.successMessageShow('OTP has been sent successfully.');
                                $scope.LoginSubmitted = false;
                                $scope.isOtp = true;
                                $scope.CaptchaEnable == 'No';
                            }
                        },
                        function errorCallback(data) {
                            if ($scope.CaptchaEnable == 'No' && data.CaptchaEnable == 'Yes') {
                                $scope.CaptchaEnable = data.CaptchaEnable;
                                $timeout(function () {
                                    $scope.WidgetIdSignin = grecaptcha.render(document.getElementById('CaptchaEnabled1'), {
                                        'sitekey': $scope.CaptchaSITEKey,
                                        'callback': verifyCallback,
                                    });
                                }, 500)
                            } else if (data.CaptchaEnable == 'Yes') {
                                $scope.SigninCaptchaResponse = '';
                                grecaptcha.reset($scope.WidgetIdSignin)
                            } else if(data.CaptchaEnable == 'No'){
                                $scope.CaptchaEnable = 'No';
                            }
                            $scope.checkResponseCode(data);
                        });
            }
        }

        /*Login*/

        $scope.LoginSubmitted = false;
        $scope.CaptchaEnable = 'No';
        $scope.SigninCaptchaResponse = '';
        $scope.WidgetIdSignin = '';
        $scope.signIn = function (form) {
            var $data = {};
            $scope.helpers = Mobiweb.helpers;
            $scope.login_error = false;
            $scope.login_message = ''; //login message
            $scope.LoginSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.CaptchaEnable == 'Yes' && $scope.SigninCaptchaResponse == '') { //if string is empty
                $scope.errorMessageShow("Please resolve the captcha and submit!")
            } else {
                if ($scope.loginType == 'phone') {
                    $scope.loginDataPhone.DeviceType = 'Native';
                    $scope.loginDataPhone.Source = 'Otp';
                    if ($scope.CaptchaEnable == 'Yes') {
                        $scope.loginDataPhone["g-recaptcha-response"] = $scope.SigninCaptchaResponse;
                        $scope.loginDataPhone.RequestType = 'WEB';
                    }
                    var $data = $scope.loginDataPhone;
                } else {
                    $scope.loginData.DeviceType = 'Native';
                    $scope.loginData.Source = 'Direct';
                    if ($scope.CaptchaEnable == 'Yes') {
                        $scope.loginData["g-recaptcha-response"] = $scope.SigninCaptchaResponse;
                        $scope.loginDataPhone.RequestType = 'WEB';
                    }
                    var $data = $scope.loginData;
                }
                appDB
                    .callPostForm('signin', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data) && data.Data != '') {
                                // if (data.Data.PhoneStatus == 'Pending') {
                                //     $scope.signInUserInfo = data.Data;
                                //     $scope.isSigninOtp = false;
                                //     $scope.submittedSinginOTP = false;
                                //     $scope.signinOTP = {};
                                //     $scope.openPopup('verifyMobileOnSignin');
                                // } else {
                                if ($scope.loginData.remeber_me) {
                                    $remember('remeber_me', JSON.stringify($data));
                                } else {
                                    $cookies.remove('remeber_me');
                                }
                                $localStorage.user_details = data.Data;
                                $localStorage.isLoggedIn = true;
                                $sessionStorage.walletBalance = data.Data.WalletAmount;
                                window.location.href = base_url + 'lobby';
                                $scope.CaptchaEnable == 'No';
                                // }
                                //  $scope.loginData = {};
                            }
                        },
                        function errorCallback(data) {
                            if ($scope.CaptchaEnable == 'No' && data.CaptchaEnable == 'Yes') {
                                $scope.CaptchaEnable = data.CaptchaEnable;
                                $timeout(function () {
                                    $scope.WidgetIdSignin = grecaptcha.render(document.getElementById(($scope.loginType == 'phone') ? 'CaptchaEnabled1' : 'CaptchaEnabled'), {
                                        'sitekey': $scope.CaptchaSITEKey,
                                        'callback': verifyCallback,
                                    });
                                }, 500)
                            } else if (data.CaptchaEnable == 'Yes') {
                                $scope.SigninCaptchaResponse = '';
                                grecaptcha.reset($scope.WidgetIdSignin)
                            }
                            $scope.checkResponseCode(data)
                        });
            }

        }
        var verifyCallback = function (response) {
            $scope.SigninCaptchaResponse = response;
        };
        $scope.formData = {};

        if (getQueryStringValue('referral')) {
            $scope.formData.ReferralCode = getQueryStringValue('referral');
            $rootScope.activeTabLogin = 'signup';
        }

        /*signUp*/
        $scope.signpOTP = false;
        $scope.signupSubmitted = false;
        $scope.WidgetIdSignup = '';
        $scope.CaptchaEnabledSignup = 'No';
        $scope.SignupCaptchaResponse = '';
        $scope.SignupPhoneNumber = '';
        $scope.signUp = function (form) {
            var $data = {};
            $scope.helpers = Mobiweb.helpers;
            $scope.signup_error = false;
            $scope.signup_message = ''; //login message
            $scope.signupSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.CaptchaEnabledSignup == 'Yes' && $scope.SignupCaptchaResponse == '') { //if string is empty
                $scope.errorMessageShow("Please resolve the captcha and submit!")
            } else {
                $scope.SignupPhoneNumber = $scope.formData.PhoneNumber;
                $scope.formData.UserTypeID = 2;
                $scope.formData.Source = 'Direct';
                $scope.formData.LoginType = 'Web';
                $scope.formData.DeviceType = 'Native';
                if ($scope.CaptchaEnabledSignup == 'Yes' && $scope.SignupCaptchaResponse != '') {
                    $scope.formData["g-recaptcha-response"] = $scope.SignupCaptchaResponse;
                    $scope.formData.RequestType = 'WEB';
                }
                var data = $scope.formData;
                appDB
                    .callPostForm('signup', data)
                    .then(
                        function success(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.openPopup('verifyMobile');
                                $scope.formData = {};
                                $scope.signupSubmitted = false;
                                $scope.LoginSubmitted = false;
                                $scope.confrim_password = '';
                                $scope.CaptchaEnabledSignup == 'No';
                            }
                        },
                        function error(data) {
                            if ($scope.CaptchaEnabledSignup == 'No' && data.CaptchaEnable == 'Yes') {
                                $scope.CaptchaEnabledSignup = data.CaptchaEnable;
                                $timeout(function () {
                                    $scope.WidgetIdSignup = grecaptcha.render(document.getElementById('SignUpCaptchaEnabled'), {
                                        'sitekey': $scope.CaptchaSITEKey,
                                        'callback': signupCaptchaCallback,
                                    });
                                }, 500)
                            } else if (data.CaptchaEnable == 'Yes') {
                                $scope.SignupCaptchaResponse = '';
                                grecaptcha.reset($scope.WidgetIdSignup)
                            }
                            $scope.checkResponseCode(data)
                        });
            }
        }
        var signupCaptchaCallback = function (response) {
            $scope.SignupCaptchaResponse = response;
        }
        /**
         * open forget password modal
         */
        $scope.WidgetIdForget = '';
        $scope.CaptchaEnabledForgetPassword = 'No';
        $scope.forgetPasswordWindow = function () {
            if ($scope.CaptchaEnabledForgetPassword == 'No') {
                $timeout(function () {
                    $scope.WidgetIdForget = grecaptcha.render(document.getElementById('ForgetPasswordCaptcha'), {
                        'sitekey': $scope.CaptchaSITEKey,
                        'callback': verifyForgetPasswordCallback,
                    });
                }, 500)
                $scope.CaptchaEnabledForgetPassword = 'Yes';
            } else if ($scope.CaptchaEnabledForgetPassword == 'Yes') {
                $scope.ForgetPasswordResponse = '';
                grecaptcha.reset($scope.WidgetIdForget);
            }
            $scope.openPopup('forgotPassword')
        }

        $scope.ForgetPasswordResponse = '';
        var verifyForgetPasswordCallback = function (response) {
            $scope.ForgetPasswordResponse = response;
        }
        // Verify mobile on signup
        $scope.verifyOTPSubmitted = false;
        $scope.verifySignupOTP = function (form) {
            $scope.helpers = Mobiweb.helpers;
            $scope.verifyOTPSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            $scope.formData.DeviceType = 'Native';
            $scope.formData.Source = 'Direct';
            $scope.formData.OTP = $scope.OTP;
            $scope.formData.PhoneNumber = $scope.SignupPhoneNumber;
            var data = $scope.formData;
            appDB
                .callPostForm('signup/verifyPhoneNumber', data)
                .then(
                    function success(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('verifyMobile');
                            $scope.successMessageShow('Your account is verified,Please Signin.');
                            $rootScope.activeTabLogin = 'login';
							//this number must be replaced with an actual User ID from the database (primary key)
							window.dataLayer = window.dataLayer || [];
							window.dataLayer.push({
							'event' : 'sign_up',
							'userId' : data.Data.UserGUID
							})
                        }
                    },
                    function error(data) {
                        $scope.checkResponseCode(data)
                    });
        }

        /* send forgot password email */
        $scope.forgotPasswordData = {};
        $scope.forgotEmailSubmitted = false;
        $scope.sendEmailForgotPassword = function (form) {
            $scope.forgotEmailSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            if ($scope.ForgetPasswordResponse === "") { //if string is empty
                $scope.errorMessageShow("Please resolve the captcha and submit!")
            } else {
                $scope.data.listLoading = true;
                var data = { "g-recaptcha-response": $scope.ForgetPasswordResponse };
                data.type = ($scope.CheckEmail($scope.forgotPasswordData.Keyword)) ? 'Email' : 'Phone';
                data.Keyword = $scope.forgotPasswordData.Keyword;
                data.RequestType = 'WEB';
                appDB
                    .callPostForm('recovery', data)
                    .then(
                        function success(data) {
                            $scope.data.listLoading = false;
                            if ($scope.checkResponseCode(data)) {
                                $scope.closePopup('forgotPassword');
                                $scope.openPopup('verifyForgotPassword');
                                $scope.successMessageShow(data.Message);
                                $scope.forgotPasswordData = {};
                            }
                        },
                        function error(data) {
                            $scope.data.listLoading = false;
                            if ($scope.CaptchaEnabledForgetPassword == 'Yes') {
                                $scope.ForgetPasswordResponse = '';
                                grecaptcha.reset($scope.WidgetIdForget);
                            }
                            $scope.checkResponseCode(data)
                        });
            }
        }

        /* verify forgot password & create new password */
        $scope.forgotPassword = {};
        $scope.forgotPasswordSubmitted = false;
        $scope.verifyForgotPassword = function (form) {
            $scope.forgotPasswordSubmitted = true;
            if (!form.$valid) {
                return false;
            }
            $scope.data.listLoading = true;
            var data = $scope.forgotPassword;
            appDB
                .callPostForm('recovery/setPassword', data)
                .then(
                    function success(data) {
                        $scope.data.listLoading = false;
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('verifyForgotPassword');
                            $scope.successMessageShow(data.Message);
                            $scope.forgotPassword = {};
                        }
                    },
                    function error(data) {
                        $scope.data.listLoading = false;
                        $scope.checkResponseCode(data);
                    });
        }

        /*Social Login*/
        $scope.SocialLogin = function (Source) {
            $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
                var $data = {};
                $scope.formData = {};

                $scope.formData.UserTypeID = 2;
                $scope.formData.Source = Source;
                $scope.formData.Password = userDetails.uid;
                $scope.formData.DeviceType = 'Native';
                var $data = $scope.formData;
                appDB
                    .callPostForm('signin', $data)
                    .then(
                        function successCallback(data) {

                            if (data.ResponseCode == 200) {

                                $localStorage.user_details = data.Data;
                                $localStorage.isLoggedIn = true;
                                $localStorage.SocialLogin = true;
                                $sessionStorage.walletBalance = data.Data.WalletAmount;
                                $scope.loginData = {};
                                window.location.href = base_url + 'lobby';
                            }
                            if (data.ResponseCode == 500) {
                                var $data = {};
                                delete $scope.formData;
                                $scope.formData = {};

                                $scope.formData.UserTypeID = 2;
                                $scope.formData.Source = Source;
                                $scope.formData.SourceGUID = userDetails.uid;
                                $scope.formData.FirstName = userDetails.name;
                                $scope.formData.DeviceType = 'Native';
                                $scope.formData.Email = userDetails.email;
                                $scope.formData.LoginType = 'Web';
                                var $data = $scope.formData;
                                appDB
                                    .callPostForm('signup', $data)
                                    .then(
                                        function success(data) {
                                            if (data.ResponseCode == 200) {
                                                $localStorage.SocialLogin = true;
                                                $localStorage.user_details = data.Data;
                                                $localStorage.isLoggedIn = true;
                                                $sessionStorage.walletBalance = data.Data.WalletAmount;

                                                window.location.href = base_url + 'lobby';
                                            }

                                            if (data.ResponseCode == 500) {
                                                var toast = toastr.warning(data.Message);
                                                toastr.refreshTimer(toast, 5000);
                                            }

                                            if (data.ResponseCode == 501) {
                                                var toast = toastr.error(data.Message);
                                                toastr.refreshTimer(toast, 5000);
                                            }

                                        },
                                        function error(data) {
                                            if (typeof data == 'object') {

                                                var toast = toastr.error(data.Message, {
                                                    closeButton: true
                                                });
                                                toastr.refreshTimer(toast, 5000);

                                            }
                                        });
                            }
                        },
                        function errorCallback(data) {
                            delete $scope.formData;
                            var $data = {};
                            $scope.formData = {};
                            $scope.formData.UserTypeID = 2;
                            $scope.formData.Source = Source;
                            $scope.formData.SourceGUID = userDetails.uid;
                            $scope.formData.FirstName = userDetails.name;
                            $scope.formData.DeviceType = 'Native';
                            $scope.formData.Email = userDetails.email;
                            $scope.formData.LoginType = 'Web';
                            var $data = $scope.formData;

                            appDB
                                .callPostForm('signup', $data)
                                .then(
                                    function success(data) {
                                        if (data.ResponseCode == 200) {
                                            $localStorage.user_details = data.Data;
                                            $localStorage.isLoggedIn = true;
                                            $sessionStorage.walletBalance = data.Data.WalletAmount;
                                            window.location.href = base_url + 'lobby';
                                        }

                                        if (data.ResponseCode == 500) {
                                            var toast = toastr.warning(data.Message);
                                            toastr.refreshTimer(toast, 5000);
                                        }

                                        if (data.ResponseCode == 501) {
                                            var toast = toastr.error(data.Message);
                                            toastr.refreshTimer(toast, 5000);
                                        }

                                    },
                                    function error(data) {
                                        if (typeof data == 'object') {

                                            var toast = toastr.error(data.Message, {
                                                closeButton: true
                                            });
                                            toastr.refreshTimer(toast, 5000);

                                        }
                                    });
                        });

            });
        }

        // Check email
        $scope.CheckEmail = function (mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Verify mobile on signin
         */
        $scope.isSigninOtp = false;
        $scope.submittedSinginOTP = false;
        $scope.signinOTP = {};
        $scope.verifySigninOTP = function (form) {
            $scope.helpers = Mobiweb.helpers;
            $scope.submittedSinginOTP = true;
            if (!form.$valid) {
                return false;
            }
            var $data = {};
            if (!$scope.isSigninOtp) {
                $data.PhoneNumber = $scope.signinOTP.signinPhoneNumber;
                $data.SessionKey = $scope.signInUserInfo.SessionKey;
                appDB
                    .callPostForm('users/updateUserInfo', $data)
                    .then(
                        function success(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.isSigninOtp = true;
                            }
                        },
                        function error(data) {
                            $scope.checkResponseCode(data);
                        });
            } else {
                $data.OTP = $scope.signinOTP.OTP;
                $data.SessionKey = $scope.signInUserInfo.SessionKey;
                $data.DeviceType = 'Native';
                $data.Source = 'Direct';
                $data.PhoneNumber = $scope.signinOTP.signinPhoneNumber;
                appDB
                    .callPostForm('signup/verifyPhoneNumber', $data)
                    .then(
                        function success(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.isSigninOtp = false;
                                $scope.closePopup('verifyMobileOnSignin');
                                $scope.successMessageShow('Your account is verified');
                                $localStorage.user_details = $scope.signInUserInfo;
                                $localStorage.isLoggedIn = true;
                                $sessionStorage.walletBalance = $scope.signInUserInfo.WalletAmount;
                                window.location.href = base_url + 'lobby';
                            }
                        },
                        function error(data) {
                            $scope.checkResponseCode(data);
                        });
            }
        }
    } else {
        window.location.href = base_url + 'lobby';
    }
}]);