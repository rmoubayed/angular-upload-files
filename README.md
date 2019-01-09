#Angular File Upload Module
 

#Introduction
An angular module for file uploads. Works great with images.

Currently Tested on Angular 4, Compatibility will be updated soon for other versions.

DEMO IN THE WORKS

#How To Use

##Installation: 

``` npm i angular-upload-files ```

##Usage:

###App Module Setup:

``` 
import {UploaderModule} from 'angular-upload-files'; 
```

``` 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UploaderModule.forRoot(), // <---------------
    HttpClientModule,
    RouterModule.forRoot(Routes) 
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
}) 
```
###In your component:
```
import { UploadService, UploadParams } from 'angular-upload-files';

constructor(private uploadService : UploadService) { }


```

###Interfaces: 
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

####Extra Params:
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



###Inputs:
| Input | Description |
| --- | --- |
| uploadParams: UploadParams | See UploadParams description above.|
| buttonText: string |  Set upload button text. |
| buttonClass: string | Set class value. like: "btn btn-primary" |
| id: number | Set uploader id |
| postUrl: string | Uploader target url |
| usingImages: boolean |  Set to true if images (and only images) are being uploaded. |
| showImagesOnAdd: boolean | If usingImages is set to true, images will show in the DOM on add  |
| showImagesOnAddWidth: string | CSS width value. like: "180px"  |
| imagesRemovable: boolean | Images will be removed on click  |



###Events:

| Event | Description |
| --- | --- |
| (onFilesSelected) | event containing {files: files} OR {files: files, base64s: base64ImgUrls} based on 'usingImages' |
| (onUploadComplete) | Event fired on each upload completion containing {response: event, file: file} |
| (onImageRemoved) | Event fired when when you remove an image (usingIMages mode)  |
| (onFileRemoved) | Event fired when when you remove a file |

###Triggering events from your component:

| Event | Description |
| --- | --- |
| Start Upload | ``` this.uploadService.startUpload.next(files) ``` |
| Remove Image | ``` this.uploadService.removeImage.next({id: componentId, index: file/image index}) ``` |
| Remove File | ``` this.uploadService.removeFile.next({id: componentId, index: file index}) ``` |
| Clear Files |  ``` this.uploadService.clearFiles.next({id: componentId}) ``` |

###Upload Progress:

```
this.uploadService.currentUploadProgress.subscribe(
    (progress)=>{
        console.log(progress);
    }
)

```

#DEMO

Detailed Example and Demo coming soon.
