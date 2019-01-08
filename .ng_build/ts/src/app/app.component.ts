import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UploadService } from './uploader/uploader/upload.service';

@Component({
  selector: 'app-root',
  template: `


    <app-uploader
    (onFilesSelected)="readFiles($event)"
    (onUploadComplete)="uploadDone($event)"
    [buttonText]="'Choose Front Image'"
    [buttonClass]="'btn btn-default'"
    [postUrl]="'http://127.0.0.1:1334/lotus/product'"
    [id]="0"
    ></app-uploader>

    <app-uploader
    (onFilesSelected)="readFiles($event)"
    (onUploadComplete)="uploadDone($event)"
    [buttonText]="'Choose Front Image'"
    [buttonClass]="'btn btn-default'"
    [postUrl]="'http://127.0.0.1:1334/lotus/product'"
    [id]="1"
    ></app-uploader>


    <app-uploader
    (onFilesSelected)="readFiles($event)"
    (onUploadComplete)="uploadDone($event)"
    [buttonText]="'Choose Front Image'"
    [buttonClass]="'btn btn-default'"
    [postUrl]="'http://127.0.0.1:1334/lotus/product'"
    [id]="2"
    ></app-uploader>
  `,
  styles: [`

  `]
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
