import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/common/interface/ICategory';
import { IItem } from 'src/app/common/interface/IItem';
import { CategoryApiService } from 'src/app/common/service/category-api.service';
import { ItemApiService } from 'src/app/common/service/item-api.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  public form!: FormGroup;
  public categories$!: Observable<ICategory[]>;
  public isEditorLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryApiService,
    private _itemService: ItemApiService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.getCategoryList();
    this.isEditorLoading = true;
  }

  // Get Category List
  getCategoryList(): void {
    this.categories$ = this._categoryService.getCategoryListNoPagination();
  }

  // Form
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  generateForm(editValue?: IItem): void {
    this.form = this._fb.group({
      title: [editValue ? editValue.title : '', [Validators.required]],
      categoryId: [
        editValue ? editValue.categoryId : '',
        [Validators.required],
      ],
      status: [editValue ? editValue.status : '', [Validators.required]],
      content: [editValue ? editValue.content : '', [Validators.required]],
      date: [editValue ? editValue.date : '', [Validators.required]],
    });

    if (editValue) {
      this.form.addControl('id', this._fb.control(editValue.id));
      this.form.addControl('slug', this._fb.control(editValue.slug));
      let slugControl = this.form.get('slug') as FormControl;
      slugControl?.disable();
      slugControl?.removeAsyncValidators;
    }
  }

  submitForm() {
    this._itemService.addItem(this.form.value).subscribe(
      (res) => {
        this._snackbar.open('Add Item Success', 'Close', {
          duration: 2000,
        });
        // this._router.navigate(['/items']);
      },
      (err) => {
        this._snackbar.open('Add Item Failed', 'Close');
      }
    );
    console.log(this.form.value);
  }
}
