import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginInterface} from "../../common/login.interface";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      let data: LoginInterface = this.loginForm.value;

      console.log(data);

      this.loginService.doLogin(this.loginForm.value);

    }
  }

}
