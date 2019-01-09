webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<app-uploader\n(onFilesSelected)=\"readFiles($event)\"\n(onUploadComplete)=\"uploadDone($event)\"\n[buttonText]=\"'Choose Image'\"\n[buttonClass]=\"'btn btn-default'\"\n[postUrl]=\"'https://api.imgur.com/3/image'\"\n[id]=\"0\"\n[multiple]=\"true\"\n[usingImages]=\"true\"\n[showImagesOnAdd]=\"true\"\n[imageWidth]=\"'180px'\"\n[uploadParams]=\"uploadParams\"\n></app-uploader>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uploader_uploader_upload_service__ = __webpack_require__("../../../../../src/app/uploader/uploader/upload.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, uploadService) {
        this.router = router;
        this.uploadService = uploadService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.uploadParams = {
            formDataPropertyName: 'image',
            extraParams: [{
                    paramValueIsFromFile: true,
                    paramValue: "name",
                    paramName: "filename"
                }]
        };
    };
    AppComponent.prototype.readFiles = function (event) {
        console.log(event);
        this.uploadService.startUpload.next(event.files);
        this.uploadService.currentUploadProgress.subscribe(function (progress) {
            console.log(progress);
        });
    };
    AppComponent.prototype.uploadDone = function (event) {
        console.log(event);
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__uploader_uploader_upload_service__["a" /* UploadService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__uploader_uploader_upload_service__["a" /* UploadService */]) === "function" && _b || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader_uploader_uploader_module__ = __webpack_require__("../../../../../src/app/uploader/uploader/uploader.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_0__uploader_uploader_uploader_module__["a" /* UploaderModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* Routes */])
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");

var Routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* AppComponent */] }
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/uploader/uploader/upload.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var UploadService = (function () {
    function UploadService() {
        this.startUpload = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.currentUploadProgress = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.clearImages = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.clearFiles = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.removeFile = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.removeImage = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
    }
    UploadService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], UploadService);
    return UploadService;
}());

//# sourceMappingURL=upload.service.js.map

/***/ }),

