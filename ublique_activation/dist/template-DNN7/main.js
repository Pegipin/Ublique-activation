(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/Http/interceptor.ts":
/*!*********************************!*\
  !*** ./src/Http/interceptor.ts ***!
  \*********************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Interceptor = /** @class */ (function () {
    function Interceptor(context) {
        this.context = context;
        context.autoConfigure();
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.context.all$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(10)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeMap"])(function (ctx) {
            console.log('TCL: Interceptor -> ctx.antiForgeryToken -------------->', ctx.antiForgeryToken);
            var newReq = req.clone({
                setHeaders: {
                    ModuleId: _this.context._moduleId.toString(),
                    TabId: ctx.tabId.toString(),
                    RequestVerificationToken: ctx.antiForgeryToken,
                    userid: _this.context._userId,
                    locale: _this.context._locale,
                    portalid: _this.context._portalId,
                    'X-Debugging-Hint': 'bootstrapped by bbAngular, 2SXC, OPSI',
                }
            });
            return next.handle(newReq);
        }));
    };
    Interceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__["Context"]])
    ], Interceptor);
    return Interceptor;
}());



/***/ }),

/***/ "./src/Service/DNN/context.service.ts":
/*!********************************************!*\
  !*** ./src/Service/DNN/context.service.ts ***!
  \********************************************/
/*! exports provided: Context */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
/* harmony import */ var _dev_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dev-context */ "./src/Service/DNN/dev-context.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var Context = /** @class */ (function () {
    function Context(devSettings) {
        this.devSettings = devSettings;
        // todo: probably should set the replay-buffer to 1 for all the following, but must test!
        // private cbIdSubject = new ReplaySubject<number>(1);
        this.tidSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.afTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this._properties = {};
        this._moduleId = "";
        this._userId = "";
        this._portalId = "";
        this._locale = "";
        this.tabId$ = this.tidSubject.asObservable();
        this.antiForgeryToken$ = this.afTokenSubject.asObservable();
        this.all$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.tabId$, // wait for tabId
        this.antiForgeryToken$) // wait for security token
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return ({
            tabId: res[0],
            antiForgeryToken: res[1]
        }); }));
        var MODULE = 'Ublique_Activation';
        // Dev settings with minimal ignore settings.
        this.devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);
        if (window && window[MODULE]) {
            this._properties = window[MODULE];
            console.log('​-----------------------------------------------------------------------');
            console.log('​DnnContextService -> constructor -> this._properties', this._properties);
            console.log('​-----------------------------------------------------------------------');
        }
        else {
            console.log('----------------------');
            console.log('ERROR: Missing window[MODULE] for DNN');
            console.log('----------------------');
        }
    }
    Context.prototype.autoConfigure = function () {
        var _this = this;
        this._moduleId = this._properties.ModuleId;
        this._userId = this._properties.UserId;
        this._portalId = this._properties.PortalId;
        this._locale = this._properties.locale;
        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
            // Run timer till sf is ready, but max for a second.
            var t_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(0, 100)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(10))
                .subscribe(function (x) {
                // This must be accessed after a delay, as the SF is not ready yet.
                var sf = window.$.ServicesFramework();
                console.log('TCL: ----------------------------');
                console.log('TCL: autoConfigure -> sf', sf);
                console.log('TCL: ----------------------------');
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                    t_1.unsubscribe();
                    _this.tidSubject.next(sf.getTabId());
                    _this.afTokenSubject.next(sf.getAntiForgeryValue());
                }
                else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                }
            });
            return;
        }
        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error("\n                DNN Services Framework is missing, and it's not allowed according to devSettings.\n                Either set devSettings to ignore this, or ensure it's there");
        }
        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    };
    Context = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        __metadata("design:paramtypes", [_dev_context__WEBPACK_IMPORTED_MODULE_0__["DevContext"]])
    ], Context);
    return Context;
}());



/***/ }),

/***/ "./src/Service/DNN/dev-context.ts":
/*!****************************************!*\
  !*** ./src/Service/DNN/dev-context.ts ***!
  \****************************************/
/*! exports provided: DevContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevContext", function() { return DevContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DevContext = /** @class */ (function () {
    function DevContext() {
        this.ignoreMissing$2sxc = false;
        this.ignoreMissingServicesFramework = false;
        this.forceUse = false;
        this.moduleId = 0;
        this.tabId = 0;
        this.path = '/';
    }
    DevContext = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], DevContext);
    return DevContext;
}());



/***/ }),

/***/ "./src/Service/demo.service.ts":
/*!*************************************!*\
  !*** ./src/Service/demo.service.ts ***!
  \*************************************/
