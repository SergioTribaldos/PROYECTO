import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import Compressor from 'compressorjs';

export type FileEmitter = {
  file: File;
  action: 'add' | 'remove';
  inputId: number;
};

@Component({
  selector: 'app-upload-file-input',
  templateUrl: './upload-file-input.component.html',
  styleUrls: ['./upload-file-input.component.css'],
})
export class UploadFileInputComponent implements OnInit {
  base64Image: string;
  inputFile: File;

  @Input() inputId;

  @Output() addOrRemoveImageToForm = new EventEmitter<FileEmitter>();
  @ViewChild('imageFile') imageFile: ElementRef;
  @ViewChild('image') image: ElementRef;
  constructor() {}

  ngOnInit() {}

  async onFileSelect(input) {
    this.inputFile = input.files[0];
    await this.compressImage().then((compressedImage: File) => {
      this.inputFile = compressedImage;
      this.addOrRemoveImageToForm.emit({
        file: this.inputFile,
        action: 'add',
        inputId: this.inputId,
      });
    });

    this.convertToBase64();
  }

  removeImage() {
    this.addOrRemoveImageToForm.emit({
      file: this.inputFile,
      action: 'remove',
      inputId: this.inputId,
    });
    this.image.nativeElement.value = undefined;
    this.imageFile.nativeElement.value = '';
    this.base64Image = '';
    this.inputFile = null;
  }

  private compressImage() {
    return new Promise((resolve, reject) => {
      new Compressor(this.inputFile, {
        quality: 0.5,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    });
  }

  private convertToBase64() {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.base64Image = e.target.result;
    };
    reader.readAsDataURL(this.inputFile);
  }
}
