import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./pages/items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
