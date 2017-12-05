/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var chatlogController = function ($scope, $rootScope, firebase, $firebaseAuth, $window) {

    'use strict';

    $scope.email = "";
    $scope.password = "";

    // login with Facebook
    $scope.login = function () {
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
            alert("sign in success");
            firebase.database().ref().child("onlineUsers").child(firebaseUser.uid).set({
                uid: firebaseUser.uid,
                refreshToken: firebaseUser.refreshToken,
                isAnonymous: firebaseUser.isAnonymous,
                emailVerified: firebaseUser.emailVerified,
                email: firebaseUser.email,
                project: firebaseUser.v,
                isLogin: true
            }).then(function (user) {
                alert("add to user node success");
                localStorage.setItem('loginUser', JSON.stringify(firebaseUser));
                $window.location.href = ('#!/chat');
            }).catch(function (error) {
                alert("Authentication failed");
                console.log("Authentication failed:", error);
            });
        }).catch(function(error) {
            alert("Authentication failed");
            console.log("Authentication failed:", error);
        });
    };

};
module.exports = chatlogController;
