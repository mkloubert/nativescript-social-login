// The MIT License (MIT)
// 
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

var Application = require("application");
var TypeUtils = require("utils/types");

var LOGTAG_FB_LOGIN_MGR = 'com.facebook.login.LoginManager';
var LOGTAG_INIT_ENV = 'initEnvironment()';
var LOGTAG_LOGIN_WITH_FB = 'loginWithFacebook()';
var LOGTAG_LOGIN_WITH_GOOGLE = 'loginWithGoogle()';
var LOGTAG_ON_ACTIVITY_RESULT = 'onActivityResult()';

var _activity;
var _fbCallbackManager;
var _fbLoginManager;
var _getLoggers;
var _googleServerClientId;
var _loginCallback;
var _rcFacebookSignIn;
var _rcGoogleSignIn;
var _twitterKey;
var _twitterSecret;
var _isGoogleRequestAuthCode;

var actionRunnable = java.lang.Runnable.extend({
    action: undefined,
    
    run: function() {
        this.action();
    }
});

function logMsg(msg, tag) {
    try {
        var loggers = _getLoggers();

        for (var i = 0; i < loggers.length; i++) {
            try {
                var l = loggers[i];
                l(msg, tag);
            }
            catch (e) {
                console.log("[ERROR] nativescript-social-login >> logMsg() >> logger[" + i + "]: " + e);
            }
        }
    }
    catch (e) {
        console.log("[ERROR] nativescript-social-login >> logMsg(): " + e);
    }
}

function logResult(resultCtx, tag) {
    for (var p in resultCtx) {
        if (resultCtx.hasOwnProperty(p)) {
            logMsg('result.' + p + ' = ' + resultCtx[p],
                   tag);
        }
    }
}

