import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class UploadService {
    constructor() {
        this.startUpload = new Subject();
        this.currentUploadProgress = new Subject();
        this.clearImages = new Subject();
        this.removeImage = new Subject();
    }
}
UploadService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UploadService.ctorParameters = () => [];
function UploadService_tsickle_Closure_declarations() {
    /** @type {?} */
    UploadService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UploadService.ctorParameters;
    /** @type {?} */
    UploadService.prototype.startUpload;
    /** @type {?} */
    UploadService.prototype.currentUploadProgress;
    /** @type {?} */
    UploadService.prototype.clearImages;
    /** @type {?} */
    UploadService.prototype.removeImage;
}
//# sourceMappingURL=upload.service.js.map