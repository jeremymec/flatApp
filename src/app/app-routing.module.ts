import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'flat-list', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'flat-list', loadChildren: './flat-list/flat-list.module#FlatListPageModule' },
  { path: 'flat-details', loadChildren: './flat-details/flat-details.module#FlatDetailsPageModule' },
  { path: 'flat-details/:id', loadChildren: './flat-details/flat-details.module#FlatDetailsPageModule' },
  { path: 'flat-create', loadChildren: './flat-create/flat-create.module#FlatCreatePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
