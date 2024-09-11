import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormGroupCreatorComponent } from './components/creatorComponents/form-group-creator/form-group-creator.component';
import { BoxFormGroupComponent } from './components/boxComponents/box-form-group/box-form-group.component';
import { BoxFormComponent } from './components/boxComponents/box-form/box-form.component';
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
import { FormDialogComponent } from './components/dialogs/form-dialog/createDialog/form-dialog.component';
import { FormGroupDialogCreateComponent } from './components/dialogs/form-group-dialog/createDialog/form-group-dialog-create.component';
import { FormGroupDialogUpdateComponent } from './components/dialogs/form-group-dialog/updateDialog/form-group-dialog-update/form-group-dialog-update.component';
import { FormDialogUpdateComponent } from './components/dialogs/form-dialog/updateDialog/form-dialog-update/form-dialog-update.component';
import { FormGroupDialogDeleteComponent } from './components/dialogs/form-group-dialog/deleteDialog/form-group-dialog-delete/form-group-dialog-delete.component';
import { FormDialogDeleteComponent } from './components/dialogs/form-dialog/deleteDialog/form-dialog-delete/form-dialog-delete.component';
import { LoginComponent } from './components/page/log/login.component';
import { MainComponent } from './components/mainComponents/main.component';
import { AnswerComponent } from './components/page/answer/answer.component';
import { AnswerRouteComponent } from './components/page/answer-route/answer-route.component';
import { AuthInterceptor } from './auth-interceptor/auth.interceptor';
import { AnswerDialogComponent } from './components/dialogs/answer-dialog/answer-dialog/answer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FormGroupCreatorComponent,
    BoxFormGroupComponent,
    BoxFormComponent,
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
    FormDialogComponent,
    FormGroupDialogCreateComponent,
    FormGroupDialogUpdateComponent,
    FormDialogUpdateComponent,
    FormGroupDialogDeleteComponent,
    FormDialogDeleteComponent,
    AnswerComponent,
    AnswerRouteComponent,
    AnswerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
