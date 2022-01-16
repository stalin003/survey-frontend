import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentUserRoutingModule } from './resident-user-routing.module';
import { ResidentUserComponent } from './resident-user.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ResidentUserComponent,
    QuestionsComponent,
    AnswerQuestionComponent
  ],
  imports: [
    CommonModule,
    ResidentUserRoutingModule,
    ReactiveFormsModule
  ]
})
export class ResidentUserModule { }
