import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory } from 'src/app/common/interface/ICategory';
import { IListFilter } from 'src/app/common/interface/IListFilter';
import { ActionType } from 'src/app/common/interface/table/EAction';
import { IColumn } from 'src/app/common/interface/table/IColumn';
import { CategoryApiService } from 'src/app/common/service/category-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public filter: IListFilter = {
    _page: 1,
    // _limit: 5,
    q: '',
  };

  public actionType = ActionType;
  public categories$!: Observable<ICategory[]>;
  public displayedColumn = ['#', 'name', 'create_at'];
  public columns: IColumn[] = [
    {
      columnDef: '#',
      header: 'No.',
      cell: (element: any) => '0',
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'create_at',
      header: 'Created At',
      cell: (element: any) => `${element.create_at}`,
    },
  ];

  public totalItems: number = 0;
  public categorySubject$ = new BehaviorSubject<boolean>(true);

  constructor(
    private _categoryService: CategoryApiService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Use BehaviorSubject to notify the table to update
    this.categories$ = this.categorySubject$.asObservable().pipe(
      switchMap(() => {
        return this._categoryService.getCategoryList(this.filter).pipe(
          map((data: any) => {
            this.totalItems = data.paginations._totalRow;
            return data.data;
          })
        );
      })
    );
  }

  // ---------- MAIN FUNCTION ---------- //
  onActionTriggered(event: any): void {
    let { type, payload } = event;

    switch (type) {
      case ActionType.CREATE:
        console.log('Create');

        // this.addCategory();
        break;

      case ActionType.EDIT:
        console.log('Edit');
        // this.editCategory(payload);
        break;

      case ActionType.DELETE:
        console.log('Delete');
        // this.deleteCategory(payload);
        break;
    }
  }

  onPaginationChange(event: PageEvent): void {
    this.filter._page = event.pageIndex + 1;
    this.filter._limit = event.pageSize;
    this.categorySubject$.next(true);
  }

  onSearch() {
    console.log(this.filter.q);
  }
}
