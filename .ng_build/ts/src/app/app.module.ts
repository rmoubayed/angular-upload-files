import { SimpleUploaderModule } from './uploader/uploader/uploader.module';
import { UploadService } from './uploader/uploader/upload.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { UploaderComponent } from './uploader/uploader/uploader.component';
import { RouterModule, Router } from '@angular/router';
import { Routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SimpleUploaderModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }