import { CommonModule } from '@angular/common';
import { Component, model, output } from '@angular/core';

import { CardModule } from 'primeng/card';

import { MonsterFormModel, createEmptyDrink } from '../../tracker.model';
import { TrackerForm } from '../tracker-form/tracker-form.component';

@Component({
  selector: 'app-tracker-create',
  standalone: true,
  imports: [CommonModule, CardModule, TrackerForm],
  templateUrl: './tracker-create.html'
})
export class TrackerCreate {
  readonly drink = model<MonsterFormModel>(createEmptyDrink());
  readonly submitted = output<void>();

  onSubmitted() {
    this.submitted.emit();
  }
}