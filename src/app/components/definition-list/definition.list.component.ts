import {Component, OnInit} from 'angular2/core';
import {DefinitionRowComponent} from '../definition-row/definition.row.component';

@Component({
  selector: 'definition-list',
  template: `
    <div class="row" *ngFor="#defintion of definitons">
      <definition-row (onTabKey)="incrementDefinitionsLength()"></definition-row>
    </div>
  `,
  directives: [DefinitionRowComponent]
})
export class DefinitionListComponent implements OnInit{

  definitons: Array<any> = [];

  ngOnInit(): void{
    this.definitons.length = 1;
  }

  incrementDefinitionsLength(){
    this.definitons.length++;
  }

}
