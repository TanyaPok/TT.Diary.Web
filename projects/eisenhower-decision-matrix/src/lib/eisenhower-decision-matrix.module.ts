import { NgModule } from '@angular/core';
import { EisenhowerDecisionMatrixComponent } from './eisenhower-decision-matrix.component';
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
    EisenhowerDecisionMatrixComponent
  ],
    imports: [
        NgIf,
        MatCardModule,
        NgForOf,
        MatProgressSpinnerModule,
        DragDropModule
    ],
  exports: [
    EisenhowerDecisionMatrixComponent
  ]
})
export class EisenhowerDecisionMatrixModule { }
