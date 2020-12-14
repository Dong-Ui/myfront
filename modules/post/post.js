var app = angular.module("WebApp", []);
app.controller("postCtrl", function($scope, $http){
    $scope.urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
    $scope.username_cus = "";
    $scope.check_nav_user = true;
    $scope.post = {};
    $scope.index = 0;

    let currentUrl = window.location.href
    let idPost = currentUrl.replace(".html", "").replace("http://127.0.0.1:5500/modules/post/", "")
   
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/detail?idPost=" + idPost,
    }).then(function(response){
        $scope.post = response.data[0];
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

