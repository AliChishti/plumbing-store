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
  errorStr!: string;

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
        this.errorStr = Object(msg).error;
        this.msgStr = "";
      }
      else if (Object(msg).message){
        this.msgStr = Object(msg).message;
        this.errorStr = "";
      }
    });
  }
}
