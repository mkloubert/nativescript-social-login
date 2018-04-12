
declare function GTMDataFromInputStream(inputStream: NSInputStream, outError: interop.Pointer | interop.Reference<NSError>): NSData;

declare function GTMFetcherApplicationIdentifier(bundle: NSBundle): string;

interface GTMFetcherAuthorizationProtocol extends NSObjectProtocol {

	canAuthorize?: boolean;

	fetcherService?: GTMSessionFetcherServiceProtocol;

	shouldAuthorizeAllRequests?: boolean;

	userEmail: string;

	authorizeRequestCompletionHandler?(request: NSMutableURLRequest, handler: (p1: NSError) => void): void;

	authorizeRequestDelegateDidFinishSelector(request: NSMutableURLRequest, delegate: any, sel: string): void;

	isAuthorizedRequest(request: NSURLRequest): boolean;

	isAuthorizingRequest(request: NSURLRequest): boolean;

	primeForRefresh?(): boolean;

	stopAuthorization(): void;

	stopAuthorizationForRequest(request: NSURLRequest): void;
}
declare var GTMFetcherAuthorizationProtocol: {

	prototype: GTMFetcherAuthorizationProtocol;
};

declare function GTMFetcherCleanedUserAgentString(str: string): string;

declare function GTMFetcherStandardUserAgentString(bundle: NSBundle): string;

declare function GTMFetcherSystemVersionString(): string;

declare class GTMGatherInputStream extends NSInputStream implements NSStreamDelegate {

	static alloc(): GTMGatherInputStream; // inherited from NSObject

	static inputStreamWithData(data: NSData): GTMGatherInputStream; // inherited from NSInputStream

	static inputStreamWithFileAtPath(path: string): GTMGatherInputStream; // inherited from NSInputStream

	static inputStreamWithURL(url: NSURL): GTMGatherInputStream; // inherited from NSInputStream

	static new(): GTMGatherInputStream; // inherited from NSObject

	static streamWithArray(dataArray: NSArray<any>): NSInputStream;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	streamHandleEvent(aStream: NSStream, eventCode: NSStreamEvent): void;
}

declare class GTMMIMEDocument extends NSObject {

	static MIMEDocument(): GTMMIMEDocument;

	static MIMEPartsWithBoundaryData(boundary: string, fullDocumentData: NSData): NSArray<GTMMIMEDocumentPart>;

	static alloc(): GTMMIMEDocument; // inherited from NSObject

	static dataWithHeaders(headers: NSDictionary<string, string>): NSData;

	static findBytesWithNeedleNeedleLengthHaystackHaystackLengthFoundOffset(needle: string, needleLength: number, haystack: string, haystackLength: number, foundOffset: interop.Pointer | interop.Reference<number>): number;

	static headersWithData(data: NSData): NSDictionary<string, string>;

	static new(): GTMMIMEDocument; // inherited from NSObject

	static searchDataTargetBytesTargetLengthFoundOffsets(data: NSData, targetBytes: interop.Pointer | interop.Reference<any>, targetLength: number, outFoundOffsets: interop.Pointer | interop.Reference<NSArray<number>>): void;

	static searchDataTargetBytesTargetLengthFoundOffsetsFoundBlockNumbers(data: NSData, targetBytes: interop.Pointer | interop.Reference<any>, targetLength: number, outFoundOffsets: interop.Pointer | interop.Reference<NSArray<number>>, outFoundBlockNumbers: interop.Pointer | interop.Reference<NSArray<number>>): void;

	boundary: string;

	addPartWithHeadersBody(headers: NSDictionary<string, string>, body: NSData): void;

	generateDispatchDataLengthBoundary(outDispatchData: interop.Pointer | interop.Reference<NSObject>, outLength: interop.Pointer | interop.Reference<number>, outBoundary: interop.Pointer | interop.Reference<string>): void;

