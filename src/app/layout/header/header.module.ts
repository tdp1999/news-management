import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

// Import routing module for
import { RouterModule } from '@angular/router';

// Import Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatMenuModule,
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, ...MaterialModules],
  exports: [HeaderComponent],
})
export class HeaderModule {}
