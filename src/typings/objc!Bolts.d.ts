
declare class BFAppLink extends NSObject {

	static alloc(): BFAppLink; // inherited from NSObject

	static appLinkWithSourceURLTargetsWebURL(sourceURL: NSURL, targets: NSArray<any>, webURL: NSURL): BFAppLink;

	static new(): BFAppLink; // inherited from NSObject

	readonly sourceURL: NSURL;

	readonly targets: NSArray<any>;

	readonly webURL: NSURL;
}

declare var BFAppLinkNavigateBackToReferrerEventName: string;

declare var BFAppLinkNavigateInEventName: string;

declare var BFAppLinkNavigateOutEventName: string;

declare class BFAppLinkNavigation extends NSObject {

	static alloc(): BFAppLinkNavigation; // inherited from NSObject

	static callbackAppLinkDataForAppWithNameUrl(appName: string, url: string): NSDictionary<any, any>;

	static defaultResolver(): BFAppLinkResolving;

	static navigateToAppLinkError(link: BFAppLink): BFAppLinkNavigationType;

	static navigateToURLInBackground(destination: NSURL): BFTask<any>;

	static navigateToURLInBackgroundResolver(destination: NSURL, resolver: BFAppLinkResolving): BFTask<any>;

	static navigationTypeForLink(link: BFAppLink): BFAppLinkNavigationType;

	static navigationWithAppLinkExtrasAppLinkData(appLink: BFAppLink, extras: NSDictionary<any, any>, appLinkData: NSDictionary<any, any>): BFAppLinkNavigation;

	static new(): BFAppLinkNavigation; // inherited from NSObject

	static resolveAppLinkInBackground(destination: NSURL): BFTask<any>;

	static resolveAppLinkInBackgroundResolver(destination: NSURL, resolver: BFAppLinkResolving): BFTask<any>;

	static setDefaultResolver(resolver: BFAppLinkResolving): void;

	readonly appLink: BFAppLink;

	readonly appLinkData: NSDictionary<any, any>;

	readonly extras: NSDictionary<any, any>;

	navigate(): BFAppLinkNavigationType;

	navigationType(): BFAppLinkNavigationType;
}

declare const enum BFAppLinkNavigationType {

	Failure = 0,

	Browser = 1,

	App = 2
}

declare var BFAppLinkParseEventName: string;

interface BFAppLinkResolving extends NSObjectProtocol {

	appLinkFromURLInBackground(url: NSURL): BFTask<any>;
}
declare var BFAppLinkResolving: {

	prototype: BFAppLinkResolving;
};

declare class BFAppLinkReturnToRefererController extends NSObject implements BFAppLinkReturnToRefererViewDelegate {

	static alloc(): BFAppLinkReturnToRefererController; // inherited from NSObject

	static new(): BFAppLinkReturnToRefererController; // inherited from NSObject

	delegate: BFAppLinkReturnToRefererControllerDelegate;

	view: BFAppLinkReturnToRefererView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { forDisplayAboveNavController: UINavigationController; });

	class(): typeof NSObject;

	closeViewAnimated(animated: boolean): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initForDisplayAboveNavController(navController: UINavigationController): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	removeFromNavController(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	returnToRefererViewDidTapInsideCloseButton(view: BFAppLinkReturnToRefererView): void;

	returnToRefererViewDidTapInsideLinkLink(view: BFAppLinkReturnToRefererView, link: BFAppLink): void;

	self(): this;

	showViewForRefererAppLink(refererAppLink: BFAppLink): void;

	showViewForRefererURL(url: NSURL): void;
}

interface BFAppLinkReturnToRefererControllerDelegate extends NSObjectProtocol {

	returnToRefererControllerDidNavigateToAppLinkType?(controller: BFAppLinkReturnToRefererController, url: BFAppLink, type: BFAppLinkNavigationType): void;

	returnToRefererControllerWillNavigateToAppLink?(controller: BFAppLinkReturnToRefererController, appLink: BFAppLink): void;
}
declare var BFAppLinkReturnToRefererControllerDelegate: {

	prototype: BFAppLinkReturnToRefererControllerDelegate;
};

declare class BFAppLinkReturnToRefererView extends UIView {

	static alloc(): BFAppLinkReturnToRefererView; // inherited from NSObject

