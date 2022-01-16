import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../core/api/backend.service";
import {AnswerQuestionInterface, OptionInterface, QuestionInterface} from "../../common/question.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit {

  question: string = "";
  optionList: OptionInterface [] = [];
  questionId: number = 0;
  isQuestionAnswered: boolean = false;

  submitAnswerForm;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router
  ) {
    this.submitAnswerForm = new FormGroup({
      option: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.questionId = id;

      this.backendService.getQuestion(id).subscribe((question: QuestionInterface) => {
        this.question = question.questionContent;
        this.optionList = question.options;
        this.isQuestionAnswered = question.answered;
        console.log(question);
      })

    })

  }

  submitAnswer(): void {
    if (this.submitAnswerForm.valid) {
      console.log(this.submitAnswerForm.value);
      const optionId = this.submitAnswerForm.value.option;

      const answerObj: AnswerQuestionInterface = {
        questionId: this.questionId,
        optionId: optionId
      }

      this.backendService.answerQuestion(answerObj).subscribe(value => {

        if (value.status === 201) {
          alert("answer submitted successfully");

          this.router.navigate(['../../resident-user']);

        }

      }, error => {
        alert("error submitting answers. You already submitted answer for this question");
      })

    }
  }

}
