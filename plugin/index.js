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
var types_1 = require("utils/types");
var SocialLogin_1 = require("./SocialLogin");
var Login;
var _loggers = [];
/**
 * Adds a logger callback.
 *
 * @param {Function} callback The callback that receives the log message.
 */
function addLogger(callback) {
    if (!types_1.isNullOrUndefined(callback)) {
        _loggers.push(callback);
    }
}
exports.addLogger = addLogger;
/**
 * Initializes the login providers.
 *
 * @param {ILoginConfiguration} [config] The configuration to use.
 */
function init(config) {
    Login = new SocialLogin_1.SocialLogin();
    return Login.initEnvironment(config, function () { return _loggers; });
}
exports.init = init;
/**
 * Logs in by using a specific provider.
 *
 * @param {LoginProvider|string} provider The provider to use.
 * @param {Function} callback The callback.
 *
 * @throws Provider is (currently) NOT supported.
 */
function login(provider, callback) {
    Login.loginWithProvider(provider.toLowerCase().trim(), callback);
}
exports.login = login;
/**
 * Logs in with Facebook auth API.
 *
 * @params {Function} callback The callback.
 */
function loginWithFacebook(callback) {
    login("facebook", callback);
}
exports.loginWithFacebook = loginWithFacebook;
/**
 * Logs in with Google auth API.
 *
 * @params {Function} callback The callback.
 */
function loginWithGoogle(callback) {
    login("google", callback);
}
exports.loginWithGoogle = loginWithGoogle;
/**
 * Logs in with Twitter auth API.
 *
 * @params {Function} callback The callback.
 */
function loginWithTwitter(callback) {
    login("twitter", callback);
}
exports.loginWithTwitter = loginWithTwitter;
// Export neccessary Interfaces
var SocialLogin_common_1 = require("./SocialLogin-common");
exports.LoginResultType = SocialLogin_common_1.LoginResultType;
