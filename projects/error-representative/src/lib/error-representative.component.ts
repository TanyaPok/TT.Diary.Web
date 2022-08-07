import {Component, Input, OnInit} from '@angular/core';

export enum Pictures {
    Coffee,
    Cookies,
    IceCream
}

@Component({
    selector: 'tt-error-representative',
    templateUrl: './error-representative.component.html',
    styleUrls: ['./error-representative.component.scss']
})

export class ErrorRepresentativeComponent implements OnInit {
    public readonly messageStarter = 'Don\'t worry! It\'s just...';
    public Pictures = Pictures;
    @Input() message = 'Page not found';
    @Input() errorNumber = 404;
    @Input() picture = Pictures.Coffee;

    constructor() {
    }

    ngOnInit(): void {
    }
}
