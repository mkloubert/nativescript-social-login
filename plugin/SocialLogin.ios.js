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

var LOGTAG_FB_LOGIN_MGR = "facebookLoginManager";
var LOGTAG_INIT_ENV = "initEnvironment()";
var LOGTAG_LOGIN_WITH_FB = "loginWithFacebook()";
var LOGTAG_LOGIN_WITH_GOOGLE = "loginWithGoogle()";
var LOGTAG_ON_GOOGLE_RESULT = "Google successCallback";

var _getLoggers;

var _facebookCallbackManager;
var _googleCallbackManager;

var _googleProfileInfoCallback;

var googleFailCallback;
var googleCancelCallback;
var googleSuccessCallback;

var facebookLoginManager;

var googleSignIn = null;

var facebookInit = false;
var googleInit   = false;

function logMsg(msg, tag) {
    try {
        var loggers = _getLoggers();

        for (var i = 0; i < loggers.length; i++) {
            try {
              var l = loggers[i];
              l(msg, tag);
            } catch (e) {
              console.log("[ERROR] nativescript-social-login >> logMsg() >> logger[" + i + "]: " + e);
            }
        }
    } catch (e) {
      console.log("[ERROR] nativescript-social-login >> logMsg(): " + e);
    }
}

function initEnvironment(cfg,
                         getLoggers) {

    _getLoggers = getLoggers;

    if (!cfg) {
        cfg = {};
    }

    if (!!cfg.facebook) {

      facebookLoginManager = FBSDKLoginManager.alloc().init();
      if (facebookLoginManager) {
          facebookLoginManager.logOut();
          if (!!cfg.facebook.loginBehavior) {
              facebookLoginManager.loginBehavior = cfg.facebook.loginBehavior;
          }
          facebookInit = true;
      }

    }

    if (!!cfg.google) {

      if (TypeUtils.isNullOrUndefined(cfg.google.shouldFetchBasicProfile)) {
        cfg.google.shouldFetchBasicProfile = true;
      }

      googleSignIn = GIDSignIn.sharedInstance();
      googleSignIn.shouldFetchBasicProfile = cfg.google.shouldFetchBasicProfile;
      googleSignIn.scopes = cfg.google.scopes || [ "profile", "email" ];

      // Setting 'googleSignIn.serverClientID' forces retrieval of an offline auth code in iOS.
      // Set it only if that's what the user is expecting to retrieve.
      if (cfg.google.serverClientId && cfg.google.isRequestAuthCode) {
        googleSignIn.serverClientID = cfg.google.serverClientId;
      }

      googleInit = true;

    }

    var result = {
        facebook: {
            isInitialized: facebookInit,
        },
        google: {
            isInitialized: googleInit,
        },
        twitter: {
            isInitialized: undefined,
      },
    };

    logMsg("google.isInitialized: " + result.google.isInitialized, LOGTAG_INIT_ENV);
    logMsg("facebook.isInitialized: " + result.facebook.isInitialized, LOGTAG_INIT_ENV);
    logMsg("twitter.isInitialized: " + result.twitter.isInitialized, LOGTAG_INIT_ENV);

    return result;
}
exports.initEnvironment = initEnvironment;

function logResult(resultCtx, tag) {
    for (var p in resultCtx) {
        if (resultCtx.hasOwnProperty(p)) {
            logMsg("result." + p + " = " + resultCtx[p],
                   tag);
        }
    }
}

function loginWithFacebook(callback) {

  var invokeLoginCallbackForFacebook = function (resultCtx) {
      resultCtx.provider = "facebook";

      logResult(resultCtx, LOGTAG_FB_LOGIN_MGR);

      var cb = callback;
      if (cb) {
        cb(resultCtx);
      }
  };
  var failCallback;
  var cancelCallback;
  var successCallback;

  failCallback = function(error) {
    logMsg("onError()", LOGTAG_FB_LOGIN_MGR);

    invokeLoginCallbackForFacebook({
        code: -2,
        error: error,
    });
  };

  cancelCallback = function() {
    logMsg("onCancel()", LOGTAG_FB_LOGIN_MGR);

    invokeLoginCallbackForFacebook({
        code: 1,
    });
  };

  successCallback = function(result) {
    var authToken;
    logMsg("onSuccess().onCompleted()", LOGTAG_FB_LOGIN_MGR);

    var resultFn = function(connection, theResult, handler) {
      var code = 0;
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
        if (
            theResult.objectForKey("picture") &&
            theResult.objectForKey("picture").objectForKey("data") &&
            theResult.objectForKey("picture").objectForKey("data").objectForKey("url")
        ) {
          photo = theResult.objectForKey("picture").objectForKey("data").objectForKey("url");
        }

      } catch (e) {
        logMsg("[ERROR] onSuccess().onCompleted(): " + e, LOGTAG_FB_LOGIN_MGR);

        code = -1;
        err = e;
      }
      if (code !== -1) {
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
      } else {
        invokeLoginCallbackForFacebook({
          code: code,
          error: err,
        });
      }
    };

    authToken = result.token.tokenString;
    var fbRequest = FBSDKGraphRequest.alloc();

    fbRequest.tokenString = authToken;

    fbRequest.initWithGraphPathParameters("me", {"fields": "id,about,birthday,email,gender,name,first_name,last_name,picture"})
      .startWithCompletionHandler(resultFn);
  };

  if (!!callback) {
    if (typeof callback === "object") {

      if (!!callback.failCallback && typeof callback.failCallback === "function") {
        failCallback = callback.failCallback;
      }

      if (!!callback.cancelCallback && typeof callback.cancelCallback === "function") {
        cancelCallback = callback.cancelCallback;
      }

      if (!!callback.successCallback && typeof callback.successCallback === "function") {
        successCallback = callback.successCallback;
      }

    }
    _facebookCallbackManager = function (result, error) {
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
      } else {
        failCallback("Could not acquire an access token");
        return;
      }
    };
  }

  var permissions;

  if (!permissions) { permissions = ["public_profile", "email"]; }

  // facebookLoginManager.logInWithPublishPermissionsHandler(permissions, _facebookCallbackManager);
  facebookLoginManager.logInWithReadPermissionsHandler(permissions, _facebookCallbackManager);
}

