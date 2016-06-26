import {Store} from "@ngrx/store";
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Quizletterm} from "../model/quizletTerm.model";
import {QuizletStore} from "../model/quizletstore.model";

@Injectable()
export class QuizletService{

  private baseURL = 'https://api.quizlet.com/oauth/token';
  private options = {
    grant_type: 'authorization_code',
    redirect_uri: 'http://www.example.com/definder/',
    client_id: 'pQEAmQ33wN',
    client_sectet: 'y2xrd9CVS3VYdHn9kTE6e2'
  }
  private basicAuth = 'Basic cFFFQW1RMzN3Tjp5MnhyZDlDVlMzVllkSG45a1RFNmUy';
  private accessToken: string;
  private quizletterms: Array<Quizletterm>;

  constructor(private _http: Http, private _store: Store<QuizletStore>){
    this._store.select('quizletterm').
      subscribe((quizletterms: Array<Quizletterm>) => {
        this.quizletterms = quizletterms;
      })
  }

  getAccessToken(authCode: string){
    console.log('I am calling');
     let headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     headers.append('Authorization', this.basicAuth);

    this._http.post(this.baseURL + '?grant_type=' + this.options.grant_type + '&code=' + authCode,
          '', {headers: headers})
          .map(res => res.json())
          .subscribe(result => {
            this.accessToken = result.access_token
            this._makeTestCall();
          });
  }

  private _makeTestCall(){

    console.log('I make the call with the token', this.accessToken);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    let title = 'My first set through the api';

    this._http.post('https://api.quizlet.com/2.0/sets?' + 'whitespace=1&title=' + title +
    '&terms[]=milch&definitions[]=milk,wert&terms[]=milk&definitions[]=milch&lang_terms=de&lang_definitions=en',
      '', {headers: headers}
    )
    .subscribe(response => console.log(response));

  }

  createSet(title: string) {
    console.log('Im Service, lets go');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    let termsAndDefinitions: string = this._getTermsAndDefinitions();
    return this._http.post('https://api.quizlet.com/2.0/sets?' + 'whitespace=1&title=' + title +
    termsAndDefinitions + '&lang_terms=de&lang_definitions=en',
      '', {headers: headers}
    );
  }

  private _getTermsAndDefinitions(): string {
    let result = '';
    this.quizletterms.forEach((term: Quizletterm) => {
      result += '&terms[]=' + term.word;
      result += this._extractDefinitions(term.definitions).replace(',', '');
    })
    return result;
  }

  private _extractDefinitions(definitions: Array<string>): string {
    let result = '&definitions[]=';
    definitions.forEach((definition) => {
      result += ',' + definition ;
    });
    return result;
  }
}
