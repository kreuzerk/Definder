import {AuthService} from "../../service/auth.service";
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Control, Validators} from 'angular2/common';

@Component({
  selector: 'auth-input',
  template: `
    <h1>Here comes the auth Input</h1>

    <form [ngFormModel]="authForm">
      <label>Auth Code</label>
      <input type="text" class="form-control" ngControl="authCode"/>
      <div *ngIf="authCode.dirty && authCode.hasError('required')">
        A auth Code is required
      </div>
      <button class="btn btn-default" (click)="getAccessToken()">Go!</button>
    </form>
  `,
  providers: [FormBuilder]
})
export class AuthInputComponent{

  authForm: ControlGroup;
  authCode: Control;

  constructor(private _fb: FormBuilder, private _authService: AuthService){
    this.authCode = _fb.control('', Validators.required);
    this.authForm = _fb.group({
      authCode: this.authCode
    });
  }

  getAccessToken(): void{
    this._authService.getAccessToken(this.authCode.value);
  }

}
