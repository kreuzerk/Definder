import {QuizletService} from "./service/quizlet.service";
import {CompletionComponent} from "./components/completion/completion.component";
import {Component} from '@angular/core';
import {Store} from "@ngrx/store";

import {QuizletStore} from "./model/quizletstore.model";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {DefinitionListComponent} from "./components/definition-list/definition.list.component";

@Component({
	selector: 'app',
	template: `
	<div>
		<navbar-cmp></navbar-cmp>
	</div>
	<div *ngIf="quizletService.accessToken" class="container-fluid">
			<definition-list></definition-list>
			<completion-cmp></completion-cmp>
	</div>
	`,
	directives: [DefinitionListComponent, NavbarComponent, CompletionComponent]
})
export class App {

	constructor(private _store: Store<QuizletStore>, public quizletService: QuizletService){}

	logStore(): void{
		this._store.select('quizletterm')
			.subscribe((quizletterms) => { console.log(quizletterms) });
	}

}
