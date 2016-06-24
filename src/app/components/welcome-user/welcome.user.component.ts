import {Component} from 'angular2/core';

@Component({
  selector: 'welcome-user',
  template: `
    <h2>Willkommen</h2>
    <img [src]="image"/>
  `,
  styles: [
    `
    h2{
      display: inline;
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
