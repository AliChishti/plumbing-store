import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  msgStr!: string;
  userErrorStr!: string;
  emailErrorStr!: string;
  passErrorStr!: string;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['store']);
    }
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      if(Object(msg).error){
        if(Object(msg).error.param === "username"){
          this.userErrorStr = Object(msg).error.msg;
          this.emailErrorStr = "";
          this.passErrorStr = "";
        }
        if(Object(msg).error.param === "email"){
          this.emailErrorStr = Object(msg).error.msg;
          this.userErrorStr = "";
          this.passErrorStr = "";
        }
        if(Object(msg).error.param === "password"){
          this.passErrorStr = Object(msg).error.msg;
          this.userErrorStr = "";
          this.emailErrorStr = "";
        }
        this.msgStr = "";
      }
      else if (Object(msg).message){
        this.msgStr = Object(msg).message;
        this.userErrorStr = "";
        this.emailErrorStr = "";
        this.passErrorStr = "";
      }
    });
  }
}
