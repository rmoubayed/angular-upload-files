
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UploadService } from './uploader/uploader/upload.service';
import { UploadParams } from './uploader/uploader/uploader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
