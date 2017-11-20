"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("tns-core-modules/application/application");
var types_1 = require("tns-core-modules/utils/types");
var SocialLogin_common_1 = require("./SocialLogin-common");
var LOGTAG_FB_LOGIN_MGR = "com.facebook.login.LoginManager";
var LOGTAG_ON_ACTIVITY_RESULT = "onActivityResult()";
var actionRunnable = java.lang.Runnable.extend({
    action: undefined,
    run: function () {
        this.action();
    }
});
var SocialLogin = (function (_super) {
    __extends(SocialLogin, _super);
    function SocialLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rcGoogleSignIn = 597965301;
        _this._rcFacebookSignIn = 64206;
        return _this;
    }
    SocialLogin.prototype.init = function (result) {
        var _this = this;
        this.logMsg("activity: " + this.Config.activity, SocialLogin_common_1.LOGTAG_INIT_ENV);
        if (types_1.isNullOrUndefined(this.Config.activity)) {
            this.Config.activity = application_1.android.foregroundActivity || application_1.android.startActivity;
        }
        // Google
        if (this.Config.google.initialize) {
            result = this.initGoogle(result);
        }
        // Facebook
        if (this.Config.facebook.initialize) {
            result = this.initFacebook(result);
        }
        // Twitter
        if (!types_1.isNullOrUndefined(this.Config.twitter.key) &&
            !types_1.isNullOrUndefined(this.Config.twitter.secret)) {
            result = this.initTwitter(result);
        }
        if (!types_1.isNullOrUndefined(this.Config.activity)) {
            this.Config.activity.onActivityResult = function (requestCode, resultCode, data) {
                var resultCtx = {};
                var cb = _this._loginCallback;
                var activityResultHandled = false;
                try {
                    if (requestCode === _this._rcGoogleSignIn) {
                        resultCtx.provider = "google";
                        activityResultHandled = true;
                        if (resultCode === android.app.Activity.RESULT_OK) {
                            _this.logMsg("OK", LOGTAG_ON_ACTIVITY_RESULT);
                            var signInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(data);
                            if (signInResult.isSuccess()) {
                                _this.logMsg("Success", LOGTAG_ON_ACTIVITY_RESULT);
                                resultCtx.code = SocialLogin_common_1.LoginResultType.Success;
                                var account = signInResult.getSignInAccount();
                                var usrId = account.getId();
                                if (!types_1.isNullOrUndefined(usrId)) {
                                    resultCtx.id = usrId;
                                }
                                var photoUrl = account.getPhotoUrl();
                                if (!types_1.isNullOrUndefined(photoUrl)) {
                                    resultCtx.photo = photoUrl;
                                }
                                resultCtx.authToken = account.getIdToken();
                                resultCtx.authCode = account.getServerAuthCode();
                                resultCtx.userToken = account.getEmail();
                                resultCtx.displayName = account.getDisplayName();
                                resultCtx.firstName = account.getGivenName();
                                resultCtx.lastName = account.getFamilyName();
                            }
                            else {
                                _this.logMsg("NO SUCCESS!", LOGTAG_ON_ACTIVITY_RESULT);
                                resultCtx.code = SocialLogin_common_1.LoginResultType.Failed;
                            }
                        }
                        else if (resultCode === android.app.Activity.RESULT_CANCELED) {
                            _this.logMsg("Cancelled", LOGTAG_ON_ACTIVITY_RESULT);
                            resultCtx.code = SocialLogin_common_1.LoginResultType.Cancelled;
                        }
                        _this.logResult(resultCtx, LOGTAG_ON_ACTIVITY_RESULT);
                    }
                    else if (requestCode === _this._rcFacebookSignIn) {
                        _this._fbCallbackManager.onActivityResult(requestCode, resultCode, data);
                        activityResultHandled = true;
                        cb = null;
                    }
                }
                catch (e) {
                    _this.logMsg("[ERROR] " + e, LOGTAG_ON_ACTIVITY_RESULT);
                    resultCtx.code = SocialLogin_common_1.LoginResultType.Exception;
                    resultCtx.error = e;
                }
                if (!activityResultHandled) {
                    if (!types_1.isNullOrUndefined(_this.Config.onActivityResult)) {
                        _this.logMsg("Handling onActivityResult() defined in config...", LOGTAG_ON_ACTIVITY_RESULT);
                        _this.Config.onActivityResult(requestCode, resultCode, data);
                    }
                }
                if (cb) {
                    cb(resultCtx);
                }
            };
        }
        return result;
    };
    SocialLogin.prototype.loginWithFacebook = function (callback) {
        var _this = this;
        try {
            this._loginCallback = callback;
            var uiAction = new actionRunnable();
            uiAction.action = function () {
                try {
                    _this._fbLoginManager.logInWithReadPermissions(_this.Config.activity, java.util.Arrays.asList(["public_profile", "email"]));
                }
                catch (e) {
                    _this.logMsg("[ERROR] runOnUiThread(): " + e, SocialLogin_common_1.LOGTAG_LOGIN_WITH_FB);
                }
            };
            this.logMsg("Starting activity for result...", SocialLogin_common_1.LOGTAG_LOGIN_WITH_FB);
            this.Config.activity.runOnUiThread(uiAction);
        }
        catch (e) {
            this.logMsg("[ERROR] " + e, SocialLogin_common_1.LOGTAG_LOGIN_WITH_FB);
            throw e;
        }
    };
    SocialLogin.prototype.loginWithGoogle = function (callback) {
        var _this = this;
        try {
            var optionBuilder = new com.google.android.gms.auth.api.signin.GoogleSignInOptions
                .Builder(com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .requestProfile();
            if (!types_1.isNullOrUndefined(this.Config.google.serverClientId)) {
                if (!this.Config.google.isRequestAuthCode) {
                    this.logMsg("Will request ID token", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
                    optionBuilder = optionBuilder.requestIdToken(this.Config.google.serverClientId);
                }
                else {
                    this.logMsg("Will request server auth code", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
                    optionBuilder = optionBuilder.requestServerAuthCode(this.Config.google.serverClientId, false);
                }
            }
            var client_1 = new com.google.android.gms.common.api.GoogleApiClient
                .Builder(this.Config.activity.getApplicationContext())
                .addApi(com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API, optionBuilder.build())
                .build();
            this._loginCallback = callback;
            var uiAction = new actionRunnable();
            uiAction.action = function () {
                try {
                    var signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(client_1);
                    _this.Config.activity.startActivityForResult(signInIntent, _this._rcGoogleSignIn);
                }
                catch (e) {
                    _this.logMsg("[ERROR] runOnUiThread(): " + e, SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
                }
            };
            this.logMsg("Starting activity for result...", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            this.Config.activity.runOnUiThread(uiAction);
        }
        catch (e) {
            this.logMsg("[ERROR] " + e, SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            throw e;
        }
    };
    // CURRENTLY NOT WORKING!
    SocialLogin.prototype.loginWithTwitter = function (callback) {
        var _this = this;
        this._loginCallback = callback;
        try {
            var invokeForTwitterResult_1 = function (resultCtx) {
                resultCtx.provider = "twitter";
                // tslint:disable-next-line:no-unused-expression
                _this._loginCallback && _this._loginCallback(resultCtx);
            };
            var uiAction = new actionRunnable();
            uiAction.action = function () {
                var twitterAuthCfg = new com.twitter.sdk.android.core.TwitterAuthConfig(_this.Config.twitter.key, _this.Config.twitter.secret);
                var twitter = com.twitter.sdk.android.Twitter(twitterAuthCfg);
                twitter.logIn(_this.Config.activity, new com.twitter.sdk.android.core.Callback({
                    success: function (result) {
                        invokeForTwitterResult_1({
                            code: SocialLogin_common_1.LoginResultType.Success,
                            authToken: result.data.getAuthToken().token,
                            userToken: result.data.getUserName(),
                            displayName: result.data.getUserName()
                        });
                    },
                    failure: function (ex) {
                        invokeForTwitterResult_1({
                            code: SocialLogin_common_1.LoginResultType.Failed,
                            error: ex.getMessage()
                        });
                    }
                }));
            };
            this.Config.activity.runOnUiThread(uiAction);
        }
        catch (e) {
            callback({
                code: SocialLogin_common_1.LoginResultType.Exception,
                error: e
            });
        }
    };
    SocialLogin.prototype.initFacebook = function (result) {
        var _this = this;
        try {
            com.facebook.FacebookSdk.sdkInitialize(this.Config.activity.getApplicationContext());
            com.facebook.appevents.AppEventsLogger.activateApp(this.Config.activity);
            var fbCallbackManager = com.facebook.CallbackManager.Factory.create();
            var fbLoginManager = com.facebook.login.LoginManager.getInstance();
            if (this.Config.facebook.clearSession) {
                fbLoginManager.logOut();
            }
            this._fbCallbackManager = fbCallbackManager;
            this._fbLoginManager = fbLoginManager;
            var invokeLoginCallbackForFacebook_1 = function (resultCtx) {
                resultCtx.provider = "facebook";
                _this.logResult(resultCtx, LOGTAG_FB_LOGIN_MGR);
                // tslint:disable-next-line:no-unused-expression
                _this._loginCallback && _this._loginCallback(resultCtx);
            };
            this._fbLoginManager.registerCallback(this._fbCallbackManager, new com.facebook.FacebookCallback({
                onSuccess: function (loginResult) {
                    _this.logMsg("onSuccess()", LOGTAG_FB_LOGIN_MGR);
                    var authToken;
                    try {
                        authToken = loginResult.getAccessToken().getToken();
                        var request = com.facebook.GraphRequest.newMeRequest(loginResult.getAccessToken(), new com.facebook.GraphRequest.GraphJSONObjectCallback({
                            onCompleted: function (obj, resp) {
                                _this.logMsg("onSuccess().onCompleted()", LOGTAG_FB_LOGIN_MGR);
                                var code = SocialLogin_common_1.LoginResultType.Success, error, userToken, displayName, firstName, lastName, photo, id;
                                try {
                                    // ID
                                    if (obj.has("id")) {
                                        id = obj.getString("id");
                                    }
                                    // email
                                    if (obj.has("email")) {
                                        userToken = obj.getString("email");
                                    }
                                    // name
                                    if (obj.has("name")) {
                                        displayName = obj.getString("name");
                                    }
                                    // first name
                                    if (obj.has("first_name")) {
                                        firstName = obj.getString("first_name");
                                    }
                                    // last name
                                    if (obj.has("last_name")) {
                                        lastName = obj.getString("last_name");
                                    }
                                    // photo
                                    if (obj.has("picture")) {
                                        photo = obj.getJSONObject("picture").getJSONObject("data").getString("url");
                                    }
                                }
                                catch (e) {
                                    _this.logMsg("[ERROR] onSuccess().onCompleted(): " + e, LOGTAG_FB_LOGIN_MGR);
                                    code = SocialLogin_common_1.LoginResultType.Exception;
                                    error = e;
                                }
                                invokeLoginCallbackForFacebook_1({
                                    authToken: authToken,
                                    code: code,
                                    error: error,
                                    userToken: userToken,
                                    displayName: displayName,
                                    firstName: firstName,
                                    lastName: lastName,
                                    photo: photo,
                                    id: id
                                });
                            }
                        }));
                        var params = new android.os.Bundle();
                        params.putString("fields", "id,name,first_name,last_name,picture.type(large),email");
                        request.setParameters(params);
                        _this.logMsg("onSuccess(): Executing request...", LOGTAG_FB_LOGIN_MGR);
                        request.executeAsync();
                    }
                    catch (e) {
                        _this.logMsg("[ERROR] onSuccess(): " + e, LOGTAG_FB_LOGIN_MGR);
                        invokeLoginCallbackForFacebook_1({
                            authToken: authToken,
                            code: SocialLogin_common_1.LoginResultType.Exception,
                            error: e
                        });
                    }
                },
                onCancel: function () {
                    _this.logMsg("onCancel()", LOGTAG_FB_LOGIN_MGR);
                    invokeLoginCallbackForFacebook_1({
                        code: SocialLogin_common_1.LoginResultType.Cancelled
                    });
                },
                onError: function (e) {
                    _this.logMsg("onError()", LOGTAG_FB_LOGIN_MGR);
                    invokeLoginCallbackForFacebook_1({
                        code: SocialLogin_common_1.LoginResultType.Failed,
                        error: e.getMessage(),
                    });
                }
            }));
            result.facebook.isInitialized = true;
        }
        catch (e) {
            this.logMsg("[ERROR] init.facebook: " + e, SocialLogin_common_1.LOGTAG_INIT_ENV);
            result.facebook.error = e;
        }
        return result;
    };
    // TODO
    SocialLogin.prototype.initTwitter = function (result) {
        // try {
        //     var twitterAuthCfg = new com.twitter.sdk.android.core.TwitterAuthConfig(
        //         this.Config.twitter.key,
        //         this.Config.twitter.secret);
        //     io.fabric.sdk.android.Fabric.with(
        //         this.Config.activity,
        //         new com.twitter.sdk.android.core.TwitterCore(twitterAuthCfg));
        //     result.twitter.isInitialized = true;
        // }
        // catch (e) {
        //     this.logMsg('[ERROR] init.twitter: ' + e, LOGTAG_INIT_ENV);
        //     result.twitter.error = e;
        // }
        return result;
    };
    SocialLogin.prototype.initGoogle = function (result) {
        try {
            // Strange?!
            result.google.isInitialized = true;
        }
        catch (e) {
            this.logMsg("[ERROR] init.google: " + e, SocialLogin_common_1.LOGTAG_INIT_ENV);
            result.google.error = e;
        }
        return result;
    };
    return SocialLogin;
}(SocialLogin_common_1.Social));
exports.SocialLogin = SocialLogin;
