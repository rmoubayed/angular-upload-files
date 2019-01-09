import { UploadParams } from './../../.ng_build/ts/src/app/uploader/uploader/uploader.component.d';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UploadService } from './uploader/uploader/upload.service';

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
    [uploadParams]="uploadParams"
    ></app-uploader>
  `,
  styles: [`

  `]
})
export class AppComponent implements OnInit {
  uploadParams : UploadParams;
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
    this.uploadService.startUpload.next(event.files);
    this.uploadService.currentUploadProgress.subscribe(
      (progress)=>{
        console.log(progress);
      }
    )
  }
  uploadDone(event) {
    console.log(event);
  }
}
