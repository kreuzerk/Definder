import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class DictionaryService {

    constructor(private _http:Http) {
    }

    getDataFromServer() {
        return this._http.get('http://api.pearson.com/v2/dictionaries/wordwise/entries?headword=house');
    }
}
