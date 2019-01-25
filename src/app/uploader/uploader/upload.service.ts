import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UploadService {
    startUpload : Subject<any> = new Subject<any>();
    currentUploadProgress: Subject<any> = new Subject<any>();
    clearImages: Subject<any> = new Subject<any>();
    removeImage: Subject<any> = new Subject<any>();
}
