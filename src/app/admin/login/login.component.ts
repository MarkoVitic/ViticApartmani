import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fm: FormBuilder,
    private logService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fm.group({
      email: ['', [Validators.required], [Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  logIn() {
    if (this.loginForm.invalid) {
      this.loginForm.reset();
    } else {
      let formValue = this.loginForm.value;
      this.logService.login(formValue.email, formValue.password);
      this.loginForm.reset();
    }
  }
}
