import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { NpsRouteComponent } from './components/page/nps-route/nps-route.component';
import { LoginComponent } from './components/page/log/login.component';
import { MainComponent } from './components/mainComponents/main.component';
import { AnswerRouteComponent } from './components/page/answer-route/answer-route.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: 'nps', component: NpsRouteComponent, canActivate: [AuthGuard] },
  { path: 'answer', component: AnswerRouteComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
