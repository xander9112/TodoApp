/*
import fetch from 'isomorphic-fetch';
import {serialize} from './serialize';
import $ from 'jquery';

/!*function formatUrl (query) {
 "use strict";
 return Object.keys(query)
 .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[ key ]))
 .join("&")
 .replace(/%20/g, "+")
 }*!/

export function fetchApi (url, body) {
	"use strict";
	/!*var query = {
	 key: TrelloApiKey,
	 token
	 };*!/

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': window.csrf_token
		}
	});

	return $.ajax({
		url:    `${url}`,
		method: 'POST',
		data:   serialize(body)
	})
}
*/
