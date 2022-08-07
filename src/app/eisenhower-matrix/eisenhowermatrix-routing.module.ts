import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EisenhowermatrixComponent} from "./eisenhowermatrix.component";

const routes: Routes = [
    {path: '', component: EisenhowermatrixComponent},
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () => import('../error-page/error-page.module').then(m => m.ErrorPageModule)
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EisenhowermatrixRoutingModule {
}
