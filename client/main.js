var app = angular.module("MainApp", []);

app.factory('UserService', ['$http', function($http) {


    var user = {};

    var getUserData = function() {
        $http.get('/auth').then(function(response) {
        console.log(response);
        user.info = response.data;
        console.log('user is', user.info);
      });
    }

      return {
        user: user,
        getUserData: getUserData
    };
}]);

app.controller('HeaderController', ['UserService', '$scope', '$http', function(UserService, $scope, $http) {

  UserService.getUserData();
  $scope.user = UserService.user


}]); // Header Control End


app.controller('WhoIsHomeController', ['UserService', '$scope', '$http', function(UserService, $scope, $http) {

          $scope.user = UserService.user
          console.log('this is', $scope.user, UserService.user);
          // console.log('dis name', $scope.UserService.user.display_name, UserService);

}]); //who is home control end
