
declare class GTMOAuth2Authentication extends NSObject implements GTMFetcherAuthorizationProtocol {

	static alloc(): GTMOAuth2Authentication; // inherited from NSObject

	static authenticationWithServiceProviderTokenURLRedirectURIClientIDClientSecret(serviceProvider: string, tokenURL: NSURL, redirectURI: string, clientID: string, clientSecret: string): any;

	static dictionaryWithJSONData(data: NSData): NSDictionary<any, any>;

	static dictionaryWithResponseString(responseStr: string): NSDictionary<any, any>;

	static encodedOAuthValueForString(str: string): string;

	static encodedQueryParametersForDictionary(dict: NSDictionary<any, any>): string;

	static new(): GTMOAuth2Authentication; // inherited from NSObject

	static scopeWithStrings(firstStr: string): string;

	accessToken: string;

	additionalGrantTypeRequestParameters: NSDictionary<any, any>;

	additionalTokenRequestParameters: NSDictionary<any, any>;

	assertion: string;

	authorizationTokenKey: string;

	clientID: string;

	clientSecret: string;

	code: string;

	errorString: string;

	expirationDate: Date;

	expiresIn: number;

	readonly parameters: NSDictionary<any, any>;

	properties: NSDictionary<any, any>;

	redirectURI: string;

	refreshFetcher: GTMSessionFetcher;

	refreshScope: string;

	refreshToken: string;

	scope: string;

	serviceProvider: string;

	tokenType: string;

	tokenURL: NSURL;

	userData: any;

	userEmail: string;

	userEmailIsVerified: string;

	userID: string;

	readonly canAuthorize: boolean; // inherited from GTMFetcherAuthorizationProtocol

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	fetcherService: GTMSessionFetcherServiceProtocol; // inherited from GTMFetcherAuthorizationProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	shouldAuthorizeAllRequests: boolean; // inherited from GTMFetcherAuthorizationProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	authorizeRequest(request: NSMutableURLRequest): boolean;

	authorizeRequestCompletionHandler(request: NSMutableURLRequest, handler: (p1: NSError) => void): void;

	authorizeRequestDelegateDidFinishSelector(request: NSMutableURLRequest, delegate: any, sel: string): void;

	beginTokenFetchWithDelegateDidFinishSelector(delegate: any, finishedSel: string): GTMSessionFetcher;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isAuthorizedRequest(request: NSURLRequest): boolean;

	isAuthorizingRequest(request: NSURLRequest): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	notifyFetchIsRunningFetcherType(isStarting: boolean, fetcher: GTMSessionFetcher, fetchType: string): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	persistenceResponseString(): string;

	primeForRefresh(): boolean;

	propertyForKey(key: string): any;

	reset(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setKeysForPersistenceResponseString(str: string): void;

	setKeysForResponseDictionary(dict: NSDictionary<any, any>): void;

	setKeysForResponseString(str: string): void;

	setPropertyForKey(obj: any, key: string): void;

	stopAuthorization(): void;

	stopAuthorizationForRequest(request: NSURLRequest): void;

	userAgent(): string;

	waitForCompletionWithTimeout(timeoutInSeconds: number): void;
}

declare const enum GTMOAuth2Error {

	WindowClosed = -1000,

	AuthorizationFailed = -1001,

	TokenExpired = -1002,

	TokenUnavailable = -1003,

	UnauthorizableRequest = -1004
}

declare class GTMOAuth2Keychain extends NSObject {

	static alloc(): GTMOAuth2Keychain; // inherited from NSObject

	static defaultKeychain(): GTMOAuth2Keychain;

	static new(): GTMOAuth2Keychain; // inherited from NSObject

	static setDefaultKeychain(keychain: GTMOAuth2Keychain): void;

	passwordForServiceAccountError(service: string, account: string): string;

	removePasswordForServiceAccountError(service: string, account: string): boolean;

	setPasswordForServiceAccessibilityAccountError(password: string, service: string, accessibility: any, account: string): boolean;
}

declare const enum GTMOAuth2KeychainError {

	BadArguments = -1301,

	NoPassword = -1302
}

declare class GTMOAuth2SignIn extends NSObject {

	static alloc(): GTMOAuth2SignIn; // inherited from NSObject

	static decodeWebSafeBase64(base64Str: string): NSData;

	static googleAuthorizationURL(): NSURL;

	static googleTokenURL(): NSURL;

	static googleUserInfoURL(): NSURL;

	static nativeClientRedirectURI(): string;

	static new(): GTMOAuth2SignIn; // inherited from NSObject

	static revokeTokenForGoogleAuthentication(auth: GTMOAuth2Authentication): void;

	static standardGoogleAuthenticationForScopeClientIDClientSecret(scope: string, clientID: string, clientSecret: string): GTMOAuth2Authentication;

