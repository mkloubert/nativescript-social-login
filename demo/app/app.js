"use strict";
var Application = require("application");
var SocialLogin = require("./SocialLogin/index");
if (Application.android) {
    Application.android.addEventListener("onActivityCreated", function (ed) {
        var activity = Application.android.foregroundActivity ||
            Application.android.startActivity;
        console.log("onActivityCreated(): app: activity: " + activity);
    });
    Application.android.onActivityCreated = function (activity) {
        try {
            console.log(Application.android.packageName);
            var result = SocialLogin.init({
                activity: activity,
                googleServerClientId: "<YOUR-CLIENT-ID-HERE>",
                twitter: {
                    key: "EBNJsx1RAl6c8rqxReej3TvSM",
                    secret: "DKZJp9CJRafqpEyMF2v0Yz25dPZsMraPFTXj9sGb3Pg8yoGOhN"
                }
            });
            console.log("SocialLogin.init().twitter.isInitialized: " + result.twitter.isInitialized);
            console.log("SocialLogin.init().twitter.isInitialized: " + result.twitter.error);
            if (result.twitter.isInitialized) {
                /*
                SocialLogin.loginWithGoogle(
                    (r) => {
                        console.log("SocialLogin.loginWithGoogle(): code >> " + r.code);
                        console.log("SocialLogin.loginWithGoogle(): userToken >> " + r.userToken);
                        console.log("SocialLogin.loginWithGoogle(): displayName >> " + r.displayName);
                        console.log("SocialLogin.loginWithGoogle(): photo >> " + r.photo);
                        console.log("SocialLogin.loginWithGoogle(): authToken >> " + r.authToken);
                    }
                );*/
                /*
                SocialLogin.loginWithFacebook(
                    (r) => {
                        console.log("SocialLogin.loginWithFacebook(): code >> " + r.code);
                        console.log("SocialLogin.loginWithFacebook(): error >> " + r.error);
                        console.log("SocialLogin.loginWithFacebook(): userToken >> " + r.userToken);
                        console.log("SocialLogin.loginWithFacebook(): displayName >> " + r.displayName);
                        console.log("SocialLogin.loginWithFacebook(): photo >> " + r.photo);
                        console.log("SocialLogin.loginWithFacebook(): authToken >> " + r.authToken);
                    }
                );*/
                SocialLogin.loginWithTwitter(function (r) {
                    console.log("SocialLogin.loginWithTwitter(): code >> " + r.code);
                    console.log("SocialLogin.loginWithTwitter(): error >> " + r.error);
                    console.log("SocialLogin.loginWithTwitter(): userToken >> " + r.userToken);
                    console.log("SocialLogin.loginWithTwitter(): displayName >> " + r.displayName);
                    console.log("SocialLogin.loginWithTwitter(): photo >> " + r.photo);
                    console.log("SocialLogin.loginWithTwitter(): authToken >> " + r.authToken);
                });
            }
        }
        catch (e) {
            console.log("[ERROR] SocialLogin.init(): " + e);
        }
    };
}
Application.start({ moduleName: "main-page" });
//# sourceMappingURL=app.js.map