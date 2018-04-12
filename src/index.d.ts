import { ILogger, ILoginConfiguration, IInitializationResult, ILoginResult } from "./SocialLogin-common";
/**
 * Adds a logger callback.
 *
 * @param {Function} callback The callback that receives the log message.
 */
export declare function addLogger(callback: ILogger): void;
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
 * Logs out from all providers.
 *
 * @param {Function} callback The callback on completion.
 *
 * @throws If an error occurs on the native side.
 */
export declare function logout(callback: () => void): void;
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
export { LoginResultType, ILogger, ILoginConfiguration, IInitializationResult, ILoginResult } from "./SocialLogin-common";
