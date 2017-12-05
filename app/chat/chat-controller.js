/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var chatController = function ($scope, $rootScope, firebase, $firebaseArray, $firebaseAuth) {

    'use strict';

    $scope.loginUser = JSON.parse(localStorage.getItem("loginUser"));

    var tempSortUsers;

    function listUsers() {
        $scope.onlineUsers = $firebaseArray(firebase.database().ref().child("onlineUsers"));
    }

    listUsers();

    $scope.checkLoginUser = function(index) {
        return $scope.onlineUsers[index].email !== $scope.loginUser.email;
    };

    $scope.startChat = function (index) {
        console.log($scope.onlineUsers[index].uid);
        console.log($scope.loginUser.uid);
        if ($scope.onlineUsers[index].uid !== $scope.loginUser.uid) {
            $scope.chatWith = $scope.onlineUsers[index];

            var selected = $scope.onlineUsers[index].email.split(".")[0];
            var login = $scope.loginUser.email.split(".")[0];
            var tempUsers = [selected, login];
            tempSortUsers = tempUsers.sort();

            $scope.messages = $firebaseArray(firebase.database().ref().child("chats").child(tempSortUsers[0] + tempSortUsers[1]));

            console.log($scope.messages);

        }
    };

    $scope.addMessage = function() {

        firebase.database().ref().child("chats").child(tempSortUsers[0] + tempSortUsers[1]).push().set({
            text: $scope.message,
            user: $scope.loginUser.email
        }).then(function (data) {
            console.log(data);
        });

        $scope.message = "";
    };

    $scope.logOut = function () {
        var auth = $firebaseAuth();
        auth.logout()
    }

};
module.exports = chatController;
