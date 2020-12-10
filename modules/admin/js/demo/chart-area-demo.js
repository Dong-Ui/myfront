var app = angular.module("WebApp", []);


app.controller("adminCtrl", function ($scope, $http) {

  $scope.listAll = [];
  $scope.listmounth = [];
  $scope.listyear = [];
  $scope.listrecover = [];
  $scope.listdetail = [];
  $http({
    method: "GET",
    url: "http://localhost:8080/bill/thongkedoanhthu",
  }).then(function (response) {
    $scope.listAll = response.data;
    console.log($scope.listAll)
    $scope.getyear();
  }, function (error) {
    console.log(error);
  })
  var i
  var u
  $scope.getyear = function () {
    i = $scope.listAll[0]["finishDate"].toString().indexOf("-");
    u = $scope.listAll[0]["finishDate"].toString().lastIndexOf("-");
    // console.log($scope.listAll[0]["finishDate"].toString().substring(u+1,$scope.listAll[0]["finishDate"].toString().length))
    for (let index = 0; index < $scope.listAll.length; index++) {
      if (index != 0) {
        if ($scope.listyear.toString().search($scope.listAll[index]["finishDate"].toString().substring(0, i)) == (-1)) {
          $scope.listyear.push($scope.listAll[index]["finishDate"].toString().substring(0, i));
        }
      } else {
        $scope.listyear.push($scope.listAll[index]["finishDate"].toString().substring(0, i));
      }
    }
    $scope.selectedItem = $scope.listyear[0];
    $scope.getdetail();
  }


  $scope.getdetail = function () {
    $scope.listdetail.splice(0, 12);
    $scope.listmounth.splice(0, 12);
    var x = document.getElementById("exampleFormControlSelect1").value;
    year = x.substring(x.indexOf(":") + 1, x.length);
    if (year == "?") {
      year = $scope.listyear[0];
    }
    $scope.listmounth.length = 12;
    $scope.listrecover = $scope.listAll;
    for (let index = 0; index < $scope.listrecover.length; index++) {
      if ($scope.listrecover[index]["finishDate"].toString().substring(0, i) == year) {
        $scope.name = $scope.listrecover[index]["finishDate"].toString().substring(u + 1, $scope.listrecover[index]["finishDate"].toString().length);
        $scope.name = $scope.name.replace(0, "")
        if ($scope.listmounth[$scope.name] != undefined) {
          $scope.tong = $scope.listmounth[$scope.name]["totalCash"] + $scope.listrecover[index]["totalCash"]
          $scope.listmounth[$scope.name]["totalCash"] = $scope.tong
          $scope.listrecover.splice(index, 1);
        } else {
          $scope.listmounth[$scope.name] = $scope.listrecover[index];
        }
      }
    }
    console.log($scope.listmounth)
    for (let index = 1; index < $scope.listmounth.length + 1; index++) {
      if ($scope.listmounth[index] == undefined) {
        $scope.listdetail.push(0);
      } else {
        $scope.listdetail.push($scope.listmounth[index]["totalCash"]);
      }
    }
    console.log($scope.listdetail);
    $scope.loadera()
    // setTimeout(function () {
    //   $('.chart-area').fadeOut('slow', function () {
    //     $(this).load('/modules/admin/js/chart-area-demo.js', function () {
    //       $(this).fadeIn('slow');
    //     });
    //   });
    // }, 3000);

  }
  $scope.loadera = function () {
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Earnings",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          // data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
          data: $scope.listdetail,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return '$' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
            }
          }
        }
      }
    });
  }
  // $scope.listdate = [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000];
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  // Area Chart Example
  var ctx = document.getElementById("myAreaChart");


})
