import {AuthInputComponent} from "./components/authcode-input/authcode.input.component";
import {AuthService} from "./service/auth.service";
import {Component} from 'angular2/core';
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";

@Component({
	selector: 'app',
	template: `
	<div class="jumbotron">
		<h1>Definder</h1>
	</div>
	<div class="container-fluid">
		<div class="row">
			<auth-input></auth-input>
		</div>
		<div class="row">
			<definition-list></definition-list>
		</div>
	</div>
	<button class="btn btn-danger" (click)="logJsonFile()">Log JsonFile</button>
	`,
	directives: [DefinitionListComponent, AuthInputComponent]
})
export class App {

	constructor(){}
}
