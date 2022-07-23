import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const MaterialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [DatatableComponent],
  imports: [CommonModule, ...MaterialModules],
  exports: [DatatableComponent],
})
export class DatatableModule {}