	static userInfoFetcherWithAuth(auth: GTMOAuth2Authentication): GTMSessionFetcher;

	additionalAuthorizationParameters: NSDictionary<any, any>;

	authentication: GTMOAuth2Authentication;

	authorizationURL: NSURL;

	delegate: any;

	finishedSelector: string;

	networkLossTimeoutInterval: number;

	shouldFetchGoogleUserEmail: boolean;

	shouldFetchGoogleUserProfile: boolean;

	userData: any;

	readonly userProfile: NSDictionary<any, any>;

	webRequestSelector: string;

	constructor(o: { authentication: GTMOAuth2Authentication; authorizationURL: NSURL; delegate: any; webRequestSelector: string; finishedSelector: string; });

	authCodeObtained(): void;

	cancelSigningIn(): void;

	cookiesChanged(cookieStorage: NSHTTPCookieStorage): boolean;

	initWithAuthenticationAuthorizationURLDelegateWebRequestSelectorFinishedSelector(auth: GTMOAuth2Authentication, authorizationURL: NSURL, delegate: any, webRequestSelector: string, finishedSelector: string): this;

	loadFailedWithError(error: NSError): boolean;

	requestRedirectedToRequest(redirectedRequest: NSURLRequest): boolean;

	startSigningIn(): boolean;

	titleChanged(title: string): boolean;

	windowWasClosed(): void;
}

declare var GTMOAuth2VersionNumber: number;

declare var GTMOAuth2VersionString: interop.Reference<number>;

declare class GTMOAuth2ViewControllerTouch extends UIViewController implements UINavigationControllerDelegate, UIWebViewDelegate {

	static alloc(): GTMOAuth2ViewControllerTouch; // inherited from NSObject

	static authForGoogleFromKeychainForNameClientIDClientSecret(keychainItemName: string, clientID: string, clientSecret: string): GTMOAuth2Authentication;

	static authForGoogleFromKeychainForNameClientIDClientSecretError(keychainItemName: string, clientID: string, clientSecret: string): GTMOAuth2Authentication;

	static authNibBundle(): NSBundle;

	static authNibName(): string;

	static authorizeFromKeychainForNameAuthenticationError(keychainItemName: string, auth: GTMOAuth2Authentication): boolean;

	static controllerWithAuthenticationAuthorizationURLKeychainItemNameCompletionHandler(auth: GTMOAuth2Authentication, authorizationURL: NSURL, keychainItemName: string, handler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void): any;

	static controllerWithAuthenticationAuthorizationURLKeychainItemNameDelegateFinishedSelector(auth: GTMOAuth2Authentication, authorizationURL: NSURL, keychainItemName: string, delegate: any, finishedSelector: string): any;

	static controllerWithScopeClientIDClientSecretKeychainItemNameCompletionHandler(scope: string, clientID: string, clientSecret: string, keychainItemName: string, handler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void): any;

	static controllerWithScopeClientIDClientSecretKeychainItemNameDelegateFinishedSelector(scope: string, clientID: string, clientSecret: string, keychainItemName: string, delegate: any, finishedSelector: string): any;

	static new(): GTMOAuth2ViewControllerTouch; // inherited from NSObject

	static removeAuthFromKeychainForName(keychainItemName: string): boolean;

	static revokeTokenForGoogleAuthentication(auth: GTMOAuth2Authentication): void;

	static saveParamsToKeychainForNameAccessibilityAuthenticationError(keychainItemName: string, accessibility: any, auth: GTMOAuth2Authentication): boolean;

	static saveParamsToKeychainForNameAuthentication(keychainItemName: string, auth: GTMOAuth2Authentication): boolean;

	static setSignInClass(theClass: typeof NSObject): void;

	static signInClass(): typeof NSObject;

	readonly authentication: GTMOAuth2Authentication;

	backButton: UIButton;

	browserCookiesURL: NSURL;

	forwardButton: UIButton;

	initialActivityIndicator: UIActivityIndicatorView;

	initialHTMLString: string;

	keychainItemAccessibility: any;

	keychainItemName: string;

	navButtonsView: UIView;

	networkLossTimeoutInterval: number;

	popViewBlock: () => void;

	properties: NSDictionary<any, any>;

	rightBarButtonItem: UIBarButtonItem;

	showsInitialActivityIndicator: boolean;

	readonly signIn: GTMOAuth2SignIn;

	userData: any;

	webView: UIWebView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { authentication: GTMOAuth2Authentication; authorizationURL: NSURL; keychainItemName: string; completionHandler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void; });

	constructor(o: { authentication: GTMOAuth2Authentication; authorizationURL: NSURL; keychainItemName: string; delegate: any; finishedSelector: string; });

