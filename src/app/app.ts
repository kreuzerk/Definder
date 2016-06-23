import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthService} from "./service/auth.service";
import {Component} from 'angular2/core';
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";

@Component({
	selector: 'app',
	template: `
	<div>
		<navbar-cmp></navbar-cmp>
	</div>
	<div class="container-fluid">
			<definition-list></definition-list>
	</div>
	<button class="btn btn-danger" (click)="logJsonFile()">Log JsonFile</button>
	`,
	directives: [DefinitionListComponent, NavbarComponent]
})
export class App {

	constructor(){}
}
