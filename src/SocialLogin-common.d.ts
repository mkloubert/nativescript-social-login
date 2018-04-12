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
export declare type IInitializationResultType = {
    isInitialized: boolean;
    error?: any;
};
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
    onActivityResult: (requestCode: number, resultCode: number, data: any) => void;
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
export declare type ILoginConfiguration = Partial<IConfig>;
/**
 * List of login result types.
 */
export declare enum LoginResultType {
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
    Failed = -2,
}
export declare const LOGTAG_INIT_ENV = "initEnvironment()";
export declare const LOGTAG_LOGIN_WITH_FB = "loginWithFacebook()";
export declare const LOGTAG_LOGIN_WITH_GOOGLE = "loginWithGoogle()";
export declare const LOGTAG_LOGOUT = "logout()";
export declare abstract class Social {
    protected Config: ILoginConfiguration;
    protected _getLoggers: () => ILogger[];
    protected _loginCallback: (result: Partial<ILoginResult>) => void;
    protected defaultConfig: IConfig;
    abstract init(result: IInitializationResult): IInitializationResult;
    abstract loginWithTwitter(callback: (result: Partial<ILoginResult>) => void): any;
    abstract loginWithGoogle(callback: (result: Partial<ILoginResult>) => void): any;
    abstract loginWithFacebook(callback: (result: Partial<ILoginResult>) => void): any;
    protected logMsg(msg: any, tag?: string): void;
    protected logResult(resultCtx: any, tag: any): void;
    initEnvironment(config: ILoginConfiguration, getLoggers: () => ILogger[]): IInitializationResult;
    loginWithProvider(provider: string, callback: (result: Partial<ILoginResult>) => void): void;
}
