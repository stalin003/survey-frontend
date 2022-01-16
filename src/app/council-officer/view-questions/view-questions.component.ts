import { Component, OnInit } from '@angular/core';
import {QuestionInterface, QuestionResponseInterface} from "../../common/question.interface";
import {BackendService} from "../../core/api/backend.service";

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  questionList: QuestionInterface[] = [];
  peopleAttempted: QuestionResponseInterface[] = [];

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.backendService.getAllQuestions().subscribe( (question: QuestionInterface[]) => {
      this.questionList = question;
      console.log(question);
    })

    this.backendService.getQuestionResponse().subscribe((response: QuestionResponseInterface[]) => {
      this.peopleAttempted = response;

      console.log(response);
    })
  }

}
