import { Component, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

class UploadService {
    constructor() {
        this.startUpload = new Subject$1();
        this.currentUploadProgress = new Subject$1();
        this.clearImages = new Subject$1();
        this.removeImage = new Subject$1();
    }
}
UploadService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UploadService.ctorParameters = () => [];

class UploaderComponent {
    /**
     * @param {?} http
     * @param {?} uploadService
     */
    constructor(http$$1, uploadService) {
        this.http = http$$1;
        this.uploadService = uploadService;
        this.buttonText = 'Choose File';
        this.onFilesSelected = new EventEmitter();
        this.onUploadComplete = new EventEmitter();
        this.onImageRemoved = new EventEmitter();
        this.onFileRemoved = new EventEmitter();
        this.images = [];
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.uploadService.startUpload.subscribe((files) => {
            for (let /** @type {?} */ i = 0; i < files.length; i++) {
                this.onUpload(files[i]);
            }
        }));
        this.subscriptions.push(this.uploadService.clearImages.subscribe((data) => {
            if ((data.id && data.id === this.id) || !data.id) {
                this.images = [];
            }
        }));
        this.subscriptions.push(this.uploadService.removeImage.subscribe((data) => {
            if ((data.id && data.id === this.id) || !data.id) {
                this.removeImage(data.index);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.addButtonStyle(this.buttonClass);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const /** @type {?} */ reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFileSelected(event) {
        if (event && event.target && event.target.files) {
            let /** @type {?} */ files = (event.target.files);
            if (this.usingImages) {
                for (let /** @type {?} */ i = 0; i < files.length; i++) {
                    console.log(files[i], event);
                    this.getBase64(files[i]).then(data => {
                        this.images.push(data);
                        if (this.images.length === files.length) {
                            this.onFilesSelected.emit({ files: files, base64s: this.images });
                        }
                    });
                }
            }
            else {
                this.onFilesSelected.emit({ files: files });
            }
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    onUpload(file) {
        let /** @type {?} */ fd = new FormData();
        fd.append(this.uploadParams.formDataPropertyName, file, file.name);
        let /** @type {?} */ params = new HttpParams();
        
        this.uploadParams.extraParams.forEach(param => {
            params = params.set(param.paramName, (param.paramValueIsFromFile ? file[param.paramValue] : param.paramValue));
        });
        this.http.post(this.postUrl, fd, { params: params, reportProgress: true, observe: 'events' })
            .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                // console.log('Upload Progress:', Math.round(event.loaded / event.total*100)+'%' );
                this.uploadService.currentUploadProgress.next((event.loaded / event.total * 100));
            }
            else if (event.type === HttpEventType.Response) {
                // console.log('Response: ', event);
                this.onUploadComplete.emit({ response: event, file: file });
            }
        });
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeImage(index) {
        console.log(this.usingImages);
        if (this.usingImages) {
            this.images.splice(index, 1);
            this.onImageRemoved.emit();
            ((document.getElementById('fileInput'))).value = "";
        }
    }
    /**
     * @param {?} className
     * @return {?}
     */
    addButtonStyle(className) {
        if (className.indexOf(' ') !== -1) {
            let /** @type {?} */ classes = className.split(' ');
            for (let /** @type {?} */ i = 0; i < classes.length; i++) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    sortImages(event) {
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
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    checkPos(event, index) {
        console.log('starting');
        if (!this.currentSourceImageIndex) {
            this.currentSourceImageIndex = index;
        }
    }
    /**
     * @param {?} index
     * @param {?} opacity
     * @return {?}
     */
    opacitize(index, opacity) {
        console.log('OPACCCC');
        if (index !== this.currentSourceImageIndex) {
            console.log(index);
            let /** @type {?} */ img = (document.getElementById('drag' + index));
            img.style.opacity = opacity;
        }
    }
    /**
     * @return {?}
     */
    resetOpacity() {
        // for(let i=0; i<this.urls.length;i++) {
        //   let img = <HTMLImageElement>document.getElementById('drag'+i);
        //   img.style.opacity = '1';     
        // }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
UploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-uploader',
                template: `
    <input style="display: none" type="file" [multiple]="multiple" (change)="onFileSelected($event)" id="fileInput" #fileInput>
    <button id="uploadBtn{{id!==undefined?id:''}}" type="button" (click)="fileInput.click()">{{buttonText}}</button>
    <div class="imageContainer" *ngIf="showImagesOnAdd" >
      <img
      id="drag{{v}}"
      (click)="removeImage(v, true)"
      *ngFor="let image of images; let v=index"                                 
      [ngStyle]="{'width' : imageWidth}" [src]="image" alt="noImg">
    </div>
  `,
                styles: [`
    .imageContainer {
        display: block;
    }
  `]
            },] },
];
/**
 * @nocollapse
 */
UploaderComponent.ctorParameters = () => [
    { type: HttpClient, },
    { type: UploadService, },
];
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

class UploaderModule {
    /**
     * Guaranteed singletons for provided Services across App.
     *
     * @return {?} An Angular Module with Providers
     */
    static forRoot() {
        return {
            ngModule: UploaderModule,
            providers: [
                UploadService,
            ]
        };
    }
}
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
UploaderModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { UploaderModule, UploadService, UploaderComponent as ɵa };
//# sourceMappingURL=angular-upload-files.js.map
