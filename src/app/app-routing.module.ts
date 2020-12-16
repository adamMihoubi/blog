import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RegisterComponent } from './register/register.component';
import {QuestionComponent} from './question/question.component';
import {ManageComponent} from './manage/manage.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RankingComponent } from './ranking/ranking.component';
import {RulesComponent} from './rules/rules.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {ResetComponent} from './reset/reset.component';
import {ResetPassComponent} from './reset-pass/reset-pass.component';

const routes: Routes = [
  { path: 'Welcome' , component: WelcomeComponent },
  { path: 'User/:id',canActivate:[AuthGuard], component: UserPageComponent },
  { path: 'User', redirectTo: '/Welcome', pathMatch: 'full'},
  { path: 'Register', component: RegisterComponent },
  { path: 'Question',canActivate:[AuthGuard], component:QuestionComponent},
  { path: 'Manage',canActivate:[AdminGuard], component:ManageComponent},
  { path: 'AddQuestions',canActivate:[AdminGuard], component:AddQuestionComponent},
  { path: 'ManageUsers',canActivate:[AdminGuard], component:ManageUsersComponent},
  { path: 'Classement',canActivate : [AuthGuard],component:RankingComponent},
  { path: 'UpdateProfile', canActivate :[AuthGuard],component:UpdateProfileComponent},
  {path:'Rules',canActivate:[AuthGuard],component:RulesComponent},
  {path:'Reset',component:ResetComponent},
  {path:'Reset/:id/:hash',component:ResetPassComponent},
  { path: '', redirectTo: '/Welcome', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
