/*! blondegalow-calendar 2016-05-16 */
var app=angular.module("LoginApp",[]);app.controller("LoginController",["$scope","$http","$location",function(a,b,c){a.user={},a.error=!1,a.login=function(){a.error=!1,b.post("/",a.user).then(function(a){console.log("res",a),269===a.status&&window.location.assign("/main"),250===a.status&&(console.log("wrong"),alert("Incorrect username or password"))})}}]),app.controller("RegisterController",["$scope","$http",function(a,b){a.user={},a.error={},a.register=function(){a.user.password!==a.user.verifyPassword?(a.error.pwMatch=!0,a.user.password="",a.user.verifyPassword=""):a.user.username.length<6?(console.log("too short"),a.error.username=!0):a.user.password.length<6?a.error.password=!0:(a.error={},b({method:"post",url:"/register",data:a.user}).then(function(b){console.log(b),418==b.status&&console.log("teapot"),a.user={}}))}}]);