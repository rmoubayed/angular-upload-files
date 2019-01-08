import { UploaderComponent } from './uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
export class UploaderModule {
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
function UploaderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    UploaderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UploaderModule.ctorParameters;
}
//# sourceMappingURL=uploader.module.js.map