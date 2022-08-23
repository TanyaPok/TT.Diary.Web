import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IActivity} from "./IActivity";
import {ActivityListService} from "./activity-list.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
    selector: 'tt-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
    @Output() public internalId = "activityListId";
    @Input() public isLoading = false;

    private _connectedTo = [this.internalId];
    get connectedTo() {
        return this._connectedTo;
    }

    @Input() set connectedTo(value: string[]) {
        value.forEach(v => this._connectedTo.push(v));
    }

    private _source: IActivity[] = [];
    get source() {
        return this._source;
    }

    @Input() set source(value: IActivity[]) {
        this._source = value;
        this.filteredNonPrioritizedActivities = value;
        this.filteredNonPrioritizedActivitiesBeforeDragAndDrop = value;
    }

    filteredNonPrioritizedActivities: IActivity[] = [];
    private filteredNonPrioritizedActivitiesBeforeDragAndDrop: IActivity[] = [];

    private _activityFilter = '';
    get activityFilter(): string {
        return this._activityFilter;
    }

    set activityFilter(value: string) {
        this.source = this.activityListService.PutInOrder(this.source, this.filteredNonPrioritizedActivitiesBeforeDragAndDrop, this.filteredNonPrioritizedActivities);
        this._activityFilter = value;
        this.filteredNonPrioritizedActivities = this.activityListService.performFilter(value, this.source);
        if (!this.isNonSorted) {
            this.activityListService.sort(this.isAscOrder, this.filteredNonPrioritizedActivities);
        }
        this.filteredNonPrioritizedActivitiesBeforeDragAndDrop = [...this.filteredNonPrioritizedActivities];
    }

    isNonSorted = true;

    private _isAscOrder = false;
    get isAscOrder(): boolean {
        return this._isAscOrder;
    }

    set isAscOrder(value: boolean) {
        this._isAscOrder = value;
        this.isNonSorted = false;
        this.activityListService.sort(value, this.filteredNonPrioritizedActivities);
    }

    @Output() dropActivity: EventEmitter<CdkDragDrop<IActivity[]>> = new EventEmitter<CdkDragDrop<IActivity[]>>();

    constructor(private activityListService: ActivityListService) {
    }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<IActivity[]>) {
        this.dropActivity.emit(event);
    }
}
