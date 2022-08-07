import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login.component";

const routes: Routes = [
    {path: '', component: LoginComponent},
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
export class LoginRoutingModule {
}
