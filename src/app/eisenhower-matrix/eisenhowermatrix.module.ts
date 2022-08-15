import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EisenhowermatrixRoutingModule} from './eisenhowermatrix-routing.module';
import {EisenhowermatrixComponent} from "./eisenhowermatrix.component";
import {ActivityListModule} from "activity-list";
import {NonPrivatizedActivityPipe} from './non-privatized-activity.pipe';


@NgModule({
    declarations: [EisenhowermatrixComponent, NonPrivatizedActivityPipe],
    imports: [
        CommonModule,
        EisenhowermatrixRoutingModule,
        ActivityListModule
    ],
    providers: []
})
export class EisenhowermatrixModule {
}