/***/ "../../../../../src/app/uploader/uploader/uploader.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".imageContainer {\n    display: block;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/uploader/uploader/uploader.component.html":
/***/ (function(module, exports) {

module.exports = "<input style=\"display: none\" type=\"file\" [multiple]=\"multiple\" (change)=\"onFileSelected($event)\" #fileInput>\n<button id=\"uploadBtn{{id!==undefined?id:''}}\" (click)=\"fileInput.click()\">{{buttonText}}</button>\n<div class=\"imageContainer\" *ngIf=\"showImagesOnAdd\" >\n  <img\n  id=\"drag{{v}}\"\n  (click)=\"removeImage(v)\"\n  *ngFor=\"let image of images; let v=index\"                                 \n  [ngStyle]=\"{'width' : imageWidth}\" [src]=\"image\" alt=\"noImg\">\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/uploader/uploader/uploader.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_service__ = __webpack_require__("../../../../../src/app/uploader/uploader/upload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploaderComponent = (function () {
    function UploaderComponent(http, uploadService) {
        this.http = http;
        this.uploadService = uploadService;
        this.buttonText = 'Choose File';
        this.onFilesSelected = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.onUploadComplete = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.onImageRemoved = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.onFileRemoved = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.images = [];
        this.files = [];
        this.subscriptions = [];
    }
    UploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.uploadService.startUpload.subscribe(function (files) {
            for (var i = 0; i < files.length; i++) {
                _this.onUpload(files[i]);
            }
        }));
        this.subscriptions.push(this.uploadService.clearFiles.subscribe(function (data) {
            var len = JSON.parse(JSON.stringify(_this.images.length));
            if (data.id === _this.id) {
                for (var i = 0; i < _this.files.length; i++) {
                    _this.removeFile(i);
                }
            }
        }));
        this.subscriptions.push(this.uploadService.removeImage.subscribe(function (data) {
            // console.log('removing');
            if (data.id === _this.id) {
                _this.removeImage(data.index);
            }
        }));
        this.subscriptions.push(this.uploadService.removeFile.subscribe(function (data) {
            // console.log('removing');
            if (data.id === _this.id) {
                _this.removeImage(data.index);
            }
        }));
    };
    UploaderComponent.prototype.ngAfterViewInit = function () {
        this.addButtonStyle(this.buttonClass);
    };
    UploaderComponent.prototype.getBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    UploaderComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        this.clearFiles();
        if (event && event.target && event.target.files) {
            var files_1 = event.target.files;
            if (this.usingImages) {
                for (var i = 0; i < files_1.length; i++) {
                    console.log(files_1[i], event);
                    this.getBase64(files_1[i]).then(function (data) {
                        _this.images.push(data);
                        if (_this.images.length === files_1.length) {
                            _this.onFilesSelected.emit({ files: files_1, base64s: _this.images });
                        }
                    });
                }
            }
            else {
                this.onFilesSelected.emit({ files: files_1 });
            }
        }
    };
    UploaderComponent.prototype.onUpload = function (file) {
        var _this = this;
        var fd = new FormData();
        fd.append(this.uploadParams.formDataPropertyName, file, file.name);
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        ;
        this.uploadParams.extraParams.forEach(function (param) {
            params = params.set(param.paramName, (param.paramValueIsFromFile ? file[param.paramValue] : param.paramValue));
        });
        this.http.post(this.postUrl, fd, { params: params, reportProgress: true, observe: 'events' })
            .subscribe(function (event) {
            if (event.type === __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpEventType */].UploadProgress) {
                // console.log('Upload Progress:', Math.round(event.loaded / event.total*100)+'%' );
                _this.uploadService.currentUploadProgress.next((event.loaded / event.total * 100));
            }
            else if (event.type === __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpEventType */].Response) {
                // console.log('Response: ', event);
                _this.onUploadComplete.emit({ response: event, file: file });
            }
        });
    };
    UploaderComponent.prototype.removeImage = function (index) {
        if (this.imagesRemovable && this.usingImages) {
            this.files.splice(index, 1);
            this.images.splice(index, 1);
            this.onImageRemoved.emit();
        }
    };
    UploaderComponent.prototype.removeFile = function (index) {
        this.files.splice(index, 1);
        this.onFileRemoved.emit();
    };
    UploaderComponent.prototype.clearFiles = function () {
        this.files = [];
        this.images = [];
    };
    UploaderComponent.prototype.addButtonStyle = function (className) {
        if (className.indexOf(' ') !== -1) {
            var classes = className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (!document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')).classList.contains(classes[i])) {
                    document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')).classList.add(classes[i]);
                }
            }
        }
        else {
            if (!document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')).classList.contains(className)) {
                document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')).classList.add(className);
            }
        }
    };
    UploaderComponent.prototype.sortImages = function (event) {
        // alert();
        console.log(event);
        // let targetId = event.toElement.id;
        // if(targetId.includes('drag')) {
        //   let targetIndex = +targetId.replace('drag', '');
        //   let temp = this.images[targetIndex];
        //   this.images[targetIndex] = this.images[this.currentSourceImageIndex];
        //   this.images[this.currentSourceImageIndex] = temp;
        //   this.files[targetIndex] = this.files[this.currentSourceImageIndex];
        //   this.files[this.currentSourceImageIndex] = temp;
        //   this.currentSourceImageIndex = undefined;
        //   this.resetOpacity();
        // }
    };
    UploaderComponent.prototype.checkPos = function (event, index) {
        console.log('starting');
        if (!this.currentSourceImageIndex) {
            this.currentSourceImageIndex = index;
        }
    };
    UploaderComponent.prototype.opacitize = function (index, opacity) {
        console.log('OPACCCC');
        if (index !== this.currentSourceImageIndex) {
            console.log(index);
            var img = document.getElementById('drag' + index);
            img.style.opacity = opacity;
        }
    };
    UploaderComponent.prototype.resetOpacity = function () {
        // for(let i=0; i<this.urls.length;i++) {
        //   let img = <HTMLImageElement>document.getElementById('drag'+i);
        //   img.style.opacity = '1';     
        // }
    };
    UploaderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], UploaderComponent.prototype, "buttonText", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], UploaderComponent.prototype, "postUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UploaderComponent.prototype, "imagesRemovable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UploaderComponent.prototype, "usingImages", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], UploaderComponent.prototype, "buttonClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", String)
    ], UploaderComponent.prototype, "imageWidth", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UploaderComponent.prototype, "multiple", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UploaderComponent.prototype, "showImagesOnAdd", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Number)
    ], UploaderComponent.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], UploaderComponent.prototype, "uploadParams", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
    ], UploaderComponent.prototype, "onFilesSelected", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]) === "function" && _b || Object)
    ], UploaderComponent.prototype, "onUploadComplete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */])(),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]) === "function" && _c || Object)
    ], UploaderComponent.prototype, "onImageRemoved", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */])(),
        __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]) === "function" && _d || Object)
    ], UploaderComponent.prototype, "onFileRemoved", void 0);
    UploaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["o" /* Component */])({
            selector: 'app-uploader',
            template: __webpack_require__("../../../../../src/app/uploader/uploader/uploader.component.html"),
            styles: [__webpack_require__("../../../../../src/app/uploader/uploader/uploader.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__upload_service__["a" /* UploadService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__upload_service__["a" /* UploadService */]) === "function" && _f || Object])
    ], UploaderComponent);
    return UploaderComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=uploader.component.js.map

/***/ }),

/***/ "../../../../../src/app/uploader/uploader/uploader.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uploader_component__ = __webpack_require__("../../../../../src/app/uploader/uploader/uploader.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_service__ = __webpack_require__("../../../../../src/app/uploader/uploader/upload.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UploaderModule = (function () {
    function UploaderModule() {
    }
    UploaderModule_1 = UploaderModule;
    /**
  * Guaranteed singletons for provided Services across App.
  *
  * @return          An Angular Module with Providers
  */
    UploaderModule.forRoot = function () {
        return {
            ngModule: UploaderModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__upload_service__["a" /* UploadService */],
            ]
        };
    };
    UploaderModule = UploaderModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__uploader_component__["a" /* UploaderComponent */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_0__uploader_component__["a" /* UploaderComponent */]
            ]
        })
    ], UploaderModule);
    return UploaderModule;
    var UploaderModule_1;
}());

//# sourceMappingURL=uploader.module.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");



// if (environment.production) {
Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
// }
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map