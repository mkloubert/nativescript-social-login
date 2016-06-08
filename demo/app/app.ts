import Application = require("application");
import SocialLogin = require("./SocialLogin/index"); 

if (Application.android) {
    Application.android.onActivityCreated = (activity) => {
        try {
            var result = SocialLogin.init({
                activity: activity,
                googleServerClientId: "<YOUR-CLIENT-ID-HERE>",

                twitter: {
                    key: "<YOUR-CONSUMER-KEY-HERE>",
                    secret: "<YOUR-CONSUMER-SECRET-HERE>"
                }
            });

            console.log("SocialLogin.init().facebook.isInitialized: " + result.facebook.isInitialized);
            console.log("SocialLogin.init().google.isInitialized: " + result.google.isInitialized);
            console.log("SocialLogin.init().twitter.isInitialized: " + result.twitter.isInitialized);

            if (result.facebook.isInitialized) {
                var loginCallback = (result: SocialLogin.ILoginResult) => {
                    console.log("SocialLogin.login(): provider >> " + result.provider);
                    console.log("SocialLogin.login(): code >> " + result.code);
                    console.log("SocialLogin.login(): error >> " + result.error);
                    console.log("SocialLogin.login(): id >> " + result.id);
                    console.log("SocialLogin.login(): userToken >> " + result.userToken);
                    console.log("SocialLogin.login(): displayName >> " + result.displayName);
                    console.log("SocialLogin.login(): photo >> " + result.photo);
                    console.log("SocialLogin.login(): authToken >> " + result.authToken);
                };

                /*
                SocialLogin.loginWithGoogle(loginCallback);
                */
                
                SocialLogin.loginWithFacebook(loginCallback);

                /*
                SocialLogin.loginWithTwitter(loginCallback);
                */
            }
        }
        catch (e) {
            console.log("[ERROR] SocialLogin.init(): " + e);
        }
    };
}

Application.start({ moduleName: "main-page" });
