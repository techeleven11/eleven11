'use strict';

app.controller('couponController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', function($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr) {
    $scope.env = environment;
    $scope.CouponsList = [];
    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
    $scope.TotalCoupons = 0;
    $scope.getCoupons = function() {
        var $data = {};
        $data.SessionKey = $localStorage.user_details.SessionKey;
        $data.Status = 'Active';
        appDB
            .callPostForm('store/getCoupons', $data)
            .then(
                function successCallback(data) {
                    if ($scope.checkResponseCode(data) && data.Data.hasOwnProperty('Records') == true) {
                        $scope.TotalCoupons = data.Data.TotalRecords;
                        $scope.CouponsList = data.Data.Records;
                    }
                },
                function errorCallback(data) {
                    $scope.checkResponseCode(data);
                }
            );
    }
    $scope.copyText = function (CouponGUID) {
        var copyText = document.getElementById("CouponCode"+CouponGUID);
        function isOS() {
            return navigator.userAgent.match(/ipad|iphone/i);
        }
        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(copyText);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            copyText.setSelectionRange(0, 999999);
        } else {
            copyText.select();
        }
        document.execCommand("copy");
        $scope.successMessageShow('CODE COPIED.');
    }
}else{
    window.location.href = base_url;
}

}]);