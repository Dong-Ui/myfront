var app = angular.module("profile", []);

app.controller("profileCtrl", function ($scope, $http) {
    $scope.savebtn = false;
    $scope.inputs = document.getElementsByClassName("form-control-plaintext");
    
    $scope.disabledinput = function(){
        for (var i = 0; i < $scope.inputs.length; i++) {
            $scope.inputs[i].disabled = true;
            $scope.inputs[i].classList.remove('inputedit')
        }
    }

    $scope.disabledinput();

    $scope.enableinput = function () {
        $scope.savebtn = true;
        for (var i = 0; i < $scope.inputs.length; i++) {
            $scope.inputs[i].disabled = false;
            $scope.inputs[i].classList.add('inputedit')
        }
    }
    $scope.save = function(){
        $scope.disabledinput();
        $scope.savebtn = false;
    }
})
