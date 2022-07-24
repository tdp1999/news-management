import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';
import { ConfirmDialogModule } from 'src/app/shared-components/confirm-dialog/confirm-dialog.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ItemsComponent }];

// Material Modules
const MaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DatatableModule,
    ConfirmDialogModule,
    ...MaterialModules,
  ],
})
export class ItemsModule {}
