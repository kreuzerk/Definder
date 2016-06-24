import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

// include for development builds
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
// include for production builds
// import {enableProdMode} from 'angular2/core';

import {App} from './app/app';
import {AuthService} from './app/service/auth.service';

// enableProdMode() // include for production builds

export function main() {
	return bootstrap(App, [
		HTTP_PROVIDERS,
		AuthService,
		ELEMENT_PROBE_PROVIDERS // remove in production
	])
	.catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
