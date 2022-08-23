import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPrioritizedActivity} from "./IPrioritizedActivity";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
    selector: 'tt-eisenhower-decision-matrix',
    templateUrl: './eisenhower-decision-matrix.component.html',
    styleUrls: ['./eisenhower-decision-matrix.component.scss']
})
export class EisenhowerDecisionMatrixComponent implements OnInit {
    @Output() public urgentImportantInternalId = 'urgentImportantInternalId';
    @Output() public nonUrgentImportantInternalId = 'nonUrgentImportantInternalId';
    @Output() public urgentUnimportantInternalId = 'urgentUnimportantInternalId';
    @Output() public nonUrgentUnimportantInternalId = 'nonUrgentUnimportantInternalId';
    @Input() public isLoading = false;

    private _connectedTo = [this.urgentImportantInternalId, this.nonUrgentImportantInternalId, this.urgentUnimportantInternalId, this.nonUrgentUnimportantInternalId];
    get connectedTo() {
        return this._connectedTo;
    }

    @Input() set connectedTo(value: string[]) {
        value.forEach(v => this._connectedTo.push(v));
    }

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

    @Output() dropUrgentImportantActivity: EventEmitter<CdkDragDrop<IPrioritizedActivity[]>> = new EventEmitter<CdkDragDrop<IPrioritizedActivity[]>>();

    constructor() {
    }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<IPrioritizedActivity[]>) {
        this.dropUrgentImportantActivity.emit(event);
    }
}
