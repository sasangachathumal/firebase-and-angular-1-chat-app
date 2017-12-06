/**
 * Created by root on 2/27/17.
 * This is the main js file in the application, there are all require dependencies and all services, controllers, constant, directives are link in hear.
 */
//require dependencies
var angular = require('angular');
var ngRoute = require('angular-route');
var ngAnimate = require('angular-animate');
var ngAria = require('angular-aria');
var ngMessages = require('angular-messages');
var ngResource = require('angular-resource');
var ngSanitize = require('angular-sanitize');
var ngTouch = require('angular-touch');
var ngCookies = require('angular-cookies');
var moment = require('moment');
var angularMoment = require('angular-moment');
var ngDialog = require('ng-dialog');
var csvParse = require('papaparse');
var basic = require('basic-authorization-header');
var npmBootstrap = require('angular-bootstrap-npm');
var angularfire = require('angularfire');
//Routes
var routes = require('./app.route');

//Controllers
var mainController = require('./app.controller');
var chatlogController = require('./chat/chatlogin-controller');
var chatController = require('./chat/chat-controller');
var groupChatController = require('./chat/chat-group-controller');

//application
var app = angular.module('gradchatApp', [
    ngRoute,
    ngAnimate,
    ngAria,
    ngMessages,
    ngResource,
    ngSanitize,
    ngTouch,
    npmBootstrap,
    ngCookies,
    angularMoment,
    ngDialog,
    angularfire,
    "firebase"
]);
//run
app.run(function(amMoment) {
    amMoment.changeLocale('de');
});
//value
app.value('csvParse',csvParse);
//constants
app.constant('moment', require('moment-timezone'));
app.constant('basic', basic);

//Controllers

mainController.$inject = ['$scope', '$rootScope'];
app.controller('mainController', mainController);

chatlogController.$inject = ['$scope', '$rootScope', 'firebase', '$firebaseAuth', '$window'];
app.controller('chatlogController', chatlogController);

chatController.$inject = ['$scope', '$rootScope', 'firebase', '$firebaseArray', '$window'];
app.controller('chatController', chatController);

groupChatController.$inject = ['$scope', '$rootScope', 'firebase', '$firebaseArray', '$firebaseAuth'];
app.controller('groupChatController', groupChatController);

routes.$inject = ['$routeProvider'];
app.config(routes);


