import {Component, Input} from '@angular/core';

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
  image: string = 'build/' + require('./trash-icon.png');

  deleteDefinition(index: number): void{
    this.definitions.splice(index, 1);
  }
}
