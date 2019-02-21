import { UploaderComponent } from './uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
export class SimpleUploaderModule {
    /**
     * Guaranteed singletons for provided Services across App.
     *
     * @return {?} An Angular Module with Providers
     */
    static forRoot() {
        return {
            ngModule: SimpleUploaderModule,
            providers: [
                UploadService,
            ]
        };
    }
}
SimpleUploaderModule.decorators = [
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
SimpleUploaderModule.ctorParameters = () => [];
function SimpleUploaderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    SimpleUploaderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SimpleUploaderModule.ctorParameters;
}
//# sourceMappingURL=uploader.module.js.map