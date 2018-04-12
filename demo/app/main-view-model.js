var Application = require("application");
var AppSettings = require("application-settings");
var Frame = require("ui/frame");
var Observable = require("data/observable").Observable;
var SocialLogin = require("nativescript-social-login");
var TypeUtils = require("utils/types");

SocialLogin.addLogger(function(msg, tag) {
    console.log("[nativescript-social-login] " + tag + " >> " + msg);
});

function createViewModel() {
    var viewModel = new Observable();

    viewModel.set(
        "googleServerClientId",
        AppSettings.getString("googleServerClientId")
    );

    if (Application.android) {
        var activity =
            Application.android.foregroundActivity ||
            Application.android.startActivity;

        if (!TypeUtils.isNullOrUndefined(activity)) {
            var appCtx = activity.getApplicationContext();

            var androidResources = appCtx.getResources();

            // facebook APP ID
            try {
                viewModel.facebookAppId = androidResources.getString(
                    org.nativescript.NativescriptSocialLoginDemo.R.string
                        .facebook_app_id
                );
            } catch (e) {
                console.log("[ERROR] createViewModel() >> facebookAppId: " + e);
            }

            if (viewModel.facebookAppId == "{YOUR_FACEBOOK_ID_HERE}") {
                viewModel.facebookAppId = undefined;
            }
        }
    } else if (Application.ios) {
        viewModel.facebookAppId = NSBundle.mainBundle.objectForInfoDictionaryKey(
            "FacebookAppID"
        );
    }

    viewModel.initialize = function(args) {
        var btn = args.object;
        var tabView = btn.page.getViewById("mjk-tabview");

        viewModel.set("initResultLog", "");

        try {
            var googleServerClientId = viewModel.get("googleServerClientId");

            var result = SocialLogin.init({
                google: {
                    serverClientId: googleServerClientId
                },
                facebook: {
                    clearSession: false
                }
            });

            viewModel.set("initResult", result);

            var log =
                "Facebook initialize?: " + result.facebook.isInitialized + "\n";
            if (result.facebook.error) {
                log += "Facebook error: " + result.facebook.error + "\n";
            }

            log += "\n";

            log += "Google initialize?: " + result.google.isInitialized + "\n";
            if (result.google.error) {
                log += "Google error: " + result.google.error + "\n";
            }

            if (!result.google.error || !result.facebook.error) {
                tabView.selectedIndex = 1;
            }

            viewModel.set("initResultLog", log);
        } catch (e) {
            viewModel.set("initResultLog", "[ERROR]: " + e);
        }
    };

    viewModel.saveSettings = function() {
        try {
            // googleServerClientId
            AppSettings.setString(
                "googleServerClientId",
                viewModel.get("googleServerClientId")
            );
        } catch (e) {
            console.log("[ERROR] viewModel.saveSettings(): " + e);
        }
    };

    viewModel.logOut = function() {
        try {
            SocialLogin.logOut(function() {
                try {
                    console.log("[SUCCESS] LOGOUT: ");
                } catch (e) {
                    console.log("[ERROR] viewModel.logOut: " + e);
                }
            });
        } catch (e) {
            console.log("[ERROR] viewModel.logOut: " + e);
        }
    };

    viewModel.loginWithFacebook = function() {
        try {
            SocialLogin.loginWithFacebook(function(result) {
                console.log(result);
                try {
                    viewModel.set("loginResult", result);
                } catch (e) {
                    console.log("[ERROR] viewModel.loginWithFacebook(1): " + e);
                }
            });
        } catch (e) {
            console.log("[ERROR] viewModel.loginWithFacebook(0): " + e);
        }
    };

    viewModel.loginWithGoogle = function() {
        try {
            SocialLogin.loginWithGoogle(function(result) {
                try {
                    viewModel.set("loginResult", result);
                } catch (e) {
                    console.log("[ERROR] viewModel.loginWithGoogle(1): " + e);
                }
            });
        } catch (e) {
            console.log("[ERROR] viewModel.loginWithGoogle(0): " + e);
        }
    };

    return viewModel;
}
exports.createViewModel = createViewModel;
