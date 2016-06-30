import {StoreActions} from "../../actions/store.actions";
import {QuizletStore} from "../../model/quizletstore.model";
import {Store} from "@ngrx/store";
import {Component, OnInit, ElementRef} from '@angular/core';
import {DefinitionRowComponent} from '../definition-row/definition.row.component';

@Component({
  selector: 'definition-list',
  template: `
    <div class="row" *ngFor="#defintion of definitons, let i = index">
      <definition-row *ngIf="i >= rowsToDisplay"(onTabKey)="incrementDefinitionsLength()"></definition-row>
    </div>
  `,
  directives: [DefinitionRowComponent]
})
export class DefinitionListComponent implements OnInit{

  definitons: Array<any> = [];
  rowsToDisplay: number = 0;

  constructor(private _store: Store<QuizletStore>){}

  ngOnInit(): void{
    this.definitons.length = 1;
  }

  incrementDefinitionsLength(){
    this.definitons.length++;
  }

  resetDefinitions(){
    this.rowsToDisplay = this.definitons.length - 1;
    let payload = undefined;
    this._store.dispatch({type: StoreActions.DELETE_QUIZLETTERMS.toString(), payload});
  }
}
