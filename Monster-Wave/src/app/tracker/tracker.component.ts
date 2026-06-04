import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TrackerService } from './tracker.service';
import { TrackerList } from './tracker-list/tracker-list.component';
import { TrackerCreate } from './components/tracker-create/tracker-create.component';
import { TrackerEdit } from './components/tracker-edit/tracker-edit.component';
import { TrackerDetail } from './components/tracker-detail/tracker-detail.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, ToastModule, TrackerList, TrackerCreate, TrackerEdit, TrackerDetail],
  providers: [TrackerService, MessageService],
  templateUrl: './tracker.html'
})
export class TrackerComponent {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);

  onMessage(detail: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail });
  }
}