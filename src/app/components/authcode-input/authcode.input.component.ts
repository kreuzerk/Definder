import {QuizletService} from "../../service/quizlet.service";
import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators} from '@angular/common';

@Component({
  selector: 'auth-input',
  template: `
    <form [ngFormModel]="authForm">
      <input type="text" class="form-control" ngControl="authCode" placeHolder="Please paste your Auth Code here"/>
      <button class="btn btn-primary" (click)="getAccessToken()">Login</button>
    </form>
    <div class="errorMessage" *ngIf="authCode.dirty && authCode.hasError('required')">
      A auth Code is required
    </div>
    <div *ngIf="showFailureMessage" class="alert alert-danger" role="alert">
      Please enter a valid token
    </div>
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
    .alert{
      margin-top: 10px;
    }
    .errorMessage{
      color: red;
    }
    `]
})
export class AuthInputComponent{

  authForm: ControlGroup;
  authCode: Control;
  showFailureMessage: boolean = false;

  constructor(private _fb: FormBuilder, private _quizletService: QuizletService){
    this.authCode = _fb.control('', Validators.required);
    this.authForm = _fb.group({
      authCode: this.authCode
    });
  }

  getAccessToken(): void{
    this._quizletService.getAccessToken(this.authCode.value).
      subscribe((res) => {},
      (error) => {
        this.showFailureMessage = true;
        setTimeout(() => {
          this.showFailureMessage = false;
        }, 2000);
      }
    );
  }

}
