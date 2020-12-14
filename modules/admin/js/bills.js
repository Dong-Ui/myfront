var app = angular.module("WebApp", []);


app.controller("billsCtrl", function ($scope, $http) {


    $scope.listAll = [];

    $http({
        method: "GET",
        url: "http://localhost:8080/bill/thongkedoanhthu",
    }).then(function (response) {
        $scope.listAll = response.data;
        console.log($scope.listAll)
        console.log($scope.listAll[0])
    }, function (error) {
        console.log(error);
    })
    $scope.allAdmin = [];
    $scope.getallAdmin = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/admins',
        }).then(function (response) {
            $scope.allAdmin = response.data;
            if ($scope.idadmin.search("@gmail.com") == -1) {
                $scope.allAdmin.forEach(element => {
                    if (element.idAdmin == $scope.idadmin) {
                        $scope.admin = element;
                    }
                });
            } else {
                $scope.allAdmin.forEach(element => {
                    if (element.email == $scope.idadmin) {
                        $scope.admin = element;
                    }
                });
            }
        }, function (error) {
            console.log(error);
        });
    }
    $scope.getallAdmin()
    //Get Cookies
    $scope.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //Get Admin
    $scope.idadmin = $scope.getCookie("ADMIN");

});