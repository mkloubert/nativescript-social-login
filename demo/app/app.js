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
                googleServerClientId: "633427110407-cc1j35dlolgqlfet3r3af45ode15m21o.apps.googleusercontent.com"
            });
            console.log("SocialLogin.init().facebook.isInitialized: " + result.facebook.isInitialized);
            console.log("SocialLogin.init().facebook.isInitialized: " + result.facebook.error);
            if (result.facebook.isInitialized) {
                SocialLogin.loginWithGoogle(function (r) {
                    console.log("SocialLogin.loginWithGoogle(): code >> " + r.code);
                    console.log("SocialLogin.loginWithGoogle(): userToken >> " + r.userToken);
                    console.log("SocialLogin.loginWithGoogle(): displayName >> " + r.displayName);
                    console.log("SocialLogin.loginWithGoogle(): photo >> " + r.photo);
                    console.log("SocialLogin.loginWithGoogle(): authToken >> " + r.authToken);
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