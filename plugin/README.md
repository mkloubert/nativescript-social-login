[![npm](https://img.shields.io/npm/v/nativescript-social-login.svg)](https://www.npmjs.com/package/nativescript-social-login)
[![npm](https://img.shields.io/npm/dt/nativescript-social-login.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-social-login)

# NativeScript Social Login

[NativeScript](https://www.nativescript.org/) module for social (token based) log-ins.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBLVWQKHLH3JG)

## Implementations

| Provider | Android | iOS |
| ---- | ---- | ---- |
| Google | Yes | No |
| Facebook | Yes | No |
| Twitter | No | No |

## License

[MIT license](https://raw.githubusercontent.com/mkloubert/nativescript-social-login/master/LICENSE)

## Documentation

The full documentation can be found on [readme.io](https://nativescript-sociallogin.readme.io/).

## Changes

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
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- ... -->
</manifest>
```

##### Acitivities

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- ... -->
    
    <application>
        <!-- ... -->
        
        <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
        
        <activity android:name="com.facebook.FacebookActivity"
                  android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
                  android:theme="@android:style/Theme.Translucent.NoTitleBar"
                  android:label="@string/app_name" />
        
        <!-- ... -->
    </application>
    
    <!-- ... -->
</manifest>
```

##### Strings

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
</resources>
```

#### app.gradle

```gradle
buildscript {
    repositories {
        jcenter()
        mavenLocal()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.1.0'
        classpath 'com.google.gms:google-services:3.0.0'
    }
}

repositories {
    mavenCentral()
    maven { url 'https://maven.fabric.io/public' }
}

dependencies {
    compile 'com.facebook.android:facebook-android-sdk:4.6.0'
    compile 'com.google.android.gms:play-services-auth:8.4.0'

    compile('com.twitter.sdk.android:twitter:1.13.2@aar') {
        transitive = true
    }
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
    Application.android.onActivityCreated = (activity) => {
        var result = SocialLogin.init({
            activity: activity
        });
    });
}
```

The `init()` function receives an (optional) object with the following structure:

```typescript
interface ILoginConfiguration {
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
        initialize?: boolean,
    }

    /**
     * Google specific configuration.
     */
    google?: {
        /**
         * Initialize Google or not. Default: (true)
         */
        initialize?: boolean,
       
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
```

The following functions are implemented:

| Provider | Provider |
| ---- | ---- |
| loginWithFacebook | Facebook |
| loginWithGoogle | Google |

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
```

## Logging

If you want to get the logging output of the module, you can use `SocialLogin.addLogger()` function to add a callback that receives a message from the module:

```typescript
SocialLogin.addLogger(function(msg: any, tag: string) {
    console.log('[nativescript-social-login]: (' + tag + '): ' + msg);
});
```
