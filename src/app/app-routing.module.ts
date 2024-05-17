import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminFormComponent } from './admin/admin-form/admin-form.component';
import { LoginComponent } from './admin/login/login.component';
import { guardGuard } from './admin/guard.guard';
import { FaqComponent } from './admin/faq/faq.component';
import { HomeComponent } from './main-page/home/home.component';
import { UpitiGostijuComponent } from './admin/upiti-gostiju/upiti-gostiju.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'list',
    component: AdminListComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'form',
    component: AdminFormComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'form-update/:id',
    component: AdminFormComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'faq/:id',
    component: FaqComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'upiti',
    component: UpitiGostijuComponent,
    canActivate: [guardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
