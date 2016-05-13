// The MIT License (MIT)
// 
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var app = require("application");
var androidApp = app.android;
var androidAppCtx = androidApp.context;


var activity;
var fbCallbackManager;
var fbLoginManager;
var fbInitialized;
var googleClient;
var loggers = [];
var loginCallback;
var rcFacebookSignIn;
var rcGoogleSignIn;


// addLogger()
function addLogger(l) {
    loggers.push(l);
};
exports.addLogger = addLogger;

function logMsg(msg) {
    for (var i = 0; i < loggers.length; i++) {
        try {
            var l = loggers[i];
            if (l) {
                l(msg);
            }
        }
        catch (e) {
            // ignore
        }
    }
};

// init()
function init(cfg) {
    if (!cfg) {
        cfg = {};
    }
    
    activity = androidApp.foregroundActivity || androidApp.startActivity;
    if (!activity) {
        return;
    }
    
    try {
        com.facebook.FacebookSdk.sdkInitialize(androidAppCtx.getApplicationContext());
        
        fbCallbackManager = com.facebook.CallbackManager.Factory.create();
        
        fbLoginManager = com.facebook.login.LoginManager.getInstance();
        fbLoginManager.logOut();
        
        if (cfg.facebook) {
            if (cfg.facebook.logInBehavior) {
                fbLoginManager = fbLoginManager.setLoginBehavior(cfg.facebook.logInBehavior);
            }
        }
        
        fbInitialized = fbCallbackManager &&
                        fbLoginManager;
                        
        if (fbInitialized) {
            var invokeLoginCallbackForFacebook = function(resultCtx) {
                var cb = loginCallback;
                if (!cb) {
                    return;
                }
                
                resultCtx.provider = 'facebook';
            };
            
            fbLoginManager.registerCallback(fbCallbackManager, new com.facebook.FacebookCallback({
                onSuccess: function (result) {
                    invokeLoginCallbackForFacebook({
                        code: 0    
                    });
                },
                
                onCancel: function () {
                    invokeLoginCallbackForFacebook({
                        code: 1
                    });
                },
                
                onError: function (e) {
                    invokeLoginCallbackForFacebook({
                        code: -2
                    });
                }
            }));
        }
    }
    catch (e) {
        console.log("Facebook SDK could not be initialized! " + e);
    }
    
    var options = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestEmail()
        .requestProfile()
        // .requestServerAuthCode('@TODO', false)
        .build();
        
    googleClient = new com.google.android.gms.common.api.GoogleApiClient.Builder(androidAppCtx)
        .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, options)
        .build();
        
    rcGoogleSignIn = 597965301;
    
    rcFacebookSignIn = 597965302;
        
    activity.onActivityResult = function(requestCode, resultCode, data) {
        var resultCtx = {};
        var cb = loginCallback;
        
        try {
            logMsg('onActivityResult >> requestcode: ' + requestCode);
            logMsg('onActivityResult >> resultcode: ' + resultCode);
            
            if (requestCode == rcGoogleSignIn) {
                logMsg('onActivityResult >> google');
                
                resultCtx.provider = 'google';
                
                if (resultCode == android.app.Activity.RESULT_OK) {
                    logMsg('onActivityResult >> google >> ok');
                    
                    var signInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(data);
                    if (signInResult.isSuccess()) {
                        logMsg('onActivityResult >> google >> success');
                        
                        resultCtx.code = 0;
                        
                        var account = signInResult.getSignInAccount();
                        
                        var photoUrl = account.getPhotoUrl();
                        if (photoUrl) {
                            resultCtx.photo = photoUrl;
                        }
                        
                        resultCtx.userToken = account.getEmail();
                        resultCtx.displayName = account.getDisplayName();
                        
                        logMsg('onActivityResult >> google >> userToken: ' + resultCtx.userToken);
                        logMsg('onActivityResult >> google >> displayName: ' + resultCtx.displayName);
                        logMsg('onActivityResult >> google >> photo: ' + resultCtx.photo);
                    }
                    else {
                        logMsg('onActivityResult >> google >> NO success');
                        
                        resultCtx.code = -2;
                    }
                }
                else if (resultCode == android.app.Activity.RESULT_CANCELED) {
                    logMsg('onActivityResult >> google >> cancelled');
                    
                    resultCtx.code = 1;
                }
            }
            else if (requestCode == rcFacebookSignIn) {
                if (fbInitialized) {
                    fbCallbackManager.onActivityResult(requestCode, resultCode, data);
                }
            }
            else {
                if (cfg.onActivityResult) {
                    cfg.onActivityResult(requestCode, resultCode, data);
                }
                
                cb = null;
            }
        }
        catch (e) {
            resultCtx.code = -1;
            resultCtx.message = e;
        }
        
        logMsg('onActivityResult >> result: ' + JSON.stringify(resultCtx));
        
        if (cb) {
            cb(resultCtx);
        }
    };
};
exports.init = init;

// login()
function login(provider, callback) {
    switch (provider) {
        case 'google':
            loginWithGoogle(callback);
            break;
            
        case 'facebook':
            loginWithFacebook(callback);
            break;
            
        case 'twitter':
            loginWithTwitter(callback);
            break;
    }
};
exports.login = login;

// [CURRENTLY NOT WORKING!!!]  loginWithFacebook()
function loginWithFacebook(callback) {
    loginCallback = callback;
    
    logMsg('loginWithFacebook >> starting activity...');
    
    fbLoginManager.logInWithReadPermissions(activity,
                                            java.util.Arrays.asList(["email"]));
                                          
    logMsg('loginWithGoogle >> activity started');                                      
};
exports.loginWithFacebook = loginWithFacebook;

// loginWithGoogle()
function loginWithGoogle(callback) {
    loginCallback = callback;
    
    logMsg('loginWithGoogle >> starting activity...');
    
    var signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(googleClient);
    activity.startActivityForResult(signInIntent, rcGoogleSignIn);
    
    logMsg('loginWithGoogle >> activity started');
};
exports.loginWithGoogle = loginWithGoogle;

// [CURRENTLY NOT WORKING!!!]  loginWithTwitter()
function loginWithTwitter = function(callback) {
    loginCallback = callback;
    
    logMsg('loginWithTwitter >> starting activity...');
    
    var invokeLoginCallbackForTwitter = function(resultCtx) {
        if (!callback) {
            return;
        }
        
        resultCtx.provider = 'twitter';
    };
    
    com.twitter.sdk.android.Twitter.login(activity, {
        success: function(result) {
            invokeLoginCallbackForTwitter({
                code: 0    
            });
        },
        
        failure: function(exception) {
            invokeLoginCallbackForTwitter({
                code: -2
            });
        }
    });
    
    logMsg('loginWithTwitter >> activity started');
};
exports.loginWithTwitter = loginWithTwitter;
