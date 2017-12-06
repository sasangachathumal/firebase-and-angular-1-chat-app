/*global $, jQuery*/
/*global angular*/
/*global Chart*/
/**
 * Created by vihanga on 5/9/17.
 * this ja control all logger things
 */
var chatlogController = function ($scope, $rootScope, firebase, $firebaseAuth, $window) {

    'use strict';

    $scope.loginEmail = "";
    $scope.loginPassword = "";

    $scope.signUpEmail = "";
    $scope.signUpPassword = "";

    $scope.loginView = false;
    $scope.signupView = false;

    $scope.changeView = function (view) {
        switch (view) {
            case "login":
                $scope.loginView = true;
                $scope.signupView = false;
                break;
            case "signUp":
                $scope.signupView = true;
                $scope.loginView = false;
                break;
        }
    };

    // login with Facebook
    $scope.login = function () {
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword($scope.loginEmail, $scope.loginPassword).then(function(firebaseUser) {
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
                alert("add to online node success");
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

    $scope.signUp = function () {
        var auth = $firebaseAuth();
        auth.$createUserWithEmailAndPassword($scope.signUpEmail, $scope.signUpPassword).then(function (firebaseUser) {
            alert("Sign up Success");
            console.log(firebaseUser);
            firebase.database().ref().child("users").child(firebaseUser.uid).set({
                uid: firebaseUser.uid,
                refreshToken: firebaseUser.refreshToken,
                isAnonymous: firebaseUser.isAnonymous,
                emailVerified: firebaseUser.emailVerified,
                email: firebaseUser.email,
                project: firebaseUser.v,
                isLogin: true
            }).then(function (user) {
                alert("add to user node success");
                firebase.database().ref().child("onlineUsers").child(firebaseUser.uid).set({
                    uid: firebaseUser.uid,
                    refreshToken: firebaseUser.refreshToken,
                    isAnonymous: firebaseUser.isAnonymous,
                    emailVerified: firebaseUser.emailVerified,
                    email: firebaseUser.email,
                    project: firebaseUser.v,
                    isLogin: true
                }).then(function (user) {
                    alert("add to online node success");
                    localStorage.setItem('loginUser', JSON.stringify(firebaseUser));
                    $window.location.href = ('#!/chat');
                }).catch(function (error) {
                    alert("Authentication failed");
                    console.log("Authentication failed:", error);
                });
            }).catch(function (error) {
                alert("Authentication failed");
                console.log("Authentication failed:", error);
            });
        }).catch(function (error) {

        });
    }

};
module.exports = chatlogController;