/*! exports provided: DemoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoService", function() { return DemoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DemoService = /** @class */ (function () {
    function DemoService(context, http) {
        this.context = context;
        this.http = http;
        //this._routingWebAPI = "/DesktopModules/Angular6Demo/API/"
        this._routingWebAPI = this.context._properties.routingWebAPI;
    }
    DemoService.prototype.getStagingOutputList = function () {
        var webAPIName = "item/HelloWorld";
        var getUrl = this._routingWebAPI + webAPIName;
        console.log('​---------------------------------');
        console.log('​StagingService -> getUrl', getUrl);
        console.log('​---------------------------------');
        return this.http.get(getUrl);
    };
    DemoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DemoService);
    return DemoService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<!-- <div style=\"text-align:center\">\r\n  <h1>\r\n    Welcome to {{ title }}!\r\n  </h1>\r\n  <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\r\n</div>\r\n\r\n<div>\r\n  context._moduleId: {{ context._moduleId }}<br/>\r\n  context._properties.routingWebAPI: {{ context._properties.routingWebAPI }}<br/>\r\n  context._properties.IsEditable: {{ context._properties.IsEditable }}<br/>\r\n  context._properties.EditMode: {{ context._properties.EditMode }}<br/>\r\n  context._properties.ModuleId: {{ context._properties.ModuleId }}<br/>\r\n  context._properties.PortalId: {{ context._properties.PortalId }}<br/>\r\n  context._properties.UserId: {{ context._properties.UserId }}<br/>\r\n  context._properties.CurrentLanguage: {{ context._properties.CurrentLanguage }}<br/>\r\n  context._properties.TabId: {{ context._properties.TabId }}<br/>\r\n  context._properties.PortalLanguages: {{ context._properties.PortalLanguages }}<br/>\r\n  context._properties.CurrentLanguage: {{ context._properties.CurrentLanguage }}<br/>\r\n  context._properties.Resources: {{ log(context._properties.Resources) }}<br/>\r\n  context._properties.Resources[0]: {{context._properties.Resources.AddItem_Text}}<br/>\r\n  antiForgeryToken: (see console log)<br/>\r\n  <div>\r\n    <button type=\"button\" (click)=\"getDataFromWebAPI()\">call DNN webapi</button>\r\n    webapi return: {{webapiResult}}\r\n  </div>\r\n</div> -->\r\n\r\n\r\n<div class=\"row content no-gutters\">\r\n  <div class=\"col-sm-12\">\r\n    <app-list-centri-automezzi-prodotto></app-list-centri-automezzi-prodotto>  \r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(context, _demoService) {
        this.context = context;
        this._demoService = _demoService;
        this.title = 'template Angular for DNN7-DNN8-DNN9';
        this.webapiResult = '';
        context.autoConfigure();
    }
    AppComponent.prototype.getDataFromWebAPI = function () {
        var _this = this;
        this._demoService.getStagingOutputList().subscribe(function (data) {
            _this.webapiResult = data;
            console.log('​---------------------------------');
            console.log('Call webapi data -> data: ', data);
            console.log('​---------------------------------');
        }, function (err) {
            if (err.error instanceof Error) {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
            else {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
        });
    };
    AppComponent.prototype.log = function (par) {
        return JSON.stringify(par).toString();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__["DemoService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _Http_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Http/interceptor */ "./src/Http/interceptor.ts");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_list_centri_automezzi_prodotto_list_centri_automezzi_prodotto_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component */ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.ts");
/* harmony import */ var _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/angular-material-module */ "./src/app/modules/angular-material-module.ts");
/* harmony import */ var _dialogs_add_edit_centri_automezzi_prodotto_dialog_add_edit_centri_automezzi_prodotto_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component */ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.ts");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-mat-select-search */ "./node_modules/ngx-mat-select-search/fesm5/ngx-mat-select-search.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            entryComponents: [
                _dialogs_add_edit_centri_automezzi_prodotto_dialog_add_edit_centri_automezzi_prodotto_dialog_component__WEBPACK_IMPORTED_MODULE_11__["AddEditCentriAutomezziProdottoDialogComponent"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _components_list_centri_automezzi_prodotto_list_centri_automezzi_prodotto_component__WEBPACK_IMPORTED_MODULE_9__["ListCentriAutomezziProdottoComponent"],
                _dialogs_add_edit_centri_automezzi_prodotto_dialog_add_edit_centri_automezzi_prodotto_dialog_component__WEBPACK_IMPORTED_MODULE_11__["AddEditCentriAutomezziProdottoDialogComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_10__["AngularMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_12__["MatPaginatorModule"],
                ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_13__["NgxMatSelectSearchModule"]
            ],
            providers: [
                _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_7__["Context"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"],
                    useClass: _Http_interceptor__WEBPACK_IMPORTED_MODULE_5__["Interceptor"],
                    multi: true
                },
                _Service_demo_service__WEBPACK_IMPORTED_MODULE_6__["DemoService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.css":
/*!********************************************************************************************************!*\
  !*** ./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".SynHeader {\r\n    position: relative;\r\n    padding-bottom: 2%;\r\n}\r\n\r\n.SynPage {\r\n    position: relative;\r\n    padding:2%;\r\n    background-color: #E9F1F3;\r\n}\r\n\r\n.SynLogo {\r\n    left: 0;\r\n    top: 0;\r\n}\r\n\r\n.Spoke {\r\n    position: absolute;\r\n    right: 0;\r\n    top: 0;\r\n}\r\n\r\n.SynTable {\r\n    position:relative;\r\n}\r\n\r\n.SynFont {\r\n        font-size: xx-large;\r\n        font-weight: 700;\r\n}\r\n\r\n.SynTitle {\r\n        font-size: xx-large;\r\n        font-weight: bold;\r\n        background-color: #003865;\r\n        color:white\r\n}\r\n\r\n.table {\r\n    width: 100%;\r\n    z-index: 99;\r\n    margin: 0 auto;\r\n    left: 0;\r\n    right: 0;\r\n    background-color: #E9F1F3;\r\n    border-color: #003865;\r\n    border-style: solid;\r\n}\r\n\r\n.green {\r\n        height: 3em;\r\n        width: 3em;\r\n        color: white;\r\n     background-color: green;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n}\r\n\r\n.yellow {\r\n        height: 3em;\r\n        width: 3em;\r\n        background-color: yellow;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n}\r\n\r\n/* .gray {\r\n        height: 3em;\r\n        width: 3em;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n} */\r\n\r\n/* .mat-row:nth-child(even) {\r\n        background-color:lightgray;\r\n} */\r\n\r\n.mat-column-color {\r\n        word-wrap: break-word !important;\r\n        white-space: unset !important;\r\n        flex: 0 0 28% !important;\r\n        width: 10% !important;\r\n        overflow-wrap: break-word;\r\n        word-wrap: break-word;\r\n        word-break: break-word;\r\n        -ms-hyphens: auto;\r\n        -webkit-hyphens: auto;\r\n        hyphens: auto;\r\n}\r\n\r\n.mat-column-route {\r\n         word-wrap: break-word !important;\r\n         white-space: unset !important;\r\n         flex: 0 0 28% !important;\r\n         width: 38% !important;\r\n         overflow-wrap: break-word;\r\n         word-wrap: break-word;\r\n         word-break: break-word;\r\n         -ms-hyphens: auto;\r\n         -webkit-hyphens: auto;\r\n         hyphens: auto;\r\n}\r\n\r\n.mat-column-courier {\r\n         word-wrap: break-word !important;\r\n         white-space: unset !important;\r\n         flex: 0 0 28% !important;\r\n         width: 38% !important;\r\n         overflow-wrap: break-word;\r\n         word-wrap: break-word;\r\n         word-break: break-word;\r\n         -ms-hyphens: auto;\r\n         -webkit-hyphens: auto;\r\n         hyphens: auto;\r\n}\r\n\r\n.mat-column-time {\r\n        word-wrap: break-word !important;\r\n        white-space: unset !important;\r\n        flex: 0 0 28% !important;\r\n        width: 14% !important;\r\n        text-align: center;\r\n        overflow-wrap: break-word;\r\n        word-wrap: break-word;\r\n        word-break: break-word;\r\n        -ms-hyphens: auto;\r\n        -webkit-hyphens: auto;\r\n        hyphens: auto;\r\n}\r\n\r\n.mat-column-number {\r\n        word-wrap: break-word !important;\r\n        white-space: unset !important;\r\n        flex: 0 0 28% !important;\r\n        width: 38% !important;\r\n        overflow-wrap: break-word;\r\n        word-wrap: break-word;\r\n        word-break: break-word;\r\n        -ms-hyphens: auto;\r\n        -webkit-hyphens: auto;\r\n        hyphens: auto;\r\n}\r\n\r\n.block {\r\n        height: 12em;\r\n        width: 18em;\r\n        display: table-cell;\r\n        border-style: solid;\r\n        border-width: 1px;\r\n        border-color: #003865;\r\n        position: relative;\r\n}\r\n\r\n.hours {\r\n        font-weight: bold;\r\n        left: 0.5%;\r\n        font-size: x-large;\r\n        text-align: center;\r\n        border-bottom-style: solid;\r\n        border-bottom-color: #003865;\r\n        border-bottom-width: 1px;\r\n        background-color: #E9F1F3;\r\n        color:#003056;\r\n}\r\n\r\n.number {\r\n        font-weight: bolder;\r\n        text-align: center;\r\n        font-size: xx-large;\r\n        position: absolute;\r\n        left: 43%;\r\n        top: 43%;\r\n        color:#003056;\r\n}\r\n\r\n.dot {\r\n        height: 25px;\r\n        width: 25px;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n}\r\n\r\n.d0,.d1,.d2,.d3 {\r\n        height: 125px;\r\n        width: 125px;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n        background-color: #03a82754;\r\n        text-align: center;\r\n        position: relative;\r\n        top: 40;\r\n        font-size: xx-large;\r\n        font-weight: bold;\r\n        color: #003056;\r\n        left:3px;\r\n}\r\n\r\n.d4,.d5,.d6 {\r\n        height: 125px;\r\n        width: 125px;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n        background-color: #ffb10054;\r\n        text-align: center;\r\n        position: relative;\r\n        top: 40;\r\n        font-size: xx-large;\r\n        font-weight: bold;\r\n        color: #003056;\r\n        left:3px;\r\n}\r\n\r\n.d7,.d8,.d9,.d10 {\r\n        height: 125px;\r\n        width: 125px;\r\n        border-radius: 50%;\r\n        display: inline-block;\r\n        background-color: #cd2f1163;\r\n        text-align: center;\r\n        position: relative;\r\n        top: 40;\r\n        font-size: xx-large;\r\n        font-weight: bold;\r\n        color: #003056;\r\n        left:3px;\r\n}\r\n\r\n.numg {\r\n        position: absolute;\r\n        left: 34%;\r\n        top: 13%;\r\n        font-size: 55pt;\r\n        font-weight: bold;\r\n        color: #505050;\r\n}\r\n\r\n.numy {\r\n        position: absolute;\r\n        left: 34%;\r\n        top: 13%;\r\n        font-size: 55pt;\r\n        font-weight: bold;\r\n        color: #505050;\r\n}\r\n\r\n.numr{\r\n        position: absolute;\r\n        left: 34%;\r\n        top: 13%;\r\n        font-size: 55pt;\r\n        font-weight: bold;\r\n        color: #505050;\r\n}\r\n\r\n.num {\r\n        position: absolute;\r\n        left: 18%;\r\n        top: 13%;\r\n        font-size: 55pt;\r\n        font-weight: bold;\r\n        color: #505050;\r\n}\r\n\r\n.giorni {\r\n        color: #505050;\r\n        font-size: 40pt;\r\n}\r\n\r\n.navetta {\r\n        color: #189c0c;\r\n        text-align: center;\r\n}\r\n\r\n.navetta0 {\r\n    color: #189c0c;\r\n    text-align: center;\r\n}\r\n\r\n.navetta1 {\r\n    color: #189c0c;\r\n    text-align: center;\r\n}\r\n\r\n.navetta2 {\r\n    color: #189c0c;\r\n    text-align: center;\r\n}\r\n\r\n.statoviaggio {\r\n    text-align: center;\r\n}\r\n\r\n.statoviaggio0 {\r\n    color: #e4aa40;\r\n}\r\n\r\n.statoviaggio1 {\r\n    color: #10b44f;\r\n}\r\n\r\n.statoviaggio2 {\r\n    color: #2910b4;\r\n}\r\n\r\n.statoviaggio3 {\r\n    color: #2910b4;\r\n}\r\n\r\n.table .mat-icon {\r\n    font-size: 20px;\r\n  }\r\n\r\n.plus{\r\ncolor: white;\r\nfont-weight: bolder;\r\n display: contents;\r\n  line-height: unset;\r\n}\r\n\r\n.container-btn{\r\ndisplay: flex;\r\nflex-direction: row-reverse;\r\nmargin-block: 20px;\r\n\r\n}\r\n\r\n.margin-activation{\r\nmargin-bottom:30px;\r\n\r\n}\r\n\r\ntable {\r\n  width: 100%;\r\n}\r\n\r\n.example-button-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 120px;\r\n}\r\n\r\n.green-done{\r\ncolor:#10b44f\r\n}\r\n\r\n.red-close{\r\ncolor: red;\r\n}\r\n"

/***/ }),

/***/ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.html":
/*!*********************************************************************************************************!*\
  !*** ./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row no-gutters table-container\">\r\n  <div class=\"col-md-12\">\r\n    <!-- CONTENT -->\r\n    <mat-toolbar class='margin-activation' color=\"primary\">\r\n      <span> List of Activation </span>\r\n    </mat-toolbar>\r\n\r\n    <div class=\"container-btn\">\r\n      <button  type=\"button\" style=\"font-size: large\" mat-raised-button color=\"primary\" (click)=\"onClickAddBU()\">\r\n        <mat-icon class=\"plus\">+</mat-icon>\r\n        Add\r\n      </button>\r\n    </div>\r\n\r\n    <div *ngIf=\"dataSource?.data?.length <= 0\">No records to display.</div>\r\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\r\n\r\n\r\n      <ng-container matColumnDef=\"logisticcenter\">\r\n        <th mat-header-cell *matHeaderCellDef>Logistic Center</th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n          {{ getLogisticCenter(element.logisticcenter) }}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"baseproduct\">\r\n        <th mat-header-cell *matHeaderCellDef>Base Product</th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n          {{ getProductDescription(element.baseproduct) }}\r\n        </td>\r\n      </ng-container>\r\n\r\n\r\n\r\n      <ng-container matColumnDef=\"activated\">\r\n        <th mat-header-cell *matHeaderCellDef>Demand Planning</th>\r\n\r\n        <td mat-cell *matCellDef=\"let element\" >\r\n          <mat-icon *ngIf=\"element.demandplanningactive == 1\" class=\"material-symbols-outlined\" class=\"green-done\">\r\n          done\r\n          </mat-icon>\r\n\r\n          <mat-icon *ngIf=\"element.demandplanningactive == 0\" class=\"material-symbols-outlined\" class=\"red-close\">\r\n            close\r\n          </mat-icon>\r\n\r\n          {{ getProductDescription(element.activated) }}\r\n        </td>\r\n      </ng-container>\r\n\r\n\r\n      <ng-container matColumnDef=\"demandplanningactive\">\r\n        <th mat-header-cell *matHeaderCellDef></th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n\r\n          <button *ngIf=\"element.demandplanningactive == 1\" mat-mini-fab type=\"button\"\r\n            matTooltip=\"Activate\" (click)=\"onStop(element)\" class=\"green\" >\r\n            <mat-icon>play_arrow</mat-icon>\r\n          </button>\r\n\r\n          <button *ngIf=\"element.demandplanningactive == 0\" mat-mini-fab  type=\"button\"\r\n            matTooltip=\"Disactivate\" (click)=\"onPlay(element)\" color=\"warn\" >\r\n            <mat-icon>stop</mat-icon>\r\n        </button>\r\n\r\n        </td>\r\n      </ng-container>\r\n\r\n\r\n      <ng-container matColumnDef=\"action\">\r\n        <th mat-header-cell *matHeaderCellDef></th>\r\n        <td mat-cell *matCellDef=\"let element\">\r\n\r\n          <button mat-mini-fab color=\"primary\"  type=\"button\" matTooltip=\"Delete\" (click)=\"onDelete(element)\" >\r\n            <mat-icon>delete</mat-icon>\r\n          </button>\r\n\r\n\r\n        </td>\r\n      </ng-container>\r\n\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\r\n    </table>\r\n    <br />\r\n\r\n    <div >\r\n      <mat-paginator [pageIndex]=\"pageNumber\" [pageSize]=\"pageSize\" [length]=\"totalRecords\"\r\n        [pageSizeOptions]=\"[5, 10, 20, 100]\" (page)=\"pageEvent = handlePaginatorEvent($event)\">\r\n      </mat-paginator>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: ListCentriAutomezziProdottoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListCentriAutomezziProdottoComponent", function() { return ListCentriAutomezziProdottoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_dialogs_add_edit_centri_automezzi_prodotto_dialog_add_edit_centri_automezzi_prodotto_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component */ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.ts");
/* harmony import */ var src_app_entity_Rainbow_Ublique_Activation_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/entity/Rainbow_Ublique_Activation.entity */ "./src/app/entity/Rainbow_Ublique_Activation.entity.ts");
/* harmony import */ var src_app_entity_Tart_Base_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/entity/Tart_Base_entity */ "./src/app/entity/Tart_Base_entity.ts");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ListCentriAutomezziProdottoComponent = /** @class */ (function () {
    function ListCentriAutomezziProdottoComponent(dialog, _apiservice) {
        this.dialog = dialog;
        this._apiservice = _apiservice;
        this.displayedColumns = [
            "logisticcenter",
            "baseproduct",
            'activated',
            "action",
            "demandplanningactive",
        ];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.listProducts = [];
        this.listLogistics = [];
        this.productModel = new src_app_entity_Tart_Base_entity__WEBPACK_IMPORTED_MODULE_6__["EOTArtBaseEntity"]();
        this.loadingList = false;
        this.pageNumber = 0;
        this.pageSize = 10;
        this.listSocieta = [];
        this.filteredListSocieta = [];
        this.filterSocieta = 0;
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ListCentriAutomezziProdottoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiservice
            .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
            .subscribe(function (res) {
            _this.dataSource.data = res.ubliqueActivationList;
            _this.totalRecords = res.totalRecords;
            _this._apiservice
                .ListArtBase()
                .subscribe(function (products) {
                _this.listProducts = products;
            });
            _this._apiservice
                .ListLogisticCenter()
                .subscribe(function (centers) {
                _this.listLogistics = centers;
            });
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.loadList = function () {
        var _this = this;
        this._apiservice
            .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            if (!res) {
                _this.dataSource.data = [];
                _this.totalRecords = 0;
                return;
            }
            _this.dataSource.data = res.ubliqueActivationList;
            _this.totalRecords = res.totalRecords;
            console.log("res", res);
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.onClickAddBU = function () {
        var _this = this;
        var dialogRef = this.dialog.open(src_app_dialogs_add_edit_centri_automezzi_prodotto_dialog_add_edit_centri_automezzi_prodotto_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AddEditCentriAutomezziProdottoDialogComponent"], {
            width: "50vw",
        });
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .ListRainbowUbliqueActivation(_this.pageNumber + 1, _this.pageSize)
                .subscribe(function (res) {
                _this.dataSource.data = res.ubliqueActivationList;
            });
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.onDelete = function (item) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
            title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Stai per eliminare " + this.getProductDescription(item.baseproduct),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        }).then(function (result) {
            if (result.value) {
                var entity = new src_app_entity_Rainbow_Ublique_Activation_entity__WEBPACK_IMPORTED_MODULE_5__["RainbowUbliqueActivationEntity"]();
                entity.id;
                _this._apiservice
                    .DeleteRainbowUbliqueActivation(item.id)
                    .subscribe(function (item) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                        title: "The product has been Deleted!",
                        type: "success",
                    });
                    _this._apiservice
                        .ListRainbowUbliqueActivation(_this.pageNumber + 1, _this.pageSize)
                        .subscribe(function (res) {
                        _this.dataSource.data = res.ubliqueActivationList;
                    });
                });
            }
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.onPlay = function (item) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
            title: "You are about to activate: " + item.logisticcenter + " / " + item.baseproduct,
            text: "You are about to activate: " + item.logisticcenter + " / " + item.baseproduct,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, activate",
            cancelButtonText: "No, cancel",
        }).then(function (result) {
            if (result.value) {
                item.demandplanningactive = true;
                _this._apiservice
                    .SetRainbowUbliqueActivation(item)
                    .subscribe(function (item) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                        title: "The product has been Activated!",
                        type: "success",
                    });
                    _this._apiservice
                        .ListRainbowUbliqueActivation(_this.pageNumber + 1, _this.pageSize)
                        .subscribe(function (res) {
                        _this.dataSource.data = res.ubliqueActivationList;
                    });
                });
            }
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.onStop = function (item) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
            title: "You are about to block: " + item.logisticcenter + " / " + item.baseproduct,
            text: "You are about to block: " + item.logisticcenter + " / " + item.baseproduct,
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes,block ",
            cancelButtonText: "No, Cancel",
        }).then(function (result) {
            if (result.value) {
                item.demandplanningactive = false;
                _this._apiservice
                    .SetRainbowUbliqueActivation(item)
                    .subscribe(function (item) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_8___default.a.fire({
                        title: "The product has been blocked!",
                        type: "success",
                    });
                    _this._apiservice
                        .ListRainbowUbliqueActivation(_this.pageNumber + 1, _this.pageSize)
                        .subscribe(function (res) {
                        _this.dataSource.data = res.ubliqueActivationList;
                    });
                });
            }
        });
    };
    ListCentriAutomezziProdottoComponent.prototype.getProductDescription = function (productCode) {
        var found = this.listProducts.find(function (prod) { return prod.artbase.art_base == productCode; });
        return found
            ? found.artbase.art_base + " " + " " + found.artbase.breve
            : "";
    };
    ListCentriAutomezziProdottoComponent.prototype.getLogisticCenter = function (logisticCode) {
        var found = this.listLogistics.find(function (logic) { return logic.CA == logisticCode; });
        return found ? found.CA + " " + found.CABreve : "";
    };
    // applyFilter(filterValue: string){
    // this.dataSource.filter=filterValue.trim().toLowerCase();
    // }
    ListCentriAutomezziProdottoComponent.prototype.handlePaginatorEvent = function (event) {
        this.pageNumber = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadList();
    };
    ListCentriAutomezziProdottoComponent.prototype.ngOnDestroy = function () {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    ListCentriAutomezziProdottoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-list-centri-automezzi-prodotto",
            template: __webpack_require__(/*! ./list-centri-automezzi-prodotto.component.html */ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.html"),
            styles: [__webpack_require__(/*! ./list-centri-automezzi-prodotto.component.css */ "./src/app/components/list-centri-automezzi-prodotto/list-centri-automezzi-prodotto.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"]])
    ], ListCentriAutomezziProdottoComponent);
    return ListCentriAutomezziProdottoComponent;
}());



