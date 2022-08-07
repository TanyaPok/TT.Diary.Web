import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkplaceComponent} from "./workplace.component";
import {WorkplaceGuard} from "./workplace.guard";

const routes: Routes = [
    {
        path: '',
        component: WorkplaceComponent,
        children: [{
            path: 'eisenhowermatrix',
            loadChildren: () => import('../eisenhower-matrix/eisenhowermatrix.module').then(m => m.EisenhowermatrixModule)
        }],
        canActivate: [WorkplaceGuard]
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () => import('../error-page/error-page.module').then(m => m.ErrorPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkplaceRoutingModule {
}
