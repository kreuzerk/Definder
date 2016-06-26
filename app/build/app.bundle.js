webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(7);
	var http_1 = __webpack_require__(280);
	var store_1 = __webpack_require__(301);
	var app_1 = __webpack_require__(324);
	var quizlet_service_1 = __webpack_require__(325);
	var quizletterm_reducer_1 = __webpack_require__(337);
	;
	__webpack_require__(338);
	__webpack_require__(584);
	// Angular2 Dependencies
	__webpack_require__(305);
	__webpack_require__(596);
	var FakeXSRFStrategy = (function () {
	    function FakeXSRFStrategy() {
	    }
	    FakeXSRFStrategy.prototype.configureRequest = function (req) { };
	    return FakeXSRFStrategy;
	}());
	var XRSF_MOCK = core_1.provide(http_1.XSRFStrategy, { useValue: new FakeXSRFStrategy() });
	function main() {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, [
	        http_1.HTTP_PROVIDERS,
	        XRSF_MOCK,
	        quizlet_service_1.QuizletService,
	        store_1.provideStore({ quizletterm: quizletterm_reducer_1.quizletterm })
	    ])
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	document.addEventListener('DOMContentLoaded', main);


/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(302));
	__export(__webpack_require__(309));
	__export(__webpack_require__(310));
	__export(__webpack_require__(311));
	__export(__webpack_require__(323));


/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BehaviorSubject_1 = __webpack_require__(303);
	__webpack_require__(305);
	__webpack_require__(307);
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store(_dispatcher, _backend, initialState) {
	        var _this = this;
	        _super.call(this, initialState);
	        this._dispatcher = _dispatcher;
	        this._backend = _backend;
	        _backend.connect(function (state) { return _super.prototype.next.call(_this, state); });
	    }
	    Store.prototype.select = function (keyOrSelector) {
	        if (typeof keyOrSelector === 'string' ||
	            typeof keyOrSelector === 'number' ||
	            typeof keyOrSelector === 'symbol') {
	            return this.map(function (state) { return state[keyOrSelector]; }).distinctUntilChanged();
	        }
	        else if (typeof keyOrSelector === 'function') {
	            return this.map(keyOrSelector).distinctUntilChanged();
	        }
	        else {
	            throw new TypeError("Store@select Unknown Parameter Type: "
	                + ("Expected type of function or valid key type, got " + typeof keyOrSelector));
	        }
	    };
	    Store.prototype.getState = function () {
	        return this.value;
	    };
	    Store.prototype.dispatch = function (action) {
	        this._dispatcher.dispatch(action);
	    };
	    Store.prototype.next = function (action) {
	        this._dispatcher.next(action);
	    };
	    Store.prototype.error = function (error) {
	        this._dispatcher.error(error);
	    };
	    Store.prototype.replaceReducer = function (reducer) {
	        this._backend.replaceReducer(reducer);
	    };
	    return Store;
	}(BehaviorSubject_1.BehaviorSubject));
	exports.Store = Store;


/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(40);
	var throwError_1 = __webpack_require__(304);
	var ObjectUnsubscribedError_1 = __webpack_require__(57);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throwError_1.throwError(this.thrownError);
	        }
	        else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	        else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },

/***/ 304:
/***/ function(module, exports) {

	"use strict";
	function throwError(e) { throw e; }
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var map_1 = __webpack_require__(306);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var distinctUntilChanged_1 = __webpack_require__(308);
	Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	var tryCatch_1 = __webpack_require__(50);
	var errorObject_1 = __webpack_require__(51);
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
	 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
	 * If a comparator function is not provided, an equality check is used by default.
	 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
	 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
	 * @method distinctUntilChanged
	 * @owner Observable
	 */
	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = (function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	    };
	    return DistinctUntilChangedOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctUntilChangedSubscriber = (function (_super) {
	    __extends(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.hasKey = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var keySelector = this.keySelector;
	        var key = value;
	        if (keySelector) {
	            key = tryCatch_1.tryCatch(this.keySelector)(value);
	            if (key === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        var result = false;
	        if (this.hasKey) {
	            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
	            if (result === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        else {
	            this.hasKey = true;
	        }
	        if (Boolean(result) === false) {
	            this.key = key;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },

/***/ 309:
/***/ function(module, exports) {

	"use strict";
	function combineReducers(reducers) {
	    var reducerKeys = Object.keys(reducers);
	    var finalReducers = {};
	    for (var i = 0; i < reducerKeys.length; i++) {
	        var key = reducerKeys[i];
	        if (typeof reducers[key] === 'function') {
	            finalReducers[key] = reducers[key];
	        }
	    }
	    var finalReducerKeys = Object.keys(finalReducers);
	    return function combination(state, action) {
	        if (state === void 0) { state = {}; }
	        var hasChanged = false;
	        var nextState = {};
	        for (var i = 0; i < finalReducerKeys.length; i++) {
	            var key = finalReducerKeys[i];
	            var reducer = finalReducers[key];
	            var previousStateForKey = state[key];
	            var nextStateForKey = reducer(previousStateForKey, action);
	            nextState[key] = nextStateForKey;
	            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	        }
	        return hasChanged ? nextState : state;
	    };
	}
	exports.combineReducers = combineReducers;
	exports.compose = function () {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (funcs.length === 0) {
	            return args[0];
	        }
	        var last = funcs[funcs.length - 1];
	        var rest = funcs.slice(0, -1);
	        return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
	    };
	};


/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(40);
	var Dispatcher = (function (_super) {
	    __extends(Dispatcher, _super);
	    function Dispatcher() {
	        _super.apply(this, arguments);
	    }
	    Dispatcher.prototype.dispatch = function (action) {
	        this.next(action);
	    };
	    return Dispatcher;
	}(Subject_1.Subject));
	exports.Dispatcher = Dispatcher;


/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var queue_1 = __webpack_require__(312);
	__webpack_require__(316);
	__webpack_require__(318);
	__webpack_require__(320);
	exports.ActionTypes = {
	    INIT: '@@ngrx/INIT'
	};
	var StoreBackend = (function () {
	    function StoreBackend(_dispatcher, _reducer, _initialState, _preMiddleware, _postMiddleware) {
	        if (_preMiddleware === void 0) { _preMiddleware = function (t) { return t; }; }
	        if (_postMiddleware === void 0) { _postMiddleware = function (t) { return t; }; }
	        this._dispatcher = _dispatcher;
	        this._reducer = _reducer;
	        this._initialState = _initialState;
	        this._preMiddleware = _preMiddleware;
	        this._postMiddleware = _postMiddleware;
	    }
	    StoreBackend.prototype._init = function () {
	        this._dispatcher.dispatch({ type: exports.ActionTypes.INIT });
	    };
	    StoreBackend.prototype.connect = function (nextCallbackFn) {
	        var _this = this;
	        this._dispatcher
	            .let(this._preMiddleware)
	            .observeOn(queue_1.queue)
	            .scan(function (state, action) { return _this._reducer(state, action); }, this._initialState)
	            .let(this._postMiddleware)
	            .subscribe(nextCallbackFn);
	        this._init();
	    };
	    StoreBackend.prototype.replaceReducer = function (reducer) {
	        this._reducer = reducer;
	        this._init();
	    };
	    return StoreBackend;
	}());
	exports.StoreBackend = StoreBackend;


/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var QueueScheduler_1 = __webpack_require__(313);
	exports.queue = new QueueScheduler_1.QueueScheduler();
	//# sourceMappingURL=queue.js.map

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var QueueAction_1 = __webpack_require__(314);
	var FutureAction_1 = __webpack_require__(315);
	var QueueScheduler = (function () {
	    function QueueScheduler() {
	        this.active = false;
	        this.actions = []; // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
	        this.scheduledId = null;
	    }
	    QueueScheduler.prototype.now = function () {
	        return Date.now();
	    };
	    QueueScheduler.prototype.flush = function () {
	        if (this.active || this.scheduledId) {
	            return;
	        }
	        this.active = true;
	        var actions = this.actions;
	        // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
	        for (var action = null; action = actions.shift();) {
	            action.execute();
	            if (action.error) {
	                this.active = false;
	                throw action.error;
	            }
	        }
	        this.active = false;
	    };
	    QueueScheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return (delay <= 0) ?
	            this.scheduleNow(work, state) :
	            this.scheduleLater(work, delay, state);
	    };
	    QueueScheduler.prototype.scheduleNow = function (work, state) {
	        return new QueueAction_1.QueueAction(this, work).schedule(state);
	    };
	    QueueScheduler.prototype.scheduleLater = function (work, delay, state) {
	        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
	    };
	    return QueueScheduler;
	}());
	exports.QueueScheduler = QueueScheduler;
	//# sourceMappingURL=QueueScheduler.js.map

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FutureAction_1 = __webpack_require__(315);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var QueueAction = (function (_super) {
	    __extends(QueueAction, _super);
	    function QueueAction() {
	        _super.apply(this, arguments);
	    }
	    QueueAction.prototype._schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay > 0) {
	            return _super.prototype._schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        var scheduler = this.scheduler;
	        scheduler.actions.push(this);
	        scheduler.flush();
	        return this;
	    };
	    return QueueAction;
	}(FutureAction_1.FutureAction));
	exports.QueueAction = QueueAction;
	//# sourceMappingURL=QueueAction.js.map

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(42);
	var Subscription_1 = __webpack_require__(47);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FutureAction = (function (_super) {
	    __extends(FutureAction, _super);
	    function FutureAction(scheduler, work) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.pending = false;
	    }
	    FutureAction.prototype.execute = function () {
	        if (this.isUnsubscribed) {
	            this.error = new Error('executing a cancelled action');
	        }
	        else {
	            try {
	                this.work(this.state);
	            }
	            catch (e) {
	                this.unsubscribe();
	                this.error = e;
	            }
	        }
	    };
	    FutureAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (this.isUnsubscribed) {
	            return this;
	        }
	        return this._schedule(state, delay);
	    };
	    FutureAction.prototype._schedule = function (state, delay) {
	        var _this = this;
	        if (delay === void 0) { delay = 0; }
	        // Always replace the current state with the new state.
	        this.state = state;
	        // Set the pending flag indicating that this action has been scheduled, or
	        // has recursively rescheduled itself.
	        this.pending = true;
	        var id = this.id;
	        // If this action has an intervalID and the specified delay matches the
	        // delay we used to create the intervalID, don't call `setInterval` again.
	        if (id != null && this.delay === delay) {
	            return this;
	        }
	        this.delay = delay;
	        // If this action has an intervalID, but was rescheduled with a different
	        // `delay` time, cancel the current intervalID and call `setInterval` with
	        // the new `delay` time.
	        if (id != null) {
	            this.id = null;
	            root_1.root.clearInterval(id);
	        }
	        //
	        // Important implementation note:
	        //
	        // By default, FutureAction only executes once. However, Actions have the
	        // ability to be rescheduled from within the scheduled callback (mimicking
	        // recursion for asynchronous methods). This allows us to implement single
	        // and repeated actions with the same code path without adding API surface
	        // area, and implement tail-call optimization over asynchronous boundaries.
	        //
	        // However, JS runtimes make a distinction between intervals scheduled by
	        // repeatedly calling `setTimeout` vs. a single `setInterval` call, with
	        // the latter providing a better guarantee of precision.
	        //
	        // In order to accommodate both single and repeatedly rescheduled actions,
	        // use `setInterval` here for both cases. By default, the interval will be
	        // canceled after its first execution, or if the action schedules itself to
	        // run again with a different `delay` time.
	        //
	        // If the action recursively schedules itself to run again with the same
	        // `delay` time, the interval is not canceled, but allowed to loop again.
	        // The check of whether the interval should be canceled or not is run every
	        // time the interval is executed. The first time an action fails to
	        // reschedule itself, the interval is canceled.
	        //
	        this.id = root_1.root.setInterval(function () {
	            _this.pending = false;
	            var _a = _this, id = _a.id, scheduler = _a.scheduler;
	            scheduler.actions.push(_this);
	            scheduler.flush();
	            //
	            // Terminate this interval if the action didn't reschedule itself.
	            // Don't call `this.unsubscribe()` here, because the action could be
	            // rescheduled later. For example:
	            //
	            // ```
	            // scheduler.schedule(function doWork(counter) {
	            //   /* ... I'm a busy worker bee ... */
	            //   var originalAction = this;
	            //   /* wait 100ms before rescheduling this action again */
	            //   setTimeout(function () {
	            //     originalAction.schedule(counter + 1);
	            //   }, 100);
	            // }, 1000);
	            // ```
	            if (_this.pending === false && id != null) {
	                _this.id = null;
	                root_1.root.clearInterval(id);
	            }
	        }, delay);
	        return this;
	    };
	    FutureAction.prototype._unsubscribe = function () {
	        this.pending = false;
	        var _a = this, id = _a.id, scheduler = _a.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        if (id != null) {
	            this.id = null;
	            root_1.root.clearInterval(id);
	        }
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        this.work = null;
	        this.state = null;
	        this.scheduler = null;
	    };
	    return FutureAction;
	}(Subscription_1.Subscription));
	exports.FutureAction = FutureAction;
	//# sourceMappingURL=FutureAction.js.map

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var let_1 = __webpack_require__(317);
	Observable_1.Observable.prototype.let = let_1.letProto;
	Observable_1.Observable.prototype.letBind = let_1.letProto;
	//# sourceMappingURL=let.js.map

/***/ },

/***/ 317:
/***/ function(module, exports) {

	"use strict";
	/**
	 * @param func
	 * @return {Observable<R>}
	 * @method let
	 * @owner Observable
	 */
	function letProto(func) {
	    return func(this);
	}
	exports.letProto = letProto;
	//# sourceMappingURL=let.js.map

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var scan_1 = __webpack_require__(319);
	Observable_1.Observable.prototype.scan = scan_1.scan;
	//# sourceMappingURL=scan.js.map

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	/**
	 * Applies an accumulator function over the source Observable, and returns each
	 * intermediate result, with an optional seed value.
	 *
	 * <span class="informal">It's like {@link reduce}, but emits the current
	 * accumulation whenever the source emits a value.</span>
	 *
	 * <img src="./img/scan.png" width="100%">
	 *
	 * Combines together all values emitted on the source, using an accumulator
	 * function that knows how to join a new source value into the accumulation from
	 * the past. Is similar to {@link reduce}, but emits the intermediate
	 * accumulations.
	 *
	 * Returns an Observable that applies a specified `accumulator` function to each
	 * item emitted by the source Observable. If a `seed` value is specified, then
	 * that value will be used as the initial value for the accumulator. If no seed
	 * value is specified, the first item of the source is used as the seed.
	 *
	 * @example <caption>Count the number of click events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var ones = clicks.mapTo(1);
	 * var seed = 0;
	 * var count = ones.scan((acc, one) => acc + one, seed);
	 * count.subscribe(x => console.log(x));
	 *
	 * @see {@link expand}
	 * @see {@link mergeScan}
	 * @see {@link reduce}
	 *
	 * @param {function(acc: R, value: T, index: number): R} accumulator
	 * The accumulator function called on each source value.
	 * @param {T|R} [seed] The initial accumulation value.
	 * @return {Observable<R>} An observable of the accumulated values.
	 * @method scan
	 * @owner Observable
	 */
	function scan(accumulator, seed) {
	    return this.lift(new ScanOperator(accumulator, seed));
	}
	exports.scan = scan;
	var ScanOperator = (function () {
	    function ScanOperator(accumulator, seed) {
	        this.accumulator = accumulator;
	        this.seed = seed;
	    }
	    ScanOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
	    };
	    return ScanOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ScanSubscriber = (function (_super) {
	    __extends(ScanSubscriber, _super);
	    function ScanSubscriber(destination, accumulator, seed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.index = 0;
	        this.accumulatorSet = false;
	        this.seed = seed;
	        this.accumulatorSet = typeof seed !== 'undefined';
	    }
	    Object.defineProperty(ScanSubscriber.prototype, "seed", {
	        get: function () {
	            return this._seed;
	        },
	        set: function (value) {
	            this.accumulatorSet = true;
	            this._seed = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ScanSubscriber.prototype._next = function (value) {
	        if (!this.accumulatorSet) {
	            this.seed = value;
	            this.destination.next(value);
	        }
	        else {
	            return this._tryNext(value);
	        }
	    };
	    ScanSubscriber.prototype._tryNext = function (value) {
	        var index = this.index++;
	        var result;
	        try {
	            result = this.accumulator(this.seed, value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	        this.seed = result;
	        this.destination.next(result);
	    };
	    return ScanSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=scan.js.map

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var observeOn_1 = __webpack_require__(321);
	Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
	//# sourceMappingURL=observeOn.js.map

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	var Notification_1 = __webpack_require__(322);
	/**
	 * @see {@link Notification}
	 *
	 * @param scheduler
	 * @param delay
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	var ObserveOnOperator = (function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}());
	exports.ObserveOnOperator = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ObserveOnSubscriber = (function (_super) {
	    __extends(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification, destination = arg.destination;
	        notification.observe(destination);
	    };
	    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	    };
	    ObserveOnSubscriber.prototype._next = function (value) {
	        this.scheduleMessage(Notification_1.Notification.createNext(value));
	    };
	    ObserveOnSubscriber.prototype._error = function (err) {
	        this.scheduleMessage(Notification_1.Notification.createError(err));
	    };
	    ObserveOnSubscriber.prototype._complete = function () {
	        this.scheduleMessage(Notification_1.Notification.createComplete());
	    };
	    return ObserveOnSubscriber;
	}(Subscriber_1.Subscriber));
	exports.ObserveOnSubscriber = ObserveOnSubscriber;
	var ObserveOnMessage = (function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}());
	exports.ObserveOnMessage = ObserveOnMessage;
	//# sourceMappingURL=observeOn.js.map

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification = (function () {
	    function Notification(kind, value, exception) {
	        this.kind = kind;
	        this.value = value;
	        this.exception = exception;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.exception);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.exception);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        }
	        else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
	    Notification.prototype.toObservable = function () {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return Observable_1.Observable.of(this.value);
	            case 'E':
	                return Observable_1.Observable.throw(this.exception);
	            case 'C':
	                return Observable_1.Observable.empty();
	        }
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` exception.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}());
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(7);
	var dispatcher_1 = __webpack_require__(310);
	var store_1 = __webpack_require__(302);
	var store_backend_1 = __webpack_require__(311);
	var utils_1 = __webpack_require__(309);
	exports.PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/pre-middleware');
	exports.POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/post-middleware');
	exports.RESOLVED_PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-pre-middleware');
	exports.RESOLVED_POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-post-middleware');
	exports.REDUCER = new core_1.OpaqueToken('ngrx/store/reducer');
	exports.INITIAL_STATE = new core_1.OpaqueToken('ngrx/store/initial-state');
	var dispatcherProvider = core_1.provide(dispatcher_1.Dispatcher, {
	    useFactory: function () {
	        return new dispatcher_1.Dispatcher();
	    }
	});
	var storeProvider = core_1.provide(store_1.Store, {
	    deps: [dispatcher_1.Dispatcher, store_backend_1.StoreBackend, exports.INITIAL_STATE],
	    useFactory: function (dispatcher, backend, initialState) {
	        return new store_1.Store(dispatcher, backend, initialState);
	    }
	});
	var storeBackendProvider = core_1.provide(store_backend_1.StoreBackend, {
	    deps: [dispatcher_1.Dispatcher, exports.REDUCER, exports.INITIAL_STATE, exports.RESOLVED_PRE_MIDDLEWARE, exports.RESOLVED_POST_MIDDLEWARE],
	    useFactory: function (dispatcher, reducer, initialState, preMiddleware, postMiddleware) {
	        return new store_backend_1.StoreBackend(dispatcher, reducer, initialState, preMiddleware, postMiddleware);
	    }
	});
	var resolvedPreMiddlewareProvider = core_1.provide(exports.RESOLVED_PRE_MIDDLEWARE, {
	    deps: [exports.PRE_MIDDLEWARE],
	    useFactory: function (middleware) {
	        return utils_1.compose.apply(void 0, middleware);
	    }
	});
	var resolvedPostMiddlewareProvider = core_1.provide(exports.RESOLVED_POST_MIDDLEWARE, {
	    deps: [exports.POST_MIDDLEWARE],
	    useFactory: function (middleware) {
	        return utils_1.compose.apply(void 0, middleware);
	    }
	});
	function provideStore(reducer, initialState) {
	    return [
	        core_1.provide(exports.REDUCER, {
	            useFactory: function () {
	                if (typeof reducer === 'function') {
	                    return reducer;
	                }
	                return utils_1.combineReducers(reducer);
	            }
	        }),
	        core_1.provide(exports.INITIAL_STATE, {
	            deps: [exports.REDUCER],
	            useFactory: function (reducer) {
	                if (initialState === undefined) {
	                    return reducer(undefined, { type: store_backend_1.ActionTypes.INIT });
	                }
	                return initialState;
	            }
	        }),
	        core_1.provide(exports.PRE_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
	        core_1.provide(exports.POST_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
	        dispatcherProvider,
	        storeProvider,
	        storeBackendProvider,
	        resolvedPreMiddlewareProvider,
	        resolvedPostMiddlewareProvider
	    ];
	}
	exports.provideStore = provideStore;
	function usePreMiddleware() {
	    var middleware = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        middleware[_i - 0] = arguments[_i];
	    }
	    return provideMiddlewareForToken(exports.PRE_MIDDLEWARE, middleware);
	}
	exports.usePreMiddleware = usePreMiddleware;
	function usePostMiddleware() {
	    var middleware = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        middleware[_i - 0] = arguments[_i];
	    }
	    return provideMiddlewareForToken(exports.POST_MIDDLEWARE, middleware);
	}
	exports.usePostMiddleware = usePostMiddleware;
	function createMiddleware(useFactory, deps) {
	    return core_1.provide(new core_1.OpaqueToken('@ngrx/store middleware'), {
	        deps: deps,
	        useFactory: useFactory
	    });
	}
	exports.createMiddleware = createMiddleware;
	function provideMiddlewareForToken(token, _middleware) {
	    function isProvider(t) {
	        return t instanceof core_1.Provider;
	    }
	    var provider = core_1.provide(token, {
	        multi: true,
	        deps: [core_1.Injector],
	        useFactory: function (injector) {
	            var middleware = _middleware.map(function (m) {
	                if (isProvider(m)) {
	                    return injector.get(m.token);
	                }
	                return m;
	            });
	            return utils_1.compose.apply(void 0, middleware);
	        }
	    });
	    return _middleware.filter(isProvider).concat([provider]);
	}
	exports.provideMiddlewareForToken = provideMiddlewareForToken;


/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var quizlet_service_1 = __webpack_require__(325);
	var completion_component_1 = __webpack_require__(326);
	var core_1 = __webpack_require__(7);
	var store_1 = __webpack_require__(301);
	var navbar_component_1 = __webpack_require__(327);
	var definition_list_component_1 = __webpack_require__(332);
	var App = (function () {
	    function App(_store, quizletService) {
	        this._store = _store;
	        this.quizletService = quizletService;
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: "\n\t<div>\n\t\t<navbar-cmp></navbar-cmp>\n\t</div>\n\t<div *ngIf=\"quizletService.accessToken\" class=\"container-fluid\">\n\t\t\t<definition-list></definition-list>\n\t\t\t<completion-cmp></completion-cmp>\n\t</div>\n\t<div *ngIf=\"!quizletService.accessToken\" class=\"center\">\n\t\t<h1>Welcome to the Definder</h1>\n\t\t<h2>Please enter a valid auth Code</h2>\n\t</div>\n\t",
	            directives: [definition_list_component_1.DefinitionListComponent, navbar_component_1.NavbarComponent, completion_component_1.CompletionComponent],
	            styles: ["\n\t\t.center {\n\t\t    text-align: center;\n\t\t\t\tcolor: #BDBDBD;\n\t\t\t\tmargin-top: 200px;\n\t\t}\n\t\t"]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, quizlet_service_1.QuizletService])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var store_1 = __webpack_require__(301);
	var core_1 = __webpack_require__(7);
	var http_1 = __webpack_require__(280);
	var QuizletService = (function () {
	    function QuizletService(_http, _store) {
	        var _this = this;
	        this._http = _http;
	        this._store = _store;
	        this.baseURL = 'https://api.quizlet.com/oauth/token';
	        this.options = {
	            grant_type: 'authorization_code',
	            redirect_uri: 'http://www.example.com/definder/',
	            client_id: 'pQEAmQ33wN',
	            client_sectet: 'y2xrd9CVS3VYdHn9kTE6e2'
	        };
	        this.basicAuth = 'Basic cFFFQW1RMzN3Tjp5MnhyZDlDVlMzVllkSG45a1RFNmUy';
	        this._store.select('quizletterm').
	            subscribe(function (quizletterms) {
	            _this.quizletterms = quizletterms;
	        });
	    }
	    QuizletService.prototype.getAccessToken = function (authCode) {
	        var _this = this;
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/x-www-form-urlencoded');
	        headers.append('Authorization', this.basicAuth);
	        var responseStream = this._http.post(this.baseURL + '?grant_type=' + this.options.grant_type + '&code=' + authCode, '', { headers: headers })
	            .map(function (res) { return res.json(); });
	        responseStream.subscribe(function (result) {
	            _this.accessToken = result.access_token;
	        });
	        return responseStream;
	    };
	    QuizletService.prototype.createSet = function (title) {
	        var headers = new http_1.Headers();
	        headers.append('Authorization', 'Bearer ' + this.accessToken);
	        var termsAndDefinitions = this._getTermsAndDefinitions();
	        return this._http.post('https://api.quizlet.com/2.0/sets?' + 'whitespace=1&title=' + title +
	            termsAndDefinitions + '&lang_terms=de&lang_definitions=en', '', { headers: headers });
	    };
	    QuizletService.prototype._getTermsAndDefinitions = function () {
	        var _this = this;
	        var result = '';
	        this.quizletterms.forEach(function (term) {
	            result += '&terms[]=' + term.word;
	            result += _this._extractDefinitions(term.definitions).replace(',', '');
	        });
	        return result;
	    };
	    QuizletService.prototype._extractDefinitions = function (definitions) {
	        var result = '&definitions[]=';
	        definitions.forEach(function (definition) {
	            result += ',' + definition;
	        });
	        return result;
	    };
	    QuizletService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http, store_1.Store])
	    ], QuizletService);
	    return QuizletService;
	}());
	exports.QuizletService = QuizletService;


/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(7);
	var common_1 = __webpack_require__(181);
	var quizlet_service_1 = __webpack_require__(325);
	var CompletionComponent = (function () {
	    function CompletionComponent(_fb, _quizletService) {
	        this._fb = _fb;
	        this._quizletService = _quizletService;
	        this.showSuccessMessage = false;
	        this.showFailureMessage = false;
	        this.errorMessage = '';
	        this.setName = _fb.control('', common_1.Validators.required);
	        this.completionForm = this._fb.group({
	            setName: this.setName
	        });
	    }
	    CompletionComponent.prototype.createSet = function () {
	        var _this = this;
	        this._quizletService.createSet(this.setName.value)
	            .subscribe(function (response) {
	            if (201 === response.status) {
	                _this._toggleSuccessMessage();
	            }
	        }, function (err) {
	            var jsonBody = JSON.parse(err._body);
	            _this._toggleFailureMessage(jsonBody.error_description);
	        });
	    };
	    CompletionComponent.prototype._toggleSuccessMessage = function () {
	        var _this = this;
	        this.showSuccessMessage = true;
	        setTimeout(function () {
	            _this.showSuccessMessage = false;
	        }, 2000);
	    };
	    CompletionComponent.prototype._toggleFailureMessage = function (errormessage) {
	        var _this = this;
	        this.errorMessage += errormessage;
	        this.showFailureMessage = true;
	        setTimeout(function () {
	            _this.showFailureMessage = false;
	            _this.errorMessage = '';
	        }, 2000);
	    };
	    CompletionComponent = __decorate([
	        core_1.Component({
	            selector: 'completion-cmp',
	            template: "\n    <form [ngFormModel]=\"completionForm\" (submit)=\"createSet()\">\n      <input class=\"form-control\" ngControl=\"setName\" placeHolder=\"Name your set\">\n      <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!completionForm.valid\">\n        <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\n        Create Set on Quizlet\n      </button>\n      <div *ngIf=\"setName.dirty && setName.hasError('required')\">\n        A auth Code is required\n      </div>\n      <div *ngIf=\"showSuccessMessage\" class=\"alert alert-success\" role=\"alert\">\n        New Set \"{{setName.value}}\" successfully added to Quizlet\n      </div>\n      <div *ngIf=\"showFailureMessage\" class=\"alert alert-danger\" role=\"alert\">\n        Ouupsi!! An error occured. {{errorMessage}}\n      </div>\n    </form>\n  ",
	            providers: [common_1.FormBuilder],
	            styles: ["\n    input{\n      width: 300px;\n      display: inline;\n    }\n    div{\n      color: red;\n    }\n    .alert{\n      width: 475px;\n      margin-top: 20px;\n    }\n    "]
	        }), 
	        __metadata('design:paramtypes', [common_1.FormBuilder, quizlet_service_1.QuizletService])
	    ], CompletionComponent);
	    return CompletionComponent;
	}());
	exports.CompletionComponent = CompletionComponent;


/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var quizlet_service_1 = __webpack_require__(325);
	var welcome_user_component_1 = __webpack_require__(328);
	var authcode_input_component_1 = __webpack_require__(330);
	var core_1 = __webpack_require__(7);
	var NavbarComponent = (function () {
	    function NavbarComponent(quizletService) {
	        this.quizletService = quizletService;
	        this.image = './build/' + __webpack_require__(331);
	    }
	    NavbarComponent = __decorate([
	        core_1.Component({
	            selector: 'navbar-cmp',
	            template: "\n    <nav class=\"navbar navbar-inverse\">\n      <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n        <div class=\"textContainer\">\n          <div class=\"smallHeadline\">Powered by Quizlet</div>\n          <div class=\"largeHeadLine\">Definder</div>\n        </div>\n        <img alt=\"Brand\" [src]=\"image\"/>\n        </div>\n        <div class=\"authAndWelcome\">\n          <auth-input *ngIf=\"!quizletService.accessToken\" class=\"pull-right\"></auth-input>\n          <welcome-user *ngIf=\"quizletService.accessToken\" class=\"pull-right\"></welcome-user>\n        </div>\n      </div>\n    </nav>\n  ",
	            directives: [authcode_input_component_1.AuthInputComponent, welcome_user_component_1.WelcomeUserComponent],
	            styles: ["\n    img{\n      max-width: 100px;\n      max-height: 100px;\n      margin-left: 20px;\n    }\n    .largeHeadLine{\n      font-family: times, Times New Roman, times-roman, georgia, serif;\n\t    color: white;\n\t    margin: 0;\n\t    padding: 0px 0px 6px 0px;\n      font-size: 51px;\n\t    line-height: 44px;\n\t    letter-spacing: -2px;\n\t    font-weight: bold;\n    }\n    .smallHeadline{\n      font-family: Gill Sans, Verdana;\n\t    font-size: 11px;\n\t    line-height: 14px;\n\t    text-transform: uppercase;\n\t    letter-spacing: 2px;\n\t    font-weight: bold;\n      color: white;\n    }\n    .textContainer{\n      margin-top: 20px;\n      display: inline-block;\n    }\n    .authAndWelcome{\n      margin-top: 10px;\n    }\n    "]
	        }), 
	        __metadata('design:paramtypes', [quizlet_service_1.QuizletService])
	    ], NavbarComponent);
	    return NavbarComponent;
	}());
	exports.NavbarComponent = NavbarComponent;


/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(7);
	var WelcomeUserComponent = (function () {
	    function WelcomeUserComponent() {
	        this.image = './build/' + __webpack_require__(329);
	    }
	    WelcomeUserComponent = __decorate([
	        core_1.Component({
	            selector: 'welcome-user',
	            template: "\n    <h2>Welcome</h2>\n    <img [src]=\"image\"/>\n  ",
	            styles: [
	                "\n    h2{\n      display: inline;\n      font-family: \"Times New Roman\", Times, serif;\n      margin-top: 2cm;\n      font-size : 14pt;\n      line-height : 100%;\n      margin : 10px;\n      color : #909090;\n    }\n    "
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], WelcomeUserComponent);
	    return WelcomeUserComponent;
	}());
	exports.WelcomeUserComponent = WelcomeUserComponent;


/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bce54f228dea44d2da72e49593d1c717.png";

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var quizlet_service_1 = __webpack_require__(325);
	var core_1 = __webpack_require__(7);
	var common_1 = __webpack_require__(181);
	var AuthInputComponent = (function () {
	    function AuthInputComponent(_fb, _quizletService) {
	        this._fb = _fb;
	        this._quizletService = _quizletService;
	        this.showFailureMessage = false;
	        this.authCode = _fb.control('', common_1.Validators.required);
	        this.authForm = _fb.group({
	            authCode: this.authCode
	        });
	    }
	    AuthInputComponent.prototype.getAccessToken = function () {
	        var _this = this;
	        this._quizletService.getAccessToken(this.authCode.value).
	            subscribe(function (res) { }, function (error) {
	            _this.showFailureMessage = true;
	            setTimeout(function () {
	                _this.showFailureMessage = false;
	            }, 2000);
	        });
	    };
	    AuthInputComponent = __decorate([
	        core_1.Component({
	            selector: 'auth-input',
	            template: "\n    <form [ngFormModel]=\"authForm\">\n      <input type=\"text\" class=\"form-control\" ngControl=\"authCode\" placeHolder=\"Please paste your Auth Code here\"/>\n      <button class=\"btn btn-primary\" (click)=\"getAccessToken()\">Login</button>\n    </form>\n    <div class=\"errorMessage\" *ngIf=\"authCode.dirty && authCode.hasError('required')\">\n      A auth Code is required\n    </div>\n    <div *ngIf=\"showFailureMessage\" class=\"alert alert-danger\" role=\"alert\">\n      Please enter a valid token\n    </div>\n  ",
	            providers: [common_1.FormBuilder],
	            styles: ["\n    input{\n      width: 300px;\n      display: inline;\n    }\n    form{\n      margin-top: 27px;\n    }\n    .alert{\n      margin-top: 10px;\n    }\n    .errorMessage{\n      color: red;\n    }\n    "]
	        }), 
	        __metadata('design:paramtypes', [common_1.FormBuilder, quizlet_service_1.QuizletService])
	    ], AuthInputComponent);
	    return AuthInputComponent;
	}());
	exports.AuthInputComponent = AuthInputComponent;


/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "17e01beb42d5dc58a08860f1841c37fe.png";

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(7);
	var definition_row_component_1 = __webpack_require__(333);
	var DefinitionListComponent = (function () {
	    function DefinitionListComponent() {
	        this.definitons = [];
	    }
	    DefinitionListComponent.prototype.ngOnInit = function () {
	        this.definitons.length = 1;
	    };
	    DefinitionListComponent.prototype.incrementDefinitionsLength = function () {
	        this.definitons.length++;
	    };
	    DefinitionListComponent = __decorate([
	        core_1.Component({
	            selector: 'definition-list',
	            template: "\n    <div class=\"row\" *ngFor=\"#defintion of definitons\">\n      <definition-row (onTabKey)=\"incrementDefinitionsLength()\"></definition-row>\n    </div>\n  ",
	            directives: [definition_row_component_1.DefinitionRowComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DefinitionListComponent);
	    return DefinitionListComponent;
	}());
	exports.DefinitionListComponent = DefinitionListComponent;


/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var store_1 = __webpack_require__(301);
	var core_1 = __webpack_require__(7);
	__webpack_require__(305);
	var store_actions_1 = __webpack_require__(334);
	var definition_panel_component_1 = __webpack_require__(335);
	var dictionary_service_1 = __webpack_require__(336);
	var DefinitionRowComponent = (function () {
	    function DefinitionRowComponent(_dictionaryService, _renderer, _store) {
	        this._dictionaryService = _dictionaryService;
	        this._renderer = _renderer;
	        this._store = _store;
	        this.TAB_KEYCODE = 9;
	        this.onTabKey = new core_1.EventEmitter();
	    }
	    DefinitionRowComponent.prototype.ngAfterViewInit = function () {
	        this.inputField.nativeElement.focus();
	        //this._renderer.invokeElementMethod(this.inputField.nativeElement, 'focus');
	    };
	    DefinitionRowComponent.prototype.proccesKeyStroke = function (event) {
	        var _this = this;
	        if (this._isTabKey(event.keyCode)) {
	            this.onTabKey.emit(true);
	            this.definitions = this._getDefinition(this.inputField.nativeElement.value);
	            this.definitions.subscribe(function (res) {
	                var definitions = res.map(function (response) { return response.senses; })
	                    .map(function (senses) { return senses[0].definition; });
	                var payload = {
	                    word: _this.inputField.nativeElement.value,
	                    definitions: definitions
	                };
	                _this._store.dispatch({ type: store_actions_1.StoreActions.ADD_QUIZLETTERM.toString(), payload: payload });
	                //TODO kk: Add to the store
	            });
	        }
	    };
	    DefinitionRowComponent.prototype._getDefinition = function (word) {
	        return this._dictionaryService.getWordDefinition(word);
	    };
	    DefinitionRowComponent.prototype._isTabKey = function (keyCode) {
	        return keyCode === this.TAB_KEYCODE;
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], DefinitionRowComponent.prototype, "onTabKey", void 0);
	    __decorate([
	        core_1.ViewChild('inputField'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], DefinitionRowComponent.prototype, "inputField", void 0);
	    DefinitionRowComponent = __decorate([
	        core_1.Component({
	            selector: 'definition-row',
	            template: "\n      <div class=\"col-lg-4\">\n        <input #inputField class=\"form-control\" type=\"text\" (keydown)=\"proccesKeyStroke($event)\"/>\n      </div>\n      <div class=\"col-lg-8\">\n        <definition-panel [title]=\"inputField.value\" [definitions]=\"definitions | async\"></definition-panel>\n      </div>\n  ",
	            directives: [definition_panel_component_1.DefinitionPanelComponent],
	            providers: [dictionary_service_1.DictionaryService]
	        }), 
	        __metadata('design:paramtypes', [dictionary_service_1.DictionaryService, core_1.Renderer, store_1.Store])
	    ], DefinitionRowComponent);
	    return DefinitionRowComponent;
	}());
	exports.DefinitionRowComponent = DefinitionRowComponent;


/***/ },

/***/ 334:
/***/ function(module, exports) {

	"use strict";
	(function (StoreActions) {
	    StoreActions[StoreActions["ADD_QUIZLETTERM"] = 0] = "ADD_QUIZLETTERM";
	})(exports.StoreActions || (exports.StoreActions = {}));
	var StoreActions = exports.StoreActions;


/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(7);
	var DefinitionPanelComponent = (function () {
	    function DefinitionPanelComponent() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], DefinitionPanelComponent.prototype, "definitions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], DefinitionPanelComponent.prototype, "title", void 0);
	    DefinitionPanelComponent = __decorate([
	        core_1.Component({
	            selector: 'definition-panel',
	            template: "\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\" *ngIf=\"title\">Search Results for {{ title }}</h3>\n    </div>\n    <div class=\"panel-body\">\n      <ul>\n        <li *ngFor=\"#definition of definitions\">\n          <b>{{definition.headword}}</b>\n          {{definition.senses[0].definition}}\n        </li>\n      </ul>\n    </div>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DefinitionPanelComponent);
	    return DefinitionPanelComponent;
	}());
	exports.DefinitionPanelComponent = DefinitionPanelComponent;


/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(7);
	var http_1 = __webpack_require__(280);
	var DictionaryService = (function () {
	    function DictionaryService(_http) {
	        this._http = _http;
	    }
	    DictionaryService.prototype.getWordDefinition = function (word) {
	        return this._http.get("http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=" + word)
	            .map(function (response) { return response.json().results; });
	    };
	    DictionaryService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], DictionaryService);
	    return DictionaryService;
	}());
	exports.DictionaryService = DictionaryService;


/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var store_actions_1 = __webpack_require__(334);
	exports.quizletterm = function (state, _a) {
	    if (state === void 0) { state = []; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case store_actions_1.StoreActions.ADD_QUIZLETTERM.toString():
	            return state.concat([payload]);
	        default:
	            return state;
	    }
	};


/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(339);
	__webpack_require__(388);
	__webpack_require__(389);
	__webpack_require__(390);
	__webpack_require__(391);
	__webpack_require__(393);
	__webpack_require__(396);
	__webpack_require__(397);
	__webpack_require__(398);
	__webpack_require__(399);
	__webpack_require__(400);
	__webpack_require__(401);
	__webpack_require__(402);
	__webpack_require__(403);
	__webpack_require__(404);
	__webpack_require__(406);
	__webpack_require__(408);
	__webpack_require__(410);
	__webpack_require__(412);
	__webpack_require__(415);
	__webpack_require__(416);
	__webpack_require__(417);
	__webpack_require__(421);
	__webpack_require__(423);
	__webpack_require__(425);
	__webpack_require__(429);
	__webpack_require__(430);
	__webpack_require__(431);
	__webpack_require__(432);
	__webpack_require__(434);
	__webpack_require__(435);
	__webpack_require__(436);
	__webpack_require__(437);
	__webpack_require__(438);
	__webpack_require__(439);
	__webpack_require__(440);
	__webpack_require__(442);
	__webpack_require__(443);
	__webpack_require__(444);
	__webpack_require__(446);
	__webpack_require__(447);
	__webpack_require__(448);
	__webpack_require__(450);
	__webpack_require__(451);
	__webpack_require__(452);
	__webpack_require__(453);
	__webpack_require__(454);
	__webpack_require__(455);
	__webpack_require__(456);
	__webpack_require__(457);
	__webpack_require__(458);
	__webpack_require__(459);
	__webpack_require__(460);
	__webpack_require__(461);
	__webpack_require__(462);
	__webpack_require__(463);
	__webpack_require__(468);
	__webpack_require__(469);
	__webpack_require__(473);
	__webpack_require__(474);
	__webpack_require__(475);
	__webpack_require__(476);
	__webpack_require__(478);
	__webpack_require__(479);
	__webpack_require__(480);
	__webpack_require__(481);
	__webpack_require__(482);
	__webpack_require__(483);
	__webpack_require__(484);
	__webpack_require__(485);
	__webpack_require__(486);
	__webpack_require__(487);
	__webpack_require__(488);
	__webpack_require__(489);
	__webpack_require__(490);
	__webpack_require__(491);
	__webpack_require__(492);
	__webpack_require__(493);
	__webpack_require__(494);
	__webpack_require__(496);
	__webpack_require__(497);
	__webpack_require__(503);
	__webpack_require__(504);
	__webpack_require__(506);
	__webpack_require__(507);
	__webpack_require__(508);
	__webpack_require__(512);
	__webpack_require__(513);
	__webpack_require__(514);
	__webpack_require__(515);
	__webpack_require__(516);
	__webpack_require__(518);
	__webpack_require__(519);
	__webpack_require__(520);
	__webpack_require__(521);
	__webpack_require__(524);
	__webpack_require__(526);
	__webpack_require__(527);
	__webpack_require__(528);
	__webpack_require__(530);
	__webpack_require__(532);
	__webpack_require__(534);
	__webpack_require__(535);
	__webpack_require__(536);
	__webpack_require__(538);
	__webpack_require__(539);
	__webpack_require__(540);
	__webpack_require__(541);
	__webpack_require__(547);
	__webpack_require__(550);
	__webpack_require__(551);
	__webpack_require__(553);
	__webpack_require__(554);
	__webpack_require__(557);
	__webpack_require__(558);
	__webpack_require__(561);
	__webpack_require__(562);
	__webpack_require__(563);
	__webpack_require__(564);
	__webpack_require__(565);
	__webpack_require__(566);
	__webpack_require__(567);
	__webpack_require__(568);
	__webpack_require__(569);
	__webpack_require__(570);
	__webpack_require__(571);
	__webpack_require__(572);
	__webpack_require__(573);
	__webpack_require__(574);
	__webpack_require__(575);
	__webpack_require__(576);
	__webpack_require__(577);
	__webpack_require__(578);
	__webpack_require__(579);
	__webpack_require__(581);
	__webpack_require__(582);
	__webpack_require__(583);
	module.exports = __webpack_require__(345);

/***/ },

/***/ 584:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(585);
	__webpack_require__(587);
	__webpack_require__(588);
	__webpack_require__(589);
	__webpack_require__(591);
	__webpack_require__(592);
	__webpack_require__(593);
	__webpack_require__(594);
	__webpack_require__(595);
	module.exports = __webpack_require__(345).Reflect;


/***/ },

/***/ 596:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(41);
	var mergeMap_1 = __webpack_require__(597);
	Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
	Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
	//# sourceMappingURL=mergeMap.js.map

/***/ },

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var subscribeToResult_1 = __webpack_require__(598);
	var OuterSubscriber_1 = __webpack_require__(602);
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link mergeAll}.</span>
	 *
	 * <img src="./img/mergeMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an Observable, and then merging those resulting Observables and
	 * emitting the results of this merger.
	 *
	 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
	 * var letters = Rx.Observable.of('a', 'b', 'c');
	 * var result = letters.mergeMap(x =>
	 *   Rx.Observable.interval(1000).map(i => x+i)
	 * );
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link merge}
	 * @see {@link mergeAll}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and merging the results of the Observables obtained
	 * from this transformation.
	 * @method mergeMap
	 * @owner Observable
	 */
	function mergeMap(project, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	        resultSelector = null;
	    }
	    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
	}
	exports.mergeMap = mergeMap;
	var MergeMapOperator = (function () {
	    function MergeMapOperator(project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
	    };
	    return MergeMapOperator;
	}());
	exports.MergeMapOperator = MergeMapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeMapSubscriber = (function (_super) {
	    __extends(MergeMapSubscriber, _super);
	    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	        this.index = 0;
	    }
	    MergeMapSubscriber.prototype._next = function (value) {
	        if (this.active < this.concurrent) {
	            this._tryNext(value);
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    MergeMapSubscriber.prototype._tryNext = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.active++;
	        this._innerSub(result, value, index);
	    };
	    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
	        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
	    };
	    MergeMapSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.MergeMapSubscriber = MergeMapSubscriber;
	//# sourceMappingURL=mergeMap.js.map

/***/ },

/***/ 598:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(42);
	var isArray_1 = __webpack_require__(48);
	var isPromise_1 = __webpack_require__(599);
	var Observable_1 = __webpack_require__(41);
	var iterator_1 = __webpack_require__(600);
	var InnerSubscriber_1 = __webpack_require__(601);
	var $$observable = __webpack_require__(55);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.isUnsubscribed) {
	        return;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.isUnsubscribed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        for (var _i = 0, _a = result; _i < _a.length; _i++) {
	            var item = _a[_i];
	            destination.next(item);
	            if (destination.isUnsubscribed) {
	                break;
	            }
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    }
	    else if (typeof result[$$observable] === 'function') {
	        var obs = result[$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error('invalid observable');
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },

/***/ 599:
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },

/***/ 600:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(42);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.iterator) {
	        exports.$$iterator = Symbol.iterator;
	    }
	    else if (typeof Symbol.for === 'function') {
	        exports.$$iterator = Symbol.for('iterator');
	    }
	}
	else {
	    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
	        // Bug for mozilla version
	        exports.$$iterator = '@@iterator';
	    }
	    else if (root_1.root.Map) {
	        // es6-shim specific logic
	        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
	                exports.$$iterator = key;
	                break;
	            }
	        }
	    }
	    else {
	        exports.$$iterator = '@@iterator';
	    }
	}
	//# sourceMappingURL=iterator.js.map

/***/ },

/***/ 601:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },

/***/ 602:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(45);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ }

});
//# sourceMappingURL=app.map