	constructor(o: { scope: string; clientID: string; clientSecret: string; keychainItemName: string; completionHandler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void; });

	constructor(o: { scope: string; clientID: string; clientSecret: string; keychainItemName: string; delegate: any; finishedSelector: string; });

	cancelSigningIn(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithAuthenticationAuthorizationURLKeychainItemNameCompletionHandler(auth: GTMOAuth2Authentication, authorizationURL: NSURL, keychainItemName: string, handler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void): this;

	initWithAuthenticationAuthorizationURLKeychainItemNameDelegateFinishedSelector(auth: GTMOAuth2Authentication, authorizationURL: NSURL, keychainItemName: string, delegate: any, finishedSelector: string): this;

	initWithScopeClientIDClientSecretKeychainItemNameCompletionHandler(scope: string, clientID: string, clientSecret: string, keychainItemName: string, handler: (p1: GTMOAuth2ViewControllerTouch, p2: GTMOAuth2Authentication, p3: NSError) => void): this;

	initWithScopeClientIDClientSecretKeychainItemNameDelegateFinishedSelector(scope: string, clientID: string, clientSecret: string, keychainItemName: string, delegate: any, finishedSelector: string): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	navigationControllerAnimationControllerForOperationFromViewControllerToViewController(navigationController: UINavigationController, operation: UINavigationControllerOperation, fromVC: UIViewController, toVC: UIViewController): UIViewControllerAnimatedTransitioning;

	navigationControllerDidShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void;

	navigationControllerInteractionControllerForAnimationController(navigationController: UINavigationController, animationController: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	navigationControllerPreferredInterfaceOrientationForPresentation(navigationController: UINavigationController): UIInterfaceOrientation;

	navigationControllerSupportedInterfaceOrientations(navigationController: UINavigationController): UIInterfaceOrientationMask;

	navigationControllerWillShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	propertyForKey(key: string): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setPropertyForKey(obj: any, key: string): void;

	setUpNavigation(): void;

	swapInCookies(): void;

	swapOutCookies(): void;

	systemCookieStorage(): NSHTTPCookieStorage;

	webViewDidFailLoadWithError(webView: UIWebView, error: NSError): void;

	webViewDidFinishLoad(webView: UIWebView): void;

	webViewDidStartLoad(webView: UIWebView): void;

	webViewShouldStartLoadWithRequestNavigationType(webView: UIWebView, request: NSURLRequest, navigationType: UIWebViewNavigationType): boolean;
}

declare var kGTMOAuth2AccessTokenRefreshFailed: string;

declare var kGTMOAuth2AccessTokenRefreshed: string;

declare var kGTMOAuth2CookiesDidSwapIn: string;

declare var kGTMOAuth2CookiesWillSwapOut: string;

declare var kGTMOAuth2ErrorDomain: string;

declare var kGTMOAuth2ErrorInvalidClient: string;

declare var kGTMOAuth2ErrorInvalidGrant: string;

declare var kGTMOAuth2ErrorInvalidRequest: string;

declare var kGTMOAuth2ErrorInvalidScope: string;

declare var kGTMOAuth2ErrorJSONKey: string;

declare var kGTMOAuth2ErrorKey: string;

declare var kGTMOAuth2ErrorMessageKey: string;

declare var kGTMOAuth2ErrorObjectKey: string;

declare var kGTMOAuth2ErrorRequestKey: string;

declare var kGTMOAuth2ErrorUnauthorizedClient: string;

declare var kGTMOAuth2ErrorUnsupportedGrantType: string;

declare var kGTMOAuth2FetchStarted: string;

declare var kGTMOAuth2FetchStopped: string;

declare var kGTMOAuth2FetchTypeAssertion: string;

declare var kGTMOAuth2FetchTypeKey: string;

declare var kGTMOAuth2FetchTypeRefresh: string;

declare var kGTMOAuth2FetchTypeToken: string;

declare var kGTMOAuth2FetchTypeUserInfo: string;

declare var kGTMOAuth2FetcherKey: string;

declare var kGTMOAuth2KeychainErrorDomain: string;

declare var kGTMOAuth2NetworkFound: string;

declare var kGTMOAuth2NetworkLost: string;

declare var kGTMOAuth2RefreshTokenChanged: string;

declare var kGTMOAuth2ServiceProviderGoogle: string;

declare var kGTMOAuth2UserSignedIn: string;

declare var kGTMOAuth2WebViewCancelled: string;

declare var kGTMOAuth2WebViewFailed: string;

declare var kGTMOAuth2WebViewFinished: string;

declare var kGTMOAuth2WebViewKey: string;

declare var kGTMOAuth2WebViewStartedLoading: string;

declare var kGTMOAuth2WebViewStopKindKey: string;

declare var kGTMOAuth2WebViewStoppedLoading: string;
