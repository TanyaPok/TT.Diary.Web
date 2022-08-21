import {Component, Input, OnInit} from '@angular/core';
import {IPrioritizedActivity} from "./IPrioritizedActivity";

@Component({
    selector: 'tt-eisenhower-decision-matrix',
    templateUrl: './eisenhower-decision-matrix.component.html',
    styleUrls: ['./eisenhower-decision-matrix.component.scss']
})
export class EisenhowerDecisionMatrixComponent implements OnInit {
    @Input() public isLoading = false;

    private _urgentImportantActivities: IPrioritizedActivity[] = [];
    get urgentImportantActivities() {
        return this._urgentImportantActivities;
    }

    @Input() set urgentImportantActivities(value: IPrioritizedActivity[]) {
        this._urgentImportantActivities = value;
    }

    private _nonUrgentImportantActivities: IPrioritizedActivity[] = [];
    get nonUrgentImportantActivities() {
        return this._nonUrgentImportantActivities;
    }

    @Input() set nonUrgentImportantActivities(value: IPrioritizedActivity[]) {
        this._nonUrgentImportantActivities = value;
    }

    private _urgentUnimportantActivities: IPrioritizedActivity[] = [];
    get urgentUnimportantActivities() {
        return this._urgentUnimportantActivities;
    }

    @Input() set urgentUnimportantActivities(value: IPrioritizedActivity[]) {
        this._urgentUnimportantActivities = value;
    }

    private _nonUrgentUnimportantActivities: IPrioritizedActivity[] = [];
    get nonUrgentUnimportantActivities() {
        return this._nonUrgentUnimportantActivities;
    }

    @Input() set nonUrgentUnimportantActivities(value: IPrioritizedActivity[]) {
        this._nonUrgentUnimportantActivities = value;
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
