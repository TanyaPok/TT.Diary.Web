import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

export enum Params {
    UserId = 'diary_user_id',
    Picture = 'diary_picture',
    GivenName = 'diary_given_name'
}

@Injectable({
    providedIn: 'root'
})
export class ParamService {
    get givenName(): string {
        return this.cookieService.get(Params.GivenName);
    }

    set givenName(value: string) {
        this.cookieService.set(Params.GivenName, value);
    }

    get picture(): string {
        return this.cookieService.get(Params.Picture);
    }

    set picture(value: string) {
        this.cookieService.set(Params.Picture, value);
    }

    get userId(): number {
        return Number(this.cookieService.get(Params.UserId));
    }

    set userId(value: number) {
        this.cookieService.set(Params.UserId, value.toString());
    }

    constructor(private cookieService: CookieService) {
    }
}
