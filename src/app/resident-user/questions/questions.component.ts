import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../core/api/backend.service";
import {QuestionInterface} from "../../common/question.interface";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionList: QuestionInterface[] = [];

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.backendService.getAllQuestions().subscribe( (question: QuestionInterface[]) => {
      this.questionList = question;
      console.log(question);
    })
  }

}
