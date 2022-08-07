import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {WorkplaceRoutingModule} from './workplace-routing.module';
import {WorkplaceComponent} from "./workplace.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {ConfigService} from "../services/config.service";

@NgModule({
    declarations: [WorkplaceComponent],
    imports: [
        CommonModule,
        WorkplaceRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDividerModule
    ],
    providers: [ConfigService]
})
export class WorkplaceModule {
}
