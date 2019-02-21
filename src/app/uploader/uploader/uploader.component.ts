import { UploadService } from './upload.service';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export interface UploadParams {
  formDataPropertyName: string;
  extraParams : ExtraParams[];
}
export interface ExtraParams {
  paramValueIsFromFile: boolean;
  paramName: string;
  paramValue: any;
}
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() buttonText: string = 'Choose File';
  @Input() postUrl: string;
  @Input() buttonClass: string;
  @Input() multiple: boolean;
  @Input() id: number;
  @Input() uploadParams: UploadParams;
  @Output() onFilesSelected : EventEmitter<any> = new EventEmitter<any>();
  @Output() onUploadComplete : EventEmitter<any> = new EventEmitter<any>();

  uploadInProgress: boolean = false;

  count: number;

  private subscriptions : Subscription[] = [];
  constructor(private http : HttpClient, private uploadService : UploadService) { }

  ngOnInit() {
    this.subscriptions.push(this.uploadService.startUpload.subscribe(
      (files)=>{
        this.uploadInProgress = true;
        for(let i=0; i<files.length;i++) {
          this.onUpload(files[i]);
        }
      }
    ))
  }
  ngAfterViewInit() {
    this.addButtonStyle(this.buttonClass);
  }
  onFileSelected(event) {
    console.log(event);
    if(event && event.target && event.target.files) {
      let files = <FileList> event.target.files;
      this.count = files.length;
      this.onFilesSelected.emit({files: files});
    }
  }
  onUpload(file : File) {
    this.count--;
    let fd = new FormData();
    fd.append(this.uploadParams.formDataPropertyName, file, file.name);
    let params = new HttpParams();;
    this.uploadParams.extraParams.forEach(
      param => {
        params = params.set(param.paramName, (param.paramValueIsFromFile ? file[param.paramValue] : param.paramValue));
      }
    )
    this.http.post(this.postUrl, fd, {params: params, reportProgress:true, observe:'events'})
    .subscribe(
      (event) => {
        if(event.type === HttpEventType.UploadProgress) {
          // console.log('Upload Progress:', Math.round(event.loaded / event.total*100)+'%' );
          this.uploadService.currentUploadProgress.next((event.loaded / event.total*100));
        } else if( event.type === HttpEventType.Response) {
          // console.log('Response: ', event);
          this.onUploadComplete.emit({response: event, file: file});
        }
      }
    )
    if(this.count === 0) {
      this.uploadInProgress = false;
    }
  }
  addButtonStyle(className : string) {
    if(className.indexOf(' ') !== -1) {
      let classes = className.split(' ');
      for(let i=0; i<classes.length;i++) {
        if(!(<HTMLButtonElement>document.getElementById('uploadBtn'+(this.id!==undefined?this.id:''))).classList.contains(classes[i])) {
          (<HTMLButtonElement>document.getElementById('uploadBtn'+(this.id!==undefined?this.id:''))).classList.add(classes[i]); 
        }  
      }
    } else {
      if(!(<HTMLButtonElement>document.getElementById('uploadBtn'+(this.id!==undefined?this.id:''))).classList.contains(className)) {
        (<HTMLButtonElement>document.getElementById('uploadBtn'+(this.id!==undefined?this.id:''))).classList.add(className); 
      }  
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
