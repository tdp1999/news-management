import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { OrderNumberModule } from 'src/app/common/pipe/order-number/order-number.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { MatSortModule } from '@angular/material/sort';

const MaterialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatSortModule,
];

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    OrderNumberModule,
    LoadingSpinnerModule,
    ...MaterialModules,
  ],
  exports: [DatatableComponent],
})
export class DatatableModule {}