/***/ }),

/***/ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.css":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.css ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-center {\r\n    margin: 0;\r\n    position: absolute;\r\n    top: 40%;\r\n    right: 50%;\r\n    -webkit-transform: translateY(-50%);\r\n            transform: translateY(-50%);\r\n  }\r\n  \r\n  .totheright {\r\n    margin: 0;\r\n    position: absolute;\r\n    top: -10%;\r\n    right: 70%;\r\n  }\r\n  \r\n  .border{\r\n    border-radius: 4px !important;\r\n  }"

/***/ }),

/***/ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add new activation</h1>\r\n<div mat-dialog-content>\r\n  <div class=\"row\">\r\n    <mat-form-field appearance=\"outline\" class=\"col-md-6\">\r\n      <mat-label>Logistic Center</mat-label>\r\n      <mat-select [(ngModel)]=\"selectedLogisticCenter\">\r\n        <mat-option>\r\n          <ngx-mat-select-search\r\n            ngModel\r\n            (ngModelChange)=\"filterLogisticOption($event)\"\r\n            [placeholderLabel]=\"'Cerca'\"\r\n            [noEntriesFoundLabel]=\"'Nessun risultato'\"\r\n          ></ngx-mat-select-search>\r\n        </mat-option>\r\n\r\n        <mat-option *ngFor=\"let l of filteredListLogistica\" [value]=\"l.CA\">\r\n          {{ l.CA }} {{ l.CABreve }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"outline\" class=\"col-md-6\">\r\n      <mat-label>Base Product</mat-label>\r\n      <mat-select [(ngModel)]=\"selectedProduct\">\r\n        <mat-option>\r\n          <ngx-mat-select-search\r\n            ngModel\r\n            (ngModelChange)=\"filterProductOption($event)\"\r\n            [placeholderLabel]=\"'Cerca'\"\r\n            [noEntriesFoundLabel]=\"'Nessun risultato'\"\r\n          ></ngx-mat-select-search>\r\n        </mat-option>\r\n        <mat-option\r\n          *ngFor=\"let l of filteredListProducts\"\r\n          [value]=\"l.artbase.art_base\"\r\n        >\r\n          {{ l.artbase.art_base }} {{ l.artbase.breve }}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <!-- <small class='text-danger' [class.d-none]=\"product.valid || product.untouched\">Please select a product</small> -->\r\n  </div>\r\n</div>\r\n<mat-slide-toggle [(ngModel)]=\"demandplanningactive\" color=\"primary\"\r\n  >Activate Demand Planning</mat-slide-toggle\r\n>\r\n<div mat-dialog-actions align=\"end\">\r\n  <button mat-raised-button type=\"button\" (click)=\"onCloseClick()\">\r\n   Close\r\n  </button>\r\n  <button\r\n    mat-raised-button\r\n    type=\"submit\"\r\n    (click)=\"onSaveClick()\"\r\n    color=\"primary\"\r\n  >\r\n    Save\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.ts":
/*!**************************************************************************************************************************!*\
  !*** ./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.ts ***!
  \**************************************************************************************************************************/
