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

import {
    android as Android,
    AndroidApplication,
    AndroidActivityResultEventData
} from "tns-core-modules/application/application";
import { isNullOrUndefined } from "tns-core-modules/utils/types";
import {
    IInitializationResult,
    ILoginResult,
    LoginResultType,
    Social,
    LOGTAG_INIT_ENV,
    LOGTAG_LOGIN_WITH_FB,
    LOGTAG_LOGIN_WITH_GOOGLE,
    LOGTAG_LOGOUT
} from "./SocialLogin-common";

declare const com, java;

const LOGTAG_FB_LOGIN_MGR = "com.facebook.login.LoginManager";
const LOGTAG_ON_ACTIVITY_RESULT = "onActivityResult()";

const actionRunnable = (function() {
    return java.lang.Runnable.extend({
        action: undefined,
        run() {
            this.action();
        }
    });
})();

export class SocialLogin extends Social {
    private _googleClient: any; // com.google.android.gms.common.api.GoogleApiClient
    private _rcGoogleSignIn: number = 597; // < 16 bits
    private _rcFacebookSignIn: number = 64206; // < 16 bits
    private _fbCallbackManager: any; // com.facebook.CallbackManager
    private _fbLoginManager: any; // com.facebook.login.LoginManager

    init(result: IInitializationResult): IInitializationResult {
        this.logMsg("activity: " + this.Config.activity, LOGTAG_INIT_ENV);

        if (isNullOrUndefined(this.Config.activity)) {
            this.Config.activity =
                Android.foregroundActivity || Android.startActivity;
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
        if (
            !isNullOrUndefined(this.Config.twitter.key) &&
            !isNullOrUndefined(this.Config.twitter.secret)
        ) {
            result = this.initTwitter(result);
        }

        if (!isNullOrUndefined(this.Config.activity)) {
            const onLoginResult = ({
                requestCode,
                resultCode,
                intent
            }: AndroidActivityResultEventData) => {
                if (
                    requestCode === this._rcGoogleSignIn ||
                    requestCode === this._rcFacebookSignIn
                ) {
                    const resultCtx: Partial<ILoginResult> = {};
                    let callback = this._loginCallback;
                    let activityResultHandled = false;

                    try {
                        if (requestCode === this._rcGoogleSignIn) {
                            resultCtx.provider = "google";

                            activityResultHandled = true;

                            if (resultCode === android.app.Activity.RESULT_OK) {
                                this.logMsg("OK", LOGTAG_ON_ACTIVITY_RESULT);

                                const signInResult = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInResultFromIntent(
                                    intent
                                );
                                if (signInResult.isSuccess()) {
                                    this.logMsg(
                                        "Success",
                                        LOGTAG_ON_ACTIVITY_RESULT
                                    );

                                    resultCtx.code = LoginResultType.Success;

                                    const account = signInResult.getSignInAccount();

                                    const usrId = account.getId();
                                    if (!isNullOrUndefined(usrId)) {
                                        resultCtx.id = usrId;
                                    }

                                    const photoUrl = <android.net.Uri>account.getPhotoUrl();
                                    if (!isNullOrUndefined(photoUrl)) {
                                        resultCtx.photo = photoUrl.toString();
                                    }

                                    resultCtx.authToken = account.getIdToken();
                                    resultCtx.authCode = account.getServerAuthCode();
                                    resultCtx.userToken = account.getEmail();
                                    resultCtx.displayName = account.getDisplayName();
                                    resultCtx.firstName = account.getGivenName();
                                    resultCtx.lastName = account.getFamilyName();
                                } else {
                                    this.logMsg(
                                        "NO SUCCESS!",
                                        LOGTAG_ON_ACTIVITY_RESULT
                                    );

                                    resultCtx.code = LoginResultType.Failed;
                                }
                            } else if (
                                resultCode ===
                                android.app.Activity.RESULT_CANCELED
                            ) {
                                this.logMsg(
                                    "Cancelled",
                                    LOGTAG_ON_ACTIVITY_RESULT
                                );

                                resultCtx.code = LoginResultType.Cancelled;
                            }

                            this.logResult(
                                resultCtx,
                                LOGTAG_ON_ACTIVITY_RESULT
                            );
                        } else if (requestCode === this._rcFacebookSignIn) {
                            this._fbCallbackManager.onActivityResult(
                                requestCode,
                                resultCode,
                                intent
                            );

                            activityResultHandled = true;
                            callback = void 0;
                        }
                    } catch (e) {
                        this.logMsg("[ERROR] " + e, LOGTAG_ON_ACTIVITY_RESULT);

                        resultCtx.code = LoginResultType.Exception;
                        resultCtx.error = e;
                    }

                    if (!activityResultHandled) {
                        if (!isNullOrUndefined(this.Config.onActivityResult)) {
                            this.logMsg(
                                "Handling onActivityResult() defined in config...",
                                LOGTAG_ON_ACTIVITY_RESULT
                            );

                            this.Config.onActivityResult(
                                requestCode,
                                resultCode,
                                intent
                            );
                        }
                    }

                    this.logMsg(
                        "Calling Callback function with Results",
                        LOGTAG_ON_ACTIVITY_RESULT
                    );
                    // tslint:disable-next-line:no-unused-expression
                    callback && callback(resultCtx);
                    Android.off(
                        AndroidApplication.activityResultEvent,
                        onLoginResult
                    );
                }
            };

            Android.on(AndroidApplication.activityResultEvent, onLoginResult);
        }

        return result;
    }

    loginWithFacebook(callback: (result: Partial<ILoginResult>) => void) {
        try {
            this._loginCallback = callback;

            let uiAction = new actionRunnable();
            uiAction.action = () => {
                try {
                    this._fbLoginManager.logInWithReadPermissions(
                        this.Config.activity,
                        java.util.Arrays.asList(["public_profile", "email"])
                    );
                } catch (e) {
                    this.logMsg(
                        "[ERROR] runOnUiThread(): " + e,
                        LOGTAG_LOGIN_WITH_FB
                    );
                }
            };

            this.logMsg(
                "Starting activity for result...",
                LOGTAG_LOGIN_WITH_FB
            );
            this.Config.activity.runOnUiThread(uiAction);
        } catch (e) {
            this.logMsg("[ERROR] " + e, LOGTAG_LOGIN_WITH_FB);

            throw e;
        }
    }

    loginWithGoogle(callback: (result: Partial<ILoginResult>) => void) {
        try {
            if (!this._googleClient.isConnected()) {
                this.logMsg(
                    "Google is not connected. Reconnecting... ",
                    LOGTAG_LOGIN_WITH_GOOGLE
                );
                this._googleClient.connect(
                    com.google.android.gms.common.api.GoogleApiClient
                        .SIGN_IN_MODE_OPTIONAL
                );
            }
            this._loginCallback = callback;

            const uiAction = new actionRunnable();
            uiAction.action = () => {
                try {
                    const signInIntent = com.google.android.gms.auth.api.Auth.GoogleSignInApi.getSignInIntent(
                        this._googleClient
                    );
                    this.Config.activity.startActivityForResult(
                        signInIntent,
                        this._rcGoogleSignIn
                    );
                } catch (e) {
                    this.logMsg(
                        "[ERROR] runOnUiThread(): " + e,
                        LOGTAG_LOGIN_WITH_GOOGLE
                    );
                }
            };

            this.logMsg(
                "Starting activity for result...",
                LOGTAG_LOGIN_WITH_GOOGLE
            );
            this.Config.activity.runOnUiThread(uiAction);
        } catch (e) {
            this.logMsg("[ERROR] " + e, LOGTAG_LOGIN_WITH_GOOGLE);

            throw e;
        }
    }

    // CURRENTLY NOT WORKING!
    loginWithTwitter(callback: (result: Partial<ILoginResult>) => void) {
        this._loginCallback = callback;

        try {
            const invokeForTwitterResult = resultCtx => {
                resultCtx.provider = "twitter";
                // tslint:disable-next-line:no-unused-expression
                this._loginCallback && this._loginCallback(resultCtx);
            };

            const uiAction = new actionRunnable();
            uiAction.action = () => {
                const twitterAuthCfg = new com.twitter.sdk.android.core.TwitterAuthConfig(
                    this.Config.twitter.key,
                    this.Config.twitter.secret
                );

                const twitter = com.twitter.sdk.android.Twitter(twitterAuthCfg);
                twitter.logIn(
                    this.Config.activity,
                    new com.twitter.sdk.android.core.Callback({
                        success(result) {
                            invokeForTwitterResult({
                                code: LoginResultType.Success,
                                authToken: result.data.getAuthToken().token,
                                userToken: result.data.getUserName(),
                                displayName: result.data.getUserName()
                            });
                        },
                        failure(ex) {
                            invokeForTwitterResult({
                                code: LoginResultType.Failed,
                                error: ex.getMessage()
                            });
                        }
                    })
                );
            };

            this.Config.activity.runOnUiThread(uiAction);
        } catch (e) {
            callback({
                code: LoginResultType.Exception,
                error: e
            });
        }
    }

    private initFacebook(result: IInitializationResult): IInitializationResult {
        try {
            com.facebook.FacebookSdk.sdkInitialize(
                this.Config.activity.getApplicationContext()
            );
            com.facebook.appevents.AppEventsLogger.activateApp(
                this.Config.activity
            );

            const fbCallbackManager = com.facebook.CallbackManager.Factory.create();
            const fbLoginManager = com.facebook.login.LoginManager.getInstance();

            if (this.Config.facebook.clearSession) {
                fbLoginManager.logOut();
            }

            this._fbCallbackManager = fbCallbackManager;
            this._fbLoginManager = fbLoginManager;

            const invokeLoginCallbackForFacebook = resultCtx => {
                resultCtx.provider = "facebook";

                this.logResult(resultCtx, LOGTAG_FB_LOGIN_MGR);

                // tslint:disable-next-line:no-unused-expression
                this._loginCallback && this._loginCallback(resultCtx);
            };

            this._fbLoginManager.registerCallback(
                this._fbCallbackManager,
                new com.facebook.FacebookCallback({
                    onSuccess: loginResult => {
                        this.logMsg("onSuccess()", LOGTAG_FB_LOGIN_MGR);

                        let authToken;
                        try {
                            authToken = loginResult.getAccessToken().getToken();

                            const request = com.facebook.GraphRequest.newMeRequest(
                                loginResult.getAccessToken(),
                                new com.facebook.GraphRequest.GraphJSONObjectCallback(
                                    {
                                        onCompleted: (obj, resp) => {
                                            this.logMsg(
                                                "onSuccess().onCompleted()",
                                                LOGTAG_FB_LOGIN_MGR
                                            );

                                            let code = LoginResultType.Success,
                                                error,
                                                userToken,
                                                displayName,
                                                firstName,
                                                lastName,
                                                photo,
                                                id;

                                            try {
                                                // ID
                                                if (obj.has("id")) {
                                                    id = obj.getString("id");
                                                }

                                                // email
                                                if (obj.has("email")) {
                                                    userToken = obj.getString(
                                                        "email"
                                                    );
                                                }

                                                // name
                                                if (obj.has("name")) {
                                                    displayName = obj.getString(
                                                        "name"
                                                    );
                                                }

                                                // first name
                                                if (obj.has("first_name")) {
                                                    firstName = obj.getString(
                                                        "first_name"
                                                    );
                                                }

                                                // last name
                                                if (obj.has("last_name")) {
                                                    lastName = obj.getString(
                                                        "last_name"
                                                    );
                                                }

                                                // photo
                                                if (obj.has("picture")) {
                                                    photo = obj
                                                        .getJSONObject(
                                                            "picture"
                                                        )
                                                        .getJSONObject("data")
                                                        .getString("url");
                                                }
                                            } catch (e) {
                                                this.logMsg(
                                                    "[ERROR] onSuccess().onCompleted(): " +
                                                        e,
                                                    LOGTAG_FB_LOGIN_MGR
                                                );

                                                code =
                                                    LoginResultType.Exception;
                                                error = e;
                                            }

                                            invokeLoginCallbackForFacebook({
                                                authToken,
                                                code,
                                                error,
                                                userToken,
                                                displayName,
                                                firstName,
                                                lastName,
                                                photo,
                                                id
                                            });
                                        }
                                    }
                                )
                            );

                            const params = new android.os.Bundle();
                            params.putString(
                                "fields",
                                "id,name,first_name,last_name,picture.type(large),email"
                            );

                            request.setParameters(params);

                            this.logMsg(
                                "onSuccess(): Executing request...",
                                LOGTAG_FB_LOGIN_MGR
                            );
                            request.executeAsync();
                        } catch (e) {
                            this.logMsg(
                                "[ERROR] onSuccess(): " + e,
                                LOGTAG_FB_LOGIN_MGR
                            );

                            invokeLoginCallbackForFacebook({
                                authToken,
                                code: LoginResultType.Exception,
                                error: e
                            });
                        }
                    },

                    onCancel: () => {
                        this.logMsg("onCancel()", LOGTAG_FB_LOGIN_MGR);

                        invokeLoginCallbackForFacebook({
                            code: LoginResultType.Cancelled
                        });
                    },

                    onError: e => {
                        this.logMsg("onError()", LOGTAG_FB_LOGIN_MGR);

                        invokeLoginCallbackForFacebook({
                            code: LoginResultType.Failed,
                            error: e.getMessage()
                        });
                    }
                })
            );

            result.facebook.isInitialized = true;
        } catch (e) {
            this.logMsg("[ERROR] init.facebook: " + e, LOGTAG_INIT_ENV);

            result.facebook.error = e;
        }
        return result;
    }

    // TODO
    private initTwitter(result: IInitializationResult): IInitializationResult {
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
    }

    private initGoogle(result: IInitializationResult): IInitializationResult {
        try {
            // Strange?!
            result.google.isInitialized = true;
            let optionBuilder = new com.google.android.gms.auth.api.signin.GoogleSignInOptions.Builder(
                com.google.android.gms.auth.api.signin.GoogleSignInOptions.DEFAULT_SIGN_IN
            )
                .requestEmail()
                .requestProfile();

            if (!isNullOrUndefined(this.Config.google.serverClientId)) {
                if (!this.Config.google.isRequestAuthCode) {
                    this.logMsg(
                        "Will request ID token",
                        LOGTAG_LOGIN_WITH_GOOGLE
                    );
                    optionBuilder = optionBuilder.requestIdToken(
                        this.Config.google.serverClientId
                    );
                } else {
                    this.logMsg(
                        "Will request server auth code",
                        LOGTAG_LOGIN_WITH_GOOGLE
                    );
                    optionBuilder = optionBuilder.requestServerAuthCode(
                        this.Config.google.serverClientId,
                        false
                    );
                }
            }

            this._googleClient = new com.google.android.gms.common.api.GoogleApiClient.Builder(
                this.Config.activity.getApplicationContext()
            )
                .addApi(
                    com.google.android.gms.auth.api.Auth.GOOGLE_SIGN_IN_API,
                    optionBuilder.build()
                )
                .build();
            this._googleClient.connect(
                com.google.android.gms.common.api.GoogleApiClient
                    .SIGN_IN_MODE_OPTIONAL
            );
        } catch (e) {
            this.logMsg("[ERROR] init.google: " + e, LOGTAG_INIT_ENV);

            result.google.error = e;
        }
        return result;
    }

    logOut(callback: () => void) {
        this.logMsg("Starting Logout", LOGTAG_LOGOUT);
        try {
            // Google Logout
            if (this._googleClient.isConnected()) {
                const signOut = com.google.android.gms.auth.api.Auth.GoogleSignInApi.signOut(
                    this._googleClient
                );
                signOut.setResultCallback(
                    new com.google.android.gms.common.api.ResultCallback({
                        onResult: status => {
                            if (status.isSuccess()) {
                                this.logMsg(
                                    "[SUCCESS] logging out: ",
                                    LOGTAG_LOGOUT
                                );
                                this._googleClient.disconnect();
                                callback();
                            } else {
                                this.logMsg(
                                    "[ERROR] logging out: " +
                                        status.getStatusCode(),
                                    LOGTAG_LOGOUT
                                );
                                callback();
                            }
                        }
                    })
                );
            }
            // Facebook Logout
            this._fbLoginManager.logOut();
        } catch (e) {
            this.logMsg("[ERROR] Logging out: " + e, LOGTAG_LOGOUT);
        }
    }
}
