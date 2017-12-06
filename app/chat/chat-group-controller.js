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

    $scope.logOut = function () {

        console.log($scope.loginUser);
        console.log($scope.loginUser["uid"]);

        firebase.database().ref().child("users").child($scope.loginUser["uid"]).once('value', function (snapshot) {
            if (snapshot.exists()) {
                var updates = {};
                updates['/users/' + $scope.loginUser["uid"] + "/isLogin"] = false;
                firebase.database().ref().update(updates).then(function (data) {
                    console.log(data);
                    alert("add to online node success");
                    localStorage.clear();
                    $window.location.href = ('#!/chat-login');
                }).catch(function (error) {
                    alert("Authentication failed");
                    console.log("Authentication failed:", error);
                });
            } else {
                alert("No user found");
            }
        });

    };


};
module.exports = groupChatController;
