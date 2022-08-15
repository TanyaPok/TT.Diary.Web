import {NgModule} from '@angular/core';

import {ErrorPageRoutingModule} from './error-page-routing.module';
import {ErrorRepresentativeModule} from "error-representative";
import {ErrorPageComponent} from "./error-page.component";


@NgModule({
    declarations: [ErrorPageComponent],
    imports: [
        ErrorPageRoutingModule,
        ErrorRepresentativeModule
    ]
})
export class ErrorPageModule {
}