function initEnvironment(cfg,
                         getLoggers) {

    _getLoggers = getLoggers;

    if (!cfg) {
        cfg = {};
    }

    var initializeGoogle;
    if (!TypeUtils.isNullOrUndefined(cfg.google)) {
        // google.initialize
        if (!TypeUtils.isNullOrUndefined(cfg.google.initialize)) {
            initializeGoogle = cfg.google.initialize;
        }

        // google.serverClientId
        if (!TypeUtils.isNullOrUndefined(cfg.google.serverClientId)) {
            _googleServerClientId = cfg.google.serverClientId;
        }

        _isGoogleRequestAuthCode = cfg.google.isRequestAuthCode;
    }

    var initializeFacebook;
    if (!TypeUtils.isNullOrUndefined(cfg.facebook)) {
        if (!TypeUtils.isNullOrUndefined(cfg.facebook.initialize)) {
            initializeFacebook = cfg.facebook.initialize;
        }
    }

    var initializeTwitter = false;
    if (!TypeUtils.isNullOrUndefined(cfg.twitter)) {
        _twitterKey = cfg.twitter.key;
        _twitterSecret = cfg.twitter.secret;
    }

    if (TypeUtils.isNullOrUndefined(initializeGoogle)) {
        initializeGoogle = true;
    }
    if (TypeUtils.isNullOrUndefined(initializeFacebook)) {
        initializeFacebook = true;
    }

    logMsg('initialize.google: ' + initializeGoogle, LOGTAG_INIT_ENV);
    logMsg('initialize.facebook: ' + initializeFacebook, LOGTAG_INIT_ENV);
    logMsg('initialize.twitter: ' + initializeTwitter, LOGTAG_INIT_ENV);

    var result = {
        facebook: {
            isInitialized: null,
        },
        google: {
            isInitialized: null,
        },
        twitter: {
            isInitialized: undefined,  // not implemented yet
        }
    };

    _rcGoogleSignIn = 597965301;
    _rcFacebookSignIn = 64206;

    var googleClientOptions;    

    _activity = cfg.activity ||
                Application.android.foregroundActivity ||
                Application.android.startActivity;

    logMsg('activity: ' + _activity, LOGTAG_INIT_ENV);

    // DEPRECATED: googleServerClientId
    if (TypeUtils.isNullOrUndefined(_googleServerClientId)) {
        if (!TypeUtils.isNullOrUndefined(cfg.googleServerClientId)) {
            _googleServerClientId = cfg.googleServerClientId;
        }    
    }

    // Google
    if (initializeGoogle) {
        result.google.isInitialized = false;
        try {
            result.google.isInitialized = true;
        }
        catch (e) {
            logMsg('[ERROR] init.google: ' + e, LOGTAG_INIT_ENV);

            result.google.error = e;
        }
    }

    // Facebook
    if (initializeFacebook) {
        result.facebook.isInitialized = false;
        try {
            com.facebook.FacebookSdk.sdkInitialize(_activity.getApplicationContext());
            com.facebook.appevents.AppEventsLogger.activateApp(_activity);

            var fbCallbackManager = com.facebook.CallbackManager.Factory.create();

            var fbLoginManager = com.facebook.login.LoginManager.getInstance();
            fbLoginManager.logOut();

            _fbCallbackManager = fbCallbackManager;
            _fbLoginManager = fbLoginManager;

            var invokeLoginCallbackForFacebook = function(resultCtx) {
                resultCtx.provider = 'facebook';

                logResult(resultCtx, LOGTAG_FB_LOGIN_MGR);
                
                var cb = _loginCallback;
                if (cb) {
                    cb(resultCtx);
                }
            };
            
            _fbLoginManager.registerCallback(_fbCallbackManager, new com.facebook.FacebookCallback({
                onSuccess: function (loginResult) {
                    logMsg('onSuccess()', LOGTAG_FB_LOGIN_MGR);

                    try {
                        var authToken = loginResult.getAccessToken().getToken();

                        var request = com.facebook.GraphRequest.newMeRequest(
                            loginResult.getAccessToken(),
                            new com.facebook.GraphRequest.GraphJSONObjectCallback({
                                onCompleted: function(obj, resp) {
                                    logMsg('onSuccess().onCompleted()', LOGTAG_FB_LOGIN_MGR);

                                    var code = 0;
                                    var err;
                                    var usrToken;
                                    var displayName;
                                    var photo;
                                    var id;

                                    try {
                                        // ID
                                        if (obj.has("id")) {
                                            id = obj.getString("id");
                                        }
                                        
                                        // email
                                        if (obj.has("email")) {
                                            usrToken = obj.getString("email");
                                        }

                                        // name
                                        if (obj.has("name")) {
                                            displayName = obj.getString("name");
                                        }

                                        // photo
                                        if (obj.has("picture")) {
                                            photo = obj.getJSONObject("picture").getJSONObject("data").getString("url");
                                        }
                                    }
                                    catch (e) {
                                        logMsg('[ERROR] onSuccess().onCompleted(): ' + e, LOGTAG_FB_LOGIN_MGR);

                                        code = -1;
                                        err = e;
                                    }

                                    invokeLoginCallbackForFacebook({
                                        authToken: authToken,
                                        code: code,
                                        error: err,
                                        userToken: usrToken,
                                        displayName: displayName,
                                        photo: photo,
                                        id: id
                                    });
                                }
                            })
                        );

                        var params = new android.os.Bundle();
                        params.putString("fields", "id,name,picture.type(large),email");

                        request.setParameters(params);

                        logMsg('onSuccess(): Executing request...', LOGTAG_FB_LOGIN_MGR);
                        request.executeAsync();
                    }
                    catch (e) {
                        logMsg('[ERROR] onSuccess(): ' + e, LOGTAG_FB_LOGIN_MGR);

                        invokeLoginCallbackForFacebook({
                            authToken: authToken,
                            code: -1,
                            error: e
                        });
                    }
                },
                
                onCancel: function () {
                    logMsg('onCancel()', LOGTAG_FB_LOGIN_MGR);

                    invokeLoginCallbackForFacebook({
                        code: 1
                    });
                },
                
                onError: function (e) {
                    logMsg('onError()', LOGTAG_FB_LOGIN_MGR);

                    invokeLoginCallbackForFacebook({
                        code: -2,
                        error: e.getMessage(),
                    });
                }
            }));          

            result.facebook.isInitialized = true;  
        }
        catch (e) {
            logMsg('[ERROR] init.facebook: ' + e, LOGTAG_INIT_ENV);

            result.facebook.error = e;
        }
    }

    // TODO
    /*
    if (!TypeUtils.isNullOrUndefined(_twitterKey) &&
        !TypeUtils.isNullOrUndefined(_twitterSecret)) {
        
        result.twitter.isInitialized = false;
        try {
	        var twitterAuthCfg = new com.twitter.sdk.android.core.TwitterAuthConfig(
                _twitterKey,
                _twitterSecret);
        
            io.fabric.sdk.android.Fabric.with(
                _activity,
                new com.twitter.sdk.android.core.TwitterCore(twitterAuthCfg));

            result.twitter.isInitialized = true;
        }
        catch (e) {
            logMsg('[ERROR] init.twitter: ' + e, LOGTAG_INIT_ENV);

            result.twitter.error = e;
        }
    }*/

    if (!TypeUtils.isNullOrUndefined(_activity)) {
        _activity.onActivityResult = (requestCode, resultCode, data) => {
            var resultCtx = {};
            var cb = _loginCallback;
            var activityResultHandled = false;

            try {
                if (requestCode == _rcGoogleSignIn) {
                    resultCtx.provider = "google";

                    activityResultHandled = true;

                    if (resultCode == android.app.Activity.RESULT_OK) {
                        logMsg('OK', LOGTAG_ON_ACTIVITY_RESULT);

                        var signInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(data);
                        if (signInResult.isSuccess()) {
                            logMsg('Success', LOGTAG_ON_ACTIVITY_RESULT);
                            
                            resultCtx.code = 0;

                            var account = signInResult.getSignInAccount();

                            var usrId = account.getId();
                            if (!TypeUtils.isNullOrUndefined(usrId)) {
                                resultCtx.id = usrId;
                            }

                            var photoUrl = account.getPhotoUrl();
                            if (!TypeUtils.isNullOrUndefined(photoUrl)) {
                                resultCtx.photo = photoUrl;
                            }

                            resultCtx.authToken = account.getIdToken(); 
                            resultCtx.authCode = account.getServerAuthCode();
                            resultCtx.userToken = account.getEmail();
                            resultCtx.displayName = account.getDisplayName();      
                        }
                        else {
                            logMsg('NO SUCCESS!', LOGTAG_ON_ACTIVITY_RESULT);

                            resultCtx.code = -2;
                        }
                    }
                    else if (resultCode == android.app.Activity.RESULT_CANCELED) {
                        logMsg('Cancelled', LOGTAG_ON_ACTIVITY_RESULT);

                        resultCtx.code = 1;
                    }

                    logResult(resultCtx, LOGTAG_ON_ACTIVITY_RESULT);
                }
                else if (requestCode == _rcFacebookSignIn) {
                    _fbCallbackManager.onActivityResult(requestCode, resultCode, data);
                
                    activityResultHandled = true;
                    cb = null;    
                }
            }
            catch (e) {
                logMsg('[ERROR] ' + e, LOGTAG_ON_ACTIVITY_RESULT);

                resultCtx.code = -1;
                resultCtx.error = e;
            }

            if (!activityResultHandled) {
                if (!TypeUtils.isNullOrUndefined(cfg.onActivityResult)) {
                    logMsg('Handling onActivityResult() defined in config...', LOGTAG_ON_ACTIVITY_RESULT);

                    cfg.onActivityResult(requestCode, resultCode, data);
                }
            }

            if (cb) {
                cb(resultCtx);
            }
        }
    }

    logMsg('google.isInitialized: ' + result.google.isInitialized, LOGTAG_INIT_ENV);
    logMsg('facebook.isInitialized: ' + result.facebook.isInitialized, LOGTAG_INIT_ENV);
    logMsg('twitter.isInitialized: ' + result.twitter.isInitialized, LOGTAG_INIT_ENV);
    
    return result;
}
exports.initEnvironment = initEnvironment;

