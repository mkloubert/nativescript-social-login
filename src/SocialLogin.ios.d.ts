import { IInitializationResult, ILoginResult, Social } from "./SocialLogin-common";
export declare class SocialLogin extends Social {
    private _facebookCallbackManager;
    private facebookLoginManager;
    private _googleProfileInfoCallback;
    private googleFailCallback;
    private googleSignIn;
    private googleCancelCallback;
    private googleSuccessCallback;
    private linkedinHelper;
    init(result: IInitializationResult): IInitializationResult;
    loginWithFacebook(callback: (result: Partial<ILoginResult>) => void): void;
    private createSignInDelegate();
    loginWithGoogle(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithTwitter(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithLinkedIn(callback: (result: Partial<ILoginResult>) => void): void;
}
