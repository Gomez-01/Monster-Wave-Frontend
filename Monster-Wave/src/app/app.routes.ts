import { Routes } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerCreate } from './components/tracker-create/tracker-create.component';
import { TrackerDetail } from './components/tracker-detail/tracker-detail.component';
import { TrackerEdit } from './components/tracker-edit/tracker-edit.component';
import { TrackerList } from './components/tracker-list/tracker-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tracker/list', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'tracker',
        component: TrackerComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: TrackerList },
            { path: 'new_drink', component: TrackerCreate },
            { path: 'detail', component: TrackerDetail },
            { path: 'update', component: TrackerEdit }
        ]
    }
];