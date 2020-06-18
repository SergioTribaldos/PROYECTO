import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUser, getUserId } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/auth/model/user';
import { Observable } from 'rxjs';
import { Category, Condition, ProductTags } from '../model/product';
import { FileEmitter } from '@shared/upload-file-input/upload-file-input.component';
import { take } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { ChipsListComponent } from '@shared/chips-list/chips-list.component';
import { NotificationsService } from '@shared/notifications.service';
import { PRODUCT_ACTIONS } from '../store/product.actions';
import { USER_PRODUCT_ACTIONS } from 'src/app/user-menu/store/user-product.actions';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css'],
})
export class ProductUploadComponent implements OnInit {
  form: FormGroup;
  isCorrectForm = false;
  filesNotLoaded: boolean;

  userDetails$: Observable<User>;

  categoryList: Object = Object.entries(Category);
  conditionList: Object = Object.entries(Condition);
  productTagsList: Object = ProductTags;

  selectedCategory;
  formData: FormData = new FormData();
  userId: string;

  selectedTags: Object = {};
  selectedImages: Object = {};

  @ViewChild(ChipsListComponent) chipsList: ChipsListComponent;

  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private productService: ProductService,
    private notificationsService: NotificationsService
  ) {
    this.form = fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      condition: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(600)]],
      images: [{}, Validators.required],
      price: ['', Validators.required],
      accept_changes: [false],
      price_negotiable: [false],
    });
  }

  ngOnInit(): void {
    this.userDetails$ = this.store.pipe(select(getUser));
    this.store.pipe(select(getUserId), take(1)).subscribe((id) => {
      this.userId = id;
    });
  }

  setTags(val) {
    this.form.patchValue({ tags: val });
  }

  setCategoryAndResetTags(value: string) {
    this.selectedCategory = value;
    this.form.patchValue({ tags: '' });
    this.chipsList.setCategoryAndResetTags(value);
  }

  addOrRemoveImageToForm({ file, action, inputId }: FileEmitter) {
    if (action == 'add') {
      this.selectedImages[inputId] = file;
      this.filesNotLoaded = false;
    } else {
      delete this.selectedImages[inputId];
    }
    this.form.get('images').setValue(this.selectedImages);
  }

  uploadProduct() {
    if (!this.checkFormValidity()) {
      return false;
    }

    this.mergeCategoryAndTags();
    this.setFormDataValues();

    this.productService
      .uploadProduct(this.formData)
      .subscribe(({ msg, status }) => {
        this.notificationsService.showNotification(msg, status);
        this.store.dispatch(USER_PRODUCT_ACTIONS.reloadUserProducts());
      });
  }

  checkFormValidity() {
    this.form.markAllAsTouched();
    if (!Object.keys(this.selectedImages).length) {
      this.filesNotLoaded = true;
      return false;
    }
    return this.form.valid;
  }

  mergeCategoryAndTags() {
    return `${this.form.get('category').value} ${Object.values(
      this.form.get('tags').value
    ).join(' ')}`;
  }

  appendImagesToFormData(): void {
    this.formData.delete('files');

    Object.values(this.form.get('images').value).forEach(
      (file: File, index) => {
        this.formData.append('files', file, (index + 1).toString());
      }
    );
  }

  setFormDataValues() {
    this.formData.set('title', this.form.get('title').value);
    this.formData.set('categories', this.mergeCategoryAndTags());
    this.formData.set('condition', this.form.get('condition').value);
    this.formData.set('description', this.form.get('description').value);
    this.formData.set('price', this.form.get('price').value);
    this.formData.set('accept_changes', this.form.get('accept_changes').value);
    this.formData.set(
      'price_negotiable',
      this.form.get('price_negotiable').value
    );
    this.formData.set('userId', this.userId);
    this.appendImagesToFormData();
  }
}
