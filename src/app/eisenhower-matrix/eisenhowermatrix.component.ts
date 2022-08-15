import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../services/data.service";
import {ParamService} from "../services/param.service";
import {ConfigService} from "../services/config.service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {INonPrivatizedActivity} from "@models/INonPrivatizedActivity";

@Component({
    selector: 'tt-eisenhowermatrix',
    templateUrl: './eisenhowermatrix.component.html',
    styleUrls: ['./eisenhowermatrix.component.scss']
})
export class EisenhowermatrixComponent implements OnInit {
    private nonPrioritizedActivitySubscription!: Subscription;
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;
    public nonPrioritizedActivities: INonPrivatizedActivity[] = [];
    public isLoading = false;

    constructor(private dataService: DataService, private paramService: ParamService, private configService: ConfigService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.nonPrioritizedActivitySubscription = this.dataService.getNonPrioritizedMatters(this.paramService.userId).subscribe({
            next: (matters) => {
                this.nonPrioritizedActivities = matters;
                this.isLoading = false;
            },
            error: err => {
                this.snackBarRef = this.snackBar.open(err?.message, 'X', this.configService.getErrorOptions());
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.nonPrioritizedActivitySubscription.unsubscribe();
        this.snackBarRef?.dismiss();
    }
}
