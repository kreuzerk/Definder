import {Component} from 'angular2/core';
import {DictionaryService} from "../service/dictionary.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'backend-display',
  template: `
    <h2>Preview BackendCall</h2>
  `,
  providers: [DictionaryService]
})
export class BackendDisplayComponent{

  definition;

  constructor(private _dictionaryService: DictionaryService){
     this._dictionaryService.getDataFromServer().
      subscribe(data => {
        console.log(data.json());
      })
  }

}
