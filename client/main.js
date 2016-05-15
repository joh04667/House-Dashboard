var app = angular.module("MainApp", ['ngRoute', /*"ngMaterial",*/ "ngAnimate"]);

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
    })
    .when('/groceries', {
      templateUrl: 'views/groceries.html',
      controller: 'GroceryController'
    });

  $locationProvider.html5Mode(true);

}]);



app.factory('UserService', ['$http', function($http) {


    var user = {};

    var getUserData = function() {
        $http.get('/auth').then(function(response) {
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
  $scope.selected = {messages: "selected"};

  function clearClass() {
    $scope.selected = {};
    $('body').removeClass();
  }


  $scope.messages = function() {
    clearClass();
    $scope.selected.messages = "selected";
    $location.path('/main');
    $('body').addClass('red');
  };

  $scope.calendar = function() {
    clearClass();
    $scope.selected.calendar = "selected";
    $location.path('/calendar');
    $('body').addClass('blue');
  };

  $scope.chores = function() {
    clearClass();
    $scope.selected.chores = "selected";
    $location.path('/chores');
    $('body').addClass('yellow');
  };

  $scope.groceries = function() {
    clearClass();
    $scope.selected.groceries = "selected";
    $location.path('/groceries');
    $('body').addClass('purple');
  };

  $scope.admin = function() {
    clearClass();
    $scope.selected.admin = "selected";
    $location.path('/admin');
  };

}]); // Header Control End

app.controller('ModalController', ['UserService', '$scope', '$http', '$location', function(UserService, $scope, $http, $location) {

  $scope.user = UserService.user;
  $scope.macs = [];

  $scope.submit = function() {
    if($scope.name && $scope.macAddress) {
      if(!$scope.macAddress.match(/^\w\w:\w\w:\w\w:\w\w:\w\w:\w\w$/i)) {alert('Not a valid mac address ya doofus');} else {
      $http.post('/mac', {name: $scope.name, mac: $scope.macAddress}).then(function(response) {
        $scope.name = "";
        $scope.macAddress = "";
        $scope.getMacs();
    });
    }
   }
  };

  $scope.getMacs = function() {
    $http.get('/mac').then(function(response) {
      $scope.macs = response.data;
    });
  };

  $scope.remove = function(obj) {
    console.log(obj);
    $http.delete('/mac/' + obj.id).then(function(response){
      $scope.getMacs();

    });
  };



  $scope.getMacs();

}]);  // modal control end


app.controller('WhoIsHomeController', ['UserService', '$scope', '$http', function(UserService, $scope, $http) {

          $scope.user = UserService.user;
          $scope.house = [];

          $scope.getRouterData = function() {
            // get mac addresses here
              $http.get('/mac/all').then(function(response) {
                $scope.house = response.data;

                while($scope.house.length <= 8) {
                  $scope.house.push("");
             }
            });
          };

          $scope.getRouterData();

}]); //who is home control end

app.controller('MessageController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

    $scope.user = UserService.user;

    $scope.posts = [];

    $scope.getPosts = function() {
      $http.get('/message').then(function(response) {
        $scope.posts = response.data.reverse();
      });
    };

    $scope.submit = function() {
      if($scope.title && $scope.newMessage) {
      $http.post('/message', {title: $scope.title, text: $scope.newMessage}).then(function(response) {
        console.log(response);
        $scope.newMessage = "";
        $scope.title = "";
        $scope.getPosts();
      });
     }
   };

    $scope.remove = function(obj) {
      $http.delete('/message/' + obj.id).then(function(response) {
        $scope.getPosts();
      });
    };

    $scope.getPosts();

}]); // message control end

app.controller('CalendarController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

      // $scope.selectedDate = null;
      // $scope.firstDayOfWeek = 0;
      // $scope.setDirection = function(direction) {
      //   $scope.direction = direction;
      // };
      // $scope.dayClick = function(date) {
      //   $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
      // };
      // $scope.prevMonth = function(data) {
      //   $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
      // };
      // $scope.nextMonth = function(data) {
      //   $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
      // };
      // $scope.setDayContent = function(date) {
      //   // You would inject any HTML you wanted for
      //   // that particular date here.
      //     return "<p></p>";
      // };





}]); // calendar control end

app.controller('ChoresController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

  $scope.choreList = [];
  $scope.chore = {};
  $scope.user = UserService.user;

  $scope.getChores = function() {
    $http.get('/chore').then(function(response) {
      $scope.choreList = response.data.reverse();
    });
  };

  $scope.postChore = function() {
    if($scope.chore.assigned_to && $scope.chore.task) {
    $http.post('/chore', $scope.chore).then(function(response) {
      $scope.chore = {};
      $scope.getChores();
    });
  }
};

  $scope.complete = function(chore) {
    if(!chore.completed_by) {
    $http.put('/chore', {id: chore.id, completed_by: $scope.user.info.display_name}).then(function(response) {
      $scope.getChores();
    });
   }
  };

  $scope.checkComplete= function(chore) {
      if(chore.completed_by) {
        chore.completeText = "✓";
        return "complete";
      } else {
        chore.completeText = "Done!";
      return "incomplete";
    }
  };

  $scope.getChores();

}]); // chores control end

app.controller('GroceryController', ['UserService', '$scope', '$http', '$route', function(UserService, $scope, $http, $route) {

  $scope.user = UserService.user;
  $scope.groceryList = [];
  $scope.groceryItem = "";

  $scope.groceryGetter = function() {
    $http.get('/grocery').then(function(response) {
      $scope.groceryList = response.data.filter(function(s) {
        if(s.date_completed) {
        var day = new Date(s.date_completed);
        var now = new Date();
        return day.getDate() >= now.getDate() - 1;
       }
       return s;
     }).reverse();
     buttonize($scope.groceryList);
    });
  };

  $scope.submit = function() {
    if($scope.groceryItem) {
      $http.post('/grocery', {item: $scope.groceryItem, name: $scope.user.info.display_name}).then(function(response) {
        console.log('data', $scope.groceryList, response.data);
        var result = response.data;
        $scope.groceryList.unshift(response.data[0]);
        buttonize($scope.groceryList);
        $scope.groceryItem = "";
      });
    }
  };

  $scope.complete = function(obj) {
    if(!obj.completed_by) {
    $http.put('/grocery', {id: obj.id, name: $scope.user.info.display_name}).then(function(response) {
      obj.completed_by = $scope.user.info.display_name;
      obj.date_completed = new Date();
      buttonize([obj]);
    });
   }
  };



  var buttonize = function(arr) {
    arr.forEach(function(s) {
      if(s.completed_by) {
        s.completeText = "✓";
      } else {
        s.completeText = "I got it!";
      }
    });
  };

  $scope.checkComplete = function(item) {
    if(item.completed_by) {
      return "complete";
    } else {
      return "incomplete";
    }
  };


$scope.groceryGetter();

}]); //grocery control ends
