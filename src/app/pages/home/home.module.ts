import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: HomeComponent }];

const MaterialModules = [MatButtonModule];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ...MaterialModules],
})
export class HomeModule {}