	generateInputStreamLengthBoundary(outStream: interop.Pointer | interop.Reference<NSInputStream>, outLength: interop.Pointer | interop.Reference<number>, outBoundary: interop.Pointer | interop.Reference<string>): void;

	seedRandomWith(seed: number): void;
}

declare class GTMMIMEDocumentPart extends NSObject {

	static alloc(): GTMMIMEDocumentPart; // inherited from NSObject

	static new(): GTMMIMEDocumentPart; // inherited from NSObject

	static partWithHeadersBody(headers: NSDictionary<any, any>, body: NSData): GTMMIMEDocumentPart;

	readonly body: NSData;

	readonly headerData: NSData;

	readonly headers: NSDictionary<string, string>;

	readonly length: number;
}

declare class GTMReadMonitorInputStream extends NSInputStream implements NSStreamDelegate {

	static alloc(): GTMReadMonitorInputStream; // inherited from NSObject

	static inputStreamWithData(data: NSData): GTMReadMonitorInputStream; // inherited from NSInputStream

	static inputStreamWithFileAtPath(path: string): GTMReadMonitorInputStream; // inherited from NSInputStream

	static inputStreamWithStream(input: NSInputStream): GTMReadMonitorInputStream;

	static inputStreamWithURL(url: NSURL): GTMReadMonitorInputStream; // inherited from NSInputStream

	static new(): GTMReadMonitorInputStream; // inherited from NSObject

	readDelegate: any;

	readSelector: string;

	runLoopModes: NSArray<any>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { stream: NSInputStream; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithStream(input: NSInputStream): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	streamHandleEvent(aStream: NSStream, eventCode: NSStreamEvent): void;
}

declare class GTMSessionCookieStorage extends NSHTTPCookieStorage {

	static alloc(): GTMSessionCookieStorage; // inherited from NSObject

	static new(): GTMSessionCookieStorage; // inherited from NSObject

	removeAllCookies(): void;

	setCookies(cookies: NSArray<NSHTTPCookie>): void;
}

declare class GTMSessionFetcher extends NSObject implements NSURLSessionDelegate {

	static alloc(): GTMSessionFetcher; // inherited from NSObject

	static appAllowsInsecureRequests(): boolean;

	static applicationHandleEventsForBackgroundURLSessionCompletionHandler(application: UIApplication, identifier: string, completionHandler: () => void): void;

	static deleteLogDirectoriesOlderThanDate(date: Date): void;

	static fetcherWithDownloadResumeData(resumeData: NSData): GTMSessionFetcher;

	static fetcherWithRequest(request: NSURLRequest): GTMSessionFetcher;

	static fetcherWithSessionIdentifier(sessionIdentifier: string): GTMSessionFetcher;

	static fetcherWithURL(requestURL: NSURL): GTMSessionFetcher;

	static fetcherWithURLString(requestURLString: string): GTMSessionFetcher;

	static fetchersForBackgroundSessions(): NSArray<GTMSessionFetcher>;

	static htmlFileName(): string;

	static isLoggingEnabled(): boolean;

	static isLoggingToFileEnabled(): boolean;

	static logDirectoryForCurrentRun(): string;

	static loggingDateStamp(): string;

	static loggingDirectory(): string;

	static loggingProcessName(): string;

	static new(): GTMSessionFetcher; // inherited from NSObject

	static processNameLogPrefix(): string;

	static setGlobalTestBlock(block: (p1: GTMSessionFetcher, p2: (p1: NSHTTPURLResponse, p2: NSData, p3: NSError) => void) => void): void;

	static setLogDirectoryForCurrentRun(logDirectoryForCurrentRun: string): void;

	static setLoggingDateStamp(dateStamp: string): void;

	static setLoggingDirectory(path: string): void;

	static setLoggingEnabled(isLoggingEnabled: boolean): void;

	static setLoggingProcessName(processName: string): void;

	static setLoggingToFileEnabled(isLoggingToFileEnabled: boolean): void;

