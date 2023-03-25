import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "@services/data.service";
import {ParamService} from "@services/param.service";
import {ConfigService} from "@services/config.service";
import {Activities, INonPrioritizedActivity} from "@models/INonPrioritizedActivity";
import {IPrioritizedActivity, Priorities} from "@models/IPrioritizedActivity";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

export const PriorityIds = new Map<number, string>([
    [Priorities.None, 'activityListId'],
    [Priorities.ImportantAndUrgent, 'urgentImportantInternalId'],
    [Priorities.ImportantAndNotUrgent, 'nonUrgentImportantInternalId'],
    [Priorities.NotImportantUrgent, 'urgentUnimportantInternalId'],
    [Priorities.NotImportantNotUrgent, 'nonUrgentUnimportantInternalId']
]);

@Component({
    selector: 'tt-eisenhowermatrix',
    templateUrl: './eisenhowermatrix.component.html',
    styleUrls: ['./eisenhowermatrix.component.scss']
})
export class EisenhowermatrixComponent implements OnInit {
    private priorityCanNotBeUpdated = 'Priority can not be updated.';
    private nonPrioritizedActivitySubscription!: Subscription;
    private prioritizedActivitySubscription!: Subscription;
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;
    public nonPrioritizedActivities: INonPrioritizedActivity[] = [];
    public prioritizedActivities: IPrioritizedActivity[] = [];
    public isLoadingNonPrioritizedActivities = false;
    public isLoadingPrioritizedActivities = false;
    public Priorities = Priorities;

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

    onDropUrgentImportantActivity(event: CdkDragDrop<any>): void {
        if (event.previousContainer === event.container) {
            return;
        }

        const activity = event.previousContainer.data[event.previousIndex];
        switch (activity.subtitle) {
            case Activities.ToDO:
                this.dataService.setToDoPriority(activity.id, this.getPriority(event.container.id))?.forEach(isUpdated => {
                    this.refresh(isUpdated, event);
                });
                break;
            case Activities.Habit:
                this.dataService.setHabitPriority(activity.id, this.getPriority(event.container.id))?.forEach(isUpdated => {
                    this.refresh(isUpdated, event);
                });
                break;
            case Activities.Appointment:
                this.dataService.setAppointmentPriority(activity.id, this.getPriority(event.container.id))?.forEach(isUpdated => {
                    this.refresh(isUpdated, event);
                });
                break;
            case Activities.Wish:
                this.dataService.setWishPriority(activity.id, this.getPriority(event.container.id))?.forEach(isUpdated => {
                    this.refresh(isUpdated, event);
                });
                break;
            default:
                //eslint-disable-next-line no-case-declarations
                const error = `Unexpected activity type ${activity.type}.`;
                this.snackBarRef = this.snackBar.open(error, 'X', this.configService.getErrorOptions());
                console.error(error);
                break;
        }
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

    private getPriority(value: string): Priorities {
        const keys = [...PriorityIds.entries()].filter((pair) => pair[1] === value).map((k) => k[0]);
        if (keys.length === 0)
            return Priorities.None;
        return keys[0];
    }

    private refresh(isUpdated: boolean, event: CdkDragDrop<any>): void {
        if (!isUpdated) {
            this.snackBarRef = this.snackBar.open(this.priorityCanNotBeUpdated, 'X', this.configService.getErrorOptions());
            console.error(this.priorityCanNotBeUpdated);
            return;
        }
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }
}
