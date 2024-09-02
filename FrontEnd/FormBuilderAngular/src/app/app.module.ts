import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/mainComponents/sidebar/sidebar.component';
import { FormGroupCreatorComponent } from './components/creatorComponents/form-group-creator/form-group-creator.component';
import { BoxFormGroupComponent } from './components/boxComponents/box-form-group/box-form-group.component';
import { BoxFormComponent } from './components/boxComponents/box-form/box-form.component';
import { BoxQuestionComponent } from './components/boxComponents/box-question/box-question.component';
import { FormCreatorComponent } from './components/creatorComponents/form-creator/form-creator.component';
import { QuestionCreatorComponent } from './components/creatorComponents/question-creator/question-creator.component';
import { MenuComponent } from './components/mainComponents/menu/menu.component';
import { FormGroupUpdaterComponent } from './components/updaterComponents/form-group-updater/form-group-updater.component';
import { FormGroupDeleterComponent } from './components/deleterComponents/form-group-deleter/form-group-deleter.component';
import { FormUpdaterComponent } from './components/updaterComponents/form-updater/form-updater.component';
import { FormDeleterComponent } from './components/deleterComponents/form-deleter/form-deleter.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
