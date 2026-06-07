import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TrackerService } from './tracker.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  providers: [TrackerService, MessageService],
  templateUrl: './tracker.html'
})
export class TrackerComponent {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);
}