var app = angular.module('BlondegalowApp', []);

app.factory('UserService', [function() {  // TODO: do i need a whole service? may be useful for hiding certain things
    var sdo = {
        isLogged: false,
        username: ''
    };
    return sdo;
}]);

app.controller('LoginController', ['UserService','$scope', '$http', function(UserService, $scope, $http) {

  $scope.user = {};
  var User = UserService;

  $scope.login = function() {
    $http.post('/', $scope.user).then(function(response) {
      //TODO: how to redirect?
    });
  }


}]); // login control end


app.controller('RegisterController', ['$scope', '$http', function($scope, $http) {

      $scope.user = {};




      $scope.register = function() {
        /// looots of error handling
        if($scope.user.password !== $scope.user.verifyPassword) {
          $scope.pwMatchError = true;
          $scope.user.password = "";
          $scope.user.verifyPassword = "";
        } else if($scope.user.username.length < 6) {
          $scope.usernameError = true;
        } else if($scope.user.password.length < 6) {
          $scope.passwordError = true;
        } else {
          $scope.usernameError = false;
          $scope.passwordError = false;
          $scope.pwMatchError = false;
          $http.post('/register', $scope.user).then(function(response) {
            console.log(response);
            $scope.user = {};
            //TODO: upon confirmation of db entry, add a modal or something that confirms this and redirect

          });
        }
      }

}]); // registerControl over
