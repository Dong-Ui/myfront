var app = angular.module("WebApp", []);

app.controller("homeCtrl", function ($scope, $http) {
    $scope.provinces = [];
    $scope.reDaLat = []
    $scope.reBrvt = []
    $scope.reHue = []

    $http({
        method: "GET",
        url: "http://localhost:8080/posts/province",
    }).then(function (response) {
        $scope.provinces = response.data;
    }, function (error) {
        console.log(error);
    })

    $scope.redirect = function (id_province) {
        $http({
            method: "GET",
            url: "http://localhost:8080//fileHtml/listPost?idProvince=" + id_province,
        }).then(function (response) {
            console.log(response.status_code());
        }, function (error) {
            console.log(error);
        })
    }

    $scope.redirect_post = function(id_post){
        $http({
            method: "GET",
            url: "http://localhost:8080/fileHtml?idPost=" + id_post,
        }).then(function(response){
            console.log(response.status_code());
        }, function (error) {
            console.log(error);
        })
    }

    //Recomment DaLat:
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/ProviceId?provinceId=44",
    }).then(function (response) {
        $scope.reDaLat = response.data;
    }, function (error) {
        console.log(error);
    })

    //Recomment reBrvt:
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/ProviceId?provinceId=49",
    }).then(function (response) {
        $scope.reBrvt = response.data;
    }, function (error) {
        console.log(error);
    })

    //Recomment reHue:
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/ProviceId?provinceId=31",
    }).then(function (response) {
        $scope.reHue = response.data;
    }, function (error) {
        console.log(error);
    }) 
})


