import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormGroupCreatorComponent } from './components/form-group-creator/form-group-creator.component';
import { BoxFormGroupComponent } from './components/box-form-group/box-form-group.component';
import { BoxFormComponent } from './components/box-form/box-form.component';
import { BoxQuestionComponent } from './components/box-question/box-question.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    FormGroupCreatorComponent,
    BoxFormGroupComponent,
    BoxFormComponent,
    BoxQuestionComponent,
    FormCreatorComponent,
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
