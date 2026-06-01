import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { MonsterDrink } from '../../tracker.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-tracker-detail',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, CardModule],
  templateUrl: './tracker-detail.html'
})
export class TrackerDetail {
  readonly drink = input<MonsterDrink | null>(null);
  readonly visible = model(false);

  close() {
    this.visible.set(false);
  }
}