import { IInitializationResult, ILoginResult, Social } from "./SocialLogin-common";
export declare class SocialLogin extends Social {
    private facebookLoginManager;
    private _facebookCallbackManager;
    private googleSignIn;
    private _googleProfileInfoCallback;
    private googleFailCallback;
    private googleCancelCallback;
    private googleSuccessCallback;
    init(result: IInitializationResult): IInitializationResult;
    loginWithFacebook(callback: (result: Partial<ILoginResult>) => void): void;
    private createSignInDelegate();
    loginWithGoogle(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithTwitter(callback: (result: Partial<ILoginResult>) => void): void;
    logOut(callback: () => void): void;
}
