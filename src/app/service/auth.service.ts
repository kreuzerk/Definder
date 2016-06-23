import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Injectable()
export class AuthService{

  private baseURL = 'https://api.quizlet.com/oauth/token';
  private options = {
    grant_type: 'authorization_code',
    redirect_uri: 'http://www.example.com/definder/',
    client_id: 'pQEAmQ33wN',
    client_sectet: 'y2xrd9CVS3VYdHn9kTE6e2'
  }
  private basicAuth = 'Basic cFFFQW1RMzN3Tjp5MnhyZDlDVlMzVllkSG45a1RFNmUy';
  private headers = new Headers();

  constructor(private _http: Http){
  }

  getAccessToken(authCode: string){
    console.log('I am calling');
     this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
     this.headers.append('Authorization', this.basicAuth);

    this._http.post(this.baseURL + '?grant_type=' + this.options.grant_type + '&code=' + authCode,
          '', {headers: this.headers})
          .subscribe(result => console.log('Es klappt', result));
  }
}
