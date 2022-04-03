import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'consumables',
    loadChildren: () =>
      import('./modules/consumables/consumables.module').then(
        (m) => m.ConsumablesPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./modules/documents/documents.module').then(
        (m) => m.DocumentsPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },  {
    path: 'add-document',
    loadChildren: () => import('./modules/add-document/add-document.module').then( m => m.AddDocumentPageModule)
  },
  {
    path: 'add-consumable',
    loadChildren: () => import('./modules/add-consumable/add-consumable.module').then( m => m.AddConsumablePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
