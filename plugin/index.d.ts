/**
 * Stores data of the result of an initialization.
 */
export interface IInitializationResult {
    facebook: {
        error: any;
        isInitialized: boolean;
    };
    google: {
        error: any;
        isInitialized: boolean;
    };
    twitter: {
        error: any;
        isInitialized: boolean;
    };
}
/**
 * Describes an object that stores configuration for initialization.
 */
export interface ILoginConfiguration {
    /**
     * The underlying custom activity to use.
     */
    activity?: any;
    /**
     * Facebook specific configuration.
     */
    facebook?: {
        /**
         * Initialize Facebook or not. Default: (true)
         */
        initialize?: boolean;
    };
    /**
     * Google specific configuration.
     */
    google?: {
        /**
         * Initialize Google or not. Default: (true)
         */
        initialize?: boolean;
        /**
         * The server client ID for requesting server auth token.
         */
        serverClientId?: string;
        /**
         * If true (default), it will request for offline auth code which server can use for fetching or refreshing auth tokens. It will be set in authCode property of result object.
         * If false, it will request for token id. it will be set in authToken property of result object.
         */
        isRequestAuthCode?: boolean;
    };
    /**
     * The server client ID for requesting server auth token.
     *
     * @deprecated Use google.serverClientId instead.
     */
    googleServerClientId?: string;
    /**
     * Fallback action for the result of the underlying activity.
     */
    onActivityResult?: (requestCode: number, resultCode: number, data: any) => void;
    /**
     * Twitter specific configuration.
     */
    twitter?: {
        /**
         * The consumer key.
         */
        key: string;
        /**
         * The consumer secret.
         */
        secret: string;
    };
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
    code: number;
    /**
     * The display name.
     */
    displayName?: string;
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
    Failed = 2,
}
/**
 * Adds a logger callback.
 *
 * @param {Function} callback The callback that receives the log message.
 */
export declare function addLogger(callback: (msg: any, tag: string) => void): void;
/**
 * Initializes the login providers.
 *
 * @param {ILoginConfiguration} [config] The configuration to use.
 */
export declare function init(config?: ILoginConfiguration): IInitializationResult;
/**
 * Logs in by using a specific provider.
 *
 * @param {LoginProvider|string} provider The provider to use.
 * @param {Function} callback The callback.
 *
 * @throws Provider is (currently) NOT supported.
 */
export declare function login(provider: string, callback: (result: ILoginResult) => void): void;
/**
 * Logs in with Facebook auth API.
 *
 * @params {Function} callback The callback.
 */
export declare function loginWithFacebook(callback: (result: ILoginResult) => void): void;
/**
 * Logs in with Google auth API.
 *
 * @params {Function} callback The callback.
 */
export declare function loginWithGoogle(callback: (result: ILoginResult) => void): void;
/**
 * Logs in with Twitter auth API.
 *
 * @params {Function} callback The callback.
 */
export declare function loginWithTwitter(callback: (result: ILoginResult) => void): void;