function createSignInDelegate() {

  // var self = this
  var MySignInDelegate = (function (_super) {
  __extends(MySignInDelegate, _super);

  function MySignInDelegate() {
      _super.apply(this, arguments);
  }

  MySignInDelegate.prototype.signInDidSignInForUserWithError = function(signIn, user, error){
      if (error) {
          googleFailCallback(error);
      } else {

          try {
              var resultUser = {
                  userToken: user.profile.email,
                  firstName: user.profile.givenName,
                  lastName: user.profile.familyName,
                  displayName: user.profile.name,
                  authCode: user.serverAuthCode
                    ? user.serverAuthCode
                    : user.authentication.idToken,  // Safe to send to the server
                  id: user.userID,                  // For client-side use only!
              };

              googleSuccessCallback(resultUser);

              if (!_googleProfileInfoCallback) {
                logMsg("no callback set", LOGTAG_ON_GOOGLE_RESULT);
              }
          } catch (error) {
              googleFailCallback(error);
          }

      }
  };

  MySignInDelegate.prototype.signInDidDisconnectWithUserWithError = function(signIn, user, error){
      try {
          if (error) {
              googleFailCallback(error.localizedDescription);
          } else {
              // googleSuccessCallback("logOut");
              googleCancelCallback();
          }
      } catch (error) {
          googleFailCallback(error);
      }
  };

  // MySignInDelegate.prototype.signInWillDispatchError = function(signIn, error) {
  // };

  MySignInDelegate.prototype.signInPresentViewController = function (signIn, viewController) {
      var uiview = Application.ios.rootController;
      uiview.presentViewControllerAnimatedCompletion(viewController, true, null);
  };

  MySignInDelegate.prototype.signInDismissViewController = function(signIn, viewController) {
      viewController.dismissViewControllerAnimatedCompletion(true, null);
  };

  MySignInDelegate.ObjCProtocols = [GIDSignInDelegate, GIDSignInUIDelegate];

  return MySignInDelegate;

  }(NSObject));

  return new MySignInDelegate();
};

function loginWithGoogle(callback) {

  var invokeLoginCallbackForGoogle = function (resultCtx) {
      resultCtx.provider = "google";

      logResult(resultCtx, LOGTAG_LOGIN_WITH_GOOGLE);

      var cb = callback;
      if (cb) {
        cb(resultCtx);
      }
  };

  googleFailCallback = function(error) {
    logMsg("onError()", LOGTAG_LOGIN_WITH_GOOGLE);

    invokeLoginCallbackForGoogle({
        code: -2,
        error: error,
    });
  };

  googleCancelCallback = function() {
    logMsg("onCancel()", LOGTAG_LOGIN_WITH_GOOGLE);

    invokeLoginCallbackForGoogle({
        code: 1,
    });
  };

  googleSuccessCallback = function(result) {
    logMsg("onSuccess().onCompleted()", LOGTAG_LOGIN_WITH_GOOGLE);

    invokeLoginCallbackForGoogle({
      authCode: result.authCode,
      code: 0,
      displayName: result.displayName,
      error: result.error,
      id: result.id,
      userToken: result.userToken,
    });
  };

  if (!!callback) {
    if (typeof callback === "object") {

      if (!!callback.failCallback && typeof callback.failCallback === "function") {
        googleFailCallback = callback.failCallback;
      }

      if (!!callback.cancelCallback && typeof callback.cancelCallback === "function") {
        googleCancelCallback = callback.cancelCallback;
      }

      if (!!callback.successCallback && typeof callback.successCallback === "function") {
        googleSuccessCallback = callback.successCallback;
      }

    }

    _googleProfileInfoCallback = callback;

    var delegate = createSignInDelegate();
    if (!googleSignIn.delegate) {
      googleSignIn.delegate = delegate;
    }
    if (!googleSignIn.uiDelegate) {
      googleSignIn.uiDelegate = delegate;
    }

    googleSignIn.signIn();
  }
  // TODO
};

function loginWithProvider(provider, callback) {
  if (!provider) {
      provider = "";
  }

  provider = ("" + provider).toLowerCase().trim();

  logMsg("Provider: " + provider);

  switch (provider) {
      case "facebook":
        loginWithFacebook(callback);
        break;
      case "google":
        loginWithGoogle(callback);
        break;
      default:
        logMsg("NOT IMPLEMENTED!", "loginWithProvider()");
        throw provider + " is currently NOT supported!";
  }
}
exports.loginWithProvider = loginWithProvider;
