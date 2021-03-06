import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserMeDto } from '../model/user-me.dto';

import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducers';
import { AuthActions } from '../store/action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: UserMeDto;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.form = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.store.dispatch(
      AuthActions.login({
        user: {
          email: this.form.value.email,
          password: this.form.value.password,
        },
      })
    );
  }
}
