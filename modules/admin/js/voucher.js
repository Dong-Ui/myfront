var app = angular.module("WebApp", []);
app.controller("voucherCtrl", function ($scope, $http) {
    $scope.listAll = [];
    $scope.voucher = {};
    $scope.table = true;
    $scope.load = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/vouchers",
        }).then(function (response) {
            $scope.listAll = response.data;
            $scope.listAll.forEach(element => {
                element.discount = Number(element.discount.replace("%", ""));
            });
            console.log($scope.listAll)
        }, function (error) {
            console.log(error);
        })
    }
    $scope.load();
    $scope.add = function () {
        $scope.messagedelete = "";
        $scope.table = false;
        var i = $scope.listAll[$scope.listAll.length - 1]["_idVoucher"].indexOf("C");
        var u = $scope.listAll[$scope.listAll.length - 1]["_idVoucher"].length
        if($scope.listAll[$scope.listAll.length - 1]["_idVoucher"].substring(i+1,u).search("0") == 0){
            var z = Number($scope.listAll[$scope.listAll.length - 1]["_idVoucher"].substring(i+2,u))
            $scope.voucher._idVoucher = "CV0" +(z+1);
        } else {
            var z = Number($scope.listAll[$scope.listAll.length - 1]["_idVoucher"].substring(i+1,u))    
            $scope.voucher._idVoucher = "VC" +(z+1);
        }
    }

    $scope.back = function () {
        $scope.table = true;
        $scope.voucher = {}
    }
    $scope.submit = function () {
        $scope.voucher.admins = $scope.admin;
        $scope.voucher.discount = ($scope.voucher.discount + "%").toString();
        console.log($scope.voucher)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/vouchers/new',
            data: JSON.stringify($scope.voucher)
        }).then(function (response) {
            console.log(response)
            $scope.message = "Lưu thành công!"
            $scope.load();
        }, function (error) {
            console.log(error);
            $scope.message = "Lưu không thành công!"
        });
    }

    $scope.edit = function (item) {
        $scope.table = false;
        $scope.voucher = item;    
        console.log($scope.voucher.endDate)
        var date = new Date($scope.voucher.endDate);
        $scope.voucher.endDate = date;
    }
   
    $scope.delete = function (item) {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/vouchers/delete',
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