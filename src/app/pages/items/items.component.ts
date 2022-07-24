import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Observable, Subscription } from 'rxjs';
import { filter, switchMap, startWith, map } from 'rxjs/operators';
import { IItem } from 'src/app/common/interface/IItem';
import { IListFilter } from 'src/app/common/interface/IListFilter';
import { ActionType } from 'src/app/common/interface/table/EAction';
import { IColumn } from 'src/app/common/interface/table/IColumn';
import { ItemApiService } from 'src/app/common/service/item-api.service';
import { ConfirmDialogComponent } from 'src/app/shared-components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('search') search!: ElementRef;
  public actionType = ActionType;
  public items$!: Observable<IItem[]>;

  public displayedColumn = ['#', 'title', 'status', 'createAt'];
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
      columnDef: 'status',
      header: 'Status',
      cell: (element: any) => `${element.status}`,
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

  public itemSubject$ = new BehaviorSubject<boolean>(true);
  public searchControl = new FormControl();

  private _subscription: Subscription = new Subscription();

  constructor(
    private _itemService: ItemApiService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemSubject$.asObservable().pipe(
      switchMap(() => {
        return this._itemService.getItemList(this.filter).pipe(
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

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this.itemSubject$.unsubscribe();
  }

  onActionTriggered(event: any): void {
    let { type, payload } = event;

    switch (type) {
      case ActionType.CREATE:
        this._router.navigate(['/items/create']);
        break;

      case ActionType.EDIT:
        this._router.navigateByUrl(`/items/${payload}/edit`);
        break;

      case ActionType.DELETE:
        this.deleteItem(payload);
        break;
    }
  }

  // ---------- DELETE ---------- //
  deleteItem(Item: IItem): void {
    let confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Item',
        message: 'Are you sure you want to delete this Item?',
        submitText: 'Delete',
      },
    });

    this._subscription.add(
      confirmDialogRef
        .afterClosed()
        .pipe(
          switchMap((result) => {
            return result === 'Confirmed'
              ? this._itemService.deleteItemByID(Item.id)
              : of(null);
          }),
          filter((result) => result !== null)
        )
        .subscribe((data) => {
          this.itemSubject$.next(true);
          this._snackbar.open('Item deleted', 'Dismiss', {
            duration: 2000,
          });
        })
    );
  }

  onPaginationChange(event: PageEvent): void {
    this.filter._page = event.pageIndex + 1;
    this.filter._limit = event.pageSize;
    this.itemSubject$.next(true);
  }

  onSortChange(event: Sort): void {
    console.log(event);
    this.filter._sort = event.active;
    this.filter._order = event.direction;
    this.itemSubject$.next(true);
  }
}
