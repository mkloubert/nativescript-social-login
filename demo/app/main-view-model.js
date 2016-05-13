var Observable = require("data/observable").Observable;
var SocialLogin = require('nativescript-social-login');

function createViewModel() {
    var viewModel = new Observable();

    viewModel.init = function() {
        SocialLogin.addLogger(function(m) {
            console.log('[nativescript-social-login] ' + m);    
        });
        
        SocialLogin.init();
    };

    viewModel.loginWithGoogle = function() {
        SocialLogin.loginWithGoogle(function(loginRes) {
            switch (loginRes.code) {
                case 0:
                    // success
                    // 
                    // loginRes.userToken
                    // loginRes.displayName
                    // loginRes.photo (if defined)
                    // loginRes.provider (should be "google" in that case)
                    break;
                
                case -1:
                    // "unhandled" exception
                    // 
                    // loginRes.message
                    break;
                    
                case -2:
                    // NO success
                    break;
                    
                case 1:
                    // cancelled
                    break;
            }
        });
    };
    
    viewModel.loginWithFacebook = function() {
         SocialLogin.loginWithFacebook(function(loginRes) {
         });
    };
    
    viewModel.loginWithTwitter = function() {
        SocialLogin.loginWithTwitter(function(loginRes) {
        });
    };

    return viewModel;
}
exports.createViewModel = createViewModel;
