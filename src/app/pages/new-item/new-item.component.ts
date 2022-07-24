import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NEWS_STATUS } from 'src/app/common/constant/news-status';
import { IBreadcrumb } from 'src/app/common/interface/IBreadcrumb';
import { ICategory } from 'src/app/common/interface/ICategory';
import { IItem } from 'src/app/common/interface/IItem';
import { CategoryApiService } from 'src/app/common/service/category-api.service';
import { ItemApiService } from 'src/app/common/service/item-api.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public categories$!: Observable<ICategory[]>;
  public newStatus = NEWS_STATUS;

  public title = 'Add News';
  public breadcrumbItems: IBreadcrumb[] = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Items',
      url: '/items',
    },
    {
      label: 'Item Details',
      url: '',
    },
  ];

  public isEdit = false;
  public isEditorLoading = false;
  public onSubmit = false;

  private _subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryApiService,
    private _itemService: ItemApiService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.isEditorLoading = true;

    this._subscription.add(
      this._activatedRoute.params.subscribe((params) => {
        if (params['id']) {
          this._itemService.retrieveItem(params['id']).subscribe((res) => {
            this.title = 'Edit News';
            this.isEdit = true;
            this.generateForm(res);
          });
        } else {
          this.generateForm();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
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
      this.form.addControl('createAt', this._fb.control(editValue.createAt));
      let slugControl = this.form.get('slug') as FormControl;
      slugControl?.disable();
      slugControl?.removeAsyncValidators;
    }
  }

  submitForm() {
    this.onSubmit = true;

    if (this.form.invalid) {
      this.onSubmit = false;
      return;
    }
    this.isEdit ? this.updateNews() : this.addNews();
  }

  addNews() {
    this._itemService.addItem(this.form.value).subscribe(
      (res: any) => {
        this._snackbar.open('Add Item Success', 'Close', { duration: 2000 });
        this._router.navigate(['/items']);
      },
      (err: any) => {
        this._snackbar.open('Add Item Failed', 'Close', {
          duration: 2000,
        });
      },
      () => {}
    );
  }

  updateNews() {
    this._itemService.updateItem(this.form.value).subscribe((res) => {
      this._snackbar.open('Update Successfully', '', {
        duration: 2000,
      });
      this._router.navigate(['/items']);
      return;
    });
  }
}
