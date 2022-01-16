import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouncilOfficerComponent } from './council-officer.component';
import {ViewQuestionsComponent} from "./view-questions/view-questions.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {OfficerGuard} from "../auth/officer.guard";
import {EditQuestionComponent} from "./edit-question/edit-question.component";

const routes: Routes = [
  {
    path: '', component: CouncilOfficerComponent,
    children: [
      {path: 'view-questions', component: ViewQuestionsComponent, canActivate: [OfficerGuard]},
      {path: 'add-question', component: AddQuestionComponent, canActivate: [OfficerGuard]},
      {path: 'edit-question/:id', component: EditQuestionComponent, canActivate: [OfficerGuard]},
      {path: '', redirectTo: 'view-questions', pathMatch: 'full'}
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouncilOfficerRoutingModule { }
