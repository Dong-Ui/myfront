var app = angular.module("WebApp", []);


app.controller("serviceCtrl", function ($scope, $http) {


    $scope.listAll = [];

    $scope.load = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/services",
        }).then(function (response) {
            $scope.listAll = response.data;
            console.log($scope.listAll)
        }, function (error) {
            console.log(error);
        })
    }
    $scope.load();

    // $scope.delete = function (item) {
    //     console.log(item._idServices)
    //     $http({
    //         method: 'DELETE',
    //         url: 'http://localhost:8080/services/delete/' + item._idServices,
    //     }).then(function (response) {
    //         console.log(response)
    //         $scope.load();
           
    //     }, function (error) {
    //         console.log(error);
    //     });
    // }

    $scope.edit
    $scope.delete = function (item) {
        console.log(item._idServices)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/services/delete?idService=' + item._idServices,
        }).then(function (response) {
            console.log(response)
            $scope.load();
           
        }, function (error) {
            console.log(error);
        });
    }
});
