var app = angular.module("WebApp", ["ngFileUpload"]);
app.controller("cardCtrl", function ($scope, $http, Upload, $timeout) {
    $scope.listAll = [];
    $scope.post = {}
    $scope.table = false;

    $scope.files = [];
    $scope.list_file_name = [];
    $scope.provinces = [];
    $scope.idProvince = ""; 
    $scope.load = function () {
        $http({
            method: "GET",
            url: "http://localhost:8080/posts",
        }).then(function (response) {
            $scope.listAll = response.data;
            // console.log($scope.listAll)
        }, function (error) {
            console.log(error);
        })
    }
    $scope.load();
    $scope.submit = function () {
        $scope.post.admins = $scope.admin;
        $scope.post.content = CKEDITOR.instances.editor1.getData();
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

    $scope.delete = function (item) {
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
        // console.log($scope.post.postDate)

        
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

    //Get Province
    $http({
        method: "GET",
        url: "http://localhost:8080/posts/province",
    }).then(function (response) {
        $scope.provinces = response.data;
    }, function (error) {
        console.log(error);
    })

    //Get id Province
    $http({
        method: "GET",
        url: "http://localhost:8080/provinceName?provinceName=" + $scope.post.province,
    }).then(function (response) {
        $scope.idProvince = response.data;
    }, function (error) {
        console.log(error);
    })


    $scope.uploadImage = function (files, errFiles) {
        files.forEach(function (e) { $scope.files.push(e) })
        $scope.errFiles = errFiles;
        angular.forEach(files, function (file) {
            console.log(file)
            file.upload = Upload.upload({
                url: 'http://localhost:8080/uploadFiles',
                data: { files: file }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.list_file_name.push(file.result.name)
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });

    }

    CKEDITOR.replace('editor1');
});