	static setSubstituteUIApplication(substituteUIApplication: GTMUIApplicationProtocol): void;

	static staticCookieStorage(): GTMSessionCookieStorage;

	static substituteUIApplication(): GTMUIApplicationProtocol;

	static symlinkNameSuffix(): string;

	accumulateDataBlock: (p1: NSData) => void;

	allowInvalidServerCertificates: boolean;

	allowLocalhostRequest: boolean;

	allowedInsecureSchemes: NSArray<string>;

	authorizer: GTMFetcherAuthorizationProtocol;

	bodyData: NSData;

	bodyFileURL: NSURL;

	readonly bodyLength: number;

	bodyStreamProvider: (p1: (p1: NSInputStream) => void) => void;

	callbackQueue: NSObject;

	readonly canShareSession: boolean;

	challengeBlock: (p1: GTMSessionFetcher, p2: NSURLAuthenticationChallenge, p3: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void) => void;

	comment: string;

	completionHandler: (p1: NSData, p2: NSError) => void;

	configuration: NSURLSessionConfiguration;

	configurationBlock: (p1: GTMSessionFetcher, p2: NSURLSessionConfiguration) => void;

	cookieStorage: NSHTTPCookieStorage;

	credential: NSURLCredential;

	deferResponseBodyLogging: boolean;

	destinationFileURL: NSURL;

	didReceiveResponseBlock: (p1: NSURLResponse, p2: (p1: NSURLSessionResponseDisposition) => void) => void;

	downloadProgressBlock: (p1: number, p2: number, p3: number) => void;

	readonly downloadResumeData: NSData;

	readonly downloadedData: NSData;

	readonly downloadedLength: number;

	readonly fetching: boolean;

	hasLoggedError: boolean;

	readonly initialBeginFetchDate: Date;

	log: string;

	logRequestBody: string;

	logResponseBody: string;

	readonly loggedStreamData: NSData;

	maxRetryInterval: number;

	minRetryInterval: number;

	readonly mutableRequest: NSMutableURLRequest;

	readonly nextRetryInterval: number;

	readonly parentUploadFetcher: GTMSessionUploadFetcher;

	properties: NSDictionary<string, any>;

	proxyCredential: NSURLCredential;

	receivedProgressBlock: (p1: number, p2: number) => void;

	redirectedFromURL: NSURL;

	request: NSURLRequest;

	readonly response: NSURLResponse;

	readonly responseHeaders: NSDictionary<string, string>;

	resumeDataBlock: (p1: NSData) => void;

	retryBlock: (p1: boolean, p2: NSError, p3: (p1: boolean) => void) => void;

	readonly retryCount: number;

	retryEnabled: boolean;

	retryFactor: number;

	sendProgressBlock: (p1: number, p2: number, p3: number) => void;

	service: GTMSessionFetcherServiceProtocol;

	serviceHost: string;

	servicePriority: number;

	session: NSURLSession;

	sessionDelegateQueue: NSOperationQueue;

	readonly sessionIdentifier: string;

	readonly sessionTask: NSURLSessionTask;

	sessionUserInfo: NSDictionary<string, string>;

	skipBackgroundTask: boolean;

	readonly statusCode: number;

	taskDescription: string;

	taskPriority: number;

	testBlock: (p1: GTMSessionFetcher, p2: (p1: NSHTTPURLResponse, p2: NSData, p3: NSError) => void) => void;

	testBlockAccumulateDataChunkCount: number;

	useBackgroundSession: boolean;

	useUploadTask: boolean;

	userData: any;

	readonly usingBackgroundSession: boolean;

	readonly wasCreatedFromBackgroundSession: boolean;

	willCacheURLResponseBlock: (p1: NSCachedURLResponse, p2: (p1: NSCachedURLResponse) => void) => void;

	willRedirectBlock: (p1: NSHTTPURLResponse, p2: NSURLRequest, p3: (p1: NSURLRequest) => void) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { request: NSURLRequest; configuration: NSURLSessionConfiguration; });

