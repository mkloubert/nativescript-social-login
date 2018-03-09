
declare class LSLinkedinToken extends NSObject {

	static alloc(): LSLinkedinToken; // inherited from NSObject

	static new(): LSLinkedinToken; // inherited from NSObject

	readonly accessToken: string;

	readonly expireDate: Date;

	readonly isFromMobileSDK: boolean;

	constructor(o: { accessToken: string; expireDate: Date; fromMobileSDK: boolean; });

	initWithAccessTokenExpireDateFromMobileSDK(_accessToken: string, _expireDate: Date, _isFromMobileSDK: boolean): this;
}

declare class LSResponse extends NSObject {

	static alloc(): LSResponse; // inherited from NSObject

	static new(): LSResponse; // inherited from NSObject

	readonly jsonObject: NSDictionary<any, any>;

	readonly statusCode: number;

	constructor(o: { data: NSData; statusCode: number; });

	constructor(o: { dictionary: NSDictionary<any, any>; statusCode: number; });

	constructor(o: { string: string; statusCode: number; });

	initWithDataStatusCode(data: NSData, statusCode: number): this;

	initWithDictionaryStatusCode(_dictionary: NSDictionary<any, any>, _statusCode: number): this;

	initWithStringStatusCode(string: string, statusCode: number): this;
}

interface LinkedinClient extends NSObjectProtocol {

	authorizeSuccessErrorCancel(success: (p1: LSLinkedinToken) => void, error: (p1: NSError) => void, cancel: () => void): void;

	requestURLRequestTypeTokenSuccessError(url: string, requestType: string, token: LSLinkedinToken, success: (p1: LSResponse) => void, error: (p1: NSError) => void): void;
}
declare var LinkedinClient: {

	prototype: LinkedinClient;
};

declare class LinkedinNativeClient extends NSObject implements LinkedinClient {

	static alloc(): LinkedinNativeClient; // inherited from NSObject

	static new(): LinkedinNativeClient; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { permissions: NSArray<any>; });

	authorizeSuccessErrorCancel(success: (p1: LSLinkedinToken) => void, error: (p1: NSError) => void, cancel: () => void): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithPermissions(permissions: NSArray<any>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestURLRequestTypeTokenSuccessError(url: string, requestType: string, token: LSLinkedinToken, success: (p1: LSResponse) => void, error: (p1: NSError) => void): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class LinkedinOAuthWebClient extends NSObject implements LinkedinClient {

	static alloc(): LinkedinOAuthWebClient; // inherited from NSObject

	static new(): LinkedinOAuthWebClient; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { redirectURL: string; clientId: string; clientSecret: string; state: string; permissions: NSArray<any>; present: UIViewController; });

	authorizeSuccessErrorCancel(success: (p1: LSLinkedinToken) => void, error: (p1: NSError) => void, cancel: () => void): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithRedirectURLClientIdClientSecretStatePermissionsPresent(redirectURL: string, clientId: string, clientSecret: string, state: string, permissions: NSArray<any>, presentViewController: UIViewController): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestURLRequestTypeTokenSuccessError(url: string, requestType: string, token: LSLinkedinToken, success: (p1: LSResponse) => void, error: (p1: NSError) => void): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class LinkedinSwiftConfiguration extends NSObject {

	static alloc(): LinkedinSwiftConfiguration; // inherited from NSObject

	static new(): LinkedinSwiftConfiguration; // inherited from NSObject

	readonly clientId: string;

	readonly clientSecret: string;

	readonly permissions: NSArray<any>;

	redirectUrl: string;

	readonly state: string;

	constructor(o: { clientId: string; clientSecret: string; state: string; permissions: NSArray<any>; redirectUrl: string; });

	initWithClientIdClientSecretStatePermissionsRedirectUrl(_clientId: string, _clientSecret: string, _state: string, _permisssions: NSArray<any>, redirectUrl: string): this;
}

declare class LinkedinSwiftHelper extends NSObject {

	static alloc(): LinkedinSwiftHelper; // inherited from NSObject

	static applicationOpenURLSourceApplicationAnnotation(application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean;

	static isLinkedinAppInstalled(): boolean;

	static new(): LinkedinSwiftHelper; // inherited from NSObject

	static shouldHandleUrl(url: NSURL): boolean;

	readonly lsAccessToken: LSLinkedinToken;

	constructor(o: { configuration: LinkedinSwiftConfiguration; });

	constructor(o: { configuration: LinkedinSwiftConfiguration; nativeAppChecker: NativeAppInstalledChecker; clients: NSArray<LinkedinClient>; webOAuthPresentViewController: UIViewController; persistedLSToken: LSLinkedinToken; });

	authorizeSuccessErrorCancel(success: (p1: LSLinkedinToken) => void, error: (p1: NSError) => void, cancel: () => void): void;

	initWithConfiguration(configuration: LinkedinSwiftConfiguration): this;

	initWithConfigurationNativeAppCheckerClientsWebOAuthPresentViewControllerPersistedLSToken(_configuration: LinkedinSwiftConfiguration, _checker: NativeAppInstalledChecker, clients: NSArray<LinkedinClient>, presentViewController: UIViewController, lsToken: LSLinkedinToken): this;

	requestURLRequestTypeSuccessError(url: string, requestType: string, success: (p1: LSResponse) => void, error: (p1: NSError) => void): void;
}

declare var LinkedinSwiftVersionNumber: number;

declare var LinkedinSwiftVersionString: interop.Reference<number>;

declare class NativeAppInstalledChecker extends NSObject {

	static alloc(): NativeAppInstalledChecker; // inherited from NSObject

	static new(): NativeAppInstalledChecker; // inherited from NSObject

	isLinkedinAppInstalled(): boolean;
}
