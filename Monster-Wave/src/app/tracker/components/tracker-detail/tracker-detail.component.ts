import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'app-tracker-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule], 
  templateUrl: './tracker-detail.html'
})
export class TrackerDetail {
  readonly tracker = inject(TrackerService);

  back(): void {
    this.tracker.voltar();
  }
}