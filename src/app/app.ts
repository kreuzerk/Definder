import {BackendDisplayComponent} from "./components/backend.display.component";
import {Component} from 'angular2/core';

@Component({
	selector: 'app',
	template: `
	<div class="jumbotron">
		<h1>Electron Angular2 starter</h1>
	</div>
	<div>
		<backend-display></backend-display>
	</div>
	`,
	directives: [BackendDisplayComponent]
})
export class App {
}
