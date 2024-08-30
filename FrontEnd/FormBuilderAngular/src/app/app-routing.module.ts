import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/mainComponents/sidebar/sidebar.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './components/mainComponents/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: MenuComponent },
  {
    path: 'dashboard',
    component: SidebarComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
