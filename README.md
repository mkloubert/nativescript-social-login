[![npm](https://img.shields.io/npm/v/nativescript-social-login.svg)](https://www.npmjs.com/package/nativescript-social-login)
[![npm](https://img.shields.io/npm/dt/nativescript-social-login.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-social-login)

# NativeScript Social Login

[NativeScript](https://www.nativescript.org/) module for social (token based) log-ins..

## Implementations

| Provider | Android | iOS |
| ---- | ---- | ---- |
| Google | Yes | No |
| Facebook | Yes | No |
| Twitter | No | No |

## License

[MIT license](https://raw.githubusercontent.com/mkloubert/nativescript-social-login/master/LICENSE)

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
    
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    
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
            activity: activity,
            googleServerClientId: "<YOUR-CLIENT-ID-HERE>"
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
    }

    /**
     * The server client ID for requesting server auth token.
     */
    googleServerClientId?: string;

    /**
     * Fallback action for the result of the underlying activity.
     */
    onActivityResult?: (requestCode: number, resultCode: number, data: any) => void;

    twitter?: {
        /**
         * The consumer key.
         */
        key: string,

        /**
         * The consumer secret.
         */
        secrect: string,
    }
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
     * Gets the auth token (if requested)
     */
    authToken?: string;

    /**
     * Gets the result code
     */
    code: number;

    /**
     * The display name
     */
    displayName?: string;
    
    /**
     * Gets the error (if defined)
     */
    error?: any;

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
