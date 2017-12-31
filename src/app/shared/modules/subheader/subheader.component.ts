import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'sub-header',
	templateUrl: './subheader.component.html',
})
export class SubHeaderComponent {

	title: string;

	constructor(router: Router, route: ActivatedRoute) {
		router.events
			.filter(e => e instanceof NavigationEnd)
			.forEach(e => {
				this.title = route.root.firstChild.firstChild.snapshot.data['pageTitle'];
			});
	}
}
