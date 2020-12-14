var app = angular.module("WebApp", []);
app.controller("postCtrl", function ($scope, $http) {
    $scope.urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
    $scope.username_cus = "";
    $scope.check_nav_user = true;
    $scope.post = {};
    $scope.index = 0;
    $scope.bill = {};

    let currentUrl = window.location.href
    let idPost = currentUrl.replace(".html", "").replace("http://127.0.0.1:5500/modules/post/", "")

    $http({
        method: "GET",
        url: "http://localhost:8080/posts/detail?idPost=" + idPost,
    }).then(function (response) {
        $scope.post = response.data[0];
        document.getElementById("collapseSummary").innerHTML = $scope.post["content"]
    }, function (error) {
        console.log(error);
    })

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

    //Get User
    $scope.username_cus = $scope.getCookie("CUSTOMERS_NAME")

    if ($scope.username_cus == "") {
        $scope.check_nav_user = true;
    } else {
        $scope.check_nav_user = false;
    }

    //Log out
    $scope.logOut = function () {
        document.cookie = "CUSTOMERS_NAME=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace($scope.urlLogin);
    }


    $scope.user = {};


    $scope.loaduser = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/customers',
        }).then(function (response) {
            console.log(response.data)
            response.data.forEach(element => {
                if (element.userName == $scope.username_cus) {
                    $scope.user = element;
                }
            });
            console.log($scope.user)
        }, function (error) {
            console.log(error);
        });
    }
    $scope.loaduser()
    $scope.opentab = function () {
        var d = document.getElementById("start").value;
        var d1Parts = d.split("/");
        var d1 = new Date(+d1Parts[2], d1Parts[1] - 1, +d1Parts[0]);

        var dateString = document.getElementById("end").value;
        var dateParts = dateString.split("/");
        var d2 = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        $scope.bill.startDate = d1;
        $scope.bill.endDate = d2;
        // console.log("Ngày bắt đầu: " + d1)
        // console.log("Ngày kết thúc: " + d2)
        console.log("Ngày chênh lệch: ", parseInt((d2 - d1) / (24 * 3600 * 1000)))
        var u = parseInt((d2 - d1) / (24 * 3600 * 1000))
        var y = parseInt($scope.post.price.substring(0, $scope.post.price.length - 1).replace(",", ""))
        $scope.tong = u*y;
        $scope.bill.vouchers = "";
        document.getElementById("exampleInputvoucher").value = "";
            $scope.bill.totalCash = formatMoney($scope.tong);
        
        console.log($scope.bill.totalCash)
        $scope.getbill();
        $scope.findpost();
    }

    $scope.listbill = [];
    $scope.getbill = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/bill/thongkedoanhthu",
        }).then(function (response) {
            $scope.listbill = response.data;
            $scope.bill["idBill"] = Number($scope.listbill[$scope.listbill.length - 1]["idBill"]) + 1;
        }, function (error) {
            console.log(error);
        })
    }

    const input = document.querySelector('#exampleInputvoucher');
    input.addEventListener('input', updateValue);
    $scope.listvoucher = [];
    function updateValue(e) {
        console.log(e.target.value)
        $http({
            method: "GET",
            url: "http://localhost:8080/vouchers",
        }).then(function (response) {
            $scope.listvoucher = response.data;
            $scope.listvoucher.forEach(element => {
                element.discount = Number(element.discount.replace("%", ""));
            });
            $scope.listvoucher.forEach(element => {
                if(element._idVoucher == document.getElementById("exampleInputvoucher").value){
                    $scope.bill.totalCash =  formatMoney(($scope.tong / 100) * (100-element.discount));
                    $scope.bill.vouchers = element;
                }             
            });
        }, function (error) {
            console.log(error);
        })
    }

    $scope.postfind = {}
    $scope.findpost = function(){
        $http({
            method: "GET",
            url: "http://localhost:8080/posts/find/" + idPost,
        }).then(function (response) {
            $scope.postfind = response.data
        }, function (error) {
            console.log(error);
        })
    }

    $scope.submit = function () {
        $scope.bill.customers = $scope.user;
        $scope.bill.post = $scope.postfind;
        $scope.bill.status = true;
        var daybill = new Date();
        $scope.bill.outputDate = daybill;
        $scope.bill.payDate = daybill;
        console.log($scope.bill)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/bills/new',
            data: JSON.stringify($scope.bill)
        }).then(function (response) {
            alert("Bạn đã đặt phòng thành công\nVui lòng check mail để nhận kiểm tra chi tiết!")
            console.log(response)
        }, function (error) {
            console.log(error);
        });
    }
    function formatMoney(n, c, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            t = t == undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
    };
})

