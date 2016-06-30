import {ModeService} from "../../service/mode.service";
import {Component} from '@angular/core';

@Component({
  selector: 'toggle-cmp',
  template: `
    <div>
      <button *ngIf="isModeOn" class="btn btn-success" (click)="toggle()">
        <span class="glyphicon glyphicon-check" aria-hidden="true"></span>Match Word Mode: On
      </button>
      <button *ngIf="!isModeOn" class="btn btn-danger" (click)="toggle()">
        <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>Match Word Mode: Off
      </button>
    </div>
  `,
  styles:[`
    b{
      color: white;
    }
    div{
      margin-top: 50px;
    }
    button{
      margin-left: 10px;
      text-align: center;
    }
    `]
})
export class ToggleComponent{
  isModeOn: boolean = false;

  constructor(private _modeService: ModeService){}

  toggle(): void{
    this.isModeOn = !this.isModeOn;
    this._modeService.changeMode(this.isModeOn);
  }
}
