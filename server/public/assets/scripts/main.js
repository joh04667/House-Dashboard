/*! blondegalow-calendar 2016-05-16 */
var app=angular.module("MainApp",["ngRoute","ngAnimate"]);app.config(["$routeProvider","$locationProvider",function(a,b){a.when("/main",{templateUrl:"views/message.html",controller:"MessageController"}).when("/calendar",{templateUrl:"views/calendar.html",controller:"CalendarController"}).when("/chores",{templateUrl:"views/chores.html",controller:"ChoresController"}).when("/groceries",{templateUrl:"views/groceries.html",controller:"GroceryController"}),b.html5Mode(!0)}]),app.factory("UserService",["$http",function(a){var b={},c=function(){a.get("/auth").then(function(a){b.info=a.data,console.log("user is",b.info)})};return{user:b,getUserData:c}}]),app.controller("HeaderController",["UserService","$scope","$http","$location",function(a,b,c,d){function e(){b.selected={},$("body").removeClass()}a.getUserData(),b.user=a.user,b.selected={messages:"message-select"};var f=!1;b.messages=function(){e(),b.selected.messages="message-select",d.path("/main"),$("body").addClass("red")},b.calendar=function(){e(),b.selected.calendar="calendar-select",d.path("/calendar"),$("body").addClass("blue")},b.chores=function(){e(),b.selected.chores="chores-select",d.path("/chores"),$("body").addClass("yellow")},b.groceries=function(){e(),b.selected.groceries="grocery-select",d.path("/groceries"),$("body").addClass("purple")},b.admin=function(){e(),b.selected.admin="selected",d.path("/admin")};var g=function(){f||(d.path("/main"),f=!0)};g()}]),app.controller("ModalController",["UserService","$scope","$http","$location",function(a,b,c,d){b.user=a.user,b.macs=[],b.submit=function(){""!==b.name&&""!==b.macAddress?(console.log(b.name,b.macAddress),b.macAddress.match(/^\w\w:\w\w:\w\w:\w\w:\w\w:\w\w$/i)?c.post("/mac",{name:b.name,mac:b.macAddress}).then(function(a){b.name="",b.macAddress="",b.getMacs()}):alert("Not a valid mac address ya doofus")):console.log("nope",b.name,b.macAddress)},b.getMacs=function(){c.get("/mac").then(function(a){b.macs=a.data})},b.remove=function(a){console.log(a),c["delete"]("/mac/"+a.id).then(function(a){b.getMacs()})},b.getMacs()}]),app.controller("WhoIsHomeController",["UserService","$scope","$http",function(a,b,c){b.user=a.user,b.house=["","","","","","","",""],b.error={router:!1},b.getRouterData=function(){b.error.loading=!0,b.error.router=!1,c.get("/mac/all").then(function(a){for(b.error.loading=!1,210===a.status?b.error.router=!0:(b.house=a.data,b.house.push({name:"Piper"}));b.house.length<=8;)b.house.push("");console.log("house",b.house)})},b.getRouterData()}]),app.controller("MessageController",["UserService","$scope","$http","$route",function(a,b,c,d){b.user=a.user,b.posts=[],b.getPosts=function(){c.get("/message").then(function(a){b.posts=a.data.reverse()})},b.submit=function(){b.title&&b.newMessage&&c.post("/message",{title:b.title,text:b.newMessage}).then(function(a){console.log(a),b.newMessage="",b.title="",b.getPosts()})},b.remove=function(a){c["delete"]("/message/"+a.id).then(function(a){b.getPosts()})},b.getPosts()}]),app.controller("CalendarController",["UserService","$scope","$http","$route",function(a,b,c,d){}]),app.controller("ChoresController",["UserService","$scope","$http","$route",function(a,b,c,d){b.choreList=[],b.chore={},b.user=a.user,b.spacer=[],b.getChores=function(){c.get("/chore").then(function(a){b.choreList=a.data.reverse().sort(function(a,b){return a=Boolean(a.completed_by),b=Boolean(b.completed_by),a-b}),e()})},b.postChore=function(){b.chore.assigned_to&&b.chore.task&&c.post("/chore",b.chore).then(function(a){b.chore={},b.getChores()})},b.complete=function(a){a.completed_by||c.put("/chore",{id:a.id,completed_by:b.user.info.display_name}).then(function(a){b.getChores()})},b.checkComplete=function(a){return a.completed_by?(a.completeText="✓","complete"):(a.completeText="Done!","incomplete")};var e=function(){b.spacer=[];for(var a=b.choreList.length;10>a;)b.spacer.push(""),a+=1};b.getChores()}]),app.controller("GroceryController",["UserService","$scope","$http","$route",function(a,b,c,d){b.user=a.user,b.groceryList=[],b.spacer=[],b.groceryItem="",b.groceryGetter=function(){c.get("/grocery").then(function(a){b.spacer=[],b.groceryList=a.data.reverse().sort(function(a,b){return a=Boolean(a.completed_by),b=Boolean(b.completed_by),a-b}),f(b.groceryList),e()})},b.submit=function(){b.groceryItem&&c.post("/grocery",{item:b.groceryItem,name:b.user.info.display_name}).then(function(a){a.data;b.spacer=[],b.groceryList.unshift(a.data[0]),f(b.groceryList),b.groceryItem="",e()})},b.complete=function(a){a.completed_by||c.put("/grocery",{id:a.id,name:b.user.info.display_name}).then(function(c){a.completed_by=b.user.info.display_name,a.date_completed=new Date,f([a]),b.groceryList.sort(function(a,b){return a=Boolean(a.completed_by),b=Boolean(b.completed_by),a-b})})};var e=function(){b.spacer=[];for(var a=b.groceryList.length;14>a;)b.spacer.push(""),a+=1},f=function(a){a.forEach(function(a){a.completed_by?a.completeText="✓":a.completeText="I got it!"})};b.checkComplete=function(a){return a.completed_by?"complete":"incomplete"},b.groceryGetter()}]);