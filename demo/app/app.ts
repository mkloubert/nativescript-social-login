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

// declare class GGLContext {
//   static sharedInstance():any;
// };
//
// declare class GIDSignIn {
//   static sharedInstance():any;
// };

declare class FBSDKAppEvents{
  static activateApp();
};
declare class UIApplication {};
declare class NSDictionary {};


if (application.ios) {

  class MyDelegate extends UIResponder implements UIApplicationDelegate {
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
      return FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions); // facebook login delegate
    }

    applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation) {
      return FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation); // facebook login delegate
    }

    applicationDidBecomeActive(application: UIApplication): void {
      console.log("ACTIVATE APP");
      // FBSDKAppEvents.activateApp();
    }

    applicationWillTerminate(application: UIApplication): void {
      //Do something you want here
    }

    applicationDidEnterBackground(application: UIApplication): void {
      //Do something you want here
    }
  }

  application.ios.delegate = MyDelegate;

}

application.start({ moduleName: "main-page" });
