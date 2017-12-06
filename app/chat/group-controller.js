/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var groupController = function ($scope, $rootScope, firebase, $firebaseArray, $firebaseAuth) {

    'use strict';

    $scope.loginUser = JSON.parse(localStorage.getItem("loginUser"));

    var login;
    var groupMembers = [];
    // var loginUser = {
    //     uid: $scope.loginUser["uid"],
    //     refreshToken: $scope.loginUser["refreshToken"],
    //     isAnonymous: $scope.loginUser["isAnonymous"],
    //     emailVerified: $scope.loginUser["emailVerified"],
    //     email: $scope.loginUser["email"],
    //     project: $scope.loginUser["v"],
    //     isLogin: true
    // };

    console.log($scope.loginUser["uid"]);
    console.log($scope.loginUser["refreshToken"]);
    console.log($scope.loginUser["isAnonymous"]);
    console.log($scope.loginUser["emailVerified"]);
    console.log($scope.loginUser["email"]);
    console.log($scope.loginUser["v"]);

    // groupMembers.push();

    function listUsers() {
        $scope.users = $firebaseArray(firebase.database().ref().child("users"));
    }

    listUsers();

    $scope.checkLoginUser = function (index) {
        return $scope.users[index].email !== $scope.loginUser.email;
    };

    $scope.selectUsers = function (index) {
        groupMembers.push($scope.users[index]);
    };

    $scope.createChat = function () {

        var id = "";
        var i;

        for (i = 0; i < groupMembers.length; i++) {
            console.log(groupMembers[i]);
            console.log(groupMembers[i]["uid"]);
            id += groupMembers[i]["uid"];
        }

        // id = id.substring(0, 50);

        console.log(id);

        firebase.database().ref().child("groups").push().set({
            chatId: id,
            members: groupMembers
        }).then(function (data) {
            alert("Group Create");
            $window.location.href = ('#!/group-chat');
        }).catch(function (error) {
            alert("Group Create error");
        });
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
module.exports = groupController;
