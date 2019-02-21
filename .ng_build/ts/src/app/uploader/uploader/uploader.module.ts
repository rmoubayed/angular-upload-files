import { UploaderComponent, UploadParams } from './uploader.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UploaderComponent,
  ],
  exports: [
    UploaderComponent
  ]
})
export class SimpleUploaderModule { 
     /**
   * Guaranteed singletons for provided Services across App.
   *
   * @return          An Angular Module with Providers
   */
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SimpleUploaderModule,
          providers: [
            UploadService,
          ]
        };
      }
}