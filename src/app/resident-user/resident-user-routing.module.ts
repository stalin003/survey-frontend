import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentUserComponent } from './resident-user.component';
import {QuestionsComponent} from "./questions/questions.component";
import {AnswerQuestionComponent} from "./answer-question/answer-question.component";
import {UserGuard} from "../auth/user.guard";

const routes: Routes = [
  {
    path: '', component: ResidentUserComponent,
    children: [
      {path: 'questions', component: QuestionsComponent, canActivate: [UserGuard]},
      {path: 'answer-question/:id', component: AnswerQuestionComponent, canActivate: [UserGuard]},
      {path: '', redirectTo: 'questions', pathMatch: 'full'}
    ]

  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentUserRoutingModule { }
