import {Observable} from "rxjs/Observable";
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
var jsonFile = require("../../../sample.json");


@Injectable()
export class DictionaryService {

    constructor(private _http:Http) {
      console.log(jsonFile);
    }

    getWordDefinition(word: string): Observable<Response> {
        return this._http.get(`http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=${word}`)
          .map(response => response.json().results)
    }
}
