var app = angular.module("WebApp", []);

app.controller("listPostCtrl", function($scope, $http){
    $scope.posts = [];

    let currentUrl = window.location.href
    let idProvince = currentUrl.replace(".html", "").replace("http://127.0.0.1:5500/modules/list_post/province", "")

    $http({
        method: "GET",
        url: "http://localhost:8080/posts/ProviceId?provinceId=" + idProvince,
    }).then(function(response){
        $scope.posts = response.data;
    }, function (error) {
        console.log(error);
    })

    $scope.redirect = function(id_post){
        $http({
            method: "GET",
            url: "http://localhost:8080/fileHtml?idPost=" + id_post,
        }).then(function(response){
            console.log(response.status_code());
        }, function (error) {
            console.log(error);
        })
    }
})
