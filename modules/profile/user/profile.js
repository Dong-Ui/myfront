import Model from "./models/dto.js";

var app = angular.module("WebApp", ["ngFileUpload"]);

app.controller("profileCtrl", function ($scope, Upload, $http, $timeout) {
    $scope.urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
    $scope.username_cus = "";
    $scope.check_nav_user = true;
    $scope.customer = {};
    $scope.voucher = [];
    $scope.gender = "";
    $scope.birthDay = "";
    $scope.image_name = "";
    $scope.checkAvatar = true;

    $scope.upload_dir = "http://localhost:8080/upload/"

    //Customer
    $scope.gender = "";
    $scope.birthDay = "";

    //Valid
    $scope.checkSaveBtn = false;

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
    $scope.username_cus = $scope.getCookie("CUSTOMERS_NAME");

    if ($scope.username_cus == "") {
        $scope.check_nav_user = true;
    } else {
        $scope.check_nav_user = false;
    }

    //FormatDate
    $scope.formatDate = function (date) {
        var day = new Date(date);
        var d = day.getDate();
        var m = day.getMonth() + 1;
        var y = day.getFullYear();

        if (d < 10) {
            d = "0" + d;
        }
        if (m < 10) {
            m = "0" + m;
        }
        var mydate = d + "/" + m + "/" + y;
        return mydate;
    }

    //Redirect to choosen post
    $scope.redirect_post = function (id_post) {
        $http({
            method: "GET",
            url: "http://localhost:8080/fileHtml?idPost=" + id_post,
        }).then(function (response) {
            console.log(response.status_code());
        }, function (error) {
            console.log(error);
        })
    }

    //Get Customer Information
    $scope.getInforCust = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/customers/load?userName=" + $scope.username_cus,
        }).then(function (response) {
            $scope.customer = response.data[0];
            $scope.loadbill();      
            if ($scope.customer.gender) {
                $scope.gender = "Nam";
            } else {
                $scope.gender = "Nữ";
            }
            $scope.birthDay = $scope.formatDate($scope.customer.birthDay)

            if ($scope.customer.image == "" || $scope.customer.image == null) {
                $scope.checkAvatar = true;
            } else {
                $scope.checkAvatar = false;
            }

        }, function (error) {
            console.log(error);
        })
    }
    $scope.getInforCust()

    //Change Avatar
    $scope.uploadImage = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:8080/uploadFile',
                data: { file: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.image_name = file.result.fileName;

                    $http({
                        method: "POST",
                        url: "http://localhost:8080/customers/edit/upload?userName=" + $scope.username_cus + "&image=" + $scope.image_name,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        transformResponse: [
                            function (data) {
                                return data;
                            }
                        ]
                    }).then(function (response) {
                        console.log(response.data)
                    }, function (error) {
                        console.log(error);
                    })
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }

    //Update Customer.
    $scope.editCustomer = function () {
        const model = new Model();
        var gen = true;
        var dateString = $scope.birthDay;
        var dateParts = dateString.split("/");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        if ($scope.gender == "Nam") {
            gen = true;
        } else {
            gen = false;
        }

        model.setModel($scope.customer.userName, $scope.customer.fullName, $scope.customer.passWord, gen, $scope.customer.phone, $scope.customer.bankNumber, dateObject, $scope.customer.identityCard, $scope.customer.nationality, $scope.customer.address);

        $http({
            method: "POST",
            url: "http://localhost:8080/customers/edit",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(model),
            transformResponse: [
                function (data) {
                    return data;
                }
            ]
        }).then(function (response) {
            console.log(response.data)
            // $scope.notification = response.data;
        }, function (error) {
            console.log(error);
        })
    }

    $scope.loadVoucer = function(){
        $http({
            method: "GET",
            url: "http://localhost:8080/vouchers",
        }).then(function (response) {
            $scope.voucher = response.data;
        }, function (error) {
            console.log(error);
        })
    }
    $scope.loadVoucer();

    //Log out
    $scope.logOut = function () {
        document.cookie = "CUSTOMERS_NAME=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace($scope.urlLogin);
    }

    $scope.savebtn = false;
    $scope.inputs = document.getElementsByClassName("form-control-plaintext");
    $scope.disabledinput = function () {
        for (var i = 0; i < $scope.inputs.length; i++) {
            $scope.inputs[i].disabled = true;
            $scope.inputs[i].classList.remove('inputedit')
        }
    }

    $scope.soh = false;
    $scope.disabledinput();
    $scope.enableinput = function () {
        $scope.savebtn = true;
        for (var i = 0; i < $scope.inputs.length; i++) {
            $scope.inputs[i].disabled = false;
            $scope.inputs[i].classList.add('inputedit')
        }
    }

    $scope.save = function () {
        $scope.editCustomer();
        $scope.disabledinput();
        $scope.savebtn = false;
    }

    $scope.clear = function () {
        $scope.getInforCust()
        $scope.disabledinput();
        $scope.savebtn = false;
    }

    $scope.inputimage = document.getElementsByClassName("form-control-file");
    $scope.readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]); // convert to base64 string         
        }
    }

    $scope.readURL($scope.inputimage);
    $("#exampleFormControlFile1").change(function () {
        $scope.readURL(this);
        setTimeout(function () {
            $scope.soh = true;
            $scope.$apply()
        }, 5);
    });

    //Valid Form
    $scope.validForm = function () {
        var requireDate = new Date("01/01/2002");

        var dateString = $scope.birthDay;
        var dateParts = dateString.split("/");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        var checkPass = $("#password").val();
        var checkFullName = $("#name").val();
        var checkAddress = $("#address").val();
        var checkGender = $("#gender").val();
        var checkBirth = $("#birthday").val();
        var checkPhone = $("#phone").val();
        var checkCmnd = $("#cmnd").val();
        var checkStk = $("#stk").val();
        var checkNation = $("#nation").val();

        if (checkPass == "" || checkPass.length < 6) {
            $scope.checkSaveBtn = true;
        } else if (checkFullName == "") {
            $scope.checkSaveBtn = true;
        } else if (checkAddress == "") {
            $scope.checkSaveBtn = true;
        } else if (checkGender == "") {
            $scope.checkSaveBtn = true;
        } else if (checkBirth == "") {
            $scope.checkSaveBtn = true;
        } else if (dateObject > requireDate) {
            $scope.checkSaveBtn = true;
        }else if (checkPhone == "") {
            $scope.checkSaveBtn = true;
        } else if (checkCmnd == "" || checkCmnd.length != 9) {
            $scope.checkSaveBtn = true;
        } else if (checkStk == "") {
            $scope.checkSaveBtn = true;
        } else if (checkNation == "") {
            $scope.checkSaveBtn = true;
        } else {
            $scope.checkSaveBtn = false;
        }
    }

    $scope.listbill = [];
    $scope.listpost = [];
    $scope.listpostdetail = [];
    $scope.loadbill = function(){
        $http({
            method: "GET",
            url: "http://localhost:8080/bill/getbills/" + $scope.customer._idCustomer,
        }).then(function (response) {
            $scope.listbill = response.data;
            $scope.listbill.forEach(element => {
                $scope.listpost.push(element.post)
                console.log(element.post.idPost)
            });
            $scope.listpost.forEach(element =>{
                $http({
                    method: "GET",
                    url: "http://localhost:8080/posts/detail?idPost=" + element.idPost,
                }).then(function (response) {
                    $scope.listpostdetail.push(response.data[0]);
                    if(response.data[0] != undefined){
                        for (let index = 0; index < $scope.listbill.length; index++) {
                            $scope.listbill[index].post = $scope.listpostdetail[index];
                        }
                    }
                   
                }, function (error) {
                    console.log(error);
                })
                console.log($scope.listbill)
            });
        }, function (error) {
            console.log(error);
        })
    }
})