	static appearance(): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): BFAppLinkReturnToRefererView; // inherited from UIAppearance

	static new(): BFAppLinkReturnToRefererView; // inherited from NSObject

	closed: boolean;

	delegate: BFAppLinkReturnToRefererViewDelegate;

	includeStatusBarInSize: BFIncludeStatusBarInSize;

	refererAppLink: BFAppLink;

	textColor: UIColor;
}

interface BFAppLinkReturnToRefererViewDelegate extends NSObjectProtocol {

	returnToRefererViewDidTapInsideCloseButton(view: BFAppLinkReturnToRefererView): void;

	returnToRefererViewDidTapInsideLinkLink(view: BFAppLinkReturnToRefererView, link: BFAppLink): void;
}
declare var BFAppLinkReturnToRefererViewDelegate: {

	prototype: BFAppLinkReturnToRefererViewDelegate;
};

declare class BFAppLinkTarget extends NSObject {

	static alloc(): BFAppLinkTarget; // inherited from NSObject

	static appLinkTargetWithURLAppStoreIdAppName(url: NSURL, appStoreId: string, appName: string): BFAppLinkTarget;

	static new(): BFAppLinkTarget; // inherited from NSObject

	readonly URL: NSURL;

	readonly appName: string;

	readonly appStoreId: string;
}

declare var BFAppLinkVersion: string;

declare class BFCancellationToken extends NSObject {

	static alloc(): BFCancellationToken; // inherited from NSObject

	static new(): BFCancellationToken; // inherited from NSObject

	readonly cancellationRequested: boolean;

	registerCancellationObserverWithBlock(block: () => void): BFCancellationTokenRegistration;
}

declare class BFCancellationTokenRegistration extends NSObject {

	static alloc(): BFCancellationTokenRegistration; // inherited from NSObject

	static new(): BFCancellationTokenRegistration; // inherited from NSObject

	dispose(): void;
}

declare class BFCancellationTokenSource extends NSObject {

	static alloc(): BFCancellationTokenSource; // inherited from NSObject

	static cancellationTokenSource(): BFCancellationTokenSource;

	static new(): BFCancellationTokenSource; // inherited from NSObject

	readonly cancellationRequested: boolean;

	readonly token: BFCancellationToken;

	cancel(): void;

	cancelAfterDelay(millis: number): void;

	dispose(): void;
}

declare class BFExecutor extends NSObject {

	static alloc(): BFExecutor; // inherited from NSObject

	static defaultExecutor(): BFExecutor;

	static executorWithBlock(block: (p1: () => void) => void): BFExecutor;

	static executorWithDispatchQueue(queue: NSObject): BFExecutor;

	static executorWithOperationQueue(queue: NSOperationQueue): BFExecutor;

	static immediateExecutor(): BFExecutor;

	static mainThreadExecutor(): BFExecutor;

	static new(): BFExecutor; // inherited from NSObject

	execute(block: () => void): void;
}

declare const enum BFIncludeStatusBarInSize {

	Never = 0,

	IOS7AndLater = 1,

	Always = 2
}

declare class BFMeasurementEvent extends NSObject {

	static alloc(): BFMeasurementEvent; // inherited from NSObject

	static new(): BFMeasurementEvent; // inherited from NSObject
}

declare var BFMeasurementEventArgsKey: string;

declare var BFMeasurementEventNameKey: string;

declare var BFMeasurementEventNotificationName: string;

declare class BFTask<ResultType> extends NSObject {

	static alloc<ResultType>(): BFTask<ResultType>; // inherited from NSObject

	static cancelledTask<ResultType>(): BFTask<ResultType>;

	static new<ResultType>(): BFTask<ResultType>; // inherited from NSObject

	static taskForCompletionOfAllTasks<ResultType>(tasks: NSArray<BFTask<any>>): BFTask<ResultType>;

	static taskForCompletionOfAllTasksWithResults<ResultType>(tasks: NSArray<BFTask<any>>): BFTask<ResultType>;

	static taskForCompletionOfAnyTask<ResultType>(tasks: NSArray<BFTask<any>>): BFTask<ResultType>;

	static taskFromExecutorWithBlock<ResultType>(executor: BFExecutor, block: () => any): BFTask<ResultType>;

