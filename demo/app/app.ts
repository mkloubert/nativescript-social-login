import Application = require("application");
import SocialLogin = require("./SocialLogin/index"); 

if (Application.android) {
    

    Application.android.addEventListener("onActivityCreated", (ed) => {
var activity = Application.android.foregroundActivity ||
                   Application.android.startActivity;

    console.log("onActivityCreated(): app: activity: " + activity);
    });

    Application.android.onActivityCreated = (activity) => {
        try {
console.log(Application.android.packageName);

            var result = SocialLogin.init({
                activity: activity,
                googleServerClientId: "<YOUR-CLIENT-ID-HERE>"
            });

            console.log("SocialLogin.init().facebook.isInitialized: " + result.facebook.isInitialized);
            console.log("SocialLogin.init().facebook.isInitialized: " + result.facebook.error);

            if (result.facebook.isInitialized) {
                
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

                SocialLogin.loginWithFacebook(
                    (r) => {
                        console.log("SocialLogin.loginWithFacebook(): code >> " + r.code);
                        console.log("SocialLogin.loginWithFacebook(): error >> " + r.error);
                        console.log("SocialLogin.loginWithFacebook(): userToken >> " + r.userToken);
                        console.log("SocialLogin.loginWithFacebook(): displayName >> " + r.displayName);
                        console.log("SocialLogin.loginWithFacebook(): photo >> " + r.photo);
                        console.log("SocialLogin.loginWithFacebook(): authToken >> " + r.authToken);
                    }
                );
            }
        }
        catch (e) {
            console.log("[ERROR] SocialLogin.init(): " + e);
        }
    };
}

Application.start({ moduleName: "main-page" });
