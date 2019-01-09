(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/common/http'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/common/http', '@angular/common'], factory) :
	(factory((global['angular-upload-files'] = {}),global.ng.core,global.Rx,global.ng.common.http,global.ng.common));
}(this, (function (exports,core,Subject,http,common) { 'use strict';

var UploadService = (function () {
    function UploadService() {
        this.startUpload = new Subject.Subject();
        this.currentUploadProgress = new Subject.Subject();
        this.clearImages = new Subject.Subject();
        this.clearFiles = new Subject.Subject();
        this.removeFile = new Subject.Subject();
        this.removeImage = new Subject.Subject();
    }
    return UploadService;
}());
UploadService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
UploadService.ctorParameters = function () { return []; };
var UploaderComponent = (function () {
    /**
     * @param {?} http
     * @param {?} uploadService
     */
    function UploaderComponent(http$$1, uploadService) {
        this.http = http$$1;
        this.uploadService = uploadService;
        this.buttonText = 'Choose File';
        this.onFilesSelected = new core.EventEmitter();
        this.onUploadComplete = new core.EventEmitter();
        this.onImageRemoved = new core.EventEmitter();
        this.onFileRemoved = new core.EventEmitter();
        this.images = [];
        this.files = [];
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    UploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.uploadService.startUpload.subscribe(function (files) {
            for (var /** @type {?} */ i = 0; i < files.length; i++) {
                _this.onUpload(files[i]);
            }
        }));
        this.subscriptions.push(this.uploadService.clearFiles.subscribe(function (data) {
            if (data.id === _this.id) {
                for (var /** @type {?} */ i = 0; i < _this.files.length; i++) {
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
    /**
     * @return {?}
     */
    UploaderComponent.prototype.ngAfterViewInit = function () {
        this.addButtonStyle(this.buttonClass);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    UploaderComponent.prototype.getBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UploaderComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        this.clearFiles();
        if (event && event.target && event.target.files) {
            var /** @type {?} */ files_1 = (event.target.files);
            if (this.usingImages) {
                for (var /** @type {?} */ i = 0; i < files_1.length; i++) {
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
    /**
     * @param {?} file
     * @return {?}
     */
    UploaderComponent.prototype.onUpload = function (file) {
        var _this = this;
        var /** @type {?} */ fd = new FormData();
        fd.append(this.uploadParams.formDataPropertyName, file, file.name);
        var /** @type {?} */ params = new http.HttpParams();
        this.uploadParams.extraParams.forEach(function (param) {
            params = params.set(param.paramName, (param.paramValueIsFromFile ? file[param.paramValue] : param.paramValue));
        });
        this.http.post(this.postUrl, fd, { params: params, reportProgress: true, observe: 'events' })
            .subscribe(function (event) {
            if (event.type === http.HttpEventType.UploadProgress) {
                // console.log('Upload Progress:', Math.round(event.loaded / event.total*100)+'%' );
                _this.uploadService.currentUploadProgress.next((event.loaded / event.total * 100));
            }
            else if (event.type === http.HttpEventType.Response) {
                // console.log('Response: ', event);
                _this.onUploadComplete.emit({ response: event, file: file });
            }
        });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    UploaderComponent.prototype.removeImage = function (index) {
        if (this.imagesRemovable && this.usingImages) {
            this.files.splice(index, 1);
            this.images.splice(index, 1);
            this.onImageRemoved.emit();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    UploaderComponent.prototype.removeFile = function (index) {
        this.files.splice(index, 1);
        this.onFileRemoved.emit();
    };
    /**
     * @return {?}
     */
    UploaderComponent.prototype.clearFiles = function () {
        this.files = ([]);
        this.images = [];
    };
    /**
     * @param {?} className
     * @return {?}
     */
    UploaderComponent.prototype.addButtonStyle = function (className) {
        if (className.indexOf(' ') !== -1) {
            var /** @type {?} */ classes = className.split(' ');
            for (var /** @type {?} */ i = 0; i < classes.length; i++) {
                if (!((document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')))).classList.contains(classes[i])) {
                    ((document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')))).classList.add(classes[i]);
                }
            }
        }
        else {
            if (!((document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')))).classList.contains(className)) {
                ((document.getElementById('uploadBtn' + (this.id !== undefined ? this.id : '')))).classList.add(className);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    UploaderComponent.prototype.checkPos = function (event, index) {
        console.log('starting');
        if (!this.currentSourceImageIndex) {
            this.currentSourceImageIndex = index;
        }
    };
    /**
     * @param {?} index
     * @param {?} opacity
     * @return {?}
     */
    UploaderComponent.prototype.opacitize = function (index, opacity) {
        console.log('OPACCCC');
        if (index !== this.currentSourceImageIndex) {
            console.log(index);
            var /** @type {?} */ img = (document.getElementById('drag' + index));
            img.style.opacity = opacity;
        }
    };
    /**
     * @return {?}
     */
    UploaderComponent.prototype.resetOpacity = function () {
        // for(let i=0; i<this.urls.length;i++) {
        //   let img = <HTMLImageElement>document.getElementById('drag'+i);
        //   img.style.opacity = '1';     
        // }
    };
    /**
     * @return {?}
     */
    UploaderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return UploaderComponent;
}());
UploaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-uploader',
                template: "\n    <input style=\"display: none\" type=\"file\" [multiple]=\"multiple\" (change)=\"onFileSelected($event)\" #fileInput>\n    <button id=\"uploadBtn{{id!==undefined?id:''}}\" (click)=\"fileInput.click()\">{{buttonText}}</button>\n    <div class=\"imageContainer\" *ngIf=\"showImagesOnAdd\" >\n      <img\n      id=\"drag{{v}}\"\n      (click)=\"removeImage(v)\"\n      *ngFor=\"let image of images; let v=index\"                                 \n      [ngStyle]=\"{'width' : imageWidth}\" [src]=\"image\" alt=\"noImg\">\n    </div>\n  ",
                styles: ["\n    .imageContainer {\n        display: block;\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
UploaderComponent.ctorParameters = function () { return [
    { type: http.HttpClient, },
    { type: UploadService, },
]; };
UploaderComponent.propDecorators = {
    'buttonText': [{ type: core.Input },],
    'postUrl': [{ type: core.Input },],
    'imagesRemovable': [{ type: core.Input },],
    'usingImages': [{ type: core.Input },],
    'buttonClass': [{ type: core.Input },],
    'imageWidth': [{ type: core.Input },],
    'multiple': [{ type: core.Input },],
    'showImagesOnAdd': [{ type: core.Input },],
    'id': [{ type: core.Input },],
    'uploadParams': [{ type: core.Input },],
    'onFilesSelected': [{ type: core.Output },],
    'onUploadComplete': [{ type: core.Output },],
    'onImageRemoved': [{ type: core.Output },],
    'onFileRemoved': [{ type: core.Output },],
};
var UploaderModule = (function () {
    function UploaderModule() {
    }
    /**
     * Guaranteed singletons for provided Services across App.
     *
     * @return {?} An Angular Module with Providers
     */
    UploaderModule.forRoot = function () {
        return {
            ngModule: UploaderModule,
            providers: [
                UploadService,
            ]
        };
    };
    return UploaderModule;
}());
UploaderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    UploaderComponent,
                ],
                exports: [
                    UploaderComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
UploaderModule.ctorParameters = function () { return []; };

exports.UploaderModule = UploaderModule;
exports.UploadService = UploadService;
exports.ɵa = UploaderComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-upload-files.umd.js.map
