import {WelcomeUserComponent} from "../welcome-user/welcome.user.component";
import {AuthInputComponent} from "../authcode-input/authcode.input.component";
import {Component} from '@angular/core';

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
        <welcome-user class="pull-right"></welcome-user>
      </div>
    </nav>
  `,
  directives: [AuthInputComponent, WelcomeUserComponent]
})
export class NavbarComponent{}
