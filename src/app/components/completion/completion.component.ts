import {Component, EventEmitter, Output} from '@angular/core';
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
      <button class="btn btn-danger" type="button" (click)="clearSet()">
        <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
        Clear Set
      </button>
      <div *ngIf="setName.dirty && setName.hasError('required')">
        A auth Code is required
      </div>
      <div *ngIf="showSuccessMessage" class="alert alert-success" role="alert">
        New Set "{{setName.value}}" successfully added to Quizlet
      </div>
      <div *ngIf="showFailureMessage" class="alert alert-danger" role="alert">
        Ouupsi!! An error occured. {{errorMessage}}
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
    .alert{
      width: 475px;
      margin-top: 20px;
    }
    `]
})
export class CompletionComponent{

  completionForm: ControlGroup;
  setName: Control;
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;
  errorMessage: string = '';
  @Output() onClear = new EventEmitter<boolean>();

  constructor(private _fb: FormBuilder, private _quizletService: QuizletService){
    this.setName = _fb.control('', Validators.required);
    this.completionForm = this._fb.group({
      setName: this.setName
    })
  }

  createSet(): void{
    this.setName.updateValue('');
    this.setName.setErrors(null);
    this._quizletService.createSet(this.setName.value)
      .subscribe(response => {
        if(201 === response.status){
          this._toggleSuccessMessage();
        }
      },
      (err) => {
        let jsonBody = JSON.parse(err._body);
        this._toggleFailureMessage(jsonBody.error_description);
      }
    );
  }

  private _toggleSuccessMessage(): void{
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000)
  }

  private _toggleFailureMessage(errormessage: string): void{
    this.errorMessage += errormessage;
    this.showFailureMessage = true;
    setTimeout(() => {
      this.showFailureMessage = false;
      this.errorMessage = '';
    }, 2000)
  }

  clearSet(): void{
    this.onClear.emit(true);
  }
}
