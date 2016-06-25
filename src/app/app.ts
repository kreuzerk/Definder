import {Component} from '@angular/core';
import {Store} from "@ngrx/store";

import {QuizletStore} from "./model/quizletstore.model";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthService} from "./service/auth.service";
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";

@Component({
	selector: 'app',
	template: `
	<div>
		<navbar-cmp></navbar-cmp>
	</div>
	<div class="container-fluid">
			<definition-list></definition-list>
			<button class="btn btn-danger" (click)="logStore()">Log Store</button>
	</div>
	`,
	directives: [DefinitionListComponent, NavbarComponent]
})
export class App {

	constructor(private _store: Store<QuizletStore>){}

	logStore(): void{
		this._store.select('quizletterm')
			.subscribe((quizletterms) => { console.log(quizletterms) });
	}

}
