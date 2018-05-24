//INCLUDE RESOURCES
function include(file) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0).appendChild(script);
};
//INIT ANGULAR APP
var app = angular.module('app', ['ui.directives', 'ui.filters', 'ngSanitize']);
app.controller('controller', function($scope, $http) {
  $scope.noMarkup = true;
  $scope.sidebar = false;
  $scope.userTeam = "ACS";
  $scope.timeline = "";
  $scope.sidebar = false;
  $scope.showFloorList = true;
  // document.getElementById("sidenav").style.width = "25%";
  // document.getElementById("main").style.marginRight = "25%";
  $http.get('data.json').then(function(patients) {
    $scope.patients = patients.data;
    $(".typeahead").typeahead({
      source: $scope.patients,
      items: 8,
      menu: '<span class="typeahead w-100"></span>',
      item: '<div class="p-1"><a class="w-100 text-secondary" href="#"></a></div>',
      delay: 0,
      // callbacks
      // afterSelect: $scope.clear(),
      // afterEmptySelect: $.noop,
      // adds an item to the end of the list
      // addItem: false,
    })
  });
  $scope.showDetail = function(patientId, noteName) {
    $(".patientCard[id=patientName_p" + patientId + "]").css({
      "box-shadow": "0 0 0 .05em rgba(52, 58, 64, 0.50)"
    })
    for (let p = 0; p < $scope.patients.length; p++) {
      $(".patientCard[id=patientName_p" + $scope.patients[p].id + "]").css({
        "box-shadow": "none"
      });
    }
    $(".card[id=patientName_p" + patientId + "]").css({
      "box-shadow": "0 0 0 .05em rgba(52, 58, 64, 0.50)"
    })
    // $("#patientName_p" + patientId).hover(function() {
    //   $(this).css({
    //     "box-shadow": "0 0 0 .05em rgba(52, 58, 64, 0.50)"
    //   })
    // }, function() {
    //   $(this).css({
    //     "box-shadow": "none"
    //   })
    // });
    for (let p = 0; p < $scope.patients.length; p++) {
      if ($scope.patients[p].id == patientId) {
        $scope.detailPatient = $scope.patients[p];
        $scope.detailTitle = noteName;
        break;
      }
    }
  }
  $scope.openNav = function() {
    $scope.sidebar = true;
    // document.getElementById("sidenav").style.width = "25%";
    // document.getElementById("main").style.marginRight = "25%";
    // if ($scope.sidebar == false) {
    //   $scope.sidebar = true;
    //   document.getElementById("sidenav").style.width = "25%";
    //   document.getElementById("main").style.marginRight = "25%";
    // } else {
    //   $scope.closeNav();
    // }
  }
  $scope.closeNav = function() {
    // document.getElementById("sidenav").style.width = "0";
    // document.getElementById("main").style.marginRight = "0";
    $scope.sidebar = false;
  }
})
//
// app.filter('nl2p', function() {
//   return function(text) {
//     text = String(text).trim();
//     return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
//   }
// });