	URLSessionDidBecomeInvalidWithError(session: NSURLSession, error: NSError): void;

	URLSessionDidFinishEventsForBackgroundURLSession(session: NSURLSession): void;

	URLSessionDidReceiveChallengeCompletionHandler(session: NSURLSession, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void): void;

	addPropertiesFromDictionary(dict: NSDictionary<string, any>): void;

	appendLoggedStreamData(dataToAdd: NSData): void;

	beginFetchWithCompletionHandler(handler: (p1: NSData, p2: NSError) => void): void;

	beginFetchWithDelegateDidFinishSelector(delegate: any, finishedSEL: string): void;

	class(): typeof NSObject;

	clearLoggedStreamData(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithRequestConfiguration(request: NSURLRequest, configuration: NSURLSessionConfiguration): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	logFetchWithError(error: NSError): void;

	loggedInputStreamForInputStream(inputStream: NSInputStream): NSInputStream;

	loggedStreamProviderForStreamProvider(streamProvider: (p1: (p1: NSInputStream) => void) => void): (p1: (p1: NSInputStream) => void) => void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	propertyForKey(key: string): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	sessionIdentifierMetadata(): NSDictionary<string, string>;

	setCookieStorageMethod(method: number): void;

	setPropertyForKey(obj: any, key: string): void;

	setRequestValueForHTTPHeaderField(value: string, field: string): void;

	stopFetching(): void;

	waitForCompletionWithTimeout(timeoutInSeconds: number): boolean;
}

declare const enum GTMSessionFetcherError {

	DownloadFailed = -1,

	UploadChunkUnavailable = -2,

	BackgroundExpiration = -3,

	BackgroundFetchFailed = -4,

	InsecureRequest = -5,

	TaskCreationFailed = -6
}

declare class GTMSessionFetcherService extends NSObject implements GTMSessionFetcherServiceProtocol {

	static alloc(): GTMSessionFetcherService; // inherited from NSObject

	static mockFetcherServiceWithFakedDataFakedError(fakedDataOrNil: NSData, fakedErrorOrNil: NSError): GTMSessionFetcherService;

	static new(): GTMSessionFetcherService; // inherited from NSObject

	allowInvalidServerCertificates: boolean;

	allowLocalhostRequest: boolean;

	allowedInsecureSchemes: NSArray<string>;

	authorizer: GTMFetcherAuthorizationProtocol;

	challengeBlock: (p1: GTMSessionFetcher, p2: NSURLAuthenticationChallenge, p3: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void) => void;

	configuration: NSURLSessionConfiguration;

	configurationBlock: (p1: GTMSessionFetcher, p2: NSURLSessionConfiguration) => void;

	cookieStorage: NSHTTPCookieStorage;

	cookieStorageMethod: number;

	credential: NSURLCredential;

	readonly delayedFetchersByHost: NSDictionary<string, NSArray<any>>;

	maxRetryInterval: number;

	maxRunningFetchersPerHost: number;

	minRetryInterval: number;

	properties: NSDictionary<string, any>;

	proxyCredential: NSURLCredential;

	retryBlock: (p1: boolean, p2: NSError, p3: (p1: boolean) => void) => void;

	retryEnabled: boolean;

	readonly runningFetchersByHost: NSDictionary<string, NSArray<any>>;

	sessionDelegateQueue: NSOperationQueue;

	skipBackgroundTask: boolean;

	testBlock: (p1: GTMSessionFetcher, p2: (p1: NSHTTPURLResponse, p2: NSData, p3: NSError) => void) => void;

	unusedSessionTimeout: number;

	userAgent: string;

	callbackQueue: NSObject; // inherited from GTMSessionFetcherServiceProtocol

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly delegateQueue: NSOperationQueue; // inherited from GTMSessionFetcherServiceProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	reuseSession: boolean; // inherited from GTMSessionFetcherServiceProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	fetcherDidBeginFetching(fetcher: GTMSessionFetcher): void;

