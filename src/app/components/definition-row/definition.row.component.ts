import {Store} from "@ngrx/store";
import {Response} from '@angular/http';
import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, Renderer} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {StoreActions} from "../../actions/store.actions";
import {QuizletStore} from "../../model/quizletstore.model";
import {Quizletterm} from "../../model/quizletterm.model";
import {DefinitionPanelComponent} from "../definition-panel/definition.panel.component";
import {DictionaryService} from "../../service/dictionary.service";


@Component({
  selector: 'definition-row',
  template: `
      <div *ngIf="showFailureMessage" class="alert alert-danger" role="alert">
        Do not delete empty things!! Please search for a word before deleting
      </div>
      <div class="col-lg-4">
        <input #inputField class="form-control" type="text" (keydown)="proccesKeyStroke($event)"/>
      </div>
      <div class="col-lg-7">
        <definition-panel [rowIndex]="rowIndex" [title]="inputField.value" [definitions]="definitions | async"></definition-panel>
      </div>
      <div class="col-lg-1 text-center">
        <img [src]="image" (click)="deleteRow()"/>
      </div>
  `,
  directives: [DefinitionPanelComponent],
  providers: [DictionaryService],
  styles:[`
    img{
      margin-top: 20px;
    }
    .alert{
      margin: 20px;
    }
  `]
})
export class DefinitionRowComponent implements AfterViewInit{
  rowIndex: number;
  private static rowCounter: number = 0;
  private TAB_KEYCODE: number = 9;
  @Output() onTabKey = new EventEmitter<boolean>();
  definitions: Observable<Response>;
  @ViewChild('inputField') inputField: ElementRef;
  image: string = './build/' + require('./trash-icon.png');
  showFailureMessage: boolean = false;

  constructor(private _dictionaryService: DictionaryService, private _renderer: Renderer,
    private _store: Store<QuizletStore>, private _row: ElementRef){
      this.rowIndex = DefinitionRowComponent.rowCounter;
  }

  ngAfterViewInit(){
    this.inputField.nativeElement.focus();
  }

  proccesKeyStroke(event){
    if(this._isTabKey(event.keyCode)){
      this.onTabKey.emit(true);
      this.definitions = this._getDefinition(this.inputField.nativeElement.value);
      let counter = DefinitionRowComponent.rowCounter;
      this.definitions.subscribe((res) => {
        let definitions = res.map(response => response.senses)
          .map(senses => senses[0].definition);
        let payload: Quizletterm = {
          id: counter,
          word: this.inputField.nativeElement.value,
          definitions: definitions
        }
        this._store.dispatch({type: StoreActions.ADD_QUIZLETTERM.toString(), payload});
      });
      DefinitionRowComponent.rowCounter++;
    }
  }

  private _getDefinition(word: string): Observable<Response>{
    return this._dictionaryService.getWordDefinition(word);
  }

  private _isTabKey(keyCode: number){
    return keyCode === this.TAB_KEYCODE;
  }

  deleteRow(): void{
    if(!this.definitions){
      this._showErrorMessage();
    }
    else{
      this._row.nativeElement.hidden = true;
    }
  }

  private _showErrorMessage(): void{
    this.showFailureMessage = true;
    setTimeout(() => {
      this.showFailureMessage = false;
    }, 2500);
  }
}
