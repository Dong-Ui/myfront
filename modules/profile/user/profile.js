var app = angular.module("profile", []);

app.controller("profileCtrl", function ($scope, $http) {
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
})
