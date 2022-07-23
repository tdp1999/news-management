import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { ConfirmDialogModule } from 'src/app/shared-components/confirm-dialog/confirm-dialog.module';

const routes: Routes = [{ path: '', component: CategoriesComponent }];

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
];

@NgModule({
  declarations: [CategoriesComponent, AddCategoryDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DatatableModule,
    ConfirmDialogModule,
    ...MaterialModules,
  ],
})
export class CategoriesModule {}
