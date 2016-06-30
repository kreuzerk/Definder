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
      <div class="col-lg-4">
        <input #inputField class="form-control" type="text" (keydown)="proccesKeyStroke($event)"/>
      </div>
      <div class="col-lg-8">
        <definition-panel [rowIndex]="rowIndex" [title]="inputField.value" [definitions]="definitions | async"></definition-panel>
      </div>
  `,
  directives: [DefinitionPanelComponent],
  providers: [DictionaryService]
})
export class DefinitionRowComponent implements AfterViewInit{
  rowIndex: number;
  private static rowCounter: number = 0;
  private TAB_KEYCODE: number = 9;
  @Output() onTabKey = new EventEmitter<boolean>();
  definitions: Observable<Response>;
  @ViewChild('inputField') inputField: ElementRef;

  constructor(private _dictionaryService: DictionaryService, private _renderer: Renderer,
    private _store: Store<QuizletStore>){
      this.rowIndex = DefinitionRowComponent.rowCounter;
  }

  ngAfterViewInit(){
    this.inputField.nativeElement.focus();
  }

  proccesKeyStroke(event){
    if(this._isTabKey(event.keyCode)){
      this.onTabKey.emit(true);
      DefinitionRowComponent.rowCounter++;
      this.definitions = this._getDefinition(this.inputField.nativeElement.value);
      this.definitions.subscribe((res) => {
        let definitions = res.map(response => response.senses)
          .map(senses => senses[0].definition);
        let payload: Quizletterm = {
          word: this.inputField.nativeElement.value,
          definitions: definitions
        }
        this._store.dispatch({type: StoreActions.ADD_QUIZLETTERM.toString(), payload});
      });
    }
  }

  private _getDefinition(word: string): Observable<Response>{
    return this._dictionaryService.getWordDefinition(word);
  }

  private _isTabKey(keyCode: number){
    return keyCode === this.TAB_KEYCODE;
  }

  resetRow(): void{
    this.definitions = null;
    this.inputField.nativeElement.value = '';
  }

}
