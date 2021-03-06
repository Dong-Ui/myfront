var app = angular.module("WebApp", []);

app.controller("listPostCtrl", function($scope, $http){
    //redirect
    $scope.urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
    $scope.username_cus = "";
    $scope.check_nav_user = true;

    //posts
    $scope.posts = [];

    //pagination
    $scope.totalPosts = 0;
    $scope.limit = 20;
    $scope.maxPage = 0;
    $scope.dict_page = {};
    $scope.listPage = []


    //check btn back, next
    $scope.checkBack = false;
    $scope.checkNext = true;

    let currentUrl = window.location.href;
    let idProvince = currentUrl.replace(".html", "").replace("http://127.0.0.1:5500/modules/list_post/province", "");

    //length posts.
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/length/ProviceId?provinceId=" + idProvince,
    }).then(function(response){
        $scope.totalPosts = response.data.length;
        $scope.maxPage = Math.ceil($scope.totalPosts/$scope.limit);
        for(let i = 1; i < $scope.maxPage; i++){
            // $scope.dict_page["numPage"] = i;
            // $scope.dict_page["urlPage"] = 
            $scope.listPage.push(i);
        };
    }, function (error) {
        console.log(error);
    });

    $scope.showPosts = function(page){
        $http({
            method: "GET",
            url: "http://localhost:8080/posts/ProviceId?provinceId=" + idProvince + "&page=" + page,
        }).then(function(response){
            $scope.posts = response.data;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.showPosts(0)

    //Redirect to post detail follow idPost
    $scope.redirect = function(id_post){
        $http({
            method: "GET",
            url: "http://localhost:8080/fileHtml?idPost=" + id_post,
        }).then(function(response){
            console.log(response.status_code());
        }, function (error) {
            console.log(error);
        })
    };

    $scope.changeActive = function(idPageChoosen){
        $("ul > .active").removeClass("active");
        $("#" + idPageChoosen).addClass("active");

        if(Number(idPageChoosen) == ($scope.maxPage-1)){
            $scope.checkNext = false;
            $scope.checkBack = true;
        }else{
            $scope.checkNext = true;
        }

        if(Number(idPageChoosen) == 0){
            $scope.checkBack = false;
            $scope.checkNext = true;
        }else{
            $scope.checkBack = true;
        }

        $scope.showPosts(idPageChoosen)
    }

    $scope.btnNext = function(){
        idPageChoosen = Number($("ul > .active").attr("id"));
        $("ul > .active").removeClass("active");
        $("#" + (idPageChoosen + 1)).addClass("active");

        if(idPageChoosen < ($scope.maxPage-2)){        
            $scope.checkNext = true;
            $scope.checkBack = true;
        }else{
            $scope.checkNext = false;
        }

        $scope.showPosts(idPageChoosen + 1)
    }

    $scope.btnBack = function(){
        idPageChoosen = Number($("ul > .active").attr("id"));
        $("ul > .active").removeClass("active");
        $("#" + (idPageChoosen - 1)).addClass("active");
        if(idPageChoosen > 1){
            $scope.checkBack = true;
            $scope.checkNext = true;
        }else{
            $scope.checkBack = false;
        }    

        $scope.showPosts(idPageChoosen - 1)
    }

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
