import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

import { MonsterDrink } from '../../../models/tracker.model';
import { TrackerService } from '../../../services/tracker.service';
import { TrackerComponent } from '../../tracker.component';

@Component({
  selector: 'app-tracker-detail',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './tracker-detail.html'
})
export class TrackerDetail implements OnInit {
  readonly tracker = inject(TrackerComponent);
  private readonly trackerService = inject(TrackerService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.readDrinkIdFromState();
    if (id == null) return;

    this.trackerService.getById(id).subscribe({
      next: drink => this.tracker.detalhar(drink),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os detalhes da bebida'
        });
        this.back();
      }
    });
  }

  back(): void {
    this.tracker.voltar();
    this.router.navigate(['../list'], { relativeTo: this.route });
  }

  private readDrinkIdFromState(): number | null {
    const state = this.router.getCurrentNavigation()?.extras.state ?? history.state;
    const drink = state?.['drink'] as MonsterDrink | undefined;
    return drink?.id ?? null;
  }
}
