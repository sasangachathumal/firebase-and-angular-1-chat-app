/**
 * Created by root on 2/27/17.
 * Application main controller filen
 * this set static values to scope when application run.
 */
var mainController = function ($scope, $rootScope) {

    "use strict";

    //variable define of showHideNavigation.
    $rootScope.isSideBar = false;
    $rootScope.isHeader = false;

    $rootScope.onlineUsers = [];

};

module.exports = mainController;