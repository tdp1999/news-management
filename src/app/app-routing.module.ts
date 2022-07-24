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
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/items/items.module').then((m) => m.ItemsModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./pages/new-item/new-item.module').then(
            (m) => m.NewItemModule
          ),
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('./pages/new-item/new-item.module').then(
            (m) => m.NewItemModule
          ),
      },
    ],
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
