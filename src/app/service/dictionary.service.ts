import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';


@Injectable()
export class DictionaryService {

    constructor(private _http:Http) {
    }

    getWordDefinition(word: string): Observable<Response> {
        return this._http.get(`http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=${word}`)
          .map(response => response.json().results)
    }
}
