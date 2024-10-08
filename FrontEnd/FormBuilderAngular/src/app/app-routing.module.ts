import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/LoginPage/login.component';
import { AuthGuard } from './guard/auth.guard';
import { MainComponent } from './components/MainComponents/main.component';
import { NpsRouteComponent } from './pages/NpsPage/NpsRoute/nps-route.component';
import { AnswerRouteComponent } from './pages/AnswerPage/AnswerRoute/answer-route.component';
import { FormsRouteComponent } from './pages/FormPage/FormsRoute/forms-route.component';
import { FormRouteComponent } from './pages/FormByIdPage/FormRoute/form-route.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  { path: 'nps', component: NpsRouteComponent, canActivate: [AuthGuard] },
  { path: 'answer', component: AnswerRouteComponent, canActivate: [AuthGuard] },
  { path: 'forms', component: FormsRouteComponent, canActivate: [AuthGuard] },
  {
    path: 'form/:id',
    component: FormRouteComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
