import { Routes } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerCreate } from './tracker/components/tracker-create/tracker-create.component';
import { TrackerDetail } from './tracker/components/tracker-detail/tracker-detail.component';
import { TrackerEdit } from './tracker/components/tracker-edit/tracker-edit.component';
import { TrackerList } from './tracker/tracker-list/tracker-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tracker/lista', pathMatch: 'full' },
    {
        path: 'tracker',
        component: TrackerComponent,
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path: 'lista', component: TrackerList },
            { path: 'novo', component: TrackerCreate },
            { path: 'detalhe', component: TrackerDetail },
            { path: 'atualizar', component: TrackerEdit }
        ]
    }
];
