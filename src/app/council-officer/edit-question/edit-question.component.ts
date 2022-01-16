import { Component, OnInit } from '@angular/core';
import {
  CreateOptionInterface,
  OptionInterface,
  QuestionInterface,
  UpdateQuestionInterface
} from "../../common/question.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../core/api/backend.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  question: string = "";
  optionList: OptionInterface [] = [];
  questionId: number = 0;
  isQuestionAnswered: boolean = false;

  isEditQuestion: boolean = false;
  isEditOption: boolean = false;
  isAddOption: boolean = false;

  editQuestionForm: FormGroup;
  editOptionForm: FormGroup;
  addOptionForm: FormGroup;

  optionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router
  ) {
    this.editQuestionForm = new FormGroup({
      question: new FormControl(null, Validators.required),
    })

    this.editOptionForm = new FormGroup({
      option: new FormControl(null, Validators.required),
    })

    this.addOptionForm = new FormGroup({
      option: new FormControl(null, Validators.required),
    })

  }

  ngOnInit(): void {
    this.getQuestionInit();
  }

  getQuestionInit(): void {
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

  onEditQuestion(id: number): void {
    this.isEditQuestion = true;

    this.backendService.getQuestion(id).subscribe((question:QuestionInterface) => {
      this.editQuestionForm.get('question')?.setValue(question.questionContent);
    })

  }

  onDeleteQuestion(id: number):void {
    this.backendService.deleteQuestion(id).subscribe(value => {

      alert("deleted successfully");
      this.router.navigate(['./council-officer']);

    }, error => {
      alert("failed to delete the question");
    })
  }

  onEditOption(id: number): void {
    this.isEditOption = true;

    this.optionId = id;

    this.backendService.getOption(id).subscribe((option: OptionInterface) => {
      this.editOptionForm.get('option')?.setValue(option.optionContent);
    })

  }

  onAddOption(): void {
    this.isAddOption = true;
  }

  onClose(): void {
    this.isEditQuestion = false;
    this.isEditOption = false;
    this.isAddOption = false;

    this.optionId = 0;

    this.addOptionForm.reset();
  }

  onSubmitEditQuestion(): void {
    if (this.editQuestionForm.valid) {

      const question = this.editQuestionForm.value.question;

      const questionObj: UpdateQuestionInterface = {
        id: this.questionId,
        questionContent: question
      }

      console.log(questionObj);

      this.backendService.updateQuestion(questionObj).subscribe(value => {

        if (value.status === 201) {
          this.getQuestionInit();
          alert("updated successfully");
        }

      }, error => {
        alert("failed to update question");
      })

    }
  }

  onSubmitEditOption(): void {
    if (this.editOptionForm.valid) {

      const option = this.editOptionForm.value.option;

      const  optionObj: OptionInterface = {
        id: this.optionId,
        optionContent: option
      }

      console.log(optionObj);

      this.backendService.updateOption(optionObj).subscribe(value => {
        if (value.status === 201) {
          this.getQuestionInit();
          alert("updated option successfully")
        }
      }, error => {
        alert("failed to update option");
      })

    }

  }

  onSubmitAddOption(): void {

    if (this.addOptionForm.valid) {
      const option = this.addOptionForm.value.option;

      const optionObj: CreateOptionInterface = {
        optionContent: option,
        questions: {
          id: this.questionId
        }
      }

      console.log(optionObj);

      this.backendService.createOption(optionObj).subscribe(value => {
        if (value.status === 201) {
          this.getQuestionInit();
          this.addOptionForm.reset();
          alert("added option successfully");
        }
      }, error => {
        alert("failed to add option");
      })

    }

  }

  deleteOption(id: number): void {

    console.log(id);

    if (confirm("sure want to delete? ")) {
      this.backendService.deleteOption(id).subscribe(value => {
        alert("successfully deleted option");
        this.getQuestionInit()
      }, error => {
        alert("failed to delete option");
      })
    }
  }

}
