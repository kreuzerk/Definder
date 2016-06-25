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
        <li *ngFor="#definition of definitions">
          <b>{{definition.headword}}</b>
          {{definition.senses[0].definition}}
        </li>
      </ul>
    </div>
  </div>
  `
})
export class DefinitionPanelComponent{

  @Input() definitions: any;
  @Input() title: string;

}
