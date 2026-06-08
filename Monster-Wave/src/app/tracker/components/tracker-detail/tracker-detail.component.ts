import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { MonsterDrink } from '../../../models/tracker.model';
import { TrackerComponent } from '../../tracker.component';

@Component({
  selector: 'app-tracker-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule], 
  templateUrl: './tracker-detail.html'
})
export class TrackerDetail {
  readonly tracker = inject(TrackerComponent);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    const drink = this.readDrinkFromState();
    if (drink) {
      this.tracker.detalhar(drink);
    }
  }

  back(): void {
    this.tracker.voltar();
    this.router.navigate(['../list'], { relativeTo: this.route });
  }

  private readDrinkFromState(): MonsterDrink | null {
    const state = this.router.getCurrentNavigation()?.extras.state ?? history.state;
    const drink = state?.['drink'] as MonsterDrink | undefined;
    return drink ?? null;
  }
}