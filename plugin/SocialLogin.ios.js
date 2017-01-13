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

var _getLoggers;

let _facebookCallbackManager;

let facebookInit = false;

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

function initEnvironment(cfg,
                         getLoggers) {

    _getLoggers = getLoggers;

    if (!cfg) {
        cfg = {};
    }


    if (!!cfg.facebook) {

      let facebookLoginManager = FBSDKLoginManager.alloc().init();
      if (facebookLoginManager) {
          facebookLoginManager.logOut();
          if (!!cfg.facebook.loginBehavior) {
              facebookLoginManager.loginBehavior = cfg.facebook.loginBehavior;
          }
          facebookInit = true;
      }

    }

    return {
        facebook: {
            isInitialized: facebookInit,
        },
        google: {
            isInitialized: undefined,
        },
        twitter: {
            isInitialized: undefined,
        }
    };
}
exports.initEnvironment = initEnvironment;

function loginWithFacebook(callback) {

  if (!!callback) {
    if (typeof callback === 'function') { _facebookCallbackManager = callback; }

    else if (typeof callback === 'object') {
      let failCallback;
      let cancelCallback;
      let successCallback;

      if (!!callback.failCallback && typeof callback.failCallback === 'function') {
        failCallback = callback.failCallback;
      }
      else {
        // TODO
      }

      if (!!callback.cancelCallback && typeof callback.cancelCallback === 'function') {
        cancelCallback = callback.cancelCallback;
      }
      else {
        // TODO
      }

      if (!!callback.successCallback && typeof callback.successCallback === 'function') {
        successCallback = callback.successCallback;
      }
      else {
        // TODO
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
        }
        else {
          failCallback("Could not acquire an access token");
          return;
        }
      };

    }
  }

  if (!permissions) { permissions = ["publish_actions"]; }

  loginManager.logInWithPublishPermissionsHandler(permissions, _facebookCallbackManager);
}

function loginWithProvider(provider, callback) {
  logMsg('NOT IMPLEMENTED!', 'loginWithProvider()');
  throw provider + " is currently NOT supported!";
}
exports.loginWithProvider = loginWithProvider;
