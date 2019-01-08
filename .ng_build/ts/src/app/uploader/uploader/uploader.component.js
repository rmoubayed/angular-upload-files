import { UploadService } from './upload.service';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class UploaderComponent {
    /**
     * @param {?} http
     * @param {?} uploadService
     */
    constructor(http, uploadService) {
        this.http = http;
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
    ngOnInit() {
        this.subscriptions.push(this.uploadService.startUpload.subscribe((files) => {
            for (let /** @type {?} */ i = 0; i < files.length; i++) {
                this.onUpload(files[i]);
            }
        }));
        this.subscriptions.push(this.uploadService.clearFiles.subscribe((data) => {
            let /** @type {?} */ len = JSON.parse(JSON.stringify(this.images.length));
            if (data.id === this.id) {
                for (let /** @type {?} */ i = 0; i < this.files.length; i++) {
                    this.removeFile(i);
                }
            }
        }));
        this.subscriptions.push(this.uploadService.removeImage.subscribe((data) => {
            // console.log('removing');
            if (data.id === this.id) {
                this.removeImage(data.index);
            }
        }));
        this.subscriptions.push(this.uploadService.removeFile.subscribe((data) => {
            // console.log('removing');
            if (data.id === this.id) {
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
        this.clearFiles();
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
        ;
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
        if (this.imagesRemovable && this.usingImages) {
            this.files.splice(index, 1);
            this.images.splice(index, 1);
            this.onImageRemoved.emit();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeFile(index) {
        this.files.splice(index, 1);
        this.onFileRemoved.emit();
    }
    /**
     * @return {?}
     */
    clearFiles() {
        this.files = ([]);
        this.images = [];
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
    <input style="display: none" type="file" [multiple]="multiple" (change)="onFileSelected($event)" #fileInput>
    <button id="uploadBtn{{id!==undefined?id:''}}" (click)="fileInput.click()">{{buttonText}}</button>
    <div class="imageContainer" *ngIf="showImagesOnAdd">
      <img
      (click)="removeImage(v)"
      *ngFor="let image of images; let v=index"                                 
      style="max-width:100px" [src]="image" alt="noImg">
    </div>

    <!-- (drop)="sortImages($event)"

    id="drag{{v}}"
    draggable="true" 
    (dragstart)="checkPos($event, v)" 
    (dragenter)="opacitize(v, '0.4')"
    (dragleave)="opacitize(v, '1')"  -->
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
    'multiple': [{ type: Input },],
    'showImagesOnAdd': [{ type: Input },],
    'id': [{ type: Input },],
    'uploadParams': [{ type: Input },],
    'onFilesSelected': [{ type: Output },],
    'onUploadComplete': [{ type: Output },],
    'onImageRemoved': [{ type: Output },],
    'onFileRemoved': [{ type: Output },],
};
function UploaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    UploaderComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UploaderComponent.ctorParameters;
    /** @type {?} */
    UploaderComponent.propDecorators;
    /** @type {?} */
    UploaderComponent.prototype.buttonText;
    /** @type {?} */
    UploaderComponent.prototype.postUrl;
    /** @type {?} */
    UploaderComponent.prototype.imagesRemovable;
    /** @type {?} */
    UploaderComponent.prototype.usingImages;
    /** @type {?} */
    UploaderComponent.prototype.buttonClass;
    /** @type {?} */
    UploaderComponent.prototype.multiple;
    /** @type {?} */
    UploaderComponent.prototype.showImagesOnAdd;
    /** @type {?} */
    UploaderComponent.prototype.id;
    /** @type {?} */
    UploaderComponent.prototype.uploadParams;
    /** @type {?} */
    UploaderComponent.prototype.onFilesSelected;
    /** @type {?} */
    UploaderComponent.prototype.onUploadComplete;
    /** @type {?} */
    UploaderComponent.prototype.onImageRemoved;
    /** @type {?} */
    UploaderComponent.prototype.onFileRemoved;
    /** @type {?} */
    UploaderComponent.prototype.currentSourceImageIndex;
    /** @type {?} */
    UploaderComponent.prototype.images;
    /** @type {?} */
    UploaderComponent.prototype.files;
    /** @type {?} */
    UploaderComponent.prototype.subscriptions;
    /** @type {?} */
    UploaderComponent.prototype.http;
    /** @type {?} */
    UploaderComponent.prototype.uploadService;
}
//# sourceMappingURL=uploader.component.js.map