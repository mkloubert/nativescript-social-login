[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/nativescript-social-login
[npm-image]: http://img.shields.io/npm/v/nativescript-social-login.svg
[npm-downloads-image]: https://img.shields.io/npm/dt/nativescript-social-login.svg?label=npm%20downloads
# NativeScript Social Login

[NativeScript](https://www.nativescript.org/) module for social (token based) log-ins.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBLVWQKHLH3JG)

## Implementations

| Provider | Android | iOS |
| ---- | ---- | ---- |
| Google | Yes | Yes |
| Facebook | Yes | Yes |
| Twitter | No | No |

## License

[MIT license](https://raw.githubusercontent.com/mkloubert/nativescript-social-login/master/LICENSE)

## Documentation

The full documentation can be found on [readme.io](https://nativescript-sociallogin.readme.io/).

## Changes

### v1.4.x to 1.5.x

#### Google

* Implemented login on iOS

### v1.3.x to 1.4.x

#### Facebook

* Implemented login on iOS

### v1.2.x to 1.3.x

#### Google

* The default value for `ILoginConfiguration.google.isRequestAuthCode` is `(false)` now. This behavior will not be changed in the future again!

## Installation

Run

```bash
tns plugin add nativescript-social-login
```

inside your app project to install the module.

### Android

#### AndroidManifest.xml

##### Permissions

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- ... -->

    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- ... -->
</manifest>
```

##### Strings

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="facebook_app_id">{{ YOUR_FACEBOOK_APP_ID }}</string>
    <string name="fb_login_protocol_scheme">fb{{ YOUR_FACEBOOK_APP_ID }}</string>
</resources>
```

##### AndroidManifest.xml

Add the `xmlns:tools="http://schemas.android.com/tools"` namespace to your `<manifest>` tag, and then add the Facebook configuration in the `<application>` section of the manifest as shown bellow:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
    <!-- ... -->
    <application>
        <!-- ... -->
        <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>

        <activity
            android:name="com.facebook.FacebookActivity"
            android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            tools:replace="android:theme"
            android:theme="@android:style/Theme.Translucent.NoTitleBar"
            android:label="@string/app_name" />

        <activity
            android:name="com.facebook.CustomTabActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="@string/fb_login_protocol_scheme" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### Setup Android Google Sign in for Debug Builds
1. You need the *SHA1* value associated with the `debug.keystore` in your local android setup on your machine. For example, the following command is what you might run on a Windows machine:
``` shell
keytool -list -v -keystore C:/users/brad.martin/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```
The path will change according to the path on your machine. The android debug builds are signed with this default `debug.keystore` located on your machine. So when you run the debug build on a device Google will allow the authentication with the running .apk since it has the SHA1 for the debug.keystore the debug app is built with.

2. Create an app [here](https://developers.google.com/mobile/add?platform=android&cntapi=signin&cntapp=Default%20Demo%20App&cntpkg=com.google.samples.quickstart.signin&cnturl=https:%2F%2Fdevelopers.google.com%2Fidentity%2Fsign-in%2Fandroid%2Fstart%3Fconfigured%3Dtrue&cntlbl=Continue%20with%20Try%20Sign-In) on Google Developer site. 
    - Enter the App name. This can be anything but it will display to the user who is authenticating.
    - Enter the android package name. The `package` name is the android app name which is in the *package.json* under the `nativescript` object as the `id` property.
    - Next configure the Google services.
    - Select `Google Sign-In`
    - Enter your Signing Certificate SHA-1. This is the SHA1 value you get from the first step when running the `keytool` command.
    - Enable Google Sign-In
        - If only enabling Google Sign-In you do not need the configuration file inside your application.
3. Run the app and `loginWithGoogle()` should return the data associated with the google account that was selected.

### iOS

#### GoogleService-Info.plist

You should generate a `GoogleService-Info.plist` file for your application and add it to `/app/App_Resources/iOS` folder.
You can get this file and find more info here - https://developers.google.com/identity/sign-in/ios/start-integrating

#### Info.plist

Add the following to your Info.plist file located in app/App_Resources/iOS


```xml
<!-- FACEBOOK AND GOOGLE LOGIN -->
<key>CFBundleURLTypes</key>
    <array>
        <!-- GOOGLE START -->
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>{YOUR_GOOGLE_REVERSED_CLIENT_ID}</string>
                <!-- It shoud look like this: com.googleusercontent.apps.123123123-172648sdfsd76f8s7d6f8sd -->
                <!-- Get it from your GoogleService-Info.plist -->
                <!-- Read more - https://developers.google.com/identity/sign-in/ios/start-integrating -->
			</array>
		</dict>
		<!-- GOOGLE END -->
		<!-- FACEBOOK START -->
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
        <string>fb{YOUR_FACEBOOK_APP_ID_HERE}</string>
            </array>
        </dict>
    </array>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>FacebookAppID</key>
    <string>{YOUR_FACEBOOK_APP_ID_HERE}</string>
    <key>FacebookDisplayName</key>
    <string>FacebookLoginDemo</string>
    <!-- FACEBOOK END -->

```
https://developers.facebook.com/docs/ios

#### Application main file

Add this to the file where you start the application.
Add the following code just before `application.start({ /* */ });` or `platformNativeScriptDynamic().bootstrapModule(/* */)` if you use Angular:

##### TypeScript

```typescript
if (application.ios) {

  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
      let gglDelegate = false;

      try {
        const errorRef = new interop.Reference();
        GGLContext.sharedInstance().configureWithError(errorRef);

        const signIn = GIDSignIn.sharedInstance();
        gglDelegate = true;
      } catch (error) {
        console.log(error);
      }

      const fcbDelegate = FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions); // facebook login delegate

      return gglDelegate || fcbDelegate;
    }

    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
      const fcbDelegate = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation); // facebook login delegate
      const gglDelegate = GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation); // google login delegate

      return fcbDelegate || gglDelegate;
    }
  }

  application.ios.delegate = MyDelegate;
}
```

##### JavaScript

```javascript
if (application.ios) {
    var MyDelegate = (function (_super) {
        __extends(MyDelegate, _super);
        function MyDelegate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            var gglDelegate = false;
            try {
                var errorRef = new interop.Reference();
                GGLContext.sharedInstance().configureWithError(errorRef);
                var signIn = GIDSignIn.sharedInstance();
                gglDelegate = true;
            }
            catch (error) {
                console.log(error);
            }
            var fcbDelegate = FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions); // facebook login delegate
            return gglDelegate || fcbDelegate;
        };
        MyDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
            var fcbDelegate = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation); // facebook login delegate
            var gglDelegate = GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation); // google login delegate
            return fcbDelegate || gglDelegate;
        };
        return MyDelegate;
    }(UIResponder));
    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
    application.ios.delegate = MyDelegate;
}
```




## Usage

### Include

Include the module in your code-behind:

```typescript
import SocialLogin = require("nativescript-social-login");
```

### Initialize

```typescript
import Application = require("application");
import SocialLogin = require("nativescript-social-login");

if (Application.android) {
    Application.android.on(Application.AndroidApplication.activityResumedEvent, () => {
        let result = SocialLogin.init();
    });
}
```

The `init()` function receives an (optional) object with the following structure:

```typescript
interface ILoginConfiguration {
    /**
     * The underlying custom activity to use.
     */
    activity?: android.app.Activity;

    /**
     * Facebook specific configuration.
     */
    facebook?: {
        /**
         * Initialize Facebook or not. Default: (true)
         */
        initialize?: boolean;
        /**
         * Should Logout current Facebook session or not. Default: (false)
         */
        clearSession?: boolean;
    }

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
         * If true, it will request for offline auth code which server can use for fetching or refreshing auth tokens.
         * It will be set in authCode property of result object.
         *
         * If false (default), it will request for token id. it will be set in authToken property of result object.
         */
        isRequestAuthCode?: boolean;
    }

    /**
     * Fallback action for the result of the underlying activity.
     */
    onActivityResult?: (requestCode: number, resultCode: number, data: any) => void;
}
```

The `result` object that is returned by  `init()` has the following structure:

```typescript
interface IInitializationResult {
    facebook: {
        error: any,
        isInitialized: boolean,
    },
    google: {
        error: any,
        isInitialized: boolean,
    },
    twitter: {
        error: any,
        isInitialized: boolean,
    }
}
```

The `isInitialized` can be `(true)` for succeeded, `(false)` for failed, `(undefined)` for "not supported" and `(null)` for providers that have been skipped.

The `error` properties are only defined if an exception was thrown while initialization.

### Login

If you want to use a login functions you have to submit a callback that receives an object with the following structure:

```typescript
interface ILoginResult {
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
```

The following functions are implemented:

| Provider | Provider |
| ---- | ---- |
| loginWithFacebook | Facebook |
| loginWithGoogle | Google |
| logout | Google & Facebook |

## Example

```typescript
SocialLogin.loginWithFacebook(
    (result) => {
        console.log("code: " + result.code);
        console.log("error: " + result.error);
        console.log("userToken: " + result.userToken);
        console.log("displayName: " + result.displayName);
        console.log("photo: " + result.photo);
        console.log("authToken: " + result.authToken);
    }
);

SocialLogin.logout(
    () => {
        console.log("Log out of Social accounts");
    }
);
```

It is worth noting that for an Angular-based app, this callback should be wrapped within an `NgZone` to Angular handle updating the view properly when complete.

```typescript
import { Component, NgZone } from "angular/core";

@Component({})
class SigninComponent {
    constructor(private ngZone: NgZone) {}

    login() {
        SocialLogin.loginWithFacebook((result) => {
            this.ngZone.run(() => {
                console.log("code: " + result.code);
                console.log("error: " + result.error);
                console.log("userToken: " + result.userToken);
                console.log("displayName: " + result.displayName);
                console.log("photo: " + result.photo);
                console.log("authToken: " + result.authToken);
            });
        });
    }

    logout() {
        SocialLogin.logout((result) => {
            this.ngZone.run(() => {
                console.log("Log out of Social accounts");
            });
        });
    }
}
```

There is also a [great example](https://github.com/dgomezs/facebook-login) by [dgomezs](https://github.com/dgomezs) that shows how to configure your app for Facebook.

## Logging

If you want to get the logging output of the module, you can use `SocialLogin.addLogger()` function to add a callback that receives a message from the module:

```typescript
SocialLogin.addLogger(function(msg: any, tag: string) {
    console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
});
```

## Contributors

* [Fábio Araújo](https://github.com/fmsaraujo)
* [Brad Martin](https://github.com/bradmartin)
* [Jeremiah Ogbomo](https://github.com/jogboms)
* [Shripal Soni](http://www.shripalsoni.com)
* [Andrii Votiakov](https://github.com/votiakov)
* [Felipe Waku](https://github.com/felipewaku)
