/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var groupChatController = function ($scope, $rootScope, firebase, $firebaseArray, $firebaseAuth) {

    'use strict';

    $scope.loginUser = JSON.parse(localStorage.getItem("loginUser"));

    function listUsers() {
        $scope.onlineUsers = $firebaseArray(firebase.database().ref().child("users"));
    }

    listUsers();

    function listMessages() {
        $scope.messages = $firebaseArray(firebase.database().ref().child("chats").child("group"));
    }

    listMessages();

    $scope.checkLoginUser = function(index) {
        return $scope.onlineUsers[index].email !== $scope.loginUser.email;
    };

    $scope.addMessage = function() {

        firebase.database().ref().child("chats").child("group").push().set({
            text: $scope.message,
            user: $scope.loginUser.email
        }).then(function (data) {
            console.log(data);
        });

        $scope.message = "";
    };

};
module.exports = groupChatController;
