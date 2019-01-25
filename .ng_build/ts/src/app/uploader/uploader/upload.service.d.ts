import { Subject } from "rxjs/Subject";
export declare class UploadService {
    startUpload: Subject<any>;
    currentUploadProgress: Subject<any>;
    clearImages: Subject<any>;
    removeImage: Subject<any>;
}
