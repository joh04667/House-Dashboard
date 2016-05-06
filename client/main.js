var app = angular.module("MainApp", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/main', {
      templateUrl: 'views/message.html',
      controller: 'MessageController'
    })
    .when('/calendar', {
      templateUrl: 'views/calendar.html',
      controller: 'CalendarController'
    })
    .when('/chores', {
      templateUrl: 'views/chores.html',
      controller: 'ChoresController'
    });
  $locationProvider.html5Mode(true);

}]);



app.factory('UserService', ['$http', function($http) {


    var user = {};

    var getUserData = function() {
        $http.get('/auth').then(function(response) {
        console.log(response);
        user.info = response.data;
        console.log('user is', user.info);
      });
    };

      return {
        user: user,
        getUserData: getUserData
    };
}]);

app.controller('HeaderController', ['UserService', '$scope', '$http', '$location', function(UserService, $scope, $http, $location) {

  UserService.getUserData();
  $scope.user = UserService.user;

  $scope.messages = function() {
    $location.path('/')
  }

  $scope.calendar = function() {
    $location.path('/calendar')
  }

  $scope.chores = function() {
    $location.path('/chores')
  }
}]); // Header Control End


app.controller('WhoIsHomeController', ['UserService', '$scope', '$http', function(UserService, $scope, $http) {

          $scope.user = UserService.user;
          console.log('this is', $scope.user, UserService.user);

          $scope.house = [];

          $scope.getRouterData = function() {
            // get mac addresses here
            while($scope.house.length <= 8) {
              $scope.house.push("");
            }
          }

          $scope.getRouterData();

}]); //who is home control end

app.controller('MessageController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

}]); // message control end

app.controller('CalendarController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

}]); // calendar control end

app.controller('ChoresController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

}]); // chores control end