/*! exports provided: AddEditCentriAutomezziProdottoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditCentriAutomezziProdottoDialogComponent", function() { return AddEditCentriAutomezziProdottoDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_entity_Rainbow_Ublique_Activation_entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/entity/Rainbow_Ublique_Activation.entity */ "./src/app/entity/Rainbow_Ublique_Activation.entity.ts");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddEditCentriAutomezziProdottoDialogComponent = /** @class */ (function () {
    function AddEditCentriAutomezziProdottoDialogComponent(_apiservice, selfDialogRef) {
        this._apiservice = _apiservice;
        this.selfDialogRef = selfDialogRef;
        this.listLogisticCenter = [];
        this.listProducts = [];
        this.filteredListLogistica = [];
        this.filteredListProducts = [];
        this.entity = new src_app_entity_Rainbow_Ublique_Activation_entity__WEBPACK_IMPORTED_MODULE_4__["RainbowUbliqueActivationEntity"]();
        this.error = false;
        this.usersDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    AddEditCentriAutomezziProdottoDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiservice.ListArtBase().subscribe(function (products) {
            _this.listProducts = products;
            _this.filteredListProducts = _this.listProducts;
            _this.selectedProduct = "00021";
        });
        this._apiservice
            .ListLogisticCenter()
            .subscribe(function (centers) {
            _this.listLogisticCenter = centers;
            _this.filteredListLogistica = _this.listLogisticCenter;
            _this.selectedLogisticCenter = "00";
        });
    };
    AddEditCentriAutomezziProdottoDialogComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddEditCentriAutomezziProdottoDialogComponent.prototype.onSaveClick = function () {
        var _this = this;
        var entity = new src_app_entity_Rainbow_Ublique_Activation_entity__WEBPACK_IMPORTED_MODULE_4__["RainbowUbliqueActivationEntity"]();
        console.log("logisticcenter", this.selectedLogisticCenter);
        console.log("product", this.selectedProduct);
        entity.logisticcenter = this.selectedLogisticCenter;
        entity.baseproduct = this.selectedProduct;
        entity.demandplanningactive = this.demandplanningactive;
        if (this.error == false) {
            this._apiservice
                .SetRainbowUbliqueActivation(entity)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._unsubscribeAll))
                .subscribe(function (res) {
                if (res) {
                    _this.selfDialogRef.close();
                }
            });
        }
    };
    AddEditCentriAutomezziProdottoDialogComponent.prototype.filterLogisticOption = function (event) {
        if (!this.listLogisticCenter) {
            return;
        }
        if (!event) {
            this.filteredListLogistica = this.listLogisticCenter;
            return;
        }
        else {
            event = event.toLowerCase();
        }
        this.filteredListLogistica = this.listLogisticCenter.filter(function (x) {
            return x.CABreve.toLowerCase().indexOf(event) > -1 ||
                x.CA.toLowerCase().indexOf(event) > -1;
        });
        console.log("filteredLogistica", this.filteredListLogistica);
    };
    AddEditCentriAutomezziProdottoDialogComponent.prototype.filterProductOption = function (event) {
        if (!this.listProducts) {
            return;
        }
        if (!event) {
            this.filteredListProducts = this.listProducts;
            return;
        }
        else {
            event = event.toLowerCase();
        }
        console.log("event", event);
        this.filteredListProducts = this.listProducts.filter(function (x) {
            return x.artbase.breve.toLowerCase().indexOf(event) > -1 ||
                x.artbase.art_base.toLowerCase().indexOf(event) > -1;
        });
        console.log("filteredproduct", this.filteredListProducts);
    };
    AddEditCentriAutomezziProdottoDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-edit-centri-automezzi-prodotto-dialog",
            template: __webpack_require__(/*! ./add-edit-centri-automezzi-prodotto-dialog.component.html */ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.html"),
            styles: [__webpack_require__(/*! ./add-edit-centri-automezzi-prodotto-dialog.component.css */ "./src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component.css")],
        }),
        __metadata("design:paramtypes", [src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]])
    ], AddEditCentriAutomezziProdottoDialogComponent);
    return AddEditCentriAutomezziProdottoDialogComponent;
}());



