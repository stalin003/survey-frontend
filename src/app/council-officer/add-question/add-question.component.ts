import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../core/api/backend.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.questionForm = this.fb.group({
      questionContent: new FormControl('', Validators.required),
      options: this.fb.array([])
    })
  }

  ngOnInit(): void {
  }

  newOption(): FormGroup {
    return this.fb.group({
      optionContent: new FormControl('', Validators.required)
    })
  }

  tmpOption(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(event: Event): void {
    event.preventDefault();
    this.tmpOption().push(this.newOption());
  }

  removeOption(index: number): void {
    this.tmpOption().removeAt(index);
  }

  clearOptionForm(): void {
    while (this.tmpOption().length != 0) {
      this.removeOption(0);
    }
    this.questionForm.reset();
  }

  onSubmit(): void {
    console.log(this.questionForm.value);

    const questionObj = this.questionForm.value;

    this.backendService.createQuestion(questionObj).subscribe(value => {
      if (value.status === 201) {
        this.clearOptionForm();
        alert("question created successfully");
      }
    }, error => {
      alert("failed to create questions")
    })

  }

}
