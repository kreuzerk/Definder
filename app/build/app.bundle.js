webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var browser_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(234);
	// include for development builds
	var common_dom_1 = __webpack_require__(164);
	// include for production builds
	// import {enableProdMode} from 'angular2/core';
	var app_1 = __webpack_require__(249);
	// enableProdMode() // include for production builds
	function main() {
	    return browser_1.bootstrap(app_1.App, [
	        http_1.HTTP_PROVIDERS,
	        common_dom_1.ELEMENT_PROBE_PROVIDERS // remove in production
	    ])
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	document.addEventListener('DOMContentLoaded', main);


/***/ },

/***/ 249:
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
	var core_1 = __webpack_require__(25);
	var definition_list_component_1 = __webpack_require__(250);
	var App = (function () {
	    function App() {
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: "\n\t<div class=\"jumbotron\">\n\t\t<h1>Definder</h1>\n\t</div>\n\t<div class=\"container-fluid\">\n\t\t<definition-list></definition-list>\n\t</div>\n\t",
	            directives: [definition_list_component_1.DefinitionListComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 250:
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
	var core_1 = __webpack_require__(25);
	var definition_row_component_1 = __webpack_require__(251);
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

/***/ 251:
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
	var core_1 = __webpack_require__(25);
	var definition_panel_component_1 = __webpack_require__(252);
	var dictionary_service_1 = __webpack_require__(253);
	__webpack_require__(254);
	var DefinitionRowComponent = (function () {
	    function DefinitionRowComponent(_dictionaryService, _renderer) {
	        this._dictionaryService = _dictionaryService;
	        this._renderer = _renderer;
	        this.TAB_KEYCODE = 9;
	        this.onTabKey = new core_1.EventEmitter();
	    }
	    DefinitionRowComponent.prototype.ngAfterViewInit = function () {
	        this.inputField.nativeElement.focus();
	        //this._renderer.invokeElementMethod(this.inputField.nativeElement, 'focus');
	        console.log("hier");
	    };
	    DefinitionRowComponent.prototype.proccesKeyStroke = function (event) {
	        if (this._isTabKey(event.keyCode)) {
	            this.onTabKey.emit(true);
	            this.definitions = this._getDefinition(this.inputField.nativeElement.value);
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
	        __metadata('design:paramtypes', [dictionary_service_1.DictionaryService, core_1.Renderer])
	    ], DefinitionRowComponent);
	    return DefinitionRowComponent;
	}());
	exports.DefinitionRowComponent = DefinitionRowComponent;


/***/ },

/***/ 252:
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
	var core_1 = __webpack_require__(25);
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

/***/ 253:
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
	var core_1 = __webpack_require__(25);
	var http_1 = __webpack_require__(234);
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

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(45);
	var map_1 = __webpack_require__(255);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(50);
	/**
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the returned observable
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * @param {Function} project the function to create projection
	 * @param {any} [thisArg] an optional argument to define what `this` is in the project function
	 * @returns {Observable} a observable of projected values
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
	    MapOperator.prototype.call = function (subscriber) {
	        return new MapSubscriber(subscriber, this.project, this.thisArg);
	    };
	    return MapOperator;
	}());
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

/***/ }

});
//# sourceMappingURL=app.map