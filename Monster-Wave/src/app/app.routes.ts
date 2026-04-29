import { Routes } from '@angular/router';
import { Tracker } from './tracker/tracker';

export const routes: Routes = [
    {path: '', redirectTo: 'tracker', pathMatch: "full"},
    {path: 'tracker', component: Tracker}
];
