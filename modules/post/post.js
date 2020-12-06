var app = angular.module("WebApp", []);
app.controller("postCtrl", function($scope, $http){
    $scope.post = {};
    $scope.index = 0;

    let currentUrl = window.location.href
    let idPost = currentUrl.replace(".html", "").replace("http://127.0.0.1:5500/modules/post/", "")
   
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/detail?idPost=" + idPost,
    }).then(function(response){
        $scope.post = response.data[0];
        console.log($scope.post);
    }, function (error) {
        console.log(error);
    })

})