	static taskWithDelay<ResultType>(millis: number): BFTask<ResultType>;

	static taskWithDelayCancellationToken<ResultType>(millis: number, token: BFCancellationToken): BFTask<ResultType>;

	static taskWithError<ResultType>(error: NSError): BFTask<ResultType>;

	static taskWithException<ResultType>(exception: NSException): BFTask<ResultType>;

	static taskWithResult<ResultType>(result: ResultType): BFTask<ResultType>;

	readonly cancelled: boolean;

	readonly completed: boolean;

	readonly error: NSError;

	readonly exception: NSException;

	readonly faulted: boolean;

	readonly result: ResultType;

	continueWithBlock(block: (p1: BFTask<ResultType>) => any): BFTask<any>;

	continueWithBlockCancellationToken(block: (p1: BFTask<ResultType>) => any, cancellationToken: BFCancellationToken): BFTask<any>;

	continueWithExecutorBlockCancellationToken(executor: BFExecutor, block: (p1: BFTask<ResultType>) => any, cancellationToken: BFCancellationToken): BFTask<any>;

	continueWithExecutorSuccessBlockCancellationToken(executor: BFExecutor, block: (p1: BFTask<ResultType>) => any, cancellationToken: BFCancellationToken): BFTask<any>;

	continueWithExecutorWithBlock(executor: BFExecutor, block: (p1: BFTask<ResultType>) => any): BFTask<any>;

	continueWithExecutorWithSuccessBlock(executor: BFExecutor, block: (p1: BFTask<ResultType>) => any): BFTask<any>;

	continueWithSuccessBlock(block: (p1: BFTask<ResultType>) => any): BFTask<any>;

	continueWithSuccessBlockCancellationToken(block: (p1: BFTask<ResultType>) => any, cancellationToken: BFCancellationToken): BFTask<any>;

	waitUntilFinished(): void;
}

declare function BFTaskCatchesExceptions(): boolean;

declare class BFTaskCompletionSource<ResultType> extends NSObject {

	static alloc<ResultType>(): BFTaskCompletionSource<ResultType>; // inherited from NSObject

	static new<ResultType>(): BFTaskCompletionSource<ResultType>; // inherited from NSObject

	static taskCompletionSource<ResultType>(): BFTaskCompletionSource<ResultType>;

	readonly task: BFTask<ResultType>;

	cancel(): void;

	setError(error: NSError): void;

	setException(exception: NSException): void;

	setResult(result: ResultType): void;

	trySetCancelled(): boolean;

	trySetError(error: NSError): boolean;

	trySetException(exception: NSException): boolean;

	trySetResult(result: ResultType): boolean;
}

declare var BFTaskErrorDomain: string;

declare var BFTaskMultipleErrorsUserInfoKey: string;

declare var BFTaskMultipleExceptionsException: string;

declare var BFTaskMultipleExceptionsUserInfoKey: string;

declare function BFTaskSetCatchesExceptions(catchExceptions: boolean): void;

declare class BFURL extends NSObject {

	static URLWithInboundURLSourceApplication(url: NSURL, sourceApplication: string): BFURL;

	static URLWithURL(url: NSURL): BFURL;

	static alloc(): BFURL; // inherited from NSObject

	static new(): BFURL; // inherited from NSObject

	readonly appLinkData: NSDictionary<any, any>;

	readonly appLinkExtras: NSDictionary<any, any>;

	readonly appLinkReferer: BFAppLink;

	readonly inputQueryParameters: NSDictionary<any, any>;

	readonly inputURL: NSURL;

	readonly targetQueryParameters: NSDictionary<any, any>;

	readonly targetURL: NSURL;
}

declare class BFWebViewAppLinkResolver extends NSObject implements BFAppLinkResolving {

	static alloc(): BFWebViewAppLinkResolver; // inherited from NSObject

	static new(): BFWebViewAppLinkResolver; // inherited from NSObject

	static sharedInstance(): BFWebViewAppLinkResolver;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	appLinkFromURLInBackground(url: NSURL): BFTask<any>;

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
}

declare var BoltsFrameworkVersionString: string;

declare var BoltsVersionNumber: number;

declare var BoltsVersionString: interop.Reference<number>;

declare var kBFMultipleErrorsError: number;
