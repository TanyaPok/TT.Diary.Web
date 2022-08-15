import { NgModule } from '@angular/core';
import { ActivityListComponent } from './activity-list.component';
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ActivityListComponent
  ],
    imports: [
        FormsModule,
        MatCheckboxModule,
        NgForOf,
        MatCardModule,
        NgIf,
        MatProgressSpinnerModule
    ],
  exports: [
    ActivityListComponent
  ]
})
export class ActivityListModule { }
