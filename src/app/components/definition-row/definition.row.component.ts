import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, Renderer} from 'angular2/core';
import {Response} from 'angular2/http';
import {DefinitionPanelComponent} from "../definition-panel/definition.panel.component";
import {DictionaryService} from "../../service/dictionary.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
  selector: 'definition-row',
  template: `
      <div class="col-lg-4">
        <input #inputField class="form-control" type="text" (keydown)="proccesKeyStroke($event)"/>
      </div>
      <div class="col-lg-8">
        <definition-panel [title]="inputField.value" [definitions]="definitions | async"></definition-panel>
      </div>
  `,
  directives: [DefinitionPanelComponent],
  providers: [DictionaryService]
})
export class DefinitionRowComponent implements AfterViewInit{

  private TAB_KEYCODE: number = 9;
  @Output() onTabKey = new EventEmitter<boolean>();
  definitions: Observable<Response>;
  @ViewChild('inputField') inputField: ElementRef;

  constructor(private _dictionaryService: DictionaryService, private _renderer: Renderer){
  }

  ngAfterViewInit(){
    this.inputField.nativeElement.focus();
    //this._renderer.invokeElementMethod(this.inputField.nativeElement, 'focus');
    console.log("hier");
  }

  proccesKeyStroke(event){
    if(this._isTabKey(event.keyCode)){
      this.onTabKey.emit(true);
      this.definitions = this._getDefinition(this.inputField.nativeElement.value);
    }
  }

  private _getDefinition(word: string): Observable<Response>{
    return this._dictionaryService.getWordDefinition(word);
  }

  private _isTabKey(keyCode: number){
    return keyCode === this.TAB_KEYCODE;
  }
}
