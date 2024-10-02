import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormGroupCreatorComponent } from './components/creatorComponents/form-group-creator/form-group-creator.component';
import { BoxFormGroupComponent } from './components/boxComponents/box-form-group/box-form-group.component';
import { BoxQuestionComponent } from './components/boxComponents/box-question/box-question.component';
import { FormCreatorComponent } from './components/creatorComponents/form-creator/form-creator.component';
import { QuestionCreatorComponent } from './components/creatorComponents/question-creator/question-creator.component';
import { FormGroupUpdaterComponent } from './components/updaterComponents/form-group-updater/form-group-updater.component';
import { FormGroupDeleterComponent } from './components/deleterComponents/form-group-deleter/form-group-deleter.component';
import { FormUpdaterComponent } from './components/updaterComponents/form-updater/form-updater.component';
import { FormDeleterComponent } from './components/deleterComponents/form-deleter/form-deleter.component';
import { NpsComponent } from './components/page/nps/nps.component';
import { NpsRouteComponent } from './components/page/nps-route/nps-route.component';
import { SidebarComponent } from './components/page/sidebar/sidebar.component';
import { DialogMessageComponent } from './components/dialogs/dialog-message';
import { LoginComponent } from './components/page/log/login.component';
import { MainComponent } from './components/mainComponents/main.component';
import { InterceptorHttp } from './auth-interceptor/auth.interceptor';
import { QuestionUpdaterComponent } from './components/updaterComponents/question-updater/question-updater.component';
import { AnswerDialogComponent } from './components/dialogs/answer-dialog/answer-dialog.component';
import { QuestionDeleterComponent } from './components/deleterComponents/question-deleter/question-deleter.component';
import { FormsComponent } from './components/page/forms-page/forms/forms.component';
import { FormsRouteComponent } from './components/page/forms-page/forms-route/forms-route.component';
import { BoxFormComponent } from './components/boxComponents/box-form/box-form.component';
import { AnswerRouteComponent } from './components/page/answer-page/answer-route/answer-route.component';
import { AnswerComponent } from './components/page/answer-page/answer/answer.component';
import { QuestionsComponent } from './components/page/questions-page/questions/questions.component';
import { QuestionsRouteComponent } from './components/page/questions-page/questions-route/questions-route.component';
import { BoxAnswerComponent } from './components/boxComponents/box-answer/box-answer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FormGroupCreatorComponent,
    BoxFormGroupComponent,
    BoxQuestionComponent,
    FormCreatorComponent,
    QuestionCreatorComponent,
    FormGroupUpdaterComponent,
    FormGroupDeleterComponent,
    FormUpdaterComponent,
    FormDeleterComponent,
    NpsComponent,
    NpsRouteComponent,
    SidebarComponent,
    DialogMessageComponent,
    AnswerComponent,
    AnswerRouteComponent,
    QuestionUpdaterComponent,
    AnswerDialogComponent,
    QuestionDeleterComponent,
    FormsComponent,
    FormsRouteComponent,
    BoxFormComponent,
    QuestionsComponent,
    QuestionsRouteComponent,
    BoxAnswerComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttp, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
