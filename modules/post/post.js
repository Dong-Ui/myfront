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
        $scope.bill.startDate = document.getElementById("start").value;
        $scope.bill.endDate = document.getElementById("end").value;
        // var d1;
        // var d2;
        // var t = new Date();
        // var month = t.getMonth();
        // var day = t.getDay();
        // var date = t.getDate();
        // var year = t.getFullYear();
        // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // var today = "0" + (month + 1) + "/" + date + "/" + year;
        // var dateStr = days[day] + ', ' + months[month] + ' ' + date + ', ' + year;
        // document.getElementById("alternate1").value = dateStr;


    }

    // $(function () {
    //     var d1;
    //     var d2;

    //     var t = new Date();
    //     var month = t.getMonth();
    //     var day = t.getDay();
    //     var date = t.getDate();
    //     var year = t.getFullYear();
    //     var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     var today = "0" + (month + 1) + "/" + date + "/" + year;
    //     var dateStr = days[day] + ', ' + months[month] + ' ' + date + ', ' + year;
    //     document.getElementById("alternate1").value = dateStr;
    //     document.getElementById("datepicker1").setAttribute("value", today);
    //     var bb = today.split(' ');
    //     d1 = new Date(bb);


    //     $("#datepicker1").datepicker({
    //         showOtherMonths: true,
    //         selectOtherMonths: true,
    //         changeMonth: true,
    //         changeYear: true,
    //         altField: "#alternate1",
    //         altFormat: "DD, MM d, yy",

    //         onSelect: function () {
    //             var a = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
    //             var b = a.split(' ');
    //             d1 = new Date(b);
    //         }
    //     });

    //     $("#datepicker2").datepicker({
    //         showOtherMonths: true,
    //         selectOtherMonths: true,
    //         changeMonth: true,
    //         changeYear: true,
    //         altField: "#alternate2",
    //         altFormat: "DD, MM d, yy",

    //         onSelect: function () {
    //             var c = $.datepicker.formatDate("yy mm dd", $(this).datepicker("getDate"));
    //             var g = c.split(' ');
    //             d2 = new Date(g);
    //         }
    //     });

    //     $("#click").on('click', function () {
    //         var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
    //         var diffDays = (d2 - d1) / oneDay;
    //         document.getElementById("output").innerHTML = diffDays + " days";
    //     });

    // });
})

