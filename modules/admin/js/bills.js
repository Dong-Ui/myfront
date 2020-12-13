var app = angular.module("WebApp", []);


app.controller("billsCtrl", function ($scope, $http) {


    $scope.listAll = [];

    $http({
        method: "GET",
        url: "http://localhost:8080/bill/thongkedoanhthu",
    }).then(function (response) {
        $scope.listAll = response.data;
        console.log($scope.listAll)
    }, function (error) {
        console.log(error);
    })

});