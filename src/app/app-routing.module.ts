import { JobInfoComponent } from './job-info/job-info.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: '', redirectTo: '/loginComponent', pathMatch: 'full' },
    { path: 'loginComponent', component: LoginComponent },
    { path: 'customerComponent', component: CustomerComponent },
    { path: 'jobInfoComponent', component: JobInfoComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
