var app = angular.module("WebApp", []);

app.controller("homeCtrl", function ($scope, $http) {
    $scope.urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
    $scope.urlProfile = "http://127.0.0.1:5500/modules/profile/user/profile-page.html"

    $scope.provinces = [];
    $scope.reDaLat = [];
    $scope.reBrvt = [];
    $scope.reHue = [];
    $scope.username_cus = "";
    $scope.check_nav_user = true;

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
            url: "http://localhost:8080/fileHtml/listPost?idProvince=" + id_province,
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
        url: "http://localhost:8080/posts/length/ProviceId?provinceId=44",
    }).then(function (response) {
        $scope.reDaLat = response.data;
    }, function (error) {
        console.log(error);
    })

    //Recomment reBrvt:
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/length/ProviceId?provinceId=49",
    }).then(function (response) {
        $scope.reBrvt = response.data;
    }, function (error) {
        console.log(error);
    })

    //Recomment reHue:
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/length/ProviceId?provinceId=31",
    }).then(function (response) {
        $scope.reHue = response.data;
    }, function (error) {
        console.log(error);
    }) 

    //Get Cookies
    $scope.getCookie =  function(cname) {
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

    //Get User
    $scope.username_cus = $scope.getCookie("CUSTOMERS_NAME")

    if($scope.username_cus == ""){
        $scope.check_nav_user = true;
    }else{
        $scope.check_nav_user = false;
    }

    //Log out
    $scope.logOut = function(){
        document.cookie = "CUSTOMERS_NAME=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace($scope.urlLogin);
    }

})


