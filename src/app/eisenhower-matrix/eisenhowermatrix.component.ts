import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "@services/data.service";
import {ParamService} from "@services/param.service";
import {ConfigService} from "@services/config.service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {INonPrioritizedActivity} from "@models/INonPrioritizedActivity";
import {IPrioritizedActivity} from "@models/IPrioritizedActivity";

@Component({
    selector: 'tt-eisenhowermatrix',
    templateUrl: './eisenhowermatrix.component.html',
    styleUrls: ['./eisenhowermatrix.component.scss']
})
export class EisenhowermatrixComponent implements OnInit {
    private nonPrioritizedActivitySubscription!: Subscription;
    private prioritizedActivitySubscription!: Subscription;
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;
    public nonPrioritizedActivities: INonPrioritizedActivity[] = [];
    public prioritizedActivities: IPrioritizedActivity[] = [];
    public isLoadingNonPrioritizedActivities = false;
    public isLoadingPrioritizedActivities = false;

    constructor(private dataService: DataService, private paramService: ParamService, private configService: ConfigService, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.loadNonPrioritizedActivities();
        this.loadPrioritizedActivities();
    }

    ngOnDestroy(): void {
        this.nonPrioritizedActivitySubscription.unsubscribe();
        this.prioritizedActivitySubscription.unsubscribe();
        this.snackBarRef?.dismiss();
    }

    private loadNonPrioritizedActivities(): void {
        this.isLoadingNonPrioritizedActivities = true;
        this.nonPrioritizedActivitySubscription = this.dataService.getNonPrioritizedActivities(this.paramService.userId).subscribe({
            next: (activities) => {
                this.nonPrioritizedActivities = activities;
                this.isLoadingNonPrioritizedActivities = false;
            },
            error: err => {
                this.snackBarRef = this.snackBar.open(err?.message, 'X', this.configService.getErrorOptions());
                console.error(err);
                this.isLoadingNonPrioritizedActivities = false;
            }
        });
    }

    private loadPrioritizedActivities(): void {
        this.isLoadingPrioritizedActivities = true;
        this.prioritizedActivitySubscription = this.dataService.getPrioritizedActivities(this.paramService.userId).subscribe({
            next: (activities) => {
                this.prioritizedActivities = activities;
                this.isLoadingPrioritizedActivities = false;
            },
            error: err => {
                this.snackBarRef = this.snackBar.open(err?.message, 'X', this.configService.getErrorOptions());
                console.error(err);
                this.isLoadingPrioritizedActivities = false;
            }
        });
    }
}