/***/ }),

/***/ "./src/app/entity/Rainbow_Ublique_Activation.entity.ts":
/*!*************************************************************!*\
  !*** ./src/app/entity/Rainbow_Ublique_Activation.entity.ts ***!
  \*************************************************************/
/*! exports provided: RainbowUbliqueActivationEntity, RainbowUbliqueActivationEntity_List */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RainbowUbliqueActivationEntity", function() { return RainbowUbliqueActivationEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RainbowUbliqueActivationEntity_List", function() { return RainbowUbliqueActivationEntity_List; });
var RainbowUbliqueActivationEntity = /** @class */ (function () {
    function RainbowUbliqueActivationEntity() {
        this.id = 0;
        this.demandplanningactive = true;
    }
    return RainbowUbliqueActivationEntity;
}());

var RainbowUbliqueActivationEntity_List = /** @class */ (function () {
    function RainbowUbliqueActivationEntity_List() {
        this.totalRecords = 0;
        this.totalPages = 0;
    }
    return RainbowUbliqueActivationEntity_List;
}());



/***/ }),

/***/ "./src/app/entity/Tart_Base_entity.ts":
/*!********************************************!*\
  !*** ./src/app/entity/Tart_Base_entity.ts ***!
  \********************************************/
/*! exports provided: TArtBaseEntity, EOTArtBaseEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TArtBaseEntity", function() { return TArtBaseEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOTArtBaseEntity", function() { return EOTArtBaseEntity; });
var TArtBaseEntity = /** @class */ (function () {
    function TArtBaseEntity() {
        this.id = 0;
        this.useautodemand = false;
        this.disabled = false;
        this.gnlgas = 0;
    }
    return TArtBaseEntity;
}());

