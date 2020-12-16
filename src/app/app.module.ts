import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { QuestionComponent } from './question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageComponent } from './manage/manage.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RankingComponent } from './ranking/ranking.component';
import { RulesComponent } from './rules/rules.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ResetComponent } from './reset/reset.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserPageComponent,
    RegisterComponent,
    QuestionComponent,
    PageNotFoundComponent,
    ManageComponent,
    AddQuestionComponent,
    ManageUsersComponent,
    RankingComponent,
    RulesComponent,
    UpdateProfileComponent,
    ResetComponent,
    ResetPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
