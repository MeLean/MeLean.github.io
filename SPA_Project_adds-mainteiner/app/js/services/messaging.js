'use strict';
adsApp.factory('messaging', function () {

    var successMsg = function(message) {
        $("#messageBox").notify( message, 'success', {
            autoHideDelay: 3000,
            globalPosition: 'top right'
        });
    }

    var errorMsg = function(message) {
        $("#messageBox").notify(message, 'error', {
            autoHideDelay: 3000,
            globalPosition: 'top right'
        });
    }

    return {
        successMsg : successMsg,
        errorMsg : errorMsg
    }
});