import {QuizletService} from "../../service/quizlet.service";
import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators} from '@angular/common';

@Component({
  selector: 'auth-input',
  template: `
    <form [ngFormModel]="authForm">
      <input type="text" class="form-control" ngControl="authCode" placeHolder="Please past your Auth Code here"/>
      <div *ngIf="authCode.dirty && authCode.hasError('required')">
        A auth Code is required
      </div>
      <button class="btn btn-primary" (click)="getAccessToken()">Login</button>
    </form>
  `,
  providers: [FormBuilder],
  styles: [`
    input{
      width: 300px;
      display: inline;
    }
    form{
      margin-top: 27px;
    }
    `]
})
export class AuthInputComponent{

  authForm: ControlGroup;
  authCode: Control;

  constructor(private _fb: FormBuilder, private _quizletService: QuizletService){
    this.authCode = _fb.control('', Validators.required);
    this.authForm = _fb.group({
      authCode: this.authCode
    });
  }

  getAccessToken(): void{
    this._quizletService.getAccessToken(this.authCode.value);
  }

}
