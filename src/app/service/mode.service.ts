import {Subject} from "rxjs/Subject";

export class ModeService{

  public modeStream: Subject<boolean> = new Subject<boolean>();

  changeMode(isMatchMode: boolean): void {
    console.log('Hier', isMatchMode);
    this.modeStream.next(isMatchMode);
  }
}
