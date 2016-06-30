import {ModeService} from "./app/service/mode.service";
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide, ReflectiveInjector} from '@angular/core';
import {HTTP_PROVIDERS, Request, XSRFStrategy} from '@angular/http';
import {provideStore} from '@ngrx/store';

import {App} from './app/app';
import {QuizletService} from './app/service/quizlet.service';
import {quizletterm} from './app/reducers/quizletterm.reducer';;

import 'core-js/es6';
import 'core-js/es7/reflect';

// Angular2 Dependencies
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

class FakeXSRFStrategy implements XSRFStrategy {
  public configureRequest(req: Request) { /* */ }
}

const XRSF_MOCK = provide(XSRFStrategy, { useValue: new FakeXSRFStrategy() })

export function main() {
	return bootstrap(App, [
		HTTP_PROVIDERS,
		XRSF_MOCK,
		QuizletService,
    ModeService,
		provideStore({quizletterm})
	])
	.catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
