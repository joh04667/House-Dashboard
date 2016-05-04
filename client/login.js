var app = angular.module('BlondegalowApp', []);

app.factory('UserService', [function() {  // TODO: do i need a whole service? may be useful for hiding certain things
    var sdo = {
        isLogged: false,
        username: ''
    };
    return sdo;
}]);

app.controller('LoginController', ['UserService','$scope', '$http', '$location', function(UserService, $scope, $http, $location) {

  $scope.user = {};
  var User = UserService;

  $scope.login = function() {
    console.log($scope.user);
    $http.post('/', $scope.user).then(function(response) {
      console.log(response);
      if(response.status === 269) {
      window.location.assign('/main');
    }
      //TODO: how to redirect?
    });
  };


}]); // login control end


app.controller('RegisterController', ['$scope', '$http', function($scope, $http) {

      $scope.user = {};
      $scope.error = {};



      $scope.register = function() {
        /// looots of error handling
        if($scope.user.password !== $scope.user.verifyPassword) {
          $scope.error.pwMatch = true;
          $scope.user.password = "";
          $scope.user.verifyPassword = "";
        } else if($scope.user.username.length < 6) {
          console.log('too short');
          $scope.error.username = true;
        } else if($scope.user.password.length < 6) {
          console.log('shawty');
          $scope.error.password = true;
        } else {
          $scope.error = {};
          $http({
            method: 'put',
            url: '/register',
            data: $scope.user
          }).then(function successCallback(response) {
            console.log(response);
            if(response.status == 418) {console.log('teapot');}
            $scope.user = {};

            //TODO: upon confirmation of db entry, add a modal or something that confirms this and redirect

          });
        }
      };

}]); // registerControl over
