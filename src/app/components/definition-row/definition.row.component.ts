import {Component, OnInit, EventEmitter, Output} from 'angular2/core';
import {Response} from 'angular2/http';
import {DefinitionPanelComponent} from "../definition-panel/definition.panel.component";
import {DictionaryService} from "../../service/dictionary.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
  selector: 'definition-row',
  template: `
      <div class="col-lg-4">
        <input #inputField class="form-control" type="text" (keydown)="proccesKeyStroke($event, inputField)"/>
      </div>
      <div class="col-lg-8">
        <definition-panel [title]="inputField.value" [definitions]="definitions | async"></definition-panel>
      </div>
  `,
  directives: [DefinitionPanelComponent],
  providers: [DictionaryService]
})
export class DefinitionRowComponent{

  private TAB_KEYCODE: number = 9;
  @Output() onTabKey = new EventEmitter<boolean>();
  definitions: Observable<Response>;

  constructor(private _dictionaryService: DictionaryService){}

  proccesKeyStroke(event, inputField: HTMLInputElement){
    if(this._isTabKey(event.keyCode)){
      this.onTabKey.emit(true);
      this.definitions = this._getDefinition(inputField.value);
    }
  }

  private _getDefinition(word: string): Observable<Response>{
    return this._dictionaryService.getWordDefinition(word);
  }

  private _isTabKey(keyCode: number){
    return keyCode === this.TAB_KEYCODE;
  }
}
