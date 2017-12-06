/**
 * Created by root on 12/14/16.
 * This is application routes file.
 */

var routes = function ($routeProvider) {

    "use strict";

    $routeProvider
        .when('/', {
            redirectTo: '/chat-login'
        })
        .when('/chat-login', {
            templateUrl: 'chat/login.html',
            controller: 'chatlogController'
        })
        .when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'chatController'
        })
        .when('/group-chat', {
            templateUrl: 'chat/group-chat.html',
            controller: 'groupChatController'
        })
        .when('/create-group', {
            templateUrl: 'chat/create-group.html',
            controller: 'groupController'
        })
        .otherwise({
            redirectTo: '/404'
        });
};
module.exports = routes;