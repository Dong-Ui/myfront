var app = angular.module("WebApp", []);
app.controller("cardCtrl", function ($scope, $http) {
    $scope.listAll = [];
    $scope.post = {}
    $scope.table = false;
    $scope.load = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/posts",
        }).then(function (response) {
            $scope.listAll = response.data;
            console.log($scope.listAll)
        }, function (error) {
            console.log(error);
        })
    }
    $scope.load();
    $scope.submit = function () {
        $scope.post.admins = $scope.admin;
        console.log($scope.post)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/posts/new',
            data: JSON.stringify($scope.post)
        }).then(function (response) {
            console.log(response)
            $scope.message = "Lưu thành công!"
            $scope.load();
        }, function (error) {
            console.log(error);
            $scope.message = "Lưu không thành công!"
        });
    }

    $scope.delete = function(item){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/posts/delete',
            data: JSON.stringify(item),
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }).then(function (response) {
            console.log(response.data)
            $scope.messagedelete = response.data;
            $scope.load();
        }, function (error) {
            console.log(error);
        });
    }
    $scope.add = function () {
        $scope.messagedelete = "";
        $scope.table = true;
        $scope.post.idPost = Number($scope.listAll[$scope.listAll.length - 1]["idPost"]) + 1;
        // $scope.post.postDate = new Date().toLocaleDateString()
        $scope.post.postDate = new Date()
        console.log( $scope.post.postDate)
    }
    $scope.back = function () {
        $scope.table = false;
        $scope.post = {}
    }
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