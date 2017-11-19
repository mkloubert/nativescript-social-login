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
var SocialLogin_common_1 = require("./SocialLogin-common");
var LOGTAG_FB_LOGIN_MGR = "facebookLoginManager";
var LOGTAG_ON_GOOGLE_RESULT = "Google successCallback";
var SocialLogin = (function (_super) {
    __extends(SocialLogin, _super);
    function SocialLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.googleSignIn = null;
        return _this;
    }
    SocialLogin.prototype.init = function (result) {
        if (this.Config.facebook) {
            this.facebookLoginManager = FBSDKLoginManager.alloc().init();
            if (this.facebookLoginManager) {
                if (this.Config.facebook.clearSession) {
                    this.facebookLoginManager.logOut();
                }
                if (this.Config.facebook.loginBehavior) {
                    this.facebookLoginManager.loginBehavior = this.Config.facebook.loginBehavior;
                }
                result.facebook.isInitialized = true;
            }
        }
        if (this.Config.google) {
            this.googleSignIn = GIDSignIn.sharedInstance();
            this.googleSignIn.shouldFetchBasicProfile = this.Config.google.shouldFetchBasicProfile;
            this.googleSignIn.scopes = this.Config.google.scopes;
            // Setting 'googleSignIn.serverClientID' forces retrieval of an offline auth code in iOS.
            // Set it only if that's what the user is expecting to retrieve.
            if (this.Config.google.serverClientId && this.Config.google.isRequestAuthCode) {
                this.googleSignIn.serverClientID = this.Config.google.serverClientId;
            }
            result.google.isInitialized = true;
        }
        return result;
    };
    SocialLogin.prototype.loginWithFacebook = function (callback) {
        var _this = this;
        var invokeLoginCallbackForFacebook = function (resultCtx) {
            resultCtx.provider = "facebook";
            _this.logResult(resultCtx, LOGTAG_FB_LOGIN_MGR);
            // tslint:disable-next-line:no-unused-expression
            callback && callback(resultCtx);
        };
        var failCallback = function (error) {
            _this.logMsg("onError()", LOGTAG_FB_LOGIN_MGR);
            invokeLoginCallbackForFacebook({
                code: SocialLogin_common_1.LoginResultType.Failed,
                error: error,
            });
        };
        var cancelCallback = function () {
            _this.logMsg("onCancel()", LOGTAG_FB_LOGIN_MGR);
            invokeLoginCallbackForFacebook({
                code: SocialLogin_common_1.LoginResultType.Cancelled,
            });
        };
        var successCallback = function (result) {
            var authToken;
            _this.logMsg("onSuccess().onCompleted()", LOGTAG_FB_LOGIN_MGR);
            var resultFn = function (connection, theResult, handler) {
                var code = SocialLogin_common_1.LoginResultType.Success;
                var err;
                var usrToken;
                var displayName;
                var firstName;
                var lastName;
                var photo;
                var id;
                try {
                    // ID
                    id = theResult.objectForKey("id");
                    // email
                    usrToken = theResult.objectForKey("email");
                    // name
                    displayName = theResult.objectForKey("name");
                    if (theResult.objectForKey("first_name")) {
                        firstName = theResult.objectForKey("first_name");
                    }
                    if (theResult.objectForKey("last_name")) {
                        lastName = theResult.objectForKey("last_name");
                    }
                    // photo
                    if (theResult.objectForKey("picture") &&
                        theResult.objectForKey("picture").objectForKey("data") &&
                        theResult.objectForKey("picture").objectForKey("data").objectForKey("url")) {
                        photo = theResult.objectForKey("picture").objectForKey("data").objectForKey("url");
                    }
                }
                catch (e) {
                    _this.logMsg("[ERROR] onSuccess().onCompleted(): " + e, LOGTAG_FB_LOGIN_MGR);
                    code = SocialLogin_common_1.LoginResultType.Exception;
                    err = e;
                }
                if (code !== SocialLogin_common_1.LoginResultType.Exception) {
                    invokeLoginCallbackForFacebook({
                        authToken: authToken,
                        code: code,
                        displayName: displayName,
                        firstName: firstName,
                        lastName: lastName,
                        error: err,
                        id: id,
                        photo: photo,
                        userToken: usrToken,
                    });
                }
                else {
                    invokeLoginCallbackForFacebook({
                        code: code,
                        error: err,
                    });
                }
            };
            authToken = result.token.tokenString;
            var fbRequest = FBSDKGraphRequest.alloc();
            fbRequest.initWithGraphPathParametersTokenStringVersionHTTPMethod("me", { "fields": "id,about,birthday,email,gender,name,first_name,last_name,picture" }, authToken, null, "GET").startWithCompletionHandler(resultFn);
        };
        if (!!callback) {
            this._facebookCallbackManager = function (result, error) {
                if (error) {
                    failCallback(error);
                    return;
                }
                if (!result) {
                    failCallback("Null error");
                    return;
                }
                if (result.isCancelled) {
                    cancelCallback();
                    return;
                }
                if (result.token) {
                    successCallback(result);
                }
                else {
                    failCallback("Could not acquire an access token");
                    return;
                }
            };
        }
        var permissions = ["public_profile", "email"];
        // this.facebookLoginManager.logInWithPublishPermissionsHandler(permissions, this._facebookCallbackManager);
        this.facebookLoginManager.logInWithReadPermissionsHandler(permissions, this._facebookCallbackManager);
    };
    SocialLogin.prototype.createSignInDelegate = function () {
        var self = this;
        var MySignInDelegate = (function (_super) {
            __extends(MySignInDelegate, _super);
            function MySignInDelegate() {
                var _this = _super.call(this) || this;
                _this.ObjCProtocols = [GIDSignInDelegate, GIDSignInUIDelegate];
                return _this;
            }
            MySignInDelegate.prototype.signInDidSignInForUserWithError = function (signIn, user, error) {
                if (error) {
                    self.googleFailCallback(error);
                }
                else {
                    try {
                        var resultUser = {
                            userToken: user.profile.email,
                            firstName: user.profile.givenName,
                            lastName: user.profile.familyName,
                            displayName: user.profile.name,
                            authCode: user.serverAuthCode ? user.serverAuthCode : user.authentication.idToken,
                            id: user.userID,
                        };
                        self.googleSuccessCallback(resultUser);
                        if (!self._googleProfileInfoCallback) {
                            self.logMsg("no callback set", LOGTAG_ON_GOOGLE_RESULT);
                        }
                    }
                    catch (error) {
                        self.googleFailCallback(error);
                    }
                }
            };
            MySignInDelegate.prototype.signInDidDisconnectWithUserWithError = function (signIn, user, error) {
                try {
                    if (error) {
                        self.googleFailCallback(error.localizedDescription);
                    }
                    else {
                        // googleSuccessCallback("logOut");
                        self.googleCancelCallback();
                    }
                }
                catch (error) {
                    self.googleFailCallback(error);
                }
            };
            // signInWillDispatchError(signIn, error) {
            // }
            MySignInDelegate.prototype.signInPresentViewController = function (signIn, viewController) {
                var uiview = application_1.ios.rootController;
                uiview.presentViewControllerAnimatedCompletion(viewController, true, null);
            };
            MySignInDelegate.prototype.signInDismissViewController = function (signIn, viewController) {
                viewController.dismissViewControllerAnimatedCompletion(true, null);
            };
            return MySignInDelegate;
        }(NSObject));
        return new MySignInDelegate();
    };
    SocialLogin.prototype.loginWithGoogle = function (callback) {
        var _this = this;
        var invokeLoginCallbackForGoogle = function (resultCtx) {
            resultCtx.provider = "google";
            _this.logResult(resultCtx, SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            // tslint:disable-next-line:no-unused-expression
            callback && callback(resultCtx);
        };
        this.googleFailCallback = function (error) {
            _this.logMsg("onError()", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            invokeLoginCallbackForGoogle({
                code: SocialLogin_common_1.LoginResultType.Failed,
                error: error,
            });
        };
        this.googleCancelCallback = function () {
            _this.logMsg("onCancel()", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            invokeLoginCallbackForGoogle({
                code: SocialLogin_common_1.LoginResultType.Cancelled,
            });
        };
        this.googleSuccessCallback = function (result) {
            _this.logMsg("onSuccess().onCompleted()", SocialLogin_common_1.LOGTAG_LOGIN_WITH_GOOGLE);
            invokeLoginCallbackForGoogle({
                authCode: result.authCode,
                code: SocialLogin_common_1.LoginResultType.Success,
                displayName: result.displayName,
                error: result.error,
                id: result.id,
                userToken: result.userToken,
            });
        };
        if (!!callback) {
            this._googleProfileInfoCallback = callback;
            var delegate = this.createSignInDelegate();
            if (!this.googleSignIn.delegate) {
                this.googleSignIn.delegate = delegate;
            }
            if (!this.googleSignIn.uiDelegate) {
                this.googleSignIn.uiDelegate = delegate;
            }
            this.googleSignIn.signIn();
        }
    };
    SocialLogin.prototype.loginWithTwitter = function (callback) { };
    return SocialLogin;
}(SocialLogin_common_1.Social));
exports.SocialLogin = SocialLogin;
