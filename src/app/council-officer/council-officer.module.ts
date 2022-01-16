import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouncilOfficerRoutingModule } from './council-officer-routing.module';
import { CouncilOfficerComponent } from './council-officer.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditQuestionComponent } from './edit-question/edit-question.component';


@NgModule({
  declarations: [
    CouncilOfficerComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    EditQuestionComponent,
  ],
  imports: [
    CommonModule,
    CouncilOfficerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CouncilOfficerModule { }
