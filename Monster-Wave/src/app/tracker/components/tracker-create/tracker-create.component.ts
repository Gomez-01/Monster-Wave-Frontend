import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { TrackerService } from '../../tracker.service';
import { TrackerForm } from '../tracker-form/tracker-form.component';

@Component({
  selector: 'app-tracker-create',
  standalone: true,
  imports: [CommonModule, CardModule, TrackerForm],
  templateUrl: './tracker-create.html'
})
export class TrackerCreate {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly drink = this.tracker.createDrink;

  save(): void {
    this.tracker.inserir();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida adicionada com sucesso' });
    this.router.navigate(['../lista'], { relativeTo: this.route });
  }

  cancel(): void {
    this.tracker.voltar();
    this.router.navigate(['../lista'], { relativeTo: this.route });
  }
}