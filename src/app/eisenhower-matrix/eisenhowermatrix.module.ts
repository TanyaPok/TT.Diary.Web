import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EisenhowermatrixRoutingModule} from './eisenhowermatrix-routing.module';
import {EisenhowermatrixComponent} from "./eisenhowermatrix.component";
import {ActivityListModule} from "activity-list";
import {NonPrioritizedActivityPipe} from '@pipes/non-prioritized-activity.pipe';
import {EisenhowerDecisionMatrixModule} from "eisenhower-decision-matrix";
import { PrioritizedActivityPipe } from '@pipes/prioritized-activity.pipe';


@NgModule({
    declarations: [EisenhowermatrixComponent, NonPrioritizedActivityPipe, PrioritizedActivityPipe],
    imports: [
        CommonModule,
        EisenhowermatrixRoutingModule,
        ActivityListModule,
        EisenhowerDecisionMatrixModule
    ],
    providers: []
})
export class EisenhowermatrixModule {
}