var EOTArtBaseEntity = /** @class */ (function () {
    function EOTArtBaseEntity() {
    }
    return EOTArtBaseEntity;
}());



/***/ }),

/***/ "./src/app/modules/angular-material-module.ts":
/*!****************************************************!*\
  !*** ./src/app/modules/angular-material-module.ts ***!
  \****************************************************/
/*! exports provided: AngularMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialModule", function() { return AngularMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"]
            ],
            declarations: [],
            providers: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_LOCALE"], useValue: 'it-IT' },
            ]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());



/***/ }),

/***/ "./src/app/services/api.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = /** @class */ (function () {
    function ApiService(context, httpClient, snackbar) {
        this.context = context;
        this.httpClient = httpClient;
        this.snackbar = snackbar;
        this.listRainbowUbliqueActivation = "RainbowUbliqueActivation/List";
        this.listArtBase = "TArtBase/List";
        this.listlogisticCenter = "LogisticCenter/List ";
        this.setRainbowUbliqueActivation = "RainbowUbliqueActivation/Set ";
        this.deleteRainbowUbliqueActivation = "RainbowUbliqueActivation/Delete ";
        this.listLogisticaAttive = "fyre/listLogisticaaAttive";
        this.api_uri = this.context._properties.routingWebAPI;
    }
    ApiService.prototype.ListRainbowUbliqueActivation = function (pageNumber, rowsPage) {
        var _this = this;
        return this.httpClient.get("" + this.api_uri + this.listRainbowUbliqueActivation + "?PageNumber=" + pageNumber + "&RowspPage=" + rowsPage)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.ListArtBase = function () {
        var _this = this;
        return this.httpClient.get("" + this.api_uri + this.listArtBase)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.ListLogisticCenter = function () {
        var _this = this;
        return this.httpClient.get("" + this.api_uri + this.listlogisticCenter)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.SetRainbowUbliqueActivation = function (entity) {
        var _this = this;
        var params;
        params = JSON.stringify(entity);
        return this.httpClient.post("" + this.api_uri + this.setRainbowUbliqueActivation, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.DeleteRainbowUbliqueActivation = function (entity) {
        var _this = this;
        var params;
        params = JSON.stringify(entity);
        return this.httpClient.post("" + this.api_uri + this.deleteRainbowUbliqueActivation, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.handleError = function (err) {
        if (err.status !== 404) {
            this.openErrorSnackbar(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err);
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }
    };
    ApiService.prototype.openErrorSnackbar = function (err) {
        if (err.status !== 404) {
            var errorMessage = err && err.message ? err.message : "Errors have occurred. Please try again later.";
            this.snackbar.open(errorMessage, null, { duration: 6000 });
        }
    };
    ApiService.prototype.UserDelete = function (element) {
        var _this = this;
        var params;
        params = JSON.stringify(element);
        return this.httpClient.post(this.api_uri + "ARMUser/delete", params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return data;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            if (err.status !== 404) {
                _this.snackbar.open(err.error && err.error !== '' ? err.error : err.message, "", { duration: 10000 });
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }));
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [src_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_5__["Context"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\maryam.alimohammadi\Desktop\ublique_activation\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map