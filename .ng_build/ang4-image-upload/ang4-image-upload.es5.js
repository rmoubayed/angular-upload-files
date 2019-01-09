import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
var UploadService = (function () {
    function UploadService() {
        this.startUpload = new Subject$1();
        this.currentUploadProgress = new Subject$1();
        this.clearImages = new Subject$1();
        this.clearFiles = new Subject$1();
        this.removeFile = new Subject$1();
        this.removeImage = new Subject$1();
    }
    return UploadService;
}());
UploadService.decorators = [
    { type: Injectable },
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
        this.onFilesSelected = new EventEmitter();
        this.onUploadComplete = new EventEmitter();
        this.onImageRemoved = new EventEmitter();
        this.onFileRemoved = new EventEmitter();
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
        var /** @type {?} */ params = new HttpParams();
        this.uploadParams.extraParams.forEach(function (param) {
            params = params.set(param.paramName, (param.paramValueIsFromFile ? file[param.paramValue] : param.paramValue));
        });
        this.http.post(this.postUrl, fd, { params: params, reportProgress: true, observe: 'events' })
            .subscribe(function (event) {
            if (event.type === HttpEventType.UploadProgress) {
                // console.log('Upload Progress:', Math.round(event.loaded / event.total*100)+'%' );
                _this.uploadService.currentUploadProgress.next((event.loaded / event.total * 100));
            }
            else if (event.type === HttpEventType.Response) {
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
            ((document.getElementById('fileInput'))).value = "";
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    UploaderComponent.prototype.removeFile = function (index) {
        this.files.splice(index, 1);
        this.onFileRemoved.emit();
        ((document.getElementById('fileInput'))).value = "";
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
    { type: Component, args: [{
                selector: 'app-uploader',
                template: "\n    <input style=\"display: none\" type=\"file\" [multiple]=\"multiple\" (change)=\"onFileSelected($event)\" id=\"fileInput\" #fileInput>\n    <button id=\"uploadBtn{{id!==undefined?id:''}}\" (click)=\"fileInput.click()\">{{buttonText}}</button>\n    <div class=\"imageContainer\" *ngIf=\"showImagesOnAdd\" >\n      <img\n      id=\"drag{{v}}\"\n      (click)=\"removeImage(v)\"\n      *ngFor=\"let image of images; let v=index\"                                 \n      [ngStyle]=\"{'width' : imageWidth}\" [src]=\"image\" alt=\"noImg\">\n    </div>\n  ",
                styles: ["\n    .imageContainer {\n        display: block;\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
UploaderComponent.ctorParameters = function () { return [
    { type: HttpClient, },
    { type: UploadService, },
]; };
UploaderComponent.propDecorators = {
    'buttonText': [{ type: Input },],
    'postUrl': [{ type: Input },],
    'imagesRemovable': [{ type: Input },],
    'usingImages': [{ type: Input },],
    'buttonClass': [{ type: Input },],
    'imageWidth': [{ type: Input },],
    'multiple': [{ type: Input },],
    'showImagesOnAdd': [{ type: Input },],
    'id': [{ type: Input },],
    'uploadParams': [{ type: Input },],
    'onFilesSelected': [{ type: Output },],
    'onUploadComplete': [{ type: Output },],
    'onImageRemoved': [{ type: Output },],
    'onFileRemoved': [{ type: Output },],
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
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
/**
 * Generated bundle index. Do not edit.
 */
export { UploaderModule, UploadService, UploaderComponent as ɵa };
//# sourceMappingURL=ang4-image-upload.es5.js.map
