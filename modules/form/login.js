import Model from "./models/dto.js";

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

var app = angular.module("WebApp", []);

app.controller("loginCtrl", function ($scope, $http) {
  const urlIndex = "http://127.0.0.1:5500/modules/home/index.html";
  const urlLogin = "http://127.0.0.1:5500/modules/form/login.html";
       
  $scope.userName = "";
  $scope.passWord = "";

  $scope.newUserName = "";
  $scope.newPassWord = "";
  $scope.newFullName = "";
  $scope.cnfPassWord = "";
  $scope.email = "";

  $scope.emailFogot = "";
  $scope.userFogot = "";

  $scope.notification = ""

  //Login
  $scope.submit = function () {
    const model = new Model();
    model.setModel($scope.userName, $scope.passWord);
    $http({
      method: "POST",
      url: "http://localhost:8080/login",
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
      var customer = JSON.parse(response.data);
      document.cookie = "CUSTOMERS_NAME=" + customer["userName"] + ";path=/"
      window.location.replace(urlIndex);
    }, function (error) {
        window.location.replace(urlLogin);
        console.log(error);
    })
  }

  //Regist
  $scope.regist = function () {
    const model = new Model();
    model.setModelRegist($scope.newUserName, $scope.newFullName, $scope.newPassWord, $scope.email)
    if($scope.newPassWord == $scope.cnfPassWord){
      $http({
        method: "POST",
        url: "http://localhost:8080/customers/new",
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
        $scope.notification = response.data;
        $scope.newUserName = "";
        $scope.newPassWord = "";
        $scope.newFullName = "";
        $scope.cnfPassWord = "";
        $scope.email = "";
      }, function (error) {
          console.log(error);
      })
    } 
  }

  //Forgot
  $scope.forgotPass = function () {
    const model = new Model();
    model.setForgot($scope.userFogot, $scope.emailFogot)
    $http({
      method: "POST",
      url: "http://localhost:8080/customers/forgotPass",
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
      $scope.notification = response.data;
      document.getElementById("closeModal").click();
      $scope.emailFogot = "";
      $scope.userFogot = "";
      $scope.notification = ""
    }, function (error) {
        console.log(error);
    })
  }

})
