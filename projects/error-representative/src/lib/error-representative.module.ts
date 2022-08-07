import {NgModule} from '@angular/core';
import {ErrorRepresentativeComponent} from './error-representative.component';
import {CommonModule, DecimalPipe} from "@angular/common";
import {ErrorRepresentativeService} from "./error-representative.service";


@NgModule({
    declarations: [ErrorRepresentativeComponent],
    imports: [DecimalPipe, CommonModule],
    providers: [ErrorRepresentativeService],
    exports: [ErrorRepresentativeComponent]
})
export class ErrorRepresentativeModule {
}
