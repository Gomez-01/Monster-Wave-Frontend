import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { TrackerService } from '../../services/tracker.service';
import { TrackerForm } from '../tracker-form/tracker-form.component';
import { TrackerComponent } from '../../tracker/tracker.component';

@Component({
  selector: 'app-tracker-create',
  standalone: true,
  imports: [CommonModule, CardModule, TrackerForm],
  templateUrl: './tracker-create.html'
})
export class TrackerCreate {
  readonly tracker = inject(TrackerService);
  readonly trackerUi = inject(TrackerComponent);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly drink = this.trackerUi.createDrink;

  save(): void {
    this.tracker.insert(this.drink()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Bebida adicionada com sucesso'
        });
        this.router.navigate(['../list'], { relativeTo: this.route });
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível adicionar a bebida'
        })
    });
  }

  cancel(): void {
    this.trackerUi.voltar();
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
