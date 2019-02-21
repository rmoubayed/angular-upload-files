# Angular File Upload Module
 

# Introduction
An angular module for file uploads. A simple skeleton that you can easily add to, no extra features, just easy to style upload button, with basic upload functionality using the Angular HttpClient

Currently Tested on Angular 4+

# How To Use

## Installation: 

``` npm i ngx-simple-uploader ```

## Usage:

### Quick Example

#### example.component.ts:

```

import { Component, OnInit} from '@angular/core';
import { UploadService, UploadParams } from 'angular-upload-files';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example].component.css']
})
export class ExampleComponent implements OnInit {

  uploadParams : UploadParams;
  progress: string;
  fileCount: number;
  files: any[];

  constructor(private uploadService : UploadService) {}

  ngOnInit() {
    this.uploadParams = {
      formDataPropertyName: 'image', 
      extraParams: [{
        paramValueIsFromFile: true,
        paramValue: "name",
        paramName: "filename"
      }]
    }
    this.uploadService.currentUploadProgress.subscribe(
      (progress)=>{
        console.log(progress);
        this.progress = progress;
      }
    )
  }
  readFiles(event) {
    console.log(event, event.files, event.base64s); //read files from here, and if using images base64s also
    this.fileCount = event.files.length;

    // you can manipulate the files here, or just store them
    this.files = event.files;
  }
  uploadDone(event) {
    console.log(event);
    this.fileCount--;

    if(this.fileCount === 0) {
      //files are COMPLETELY done uploading
    }
  }
}

```

#### example.component.html

``` 

<app-uploader
(onFilesSelected)="readFiles($event)"
(onUploadComplete)="uploadDone($event)"
[buttonText]="'Choose File'"
[buttonClass]="'btn btn-default'"
[postUrl]="'https://api.imgur.com/3/image'"
[id]="0"
[multiple]="true"
[uploadParams]="uploadParams"
></app-uploader>

<p>{{progress}}% uploaded</p>



```

### App Module Setup:

``` 
import {SimpleUploaderModule} from 'angular-upload-files'; 
```

``` 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SimpleUploaderModule.forRoot(), // <---------------
    HttpClientModule,
    RouterModule.forRoot(Routes) 
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
}) 
```
### In your component:
```
import { UploadService, UploadParams } from 'angular-upload-files';

constructor(private uploadService : UploadService) { }


```

### Interfaces: 
```
export interface UploadParams {
  formDataPropertyName: string;
  extraParams : ExtraParams[];
}
export interface ExtraParams {
  paramValueIsFromFile: boolean;
  paramName: string;
  paramValue: any;
}
```
You must input a UploadParams object into each instance of the uploader:
``` formDataPropertyName: string; ``` The uploader will automatically append a FormData object with the file and file name attached, as well as the formDataPropertyName (this is how it looks internally):

``` formData.append(this.uploadParams.formDataPropertyName, file, file.name); ``` 

#### Extra Params:

Extra Params is for passing query string parameters to your request:

example: 

```
    this.uploadParams = {formDataPropertyName: 'image', extraParams: {
      paramValueIsFromFile: true, //paramValue will be accessed as file[paramValue] set false for value to be just paramValue
      paramValue: "name",
      paramName: "filename"
    }}
```
```
    this.uploadParams = {formDataPropertyName: 'image', extraParams: {
      paramValueIsFromFile: false, //paramValue will be accessed as paramValue (params.set(paramName, paramValue))
      paramValue: "name",
      paramName: "filename"
    }}
```



### Inputs:

| Input | Description |
| --- | --- |
| uploadParams: UploadParams | See UploadParams description above. |
| buttonText: string |  Set upload button text. |
| buttonClass: string | Set class value. like: "btn btn-primary" |
| id: number | Set uploader id |
| postUrl: string | Uploader target url |



### Events:

| Event | Description |
| --- | --- |
| (onFilesSelected) | event containing {files: files} OR {files: files, base64s: base64ImgUrls} based on 'usingImages' |
| (onUploadComplete) | Event fired on each upload completion containing {response: event, file: file} |


### Triggering events from your component:

| Event | Description |
| --- | --- |
| Start Upload | ``` this.uploadService.startUpload.next(files) ``` |

### Triggering events from your component: (MULTIPLE UPLOADERS)

| Event | Description |
| --- | --- |
| Start Upload | ``` this.uploadService.startUpload.next(files) ``` |


NOTE: You may omit the componentId but all uploaders will receive the sent event if you do so.

### Upload Progress:

```
this.uploadService.currentUploadProgress.subscribe(
    (progress)=>{
        console.log(progress);
    }
)

```

# DEMO

Coming Soon
