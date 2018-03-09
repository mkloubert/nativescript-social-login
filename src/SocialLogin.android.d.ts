import { IInitializationResult, ILoginResult, Social } from "./SocialLogin-common";
export declare class SocialLogin extends Social {
    private _rcGoogleSignIn;
    private _rcFacebookSignIn;
    private _rcLinkedInSignIn;
    private _fbCallbackManager;
    private _fbLoginManager;
    private _googleClient;
    init(result: IInitializationResult): IInitializationResult;
    loginWithFacebook(callback: (result: Partial<ILoginResult>) => void): void;
    logoutWithGoogle(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithGoogle(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithTwitter(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithLinkedIn(callback: (result: Partial<ILoginResult>) => void): void;
    private initFacebook(result);
    private initTwitter(result);
    private initGoogle(result);
    private initLinkedIn(result);
}
