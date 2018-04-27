//INCLUDE RESOURCES
function include(file) {
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0).appendChild(script);
};



function openNav() {
  document.getElementById("sidenav").style.width = "25%";
  document.getElementById("main").style.marginRight = "25%";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}


//INIT ANGULAR APP
var app = angular.module('app', ['ui.directives', 'ui.filters']);
app.controller('controller', function($scope, $http) {

  $scope.userTeam = "ACS";
  $scope.timeline = "";

  $http.get('data.json')
    .then(function(patients) {
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
    for (let p = 0; p < $scope.patients.length; p++) {
      if ($scope.patients[p].id == patientId) {
        $scope.detailPatient = $scope.patients[p];
        $scope.detailTitle = noteName;

        break;
      }
    }
  }
  $scope.showFooter = function() {
    if ($scope.footer == true) {
      $scope.footer = false;
    } else {
      $scope.footer = true;
      $scope.$apply();
    }
  }

})
