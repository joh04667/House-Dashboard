/*! blondegalow-calendar 2016-05-10 */
var app=angular.module("MainApp",["ngRoute","ngMaterial","ngAnimate"]);app.config(["$routeProvider","$locationProvider",function(a,b){a.when("/main",{templateUrl:"views/message.html",controller:"MessageController"}).when("/calendar",{templateUrl:"views/calendar.html",controller:"CalendarController"}).when("/chores",{templateUrl:"views/chores.html",controller:"ChoresController"}),b.html5Mode(!0)}]),app.factory("UserService",["$http",function(a){var b={},c=function(){a.get("/auth").then(function(a){console.log(a),b.info=a.data,console.log("user is",b.info)})};return{user:b,getUserData:c}}]),app.controller("HeaderController",["UserService","$scope","$http","$location",function(a,b,c,d){function e(){b.selected={}}a.getUserData(),b.user=a.user,b.selected={messages:"selected"},b.messages=function(){e(),b.selected.messages="selected",d.path("/main")},b.calendar=function(){e(),b.selected.calendar="selected",d.path("/calendar")},b.chores=function(){e(),b.selected.chores="selected",d.path("/chores")}}]),app.controller("WhoIsHomeController",["UserService","$scope","$http",function(a,b,c){b.user=a.user,console.log("this is",b.user,a.user),b.house=[],b.getRouterData=function(){for(;b.house.length<=8;)b.house.push("")},b.getRouterData()}]),app.controller("MessageController",["UserService","$scope","$http","$route",function(a,b,c,d){b.user=a.user,b.posts=[],b.getPosts=function(){c.get("/message").then(function(a){b.posts=a.data,console.log("posts",a)})},b.submit=function(){b.title&&b.newMessage&&c.post("/message",{title:b.title,text:b.newMessage}).then(function(a){console.log(a),b.newMessage="",b.title="",b.getPosts()})},b.remove=function(a){c["delete"]("/message/"+a.id).then(function(a){b.getPosts()})},b.getPosts()}]),app.controller("CalendarController",["UserService","$scope","$http","$route",function(a,b,c,d){b.selectedDate=null,b.firstDayOfWeek=0,b.setDirection=function(a){b.direction=a},b.dayClick=function(a){b.msg="You clicked "+$filter("date")(a,"MMM d, y h:mm:ss a Z")},b.prevMonth=function(a){b.msg="You clicked (prev) month "+a.month+", "+a.year},b.nextMonth=function(a){b.msg="You clicked (next) month "+a.month+", "+a.year},b.setDayContent=function(a){return"<p></p>"}}]),app.controller("ChoresController",["UserService","$scope","$http","$route",function(a,b,c,d){}]);