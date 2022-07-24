import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewItemComponent } from './new-item.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from 'src/app/shared-components/loading-spinner/loading-spinner.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [{ path: '', component: NewItemComponent }];

// Material Modules
const MaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  // MatTooltipModule,
  // MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [NewItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LoadingSpinnerModule,
    EditorModule,
    ...MaterialModules,
  ],
})
export class NewItemModule {}
