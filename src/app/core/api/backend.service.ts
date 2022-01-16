import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {LoginInterface, RefreshToken} from "../../common/login.interface";
import {url} from "../../common/api.url";
import {
  AnswerQuestionInterface, CreateOptionInterface, CreateQuestionInterface,
  OptionInterface,
  QuestionInterface,
  QuestionResponseInterface, UpdateQuestionInterface
} from "../../common/question.interface";
import {UserInterface} from "../../common/user.interface";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private api: ApiService
  ) { }

  login(body: LoginInterface): Observable<RefreshToken> {
    return this.api.post(url.login, body);
  }

  refreshToken(): Observable<RefreshToken> {
    return this.api.get(url.refreshToken);
  }

  getAllQuestions(): Observable<QuestionInterface[]> {
    return this.api.get(url.question);
  }

  getQuestion(id: number): Observable<QuestionInterface> {
    return this.api.get(`${url.question}/${id}`);
  }

  answerQuestion(answers: AnswerQuestionInterface) : Observable<any> {
    return this.api.modPost('AQ', answers);
  }

  getQuestionResponse(): Observable<QuestionResponseInterface[]> {
    return this.api.get('AQ/response');
  }

  updateQuestion(questionObj: UpdateQuestionInterface): Observable<any> {
    return this.api.put(`${url.question}`, questionObj);
  }

  getOption(id: number): Observable<OptionInterface> {
    return this.api.get(`${url.option}/${id}`);
  }

  updateOption(optionObj: OptionInterface):Observable<any> {
    return this.api.put(`${url.option}`, optionObj);
  }

  createOption(optionObj: CreateOptionInterface): Observable<any> {
    return this.api.modPost(`${url.option}`, optionObj);
  }

  deleteOption(id: number): Observable<any> {
    return this.api.delete(`${url.option}/${id}`);
  }

  createQuestion(questionObj: CreateQuestionInterface): Observable<any> {
    return this.api.modPost(`${url.question}`, questionObj);
  }

  register(userObj: UserInterface): Observable<any> {
    return this.api.modPost(`${url.user}`, userObj);
  }


}
