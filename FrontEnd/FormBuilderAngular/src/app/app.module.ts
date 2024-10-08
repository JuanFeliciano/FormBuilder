import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/LoginPage/login.component';
import { FormGroupCreatorComponent } from './components/CreatorComponents/FormGroupCreator/form-group-creator.component';
import { BoxFormGroupComponent } from './components/BoxComponents/BoxFormGroup/box-form-group.component';
import { BoxQuestionComponent } from './components/BoxComponents/BoxQuestion/box-question.component';
import { FormCreatorComponent } from './components/CreatorComponents/FormCreator/form-creator.component';
import { QuestionCreatorComponent } from './components/CreatorComponents/QuestionCreator/question-creator.component';
import { FormGroupUpdaterComponent } from './components/UpdaterComponents/FormGroupUpdater/form-group-updater.component';
import { FormGroupDeleterComponent } from './components/DeleterComponents/FormGroupDeleter/form-group-deleter.component';
import { FormUpdaterComponent } from './components/UpdaterComponents/FormUpdater/form-updater.component';
import { FormDeleterComponent } from './components/DeleterComponents/FormDeleter/form-deleter.component';
import { NpsComponent } from './pages/NpsPage/Nps/nps.component';
import { NpsRouteComponent } from './pages/NpsPage/NpsRoute/nps-route.component';
import { SidebarComponent } from './shared/Sidebar/sidebar.component';
import { DialogMessageComponent } from './shared/MessageDialog/dialog-message';
import { AnswerComponent } from './pages/AnswerPage/Answer/answer.component';
import { AnswerRouteComponent } from './pages/AnswerPage/AnswerRoute/answer-route.component';
import { QuestionUpdaterComponent } from './components/UpdaterComponents/QuestionUpdater/question-updater.component';
import { AnswerDialogComponent } from './components/Dialogs/AnswerDialog/answer-dialog.component';
import { QuestionDeleterComponent } from './components/DeleterComponents/QuestionDeleter/question-deleter.component';
import { FormsComponent } from './pages/FormPage/Forms/forms.component';
import { FormsRouteComponent } from './pages/FormPage/FormsRoute/forms-route.component';
import { BoxFormComponent } from './components/BoxComponents/BoxForm/box-form.component';
import { BoxAnswerComponent } from './components/BoxComponents/BoxAnswer/box-answer.component';
import { SearchBoxComponent } from './shared/Search/search-box.component';
import { FormComponent } from './pages/FormByIdPage/Form/form.component';
import { FormRouteComponent } from './pages/FormByIdPage/FormRoute/form-route.component';
import { InterceptorHttp } from './auth/auth.interceptor';
import { MainComponent } from './components/MainComponents/main.component';
import { ConfirmDialogComponent } from './shared/ConfirmDialog/confirm-dialog.component';
import { CrudButtonsComponent } from './shared/CrudButtons/crud-buttons.component';

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
    BoxAnswerComponent,
    SearchBoxComponent,
    FormComponent,
    FormRouteComponent,
    ConfirmDialogComponent,
    CrudButtonsComponent,
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
