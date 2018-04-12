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

import { isNullOrUndefined } from "utils/types";
import { SocialLogin } from "./SocialLogin";
import {
    ILogger,
    ILoginConfiguration,
    IInitializationResult,
    ILoginResult
} from "./SocialLogin-common";

let Login: SocialLogin;
const _loggers: ILogger[] = [];

/**
 * Adds a logger callback.
 *
 * @param {Function} callback The callback that receives the log message.
 */
export function addLogger(callback: ILogger) {
    if (!isNullOrUndefined(callback)) {
        _loggers.push(callback);
    }
}

/**
 * Initializes the login providers.
 *
 * @param {ILoginConfiguration} [config] The configuration to use.
 */
export function init(config?: ILoginConfiguration): IInitializationResult {
    Login = new SocialLogin();
    return Login.initEnvironment(config, () => _loggers);
}

/**
 * Logs in by using a specific provider.
 *
 * @param {LoginProvider|string} provider The provider to use.
 * @param {Function} callback The callback.
 *
 * @throws Provider is (currently) NOT supported.
 */
export function login(
    provider: string,
    callback: (result: ILoginResult) => void
) {
    Login.loginWithProvider(provider.toLowerCase().trim(), callback);
}

/**
 * Logs out from all providers.
 *
 * @param {Function} callback The callback on completion.
 *
 * @throws If an error occurs on the native side.
 */
export function logout(callback: () => void) {
    Login.logOut(callback);
}

/**
 * Logs in with Facebook auth API.
 *
 * @params {Function} callback The callback.
 */
export function loginWithFacebook(callback: (result: ILoginResult) => void) {
    login("facebook", callback);
}

/**
 * Logs in with Google auth API.
 *
 * @params {Function} callback The callback.
 */
export function loginWithGoogle(callback: (result: ILoginResult) => void) {
    login("google", callback);
}

/**
 * Logs in with Twitter auth API.
 *
 * @params {Function} callback The callback.
 */
export function loginWithTwitter(callback: (result: ILoginResult) => void) {
    login("twitter", callback);
}

// Export neccessary Interfaces
export {
    LoginResultType,
    ILogger,
    ILoginConfiguration,
    IInitializationResult,
    ILoginResult
} from "./SocialLogin-common";
