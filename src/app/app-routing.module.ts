import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    data: {
      title: 'Home',
      breadcrumb: 'Home',
    },
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
    data: {
      title: 'Categories',
      breadcrumb: 'Categories',
    },
  },
  {
    path: 'items',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/items/items.module').then((m) => m.ItemsModule),
        data: {
          title: 'News List',
          breadcrumb: 'News List',
        },
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./pages/new-item/new-item.module').then(
            (m) => m.NewItemModule
          ),
        data: {
          title: 'Create News',
          breadcrumb: 'Create News',
        },
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('./pages/new-item/new-item.module').then(
            (m) => m.NewItemModule
          ),
        data: {
          title: 'Edit News',
          breadcrumb: 'Edit News',
        },
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
