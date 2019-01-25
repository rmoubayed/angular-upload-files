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
  template: `
    <input style="display: none" type="file" [multiple]="multiple" (change)="onFileSelected($event)" id="fileInput" #fileInput>
    <button id="uploadBtn{{id!==undefined?id:''}}" type="button" (click)="fileInput.click()">{{buttonText}}</button>
    <div class="imageContainer" *ngIf="showImagesOnAdd" >
      <img
      id="drag{{v}}"
      (click)="removeImage(v)"
      *ngFor="let image of images; let v=index"                                 
      [ngStyle]="{'width' : imageWidth}" [src]="image" alt="noImg">
    </div>
  `,
  styles: [`
    .imageContainer {
        display: block;
    }
  `]
})
export class UploaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() buttonText: string = 'Choose File';
  @Input() postUrl: string;
  @Input() imagesRemovable: boolean;
  @Input() usingImages: boolean;
  @Input() buttonClass: string;
  @Input() imageWidth: string;
  @Input() multiple: boolean;
  @Input() showImagesOnAdd: boolean;
  @Input() id: number;
  @Input() uploadParams: UploadParams;
  @Output() onFilesSelected : EventEmitter<any> = new EventEmitter<any>();
  @Output() onUploadComplete : EventEmitter<any> = new EventEmitter<any>();
  @Output() onImageRemoved : EventEmitter<any> = new EventEmitter<any>();
  @Output() onFileRemoved : EventEmitter<any> = new EventEmitter<any>();

  currentSourceImageIndex : number;

  images: any[] = [];
  files : File[] = [];
  private subscriptions : Subscription[] = [];
  constructor(private http : HttpClient, private uploadService : UploadService) { }

  ngOnInit() {
    this.subscriptions.push(this.uploadService.startUpload.subscribe(
      (files)=>{
        for(let i=0; i<files.length;i++) {
          this.onUpload(files[i]);
        }
      }
    ))
    this.subscriptions.push(this.uploadService.clearFiles.subscribe((data:any)=>{
      let len = JSON.parse(JSON.stringify(this.images.length));
      if(data.id === this.id) {
        for(let i=0;i<this.files.length;i++) {
          this.removeFile(i);
        } 
      }
    }))
    this.subscriptions.push(this.uploadService.removeImage.subscribe((data:any)=>{
      // console.log('removing');
      if(data.id === this.id) {
        this.removeImage(data.index);
      }
    }))
    this.subscriptions.push(this.uploadService.removeFile.subscribe((data:any)=>{
      // console.log('removing');
      if(data.id === this.id) {
        this.removeImage(data.index);
      }
    }))
  }
  ngAfterViewInit() {
    this.addButtonStyle(this.buttonClass);
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  onFileSelected(event) {
    this.clearFiles();
    if(event && event.target && event.target.files) {
      let files = <FileList> event.target.files;
      if(this.usingImages) {
        for(let i=0; i<files.length;i++) {
          console.log(files[i], event);
          this.getBase64(files[i]).then(
            data => {
              this.images.push(data);
              if(this.images.length === files.length) {
                this.onFilesSelected.emit({files: files, base64s: this.images});
              }
            }
          );
        }
      } else {
        this.onFilesSelected.emit({files: files});
      }
    }
  }
  onUpload(file : File) {
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
  }
  removeImage(index) {
    if(this.imagesRemovable && this.usingImages) {
      this.files.splice(index, 1);
      this.images.splice(index, 1);
      this.onImageRemoved.emit();
      (<HTMLInputElement>document.getElementById('fileInput')).value = "";
    }
  }
  removeFile(index) {
    this.files.splice(index, 1);
    this.onFileRemoved.emit();
    (<HTMLInputElement>document.getElementById('fileInput')).value = "";
  }
  clearFiles() {
    this.files = <File[]>[];
    this.images = [];
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
  sortImages(event) {
    // alert();
    console.log(event);
    // let targetId = event.toElement.id;
    // if(targetId.includes('drag')) {
    //   let targetIndex = +targetId.replace('drag', '');
    //   let temp = this.images[targetIndex];
    //   this.images[targetIndex] = this.images[this.currentSourceImageIndex];
    //   this.images[this.currentSourceImageIndex] = temp;
    //   this.files[targetIndex] = this.files[this.currentSourceImageIndex];
    //   this.files[this.currentSourceImageIndex] = temp;
    //   this.currentSourceImageIndex = undefined;
    //   this.resetOpacity();
    // }
  }
  checkPos(event, index) {
    console.log('starting');
    if(!this.currentSourceImageIndex) {
      this.currentSourceImageIndex = index;
    }
  }
  opacitize(index, opacity){
    console.log('OPACCCC');
    if(index !== this.currentSourceImageIndex) {
      console.log(index);
      let img = <HTMLImageElement>document.getElementById('drag'+index);
      img.style.opacity = opacity;
    }
  }
  resetOpacity() {
    // for(let i=0; i<this.urls.length;i++) {
    //   let img = <HTMLImageElement>document.getElementById('drag'+i);
    //   img.style.opacity = '1';     
    // }
  }
  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
