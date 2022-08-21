import { NgModule } from '@angular/core';
import { EisenhowerDecisionMatrixComponent } from './eisenhower-decision-matrix.component';
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    EisenhowerDecisionMatrixComponent
  ],
    imports: [
        NgIf,
        MatCardModule,
        NgForOf,
        MatProgressSpinnerModule
    ],
  exports: [
    EisenhowerDecisionMatrixComponent
  ]
})
export class EisenhowerDecisionMatrixModule { }
