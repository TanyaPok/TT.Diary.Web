import {Component, Input, OnInit} from '@angular/core';
import {IActivity} from "./IActivity";
import {ActivityListService} from "./activity-list.service";

@Component({
    selector: 'tt-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
    @Input() public isLoading = false;

    private _source: IActivity[] = [];
    get source() {
        return this._source;
    }

    @Input() set source(value: IActivity[]) {
        this._source = value;
        this.filteredNonPrioritizedActivities = value;
    }

    filteredNonPrioritizedActivities: IActivity[] = [];

    private _activityFilter = '';
    get activityFilter(): string {
        return this._activityFilter;
    }

    set activityFilter(value: string) {
        this._activityFilter = value;
        this.filteredNonPrioritizedActivities = this.activityListService.performFilter(value, this.source);
        if (!this.isNonSorted) {
            this.activityListService.sort(this.isAscOrder, this.filteredNonPrioritizedActivities);
        }
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

    constructor(private activityListService: ActivityListService) {
    }

    ngOnInit(): void {
    }
}
