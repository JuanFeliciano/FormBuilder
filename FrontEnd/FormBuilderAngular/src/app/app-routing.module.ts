import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { NpsRouteComponent } from './components/page/nps-route/nps-route.component';
import { LoginComponent } from './components/page/log/login.component';
import { MainComponent } from './components/mainComponents/main.component';
import { FormsRouteComponent } from './components/page/forms-page/forms-route/forms-route.component';
import { AnswerRouteComponent } from './components/page/answer-page/answer-route/answer-route.component';
import { QuestionsComponent } from './components/page/questions-page/questions/questions.component';
import { QuestionsRouteComponent } from './components/page/questions-page/questions-route/questions-route.component';

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
    path: 'questions',
    component: QuestionsRouteComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
