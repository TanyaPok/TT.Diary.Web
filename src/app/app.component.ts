import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {filter, map, Observable, of} from "rxjs";

@Component({
    selector: 'tt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading$: Observable<boolean> = of(false);
    title = 'Diary';

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.loading$ = this.router.events.pipe(
            filter(
                (e) =>
                    e instanceof NavigationStart ||
                    e instanceof NavigationEnd ||
                    e instanceof NavigationCancel ||
                    e instanceof NavigationError
            ),
            map((e) => e instanceof NavigationStart)
        );
    }
}
