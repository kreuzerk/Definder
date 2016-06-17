webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(280);
	var app_1 = __webpack_require__(301);
	// enableProdMode() // include for production builds
	//export function main() {
	//return
	platform_browser_dynamic_1.bootstrap(app_1.App, [
	    http_1.HTTP_PROVIDERS,
	]);
	//}
	//document.addEventListener('DOMContentLoaded', main);


/***/ },

/***/ 301:
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
	var backend_display_component_1 = __webpack_require__(302);
	var core_1 = __webpack_require__(7);
	var App = (function () {
	    function App() {
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: "\n\t<div class=\"jumbotron\">\n\t\t<h1>Electron Angular2 starter</h1>\n\t</div>\n\t<div>\n\t\t<backend-display></backend-display>\n\t</div>\n\t",
	            directives: [backend_display_component_1.BackendDisplayComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 302:
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
	var dictionary_service_1 = __webpack_require__(303);
	var BackendDisplayComponent = (function () {
	    function BackendDisplayComponent(_dictionaryService) {
	        this._dictionaryService = _dictionaryService;
	        this.wordDefinition = this._dictionaryService.getDataFromServer();
	    }
	    BackendDisplayComponent = __decorate([
	        core_1.Component({
	            selector: 'backend-display',
	            template: "\n    <h2>Preview BackendCall</h2>\n    <pre>\n      {{ wordDefinition }}\n    </pre>\n  ",
	            providers: [dictionary_service_1.DictionaryService]
	        }), 
	        __metadata('design:paramtypes', [dictionary_service_1.DictionaryService])
	    ], BackendDisplayComponent);
	    return BackendDisplayComponent;
	}());
	exports.BackendDisplayComponent = BackendDisplayComponent;


/***/ },

/***/ 303:
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
	    function DictionaryService(http) {
	        this.http = http;
	    }
	    DictionaryService.prototype.getDataFromServer = function () {
	        return this.http.get('http://worldcup.sfg.io/teams/results');
	    };
	    DictionaryService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], DictionaryService);
	    return DictionaryService;
	}());
	exports.DictionaryService = DictionaryService;


/***/ }

});
//# sourceMappingURL=app.map