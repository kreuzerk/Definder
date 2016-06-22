import {Component} from 'angular2/core';
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";
var jsonFile = require("../../sample.json");
import {Http} from 'angular2/http';

@Component({
	selector: 'app',
	template: `
	<div class="jumbotron">
		<h1>Definder</h1>
	</div>
	<div class="container-fluid">
		<definition-list></definition-list>
	</div>
	<button class="btn btn-danger" (click)="logJsonFile()">Log JsonFile</button>
	`,
	directives: [DefinitionListComponent]
})
export class App {

	constructor(private _http: Http){
		console.log('File', console.log(jsonFile));

		this._http.get(jsonFile)
			.subscribe(res => {console.log('Hallo', res)});
	}
}
