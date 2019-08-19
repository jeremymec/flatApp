import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard, FlatGuard} from './services.guard';

/**
 * The routes of the application.
 * Adding [FlatGuard] will prevent a user from accessing the page when they're not in a flat.
 * Adding [AuthGuard] will prevent a user from accessing the page when they're not logged in.
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'flat-list', loadChildren: './pages/flat-list/flat-list.module#FlatListPageModule', canActivate: [AuthGuard] },
  { path: 'flat-create', loadChildren: './pages/flat-create/flat-create.module#FlatCreatePageModule', canActivate: [AuthGuard]  },
  { path: 'flat-join', loadChildren: './pages/flat-join/flat-join.module#FlatJoinPageModule', canActivate: [AuthGuard] },
  { path: 'todo-view', loadChildren: './pages/todo-view/todo-view.module#TodoViewPageModule', canActivate: [FlatGuard] },
  { path: 'newsfeed', loadChildren: './pages/newsfeed/newsfeed.module#NewsfeedPageModule', canActivate: [FlatGuard] },
  { path: 'newsfeed-createpost', loadChildren: './pages/newsfeed-createpost/newsfeed-createpost.module#NewsfeedCreatepostPageModule',
    canActivate: [AuthGuard] },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule', canActivate: [AuthGuard] },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
