import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  readonly drink = this.tracker.createDrink;

  readonly saved = output<string>();

  save(): void {
    this.tracker.inserir();
    this.saved.emit('Bebida adicionada com sucesso');
  }

  cancel(): void {
    this.tracker.voltar();
  }
}