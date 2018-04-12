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

export interface ILogger {
    (msg: any, tag: string): void;
}

/**
 * Describes a login result callback.
 */
export interface ILoginResult {
    /**
     * Gets the auth token (if requested).
     */
    authToken?: string;
    /**
     * Offline auth code used by servers to request new auth tokens.
     */
    authCode?: string;
    /**
     * Gets the result code.
     */
    code: LoginResultType;
    /**
     * The display name.
     */
    displayName?: string;
    /**
     * First name of the user.
     */
    firstName?: string;
    /**
     * Last name of the user.
     */
    lastName?: string;
    /**
     * Gets the error (if defined).
     */
    error?: any;
    /**
     * The ID of the user.
     */
    id?: string;
    /**
     * The photo URL.
     */
    photo?: string;
    /**
     * Gets the underlying provider.
     */
    provider?: string;
    /**
     * The user token, like email address.
     */
    userToken?: string;
}

/**
 * Stores data of the result of an initialization.
 */
export type IInitializationResultType = { isInitialized: boolean; error?: any };

export interface IInitializationResult {
    facebook: IInitializationResultType;
    google: IInitializationResultType;
    twitter: IInitializationResultType;
}

/**
 * Describes an object that stores configuration for initialization.
 */
export interface IConfig {
    /**
     * The underlying custom activity to use.
     * @type android.app.Activity
     */
    activity: any;

    /**
     * Facebook specific configuration.
     */
    facebook: {
        /**
         * Initialize Facebook or not. Default: (true)
         */
        initialize?: boolean;
        /**
         * Should Logout current Facebook session or not. Default: (false)
         */
        clearSession?: boolean;
        /**
         * iOS only
         */
        loginBehavior?: any;
    };

    /**
     * Google specific configuration.
     */
    google: {
        /**
         * Initialize Google or not. Default: (true)
         */
        initialize?: boolean;

        /**
         * The server client ID for requesting server auth token.
         */
        serverClientId?: string;

        /**
         * If true, it will request for offline auth code which server can use for fetching or refreshing auth tokens. It will be set in authCode property of result object.
         * If false (default), it will request for token id. it will be set in authToken property of result object.
         */
        isRequestAuthCode?: boolean;
        /**
         * iOS only. Default to true
         */
        shouldFetchBasicProfile?: boolean;
        /**
         * iOS only
         */
        scopes?: string[];
    };

    /**
     * Fallback action for the result of the underlying activity.
     */
    onActivityResult: (
        requestCode: number,
        resultCode: number,
        data: any
    ) => void;

    /**
     * Twitter specific configuration.
     */
    twitter: {
        /**
         * Initialize Twitter or not. Default: (true)
         */
        initialize?: boolean;
        /**
         * The consumer key.
         */
        key?: string;

        /**
         * The consumer secret.
         */
        secret?: string;
    };
}

export type ILoginConfiguration = Partial<IConfig>;

/**
 * List of login result types.
 */
export enum LoginResultType {
    /**
     * Success
     */
    Success = 0,

    /**
     * "Unhandled" exception
     */
    Exception = -1,

    /**
     * Cancelled
     */
    Cancelled = 1,

    /**
     * Failed
     */
    Failed = -2
}

import { isNullOrUndefined } from "tns-core-modules/utils/types";
import { merge } from "./utils";

export const LOGTAG_INIT_ENV = "initEnvironment()";
export const LOGTAG_LOGIN_WITH_FB = "loginWithFacebook()";
export const LOGTAG_LOGIN_WITH_GOOGLE = "loginWithGoogle()";
export const LOGTAG_LOGOUT = "logout()";

export abstract class Social {
    protected Config: ILoginConfiguration;
    protected _getLoggers: () => ILogger[];
    protected _loginCallback: (result: Partial<ILoginResult>) => void;
    protected defaultConfig: IConfig = {
        activity: void 0,
        google: {
            initialize: true,
            isRequestAuthCode: false,
            serverClientId: void 0,
            shouldFetchBasicProfile: true,
            scopes: ["profile", "email"]
        },
        facebook: {
            initialize: true,
            clearSession: false,
            loginBehavior: void 0
        },
        twitter: {
            initialize: true,
            key: void 0,
            secret: void 0
        },
        onActivityResult: void 0
    };

    abstract init(result: IInitializationResult): IInitializationResult;
    abstract loginWithTwitter(
        callback: (result: Partial<ILoginResult>) => void
    );
    abstract loginWithGoogle(callback: (result: Partial<ILoginResult>) => void);
    abstract loginWithFacebook(
        callback: (result: Partial<ILoginResult>) => void
    );

    protected logMsg(msg, tag = "") {
        try {
            const loggers = this._getLoggers();

            for (let i = 0; i < loggers.length; i++) {
                try {
                    loggers[i](msg, tag);
                } catch (e) {
                    console.log(
                        `[ERROR] nativescript-social-login >> logMsg() >> logger[${i}]: ${e}`
                    );
                }
            }
        } catch (e) {
            console.log("[ERROR] nativescript-social-login >> logMsg(): " + e);
        }
    }

    protected logResult(resultCtx, tag) {
        for (let p in resultCtx) {
            if (resultCtx.hasOwnProperty(p)) {
                this.logMsg(`result. ${p} = ${resultCtx[p]}`, tag);
            }
        }
    }

    initEnvironment(
        config: ILoginConfiguration = {},
        getLoggers: () => ILogger[]
    ): IInitializationResult {
        this._getLoggers = getLoggers;

        this.Config = merge(this.defaultConfig, config);

        this.logMsg(
            "initialize.google: " + this.Config.google.initialize,
            LOGTAG_INIT_ENV
        );
        this.logMsg(
            "initialize.facebook: " + this.Config.facebook.initialize,
            LOGTAG_INIT_ENV
        );
        this.logMsg(
            "initialize.twitter: " + this.Config.twitter.initialize,
            LOGTAG_INIT_ENV
        );

        const result = this.init(<IInitializationResult>{
            facebook: {
                isInitialized: true
            },
            google: {
                isInitialized: true
            },
            twitter: {
                isInitialized: undefined
            }
        });

        this.logMsg(
            "google.isInitialized: " + result.google.isInitialized,
            LOGTAG_INIT_ENV
        );
        this.logMsg(
            "facebook.isInitialized: " + result.facebook.isInitialized,
            LOGTAG_INIT_ENV
        );
        this.logMsg(
            "twitter.isInitialized: " + result.twitter.isInitialized,
            LOGTAG_INIT_ENV
        );

        return result;
    }

    loginWithProvider(
        provider: string,
        callback: (result: Partial<ILoginResult>) => void
    ) {
        if (isNullOrUndefined(provider)) {
            provider = "";
        }

        provider = ("" + provider).toLowerCase().trim();

        this.logMsg(`Provider: ${provider}`);

        switch (provider) {
            case "":
            case "google": {
                this.logMsg("Will use Google sign in...");
                this.loginWithGoogle(callback);
                break;
            }

            case "facebook":
            case "fb": {
                this.logMsg("Will use Facebook SDK...");
                this.loginWithFacebook(callback);
                break;
            }

            // TODO
            /* case "twitter":
                this.loginWithTwitter(callback);
                break; */

            default:
                throw `Provider '${provider}' is NOT supported!`;
        }
    }
}
