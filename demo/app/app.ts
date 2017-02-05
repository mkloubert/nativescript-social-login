// import Application = require("application");

import * as application from "application";
import * as platform from "platform";
import * as utils from "utils/utils";

declare var android: any;
// declare var UIResponder: any;
// declare var UIStatusBarStyle: any;
// declare var UIApplication: any;
// declare var UIApplicationDelegate: any;

declare class UIResponder {};
declare class UIApplicationDelegate{};
declare class FBSDKApplicationDelegate {
  static sharedInstance():any;
};

declare class GGLContext {
  static sharedInstance():any;
};

declare class GIDSignIn {
  static sharedInstance():any;
};

declare class FBSDKAppEvents{
  static activateApp();
};
declare class UIApplication {};
declare class NSDictionary {};


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

application.start({ moduleName: "main-page" });
