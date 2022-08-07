import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'workplace'},
    {
        path: 'workplace',
        loadChildren: () => import('./workplace/workplace.module').then(m => m.WorkplaceModule)
    },
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
