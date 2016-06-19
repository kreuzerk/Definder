import {Component} from 'angular2/core';
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";

@Component({
	selector: 'app',
	template: `
	<div class="jumbotron">
		<h1>Definder</h1>
	</div>
	<div>
		<definition-list></definition-list>
	</div>
	`,
	directives: [DefinitionListComponent]
})
export class App {
}