function loginWithFacebook(callback) {
    try {
        _loginCallback = callback;

        var uiAction = new actionRunnable();
        uiAction.action = () => {
            try {
                _fbLoginManager.logInWithReadPermissions(_activity,
                                                         java.util.Arrays.asList(["public_profile", "email"]));
            }
            catch (e) {
                logMsg('[ERROR] runOnUiThread(): ' + e, LOGTAG_LOGIN_WITH_FB);
            }
        };

        logMsg('Starting activity for result...', LOGTAG_LOGIN_WITH_FB);
        _activity.runOnUiThread(uiAction);
    }
    catch (e) {
        logMsg('[ERROR] ' + e, LOGTAG_LOGIN_WITH_FB);

        throw e;    
    }     
}

function loginWithGoogle(callback) {
    try {
        var optionBuilder = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestProfile();

        if (!TypeUtils.isNullOrUndefined(_googleServerClientId)) {
            logMsg('Will request server auth code', LOGTAG_LOGIN_WITH_GOOGLE);

            if(_isGoogleRequestAuthCode){
                optionBuilder = optionBuilder.requestServerAuthCode(_googleServerClientId, false);
            }else{
                optionBuilder = optionBuilder.requestIdToken(_googleServerClientId);
            }
        }

        var options = optionBuilder.build();
            
        var client = new com.google.android.gms.common.api.GoogleApiClient.Builder(_activity.getApplicationContext())
            .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, options)
            .build();

        var signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(client);

        _loginCallback = callback;

        var uiAction = new actionRunnable();
        uiAction.action = () => {
            try {
                _activity.startActivityForResult(signInIntent, _rcGoogleSignIn);
            }
            catch (e) {
                logMsg('[ERROR] runOnUiThread(): ' + e, LOGTAG_LOGIN_WITH_GOOGLE);
            }
        };

        logMsg('Starting activity for result...', LOGTAG_LOGIN_WITH_GOOGLE);
        _activity.runOnUiThread(uiAction);
    }
    catch (e) {
        logMsg('[ERROR] ' + e, LOGTAG_LOGIN_WITH_GOOGLE);

        throw e;    
    }     
}

