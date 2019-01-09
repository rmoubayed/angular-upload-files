import { UploadService } from './upload.service';
import { HttpClient } from '@angular/common/http';
import { OnInit, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
export interface UploadParams {
    formDataPropertyName: string;
    extraParams: ExtraParams[];
}
export interface ExtraParams {
    paramValueIsFromFile: boolean;
    paramName: string;
    paramValue: any;
}
export declare class UploaderComponent implements OnInit, OnDestroy, AfterViewInit {
    private http;
    private uploadService;
    buttonText: string;
    postUrl: string;
    imagesRemovable: boolean;
    usingImages: boolean;
    buttonClass: string;
    imageWidth: string;
    multiple: boolean;
    showImagesOnAdd: boolean;
    id: number;
    uploadParams: UploadParams;
    onFilesSelected: EventEmitter<any>;
    onUploadComplete: EventEmitter<any>;
    onImageRemoved: EventEmitter<any>;
    onFileRemoved: EventEmitter<any>;
    currentSourceImageIndex: number;
    images: any[];
    files: File[];
    private subscriptions;
    constructor(http: HttpClient, uploadService: UploadService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getBase64(file: any): Promise<{}>;
    onFileSelected(event: any): void;
    onUpload(file: File): void;
    removeImage(index: any): void;
    removeFile(index: any): void;
    clearFiles(): void;
    addButtonStyle(className: string): void;
    sortImages(event: any): void;
    checkPos(event: any, index: any): void;
    opacitize(index: any, opacity: any): void;
    resetOpacity(): void;
    ngOnDestroy(): void;
}
