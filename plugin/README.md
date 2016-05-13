[![npm](https://img.shields.io/npm/v/nativescript-social-login.svg)](https://www.npmjs.com/package/nativescript-social-login)
[![npm](https://img.shields.io/npm/dt/nativescript-social-login.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-social-login)

# NativeScript Social Login

[NativeScript](https://www.nativescript.org/) module for social (token based) log-ins..

## License

[MIT license](https://raw.githubusercontent.com/mkloubert/nativescript-social-login/master/LICENSE)

## Platforms

* Android

## Roadmap

* add support for iOS
* add support for Twitter
* add support for Facebook

## Installation

Run

```bash
tns plugin add nativescript-social-login
```

inside your app project to install the module.

### Android

#### AndroidManifest.xml

Keep sure to define the following permissions, activities and other data in your manifest file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.USE_CREDENTIALS" />
    
</manifest>
```

### app.gradle

Keep sure to have references to the following libraries in your `app/App_Resources/Android/app.gradle` file of your project.

```gradle
dependencies {
    // Facebook SDK
    compile 'com.facebook.android:facebook-android-sdk:4.6.0'

    // Google Play services (auth)
    compile 'com.google.android.gms:play-services-auth:8.4.0'
}
```

## Demo

For quick start have a look at the [demo/app/main-view-model.js](https://github.com/mkloubert/nativescript-social-login/blob/master/demo/app/main-view-model.js) file of the [demo app](https://github.com/mkloubert/nativescript-social-login/tree/master/demo) to learn how it works.

Otherwise...

## Usage

### Include

Include the module in your code-behind:

```javascript
var SocialLogin = require("nativescript-social-login");
```

### Initialize

Initialize the environment:

```javascript
function onPageLoaded(args) {
    SocialLogin.init();
}
exports.onPageLoaded = onPageLoaded;
```

### Login

```javascript
// use Google sign in
SocialLogin.login('google', function(result) {
    switch (result.code) {
        case 0:
            // success
            // 
            // result.userToken
            // result.displayName
            // result.photo (if defined)
            // result.provider (should be "google" in that case)
            break;
        
        case -1:
            // "unhandled" exception
            // 
            // result.message
            break;
            
        case -2:
            // NO success
            break;
            
        case 1:
            // cancelled
            break;
    }
});
```

### Logging

If you want to get the logging output of the module, you can use `PayPal.addLogger` function to add a callback that receives a message from the module:

```javascript
SocialLogin.addLogger(function(msg) {
    console.log('[nativescript-social-login]: ' + msg);
});
```