	fetcherDidCreateSession(fetcher: GTMSessionFetcher): void;

	fetcherDidStop(fetcher: GTMSessionFetcher): void;

	fetcherShouldBeginFetching(fetcher: GTMSessionFetcher): boolean;

	fetcherWithRequest(request: NSURLRequest): GTMSessionFetcher;

	fetcherWithRequestFetcherClass(request: NSURLRequest, fetcherClass: typeof NSObject): any;

	fetcherWithURL(requestURL: NSURL): GTMSessionFetcher;

	fetcherWithURLString(requestURLString: string): GTMSessionFetcher;

	isDelayingFetcher(fetcher: GTMSessionFetcher): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	issuedFetchers(): NSArray<GTMSessionFetcher>;

	issuedFetchersWithRequestURL(requestURL: NSURL): NSArray<GTMSessionFetcher>;

	numberOfDelayedFetchers(): number;

	numberOfFetchers(): number;

	numberOfRunningFetchers(): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	resetSession(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	session(): NSURLSession;

	sessionDelegate(): NSURLSessionDelegate;

	sessionForFetcherCreation(): NSURLSession;

	stopAllFetchers(): void;

	stoppedAllFetchersDate(): Date;

	waitForCompletionOfAllFetchersWithTimeout(timeoutInSeconds: number): boolean;
}

interface GTMSessionFetcherServiceProtocol extends NSObjectProtocol {

	callbackQueue: NSObject;

	delegateQueue: NSOperationQueue;

	reuseSession: boolean;

	fetcherDidBeginFetching(fetcher: GTMSessionFetcher): void;

	fetcherDidCreateSession(fetcher: GTMSessionFetcher): void;

	fetcherDidStop(fetcher: GTMSessionFetcher): void;

	fetcherShouldBeginFetching(fetcher: GTMSessionFetcher): boolean;

	fetcherWithRequest(request: NSURLRequest): GTMSessionFetcher;

	isDelayingFetcher(fetcher: GTMSessionFetcher): boolean;

	session(): NSURLSession;

	sessionDelegate(): NSURLSessionDelegate;

	sessionForFetcherCreation(): NSURLSession;

	stoppedAllFetchersDate(): Date;
}
declare var GTMSessionFetcherServiceProtocol: {

	prototype: GTMSessionFetcherServiceProtocol;
};

declare const enum GTMSessionFetcherStatus {

	NotModified = 304,

	BadRequest = 400,

	Unauthorized = 401,

	Forbidden = 403,

	PreconditionFailed = 412
}

declare class GTMSessionFetcherUserDefaultsFactory extends NSObject {

	static alloc(): GTMSessionFetcherUserDefaultsFactory; // inherited from NSObject

	static fetcherUserDefaults(): NSUserDefaults;

	static new(): GTMSessionFetcherUserDefaultsFactory; // inherited from NSObject
}

declare var GTMSessionFetcherVersionNumber: number;

declare var GTMSessionFetcherVersionString: interop.Reference<number>;

declare class GTMSessionSyncMonitorInternal extends NSObject {

	static alloc(): GTMSessionSyncMonitorInternal; // inherited from NSObject

	static functionsHoldingSynchronizationOnObject(object: any): NSArray<any>;

	static new(): GTMSessionSyncMonitorInternal; // inherited from NSObject

	constructor(o: { synchronizationObject: any; allowRecursive: boolean; functionName: string; });

	initWithSynchronizationObjectAllowRecursiveFunctionName(object: any, allowRecursive: boolean, functionName: string): this;
}

declare class GTMSessionUploadFetcher extends GTMSessionFetcher {

	static alloc(): GTMSessionUploadFetcher; // inherited from NSObject

	static fetcherWithDownloadResumeData(resumeData: NSData): GTMSessionUploadFetcher; // inherited from GTMSessionFetcher

