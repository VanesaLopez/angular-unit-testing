import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import { User } from './user.model';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;
  form: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder
  ) {  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    if (this.form.valid) {
        this.auth.login().then((authenticated) => {
          if (authenticated) {
            this.loggedIn.emit(new User(
              this.form.value.email,
              this.form.value.password
            ));
          }
      });
    }
  }
}
