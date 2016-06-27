import {Store} from "@ngrx/store";
import {Component, Input} from '@angular/core';
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
export class DefinitionPanelComponent{

  @Input() definitions: any;
  @Input() title: string;
  @Input() rowIndex: number;
  image: string = 'build/' + require('./trash-icon.png');

  constructor(private _store: Store<QuizletStore>){}

  deleteDefinition(index: number): void{
    this.definitions.splice(index, 1);

    let mappedDefinitions = this.definitions.map(definition => definition.senses)
      .map(senses => senses[0].definition);

    let editedTerm: Quizletterm = {
      word: this.title,
      definitions: mappedDefinitions
    };

    let payload = {
      rowIndex: this.rowIndex,
      newQuizletterm: editedTerm
    }
    this._store.dispatch({type: StoreActions.UPDATE_QUIZLETTERM.toString(), payload});
  }
}
