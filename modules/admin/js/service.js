var app = angular.module("WebApp", []);


app.controller("serviceCtrl", function ($scope, $http) {
    $scope.listAll = [];
    $scope.service = {};
    $scope.service.status = "true";
    $scope.load = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/services",
        }).then(function (response) {
            $scope.listAll = response.data;
            $scope.checkerorr = $scope.listAll.length;
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
    $scope.table = false;
    $scope.edit = function(item){
        $scope.service = item
        $scope.table = true;
      
        
    }    
    $scope.delete = function (item) {     
        $http({
            method: 'POST',
            url: 'http://localhost:8080/services/delete?idService=' + item._idServices,
            transformResponse: [
                function (item) {
                    return item;
                }
            ]
        }).then(function (response) {
            $scope.messagedelete = response.data;
            $scope.load();              
        }, function (error) {
            console.log(error);
        });   
    }

    $scope.add = function () {
        $scope.messagedelete = "";
        $scope.table = true;
        var i = $scope.listAll[$scope.listAll.length - 1]["_idServices"].indexOf("V");
        var u = $scope.listAll[$scope.listAll.length - 1]["_idServices"].length
        if($scope.listAll[$scope.listAll.length - 1]["_idServices"].substring(i+1,u).search("0") == 0){
            var z = Number($scope.listAll[$scope.listAll.length - 1]["_idServices"].substring(i+2,u))
            $scope.service._idServices = "DV0" +(z+1);
        } else {
            var z = Number($scope.listAll[$scope.listAll.length - 1]["_idServices"].substring(i+1,u))
            $scope.service._idServices = "DV" +(z+1);
        }
    }
    $scope.back = function () {
        $scope.table = false;
        $scope.service = {}
    }
    $scope.submit = function () {
        $scope.service.admins = $scope.admin;
        console.log($scope.service)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/services/new',
            data: JSON.stringify($scope.service)
        }).then(function (response) {
            console.log(response)
            $scope.message = "Lưu thành công!"
            $scope.load();
        }, function (error) {
            console.log(error);
            $scope.message = "Lưu không thành công!"
        });
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
            console.log($scope.allAdmin)
            console.log($scope.admin)
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
