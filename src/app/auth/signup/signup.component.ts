import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // @ts-ignore
  signupForm: FormGroup;
  // @ts-ignore
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9-_.]{2,10}/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    // @ts-ignore
    const nickname = this.signupForm.get('nickname').value;
    // @ts-ignore
    const email = this.signupForm.get('email').value;
    // @ts-ignore
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(nickname, email, password).then(
      () => {
        this.router.navigate(['home']).then(function(){

        });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
