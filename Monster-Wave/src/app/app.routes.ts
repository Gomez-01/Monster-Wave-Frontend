import { Routes } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerCreate } from './tracker/components/tracker-create/tracker-create.component';
import { TrackerDetail } from './tracker/components/tracker-detail/tracker-detail.component';
import { TrackerEdit } from './tracker/components/tracker-edit/tracker-edit.component';
import { TrackerList } from './tracker/components/tracker-list/tracker-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tracker/list', pathMatch: 'full' },
    {
        path: 'tracker',
        component: TrackerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: TrackerList },
            { path: 'new_drink', component: TrackerCreate },
            { path: 'detail', component: TrackerDetail },
            { path: 'update', component: TrackerEdit }
        ]
    }
];
