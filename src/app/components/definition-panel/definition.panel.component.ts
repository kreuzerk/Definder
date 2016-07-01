import {ModeService} from "../../service/mode.service";
import {Store} from "@ngrx/store";
import {Component, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {Quizletterm} from "../../model/quizletterm.model";
import {QuizletStore} from "../../model/quizletstore.model";
import {StoreActions} from "../../actions/store.actions";

@Component({
  selector: 'definition-panel',
  template: `
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title" *ngIf="title">Search Results for {{ title }}</h3>
    </div>
    <div class="panel-body">
      <ul>
        <li *ngFor="let definition of definitions; let i = index">
        <img [src]="image" (click)="deleteDefinition(i)"/>
          <b>{{definition.headword}}</b>
          {{definition.senses[0].definition}}
        </li>
      </ul>
    </div>
  </div>
  `,
  styles: [`
    ul{
      list-style-type: none;
    }
    `]
})
export class DefinitionPanelComponent implements AfterViewInit{

  @Input() definitionsStream: any;
  @Input() title: string;
  @Input() rowIndex: number;
  @Output() onLastDefDeleted = new EventEmitter<boolean>();
  definitions: any;
  private _internalDefinitions: any;
  private isModeOn: boolean;

  image: string = 'build/' + require('./trash-icon.png');

  constructor(private _store: Store<QuizletStore>, private _modeService: ModeService){
    this._modeService.modeStream.subscribe((isMode) => {
      this.isModeOn = isMode;
      this._filterDefinitions();
    })
  }

  ngAfterViewInit():void {
    this.definitionsStream.subscribe(defObservable => {
      defObservable.subscribe(definitions => {
        this.definitions = definitions;
        this._internalDefinitions = definitions;
        this._filterDefinitions();
      });
    })
  }

  private _filterDefinitions(): void{
    if(this.definitions){
      if(this.isModeOn){
        this.definitions = this.definitions.filter(definition => definition.headword === this.title);
      }
      else{
        this.definitions = this._internalDefinitions;
      }
      this._updateDefinition();
    }
  }

  deleteDefinition(index: number): void{
    this.definitions.splice(index, 1);
    if(this.definitions.length === 0){
      this.onLastDefDeleted.emit(true);
    }
    else{
      this._internalDefinitions = this.definitions;
      this._updateDefinition();
    }
  }

  private _updateDefinition(){
    let mappedDefinitions = this.definitions.map(definition => definition.senses)
      .map(senses => senses[0].definition);

    let payload: Quizletterm = {
      id: this.rowIndex,
      word: this.title,
      definitions: mappedDefinitions
    };

    this._store.dispatch({type: StoreActions.UPDATE_QUIZLETTERM.toString(), payload});
  }
}
