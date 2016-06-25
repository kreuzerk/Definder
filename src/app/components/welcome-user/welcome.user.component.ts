import {Component} from 'angular2/core';

@Component({
  selector: 'welcome-user',
  template: `
    <h2>Welcome</h2>
    <img [src]="image"/>
  `,
  styles: [
    `
    h2{
      display: inline;
      font-family: "Times New Roman", Times, serif;
      margin-top: 2cm;
      font-size : 14pt;
      line-height : 100%;
      margin : 10px;
      color : #909090;
    }
    `
  ]
})
export class WelcomeUserComponent{

  image: string = './build/' + require('./motivated.png');

  constructor(){
    console.log('Ich logge', this.image);
  }

}
