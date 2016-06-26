import {WelcomeUserComponent} from "../welcome-user/welcome.user.component";
import {AuthInputComponent} from "../authcode-input/authcode.input.component";
import {Component} from '@angular/core';

@Component({
  selector: 'navbar-cmp',
  template: `
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
        <div class="textContainer">
          <div class="smallHeadline">Powered by Quizlet</div>
          <div class="largeHeadLine">Definder</div>
        </div>
        <img alt="Brand" [src]="image"/>
        </div>
        <div class="authAndWelcome">
          <auth-input class="pull-right"></auth-input>
          <welcome-user class="pull-right"></welcome-user>
        </div>
      </div>
    </nav>
  `,
  directives: [AuthInputComponent, WelcomeUserComponent],
  styles: [`
    img{
      max-width: 100px;
      max-height: 100px;
      margin-left: 20px;
    }
    .largeHeadLine{
      font-family: times, Times New Roman, times-roman, georgia, serif;
	    color: white;
	    margin: 0;
	    padding: 0px 0px 6px 0px;
      font-size: 51px;
	    line-height: 44px;
	    letter-spacing: -2px;
	    font-weight: bold;
    }
    .smallHeadline{
      font-family: Gill Sans, Verdana;
	    font-size: 11px;
	    line-height: 14px;
	    text-transform: uppercase;
	    letter-spacing: 2px;
	    font-weight: bold;
      color: white;
    }
    .textContainer{
      margin-top: 20px;
      display: inline-block;
    }
    .authAndWelcome{
      margin-top: 10px;
    }
    `]
})
export class NavbarComponent{

  image = './build/' + require('./app-image.png');

}
