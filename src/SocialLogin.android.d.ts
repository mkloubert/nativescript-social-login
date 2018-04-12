import { IInitializationResult, ILoginResult, Social } from "./SocialLogin-common";
export declare class SocialLogin extends Social {
    private _googleClient;
    private _rcGoogleSignIn;
    private _rcFacebookSignIn;
    private _fbCallbackManager;
    private _fbLoginManager;
    init(result: IInitializationResult): IInitializationResult;
    loginWithFacebook(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithGoogle(callback: (result: Partial<ILoginResult>) => void): void;
    loginWithTwitter(callback: (result: Partial<ILoginResult>) => void): void;
    private initFacebook(result);
    private initTwitter(result);
    private initGoogle(result);
    logOut(callback: () => void): void;
}