// CURRENTLY NOT WORKING!
function loginWithTwitter(callback) {
    _loginCallback = callback;
    
    try {
        var invokeForTwitterResult = function(resultCtx) {
            resultCtx.provider = 'twitter';

            var cb = _loginCallback;
            if (cb) {
                cb(resultCtx);
            }
        };

        var uiAction = new actionRunnable();
        uiAction.action = () => {
            var twitterAuthCfg = new com.twitter.sdk.android.core.TwitterAuthConfig(
                _twitterKey,
                _twitterSecret);

            var t = com.twitter.sdk.android.Twitter(twitterAuthCfg);
            t.logIn(_activity, new com.twitter.sdk.android.core.Callback({
                success: function(result) {
                    invokeForTwitterResult({
                        code: 0,
                        authToken: result.data.getAuthToken().token,
                        userToken: result.data.getUserName(),
                        displayName: result.data.getUserName()
                    });
                },

                failure: function(ex) {
                    invokeForTwitterResult({
                        code: -2,
                        error: ex.getMessage()
                    });
                }
            }));
        };

        _activity.runOnUiThread(uiAction);
    }
    catch (e) {
        callback({
            code: -1,
            error: e
        });
    }
}


function loginWithProvider(provider, callback) {
    if (TypeUtils.isNullOrUndefined(provider)) {
        provider = '';
    }
    
    provider = ('' + provider).toLowerCase().trim();

    logMsg("Provider: " + provider);

    switch (provider) {
        case "":
        case "google":
            logMsg("Will use Google sign in...");
            loginWithGoogle(callback);
            break;
        
        case "facebook":
        case "fb":
            logMsg("Will use Facebook SDK...");
            loginWithFacebook(callback);
            break;

        // TODO
        /* case "twitter":
            loginWithTwitter(callback);
            break; */

        default:
            throw "Provider '" + provider + "' is NOT supported!";
    }
}
exports.loginWithProvider = loginWithProvider;
