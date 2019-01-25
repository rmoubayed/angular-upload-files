
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UploadService } from './uploader/uploader/upload.service';
import { UploadParams } from './uploader/uploader/uploader.component';

@Component({
  selector: 'app-root',
  template: `


    <app-uploader
    (onFilesSelected)="readFiles($event)"
    (onUploadComplete)="uploadDone($event)"
    [buttonText]="'Choose Image'"
    [buttonClass]="'btn btn-default'"
    [postUrl]="'https://api.imgur.com/3/image'"
    [id]="0"
    [multiple]="true"
    [usingImages]="true"
    [showImagesOnAdd]="true"
    [imageWidth]="'180px'"
    [imagesRemovable]="true"
    [uploadParams]="uploadParams"
    ></app-uploader>

    <p>{{progress}}% uploaded</p>
  `,
  styles: [`

  `]
})
export class AppComponent implements OnInit {
  uploadParams : UploadParams;
  progress: string;
  constructor(private router: Router, private uploadService : UploadService) {

  }
  ngOnInit() {
    this.uploadParams = {
      formDataPropertyName: 'image', 
      extraParams: [{
        paramValueIsFromFile: true,
        paramValue: "name",
        paramName: "filename"
      }]
    }
  }
  readFiles(event) {
    console.log(event);
    this.uploadService.clearImages.next({});
    // this.uploadService.startUpload.next(event.files);
    this.uploadService.currentUploadProgress.subscribe(
      (progress)=>{
        console.log(progress);
        this.progress = progress;
      }
    )
  }
  uploadDone(event) {
    console.log(event);
  }
}
