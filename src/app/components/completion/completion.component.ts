import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators} from '@angular/common';

import {QuizletService} from "../../service/quizlet.service";

@Component({
  selector: 'completion-cmp',
  template: `
    <form [ngFormModel]="completionForm" (submit)="createSet()">
      <input class="form-control" ngControl="setName" placeHolder="Name your set">
      <button class="btn btn-primary" type="submit" [disabled]="!completionForm.valid">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Create Set on Quizlet
      </button>
      <div *ngIf="setName.dirty && setName.hasError('required')">
        A auth Code is required
      </div>
    </form>
  `,
  providers: [FormBuilder],
  styles: [`
    input{
      width: 300px;
      display: inline;
    }
    div{
      color: red;
    }
    `]
})
export class CompletionComponent{

  completionForm: ControlGroup;
  setName: Control;

  constructor(private _fb: FormBuilder, private _quizletService: QuizletService){
    this.setName = _fb.control('', Validators.required);
    this.completionForm = this._fb.group({
      setName: this.setName
    })
  }

  createSet(): void{
    this._quizletService.createSet(this.setName.value);
  }
}
