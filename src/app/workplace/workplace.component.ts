import {Component, OnInit} from '@angular/core';
import {IMenuItem} from "../models/IMenuItem";
import {Subscription} from "rxjs";
import {ParamService} from "../services/param.service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {ConfigService} from "../services/config.service";

@Component({
    selector: 'tt-workplace',
    templateUrl: './workplace.component.html',
    styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {
    public userImg = '';

    get userName(): string {
        return `${this._userName}'s diary`;
    }

    set userName(value: string) {
        this._userName = value;
    }

    private _userName = '';
    public menuItems: IMenuItem[] = [];
    private menuItemSubscription!: Subscription;
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;

    constructor(private configService: ConfigService, private paramService: ParamService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.userImg = this.paramService.picture;
        this.userName = this.paramService.givenName;
        this.menuItemSubscription = this.configService.getMenuItems().subscribe({
            next: items => {
                this.menuItems = items;
            },
            error: err => {
                this.snackBarRef = this.snackBar.open(err?.message, 'X', this.configService.getErrorOptions());
                console.error(err);
            }
        });
    }

    ngOnDestroy(): void {
        this.menuItemSubscription.unsubscribe();
        this.snackBar?.dismiss();
    }
}
