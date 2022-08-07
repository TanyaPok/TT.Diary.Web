import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IMenuItem} from "../models/IMenuItem";
import {HttpClient} from "@angular/common/http";
import {MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private readonly menuItemsUrl = 'assets/api/menuItems.json';

    constructor(private http: HttpClient) {
    }

    getMenuItems(): Observable<IMenuItem[]> {
        return this.http.get<IMenuItem[]>(this.menuItemsUrl);
    }

    getErrorOptions(): MatSnackBarConfig {
        return {
            panelClass: 'errorSnackBar',
            duration: 5000
        };
    }
}
