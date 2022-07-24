import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActionType } from 'src/app/common/interface/table/EAction';
import { IColumn } from 'src/app/common/interface/table/IColumn';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() columns!: IColumn[];
  @Input() dataSource: any[] | undefined | null = [];
  @Input() displayedColumns!: string[];
  @Input() actions: ActionType[] = [];
  @Input() totalItems: number = 0;

  @ViewChild(MatTable) table!: MatTable<unknown>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() onActionTriggered: EventEmitter<{
    type: ActionType;
    payload: string;
  }> = new EventEmitter();
  @Output() onPaginationChange: EventEmitter<PageEvent> = new EventEmitter();
  @Output() onSortChange: EventEmitter<Sort> = new EventEmitter();

  public data: MatTableDataSource<any> = new MatTableDataSource();
  public actionType = ActionType;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: any): void {
    this.data.data = this.dataSource ?? [];
    // this.data.sort = this.sort;
  }

  ngOnInit(): void {
    if (this.actions.length > 0)
      this.displayedColumns = [...this.displayedColumns, 'action'];
  }

  ngAfterViewInit(): void {}

  actionTriggered(type: ActionType, payload: any): void {
    this.onActionTriggered.emit({
      type,
      payload,
    });
  }

  pageChange(event: PageEvent) {
    this.onPaginationChange.emit(event);
  }

  sortData(event: Sort) {
    // this.sort.active = event.active;
    // this.sort.direction = event.direction;
    // this.data.sort = this.sort;
    // console.log(this.sort);
    // console.log(this.data.sort);
    // this._cdr.markForCheck();
    this.onSortChange.emit(event);
  }
}
