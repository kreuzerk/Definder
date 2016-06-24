import {AuthInputComponent} from "../authcode-input/authcode.input.component";
import {Component} from 'angular2/core';

@Component({
  selector: 'navbar-cmp',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <h2 class="navbar-brand">
            Definder
          </h2>
        </div>
        <auth-input class="pull-right"></auth-input>
      </div>
    </nav>
  `,
  directives: [AuthInputComponent]
})
export class NavbarComponent{}
