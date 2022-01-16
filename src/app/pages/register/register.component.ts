import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {registerInterface} from "../../common/register.interface";
import {UserInterface} from "../../common/user.interface";
import {BackendService} from "../../core/api/backend.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private backendService: BackendService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      homeAddress: new FormControl(null, Validators.required),
      sni: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {

  }

  register() {
    if (this.registerForm.valid) {
      const data: registerInterface = this.registerForm.value;
      // this.loginService.doLogin(this.loginForm.value);

      const registerObj: UserInterface = {
        email: data.email,
        fullName: data.fullName,
        dob: data.dob,
        homeAddress: data.homeAddress,
        sni: data.sni,
        password: data.password,
        active: true,
        roles: [
          {
            roles: "ROLE_USER"
          }
        ]
      }

      console.log(registerObj);

      this.backendService.register(registerObj).subscribe(value => {

        if (value.status === 201) {
          this.registerForm.reset();
          alert("user registered successfully")
        }

      }, error => {
        alert("failed to register")
      })

    }
  }

}
