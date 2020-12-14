var app = angular.module("WebApp", []);
app.controller("loginCtrl", function ($scope, $http) {
    $scope.admin = {};

    const urlIndex = "http://127.0.0.1:5500/modules/admin/index.html";
    const urlLogin = "http://127.0.0.1:5500/modules/admin/login.html";
       
    $scope.submit = function () {
        if ($scope.admin.Email.search("@gmail") == -1) {
            $scope.admin = {
                "idAdmin": $scope.admin.Email,
                "passWord" : $scope.admin.passWord
            }
        } else {
            $scope.admin = {
                "idAdmin": $scope.admin.Email,
                "passWord" : $scope.admin.passWord
            }
        }
        $http({
            method: "POST",
            url: "http://localhost:8080/loginAdmin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: JSON.stringify($scope.admin),
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }).then(function (response) {
            $scope.message = response.data;
            document.cookie = "ADMIN=" + $scope.admin.idAdmin + ";path=/"
            window.location.replace(urlIndex);
        }, function (error) {
            console.log(error);
            window.location.replace(urlLogin);
        })
    }
});