	static fetcherWithRequest(request: NSURLRequest): GTMSessionUploadFetcher; // inherited from GTMSessionFetcher

	static fetcherWithSessionIdentifier(sessionIdentifier: string): GTMSessionUploadFetcher; // inherited from GTMSessionFetcher

	static fetcherWithURL(requestURL: NSURL): GTMSessionUploadFetcher; // inherited from GTMSessionFetcher

	static fetcherWithURLString(requestURLString: string): GTMSessionUploadFetcher; // inherited from GTMSessionFetcher

	static new(): GTMSessionUploadFetcher; // inherited from NSObject

	static uploadFetcherForSessionIdentifier(sessionIdentifier: string): GTMSessionUploadFetcher;

	static uploadFetcherWithLocationUploadMIMETypeChunkSizeFetcherService(uploadLocationURL: NSURL, uploadMIMEType: string, chunkSize: number, fetcherServiceOrNil: GTMSessionFetcherService): GTMSessionUploadFetcher;

	static uploadFetcherWithRequestUploadMIMETypeChunkSizeFetcherService(request: NSURLRequest, uploadMIMEType: string, chunkSize: number, fetcherServiceOrNil: GTMSessionFetcherService): GTMSessionUploadFetcher;

	static uploadFetchersForBackgroundSessions(): NSArray<any>;

	readonly activeFetcher: GTMSessionFetcher;

	chunkFetcher: GTMSessionFetcher;

	chunkSize: number;

	readonly currentOffset: number;

	readonly delegateCallbackQueue: NSObject;

	readonly delegateCompletionHandler: (p1: NSData, p2: NSError) => void;

	readonly lastChunkRequest: NSURLRequest;

	statusCode: number;

	uploadData: NSData;

	readonly uploadDataProvider: (p1: number, p2: number, p3: (p1: NSData, p2: number, p3: NSError) => void) => void;

	uploadFileHandle: NSFileHandle;

	uploadFileURL: NSURL;

	uploadLocationURL: NSURL;

	uploadMIMEType: string;

	isPaused(): boolean;

	pauseFetching(): void;

	resumeFetching(): void;

	setUploadDataLengthProvider(fullLength: number, block: (p1: number, p2: number, p3: (p1: NSData, p2: number, p3: NSError) => void) => void): void;
}

interface GTMUIApplicationProtocol extends NSObjectProtocol {

	beginBackgroundTaskWithNameExpirationHandler(taskName: string, handler: () => void): number;

	endBackgroundTask(identifier: number): void;
}
declare var GTMUIApplicationProtocol: {

	prototype: GTMUIApplicationProtocol;
};

declare var kGTMSessionFetcherCompletionDataKey: string;

declare var kGTMSessionFetcherCompletionErrorKey: string;

declare var kGTMSessionFetcherCompletionInvokedNotification: string;

declare var kGTMSessionFetcherElapsedIntervalWithRetriesKey: string;

declare var kGTMSessionFetcherErrorDomain: string;

declare var kGTMSessionFetcherNumberOfRetriesDoneKey: string;

declare var kGTMSessionFetcherRetryDelayStartedNotification: string;

declare var kGTMSessionFetcherRetryDelayStoppedNotification: string;

declare var kGTMSessionFetcherServiceSessionBecameInvalidNotification: string;

declare var kGTMSessionFetcherServiceSessionKey: string;

declare var kGTMSessionFetcherStartedNotification: string;

declare var kGTMSessionFetcherStatusDataKey: string;

declare var kGTMSessionFetcherStatusDomain: string;

declare var kGTMSessionFetcherStoppedNotification: string;

declare var kGTMSessionFetcherUploadLocationObtainedNotification: string;

declare var kGTMSessionUploadFetcherMaximumDemandBufferSize: number;

declare var kGTMSessionUploadFetcherStandardChunkSize: number;

declare var kGTMSessionUploadFetcherUnknownFileSize: number;
