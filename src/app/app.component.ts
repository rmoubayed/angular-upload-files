import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UploadService } from './uploader/uploader/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private uploadService : UploadService) {

  }
  ngOnInit() {

  }
  readFiles(event) {
    console.log(event);
    this.uploadService.startUpload.next(event);
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
