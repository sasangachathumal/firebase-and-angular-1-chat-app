/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var chatController = function ($scope, $rootScope, firebase, $firebaseArray, $window) {

    'use strict';

    $scope.loginUser = JSON.parse(localStorage.getItem("loginUser"));

    var tempSortUsers;
    var selectedUser;
    var login;
    var selected;

    function listUsers() {
        $scope.onlineUsers = $firebaseArray(firebase.database().ref().child("users"));
    }

    function listMyChats() {
        $scope.myChats = $firebaseArray(firebase.database().ref().child("recent").orderByChild("owner").equalTo($scope.loginUser.email));
    }

    listUsers();

    listMyChats();

    $scope.checkLoginUser = function (index) {
        return $scope.onlineUsers[index].email !== $scope.loginUser.email;
    };

    $scope.startChat = function (index) {
        if ($scope.onlineUsers[index].uid !== $scope.loginUser.uid) {
            selectedUser = index;
            selected = $scope.onlineUsers[index].email.split(".")[0];
            login = $scope.loginUser.email.split(".")[0];
            var tempUsers = [selected, login];
            tempSortUsers = tempUsers.sort();
            $scope.messages = $firebaseArray(firebase.database().ref().child("chats").child(tempSortUsers[0] + tempSortUsers[1]));
        }
    };

    $scope.addMessage = function () {
        var currentChatId = tempSortUsers[0] + tempSortUsers[1];
        firebase.database().ref().child("chats").child(tempSortUsers[0] + tempSortUsers[1]).push().set({
            text: $scope.message,
            user: $scope.loginUser.email
        }).then(function (snapshot) {
            firebase.database().ref().child("recent").orderByChild("chat").equalTo(currentChatId).once('value', function (snapshot) {
                if (snapshot.exists()) {
                    snapshot.forEach(function (childSnapshot) {
                        // var chatOwner = childSnapshot.val()["owner"];
                        // if (chatOwner === $scope.loginUser.email) {
                        //
                        // }
                        var updates = {};
                        updates['/recent/' + childSnapshot.key + "/text"] = $scope.message;
                        firebase.database().ref().update(updates).then(function (data) {
                            console.log(data);
                            alert("recent Updated");
                            $scope.message = "";
                        }).catch(function (error) {
                            alert("recent Update fail");
                            console.log(error);
                        });
                    });
                } else {
                    var recentMe = firebase.database().ref().push().key;
                    var recentOther = firebase.database().ref().push().key;
                    var creates = {};
                    creates["/recent/" + recentMe] = {
                        text: $scope.message,
                        name: login,
                        chat: tempSortUsers[0] + tempSortUsers[1],
                        owner: $scope.onlineUsers[selectedUser].email
                    };
                    creates["/recent/" + recentOther] = {
                        text: $scope.message,
                        name: selected,
                        chat: tempSortUsers[0] + tempSortUsers[1],
                        owner: $scope.loginUser.email
                    };
                    firebase.database().ref().update(creates).then(function (data) {
                        console.log(data);
                        alert("recent Created");
                        $scope.message = "";
                    }).catch(function (error) {
                        alert("recent create fail");
                    });
                }
            });
            // firebase.database().ref().child("recent").orderByChild("owner").equalTo($scope.loginUser.email).once('value', function (snapshot) {
            //     if (snapshot.exists()) {
            //         snapshot.forEach(function (childSnapshot) {
            //             var chatId = childSnapshot.val()["chat"];
            //             if (chatId === currentChatId) {
            //                 var updates = {};
            //                 updates['/recent/' + childSnapshot.key + "/text"] = $scope.message;
            //                 firebase.database().ref().update(updates).then(function (data) {
            //                     console.log(data);
            //                     alert("recent Updated");
            //                     $scope.message = "";
            //                 }).catch(function (error) {
            //                     alert("recent Update fail");
            //                     console.log(error);
            //                 });
            //             } else {
            //                 var recentMeIfExists = firebase.database().ref().push().key;
            //                 var recentOtherIfExists = firebase.database().ref().push().key;
            //                 var createsIfExists = {};
            //                 createsIfExists["/recent/" + recentMeIfExists] = {
            //                     text: $scope.message,
            //                     name: selected,
            //                     chat: tempSortUsers[0] + tempSortUsers[1],
            //                     owner: $scope.onlineUsers[selectedUser].email
            //                 };
            //                 createsIfExists["/recent/" + recentOtherIfExists] = {
            //                     text: $scope.message,
            //                     name: login,
            //                     chat: tempSortUsers[0] + tempSortUsers[1],
            //                     owner: $scope.loginUser.email
            //                 };
            //                 firebase.database().ref().update(createsIfExists).then(function (data) {
            //                     console.log(data);
            //                     alert("recent Created");
            //                     $scope.message = "";
            //                 }).catch(function (error) {
            //                     alert("recent create fail");
            //                 });
            //             }
            //         });
            //     } else {
            //         var recentMe = firebase.database().ref().push().key;
            //         var recentOther = firebase.database().ref().push().key;
            //         var creates = {};
            //         creates["/recent/" + recentMe] = {
            //             text: $scope.message,
            //             name: selected,
            //             chat: tempSortUsers[0] + tempSortUsers[1],
            //             owner: $scope.onlineUsers[selectedUser].email
            //         };
            //         creates["/recent/" + recentOther] = {
            //             text: $scope.message,
            //             name: login,
            //             chat: tempSortUsers[0] + tempSortUsers[1],
            //             owner: $scope.loginUser.email
            //         };
            //         firebase.database().ref().update(creates).then(function (data) {
            //             console.log(data);
            //             alert("recent Created");
            //             $scope.message = "";
            //         }).catch(function (error) {
            //             alert("recent create fail");
            //         });
            //     }
            // });
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

    $scope.notLogin = function () {
        console.log("not login");
    };

};
module.exports = chatController;
