import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {ConfigService} from "../services/config.service";

@Injectable({
    providedIn: 'root'
})
export class WorkplaceGuard implements CanActivate {
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;

    constructor(private cookieService: CookieService, private router: Router, private snackBar: MatSnackBar, private configService: ConfigService) {
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const id = parseInt(this.cookieService.get('diary_user_id'));
        if (isNaN(id) || id < 1) {
            this.snackBarRef = this.snackBar.open(`The user's id (${id}) is an unacceptable type.`, 'X', this.configService.getErrorOptions());
            return this.router.parseUrl('login');
        }
        return true;
    }

    ngOnDestroy(): void {
        this.snackBarRef?.dismiss();
    }
}
