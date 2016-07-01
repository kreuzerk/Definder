import {Subject, BehaviorSubject} from 'rxjs';


export class ModeService{

  public modeStream: Subject<boolean> = new BehaviorSubject<boolean>(false);

  changeMode(isMatchMode: boolean): void {
    this.modeStream.next(isMatchMode);
  }
}
