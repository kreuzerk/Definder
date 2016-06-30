import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {DefinitionRowComponent} from '../definition-row/definition.row.component';

@Component({
  selector: 'definition-list',
  template: `
    <div class="row" *ngFor="#defintion of definitons">
      <definition-row #definitionRow (onTabKey)="incrementDefinitionsLength()"></definition-row>
    </div>
  `,
  directives: [DefinitionRowComponent]
})
export class DefinitionListComponent implements OnInit{

  definitons: Array<any> = [];
  @ViewChild('definitionRow') definitionRow: ElementRef;

  ngOnInit(): void{
    this.definitons.length = 1;
  }

  incrementDefinitionsLength(){
    this.definitons.length++;
  }

  resetDefinitions(){
    this.definitons.length = 1;
    this.definitionRow.resetRow();
  }
}
