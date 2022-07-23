import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

// Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

const MaterialModules = [MatIconModule, MatDialogModule];

@NgModule({
  declarations: [FooterComponent, AboutDialogComponent],
  imports: [CommonModule, ...MaterialModules],
  exports: [FooterComponent],
})
export class FooterModule {}
