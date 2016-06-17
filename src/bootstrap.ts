import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {App} from './app/app';

// enableProdMode() // include for production builds

export function main() {
	return bootstrap(App, [
		HTTP_PROVIDERS,
	])
	.catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
