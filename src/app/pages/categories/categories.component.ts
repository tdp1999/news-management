import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { ICategory, IPostCategory } from 'src/app/common/interface/ICategory';
import { IListFilter } from 'src/app/common/interface/IListFilter';
import { ActionType } from 'src/app/common/interface/table/EAction';
import { IColumn } from 'src/app/common/interface/table/IColumn';
import { CategoryApiService } from 'src/app/common/service/category-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  catchError,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared-components/confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search') search!: ElementRef;

  public actionType = ActionType;
  public categories$!: Observable<ICategory[]>;

  public displayedColumn = ['#', 'title', 'createAt'];
  public columns: IColumn[] = [
    {
      columnDef: '#',
      header: 'No.',
      cell: (element: any) => '0',
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: any) => `${element.title}`,
      isSortable: true,
    },
    {
      columnDef: 'createAt',
      header: 'Created At',
      cell: (element: any) => `${element.createAt}`,
      isSortable: true,
    },
  ];
  public totalItems = 0;
  public filter: IListFilter = {
    _page: 1,
    _sort: 'createAt',
    _order: 'desc',
    q: '',
  };

  public categorySubject$ = new BehaviorSubject<boolean>(true);
  public searchControl = new FormControl();

  private _subscription: Subscription = new Subscription();

  constructor(
    private _categoryService: CategoryApiService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Use BehaviorSubject to notify the table to update
    this.categories$ = this.categorySubject$.asObservable().pipe(
      switchMap(() => {
        return this._categoryService.getCategoryList(this.filter).pipe(
          startWith(undefined),
          map((data: any) => {
            if (data) {
              this.totalItems = data.paginations._totalRow;
              return data.data;
            }

            return undefined;
          })
        );
      })
    );
  }

  ngAfterViewInit(): void {
    this._subscription.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((search) => {
          this.filter.q = search;
          this.categorySubject$.next(true);
        })
    );
  }

  ngOnDestroy(): void {
    this.categorySubject$.unsubscribe();
    this._subscription.unsubscribe();
  }

  // ---------- MAIN FUNCTION ---------- //
  onActionTriggered(event: any): void {
    let { type, payload } = event;

    switch (type) {
      case ActionType.CREATE:
        this.addCategory();
        break;

      case ActionType.EDIT:
        this.editCategory(payload);
        break;

      case ActionType.DELETE:
        this.deleteCategory(payload);
        break;
    }
  }

  // ---------- CREATE ---------- //
  addCategory(): void {
    this._dialog.open(AddCategoryDialogComponent, {
      data: {
        action: this.actionType.CREATE,
        title: 'Create Category',
        callback: this.onAddCategory,
        thisRef: this,
      },
    });
  }

  onAddCategory(category: IPostCategory): void {
    this._subscription.add(
      this._categoryService.addCategory(category).subscribe((category) => {
        this.categorySubject$.next(true);
        this._snackbar.open('Category added', 'Dismiss', { duration: 2000 });
      })
    );
  }

  // ---------- EDIT ---------- //
  editCategory(id: string): void {
    this._subscription.add(
      this._categoryService
        .retrieveCategoryByID(id)
        .subscribe((category: any) => {
          this._dialog.open(AddCategoryDialogComponent, {
            data: {
              title: 'Edit Category',
              action: this.actionType.EDIT,
              payload: category,
              callback: this.onEditCategory,
              thisRef: this,
            },
          });
        })
    );
  }

  onEditCategory(category: ICategory): void {
    this._subscription.add(
      this._categoryService.updateCategory(category).subscribe((category) => {
        this.categorySubject$.next(true);
        this._snackbar.open('Category updated', 'Dismiss', { duration: 2000 });
      })
    );
  }

  // ---------- DELETE ---------- //
  deleteCategory(category: ICategory): void {
    let confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
        submitText: 'Delete',
      },
    });

    this._subscription.add(
      confirmDialogRef
        .afterClosed()
        .pipe(
          switchMap((result) => {
            return result === 'Confirmed'
              ? this._categoryService.deleteCategoryByID(category.id)
              : of(null);
          }),
          filter((result) => result !== null)
        )
        .subscribe((data) => {
          this.categorySubject$.next(true);
          this._snackbar.open('Category deleted', 'Dismiss', {
            duration: 2000,
          });
        })
    );
  }

  onPaginationChange(event: PageEvent): void {
    this.filter._page = event.pageIndex + 1;
    this.filter._limit = event.pageSize;
    this.categorySubject$.next(true);
  }

  onSortChange(event: Sort): void {
    this.filter._sort = event.active;
    this.filter._order = event.direction;
    this.categorySubject$.next(true);
  }
}
