import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { TrackerService } from '../../../services/tracker.service';
import { TrackerForm } from '../tracker-form/tracker-form.component';
import { MonsterDrink } from '../../../models/tracker.model';
import { TrackerComponent } from '../../tracker.component';

@Component({
  selector: 'app-tracker-edit',
  standalone: true,
  imports: [CommonModule, CardModule, TrackerForm],
  templateUrl: './tracker-edit.html'
})
export class TrackerEdit implements OnInit {
  readonly tracker = inject(TrackerService);
  readonly trackerUi = inject(TrackerComponent);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly drink = this.trackerUi.editDrink;

  ngOnInit(): void {
    const id = this.readDrinkIdFromState();
    if (id == null) return;

    this.tracker.getById(id).subscribe({
      next: drink => this.trackerUi.abrirAlterar(drink),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a bebida para edição'
        });
        this.cancel();
      }
    });
  }

  save(): void {
    const selected = this.trackerUi.selected();
    if (!selected) return;

    this.tracker.update(selected.id, this.drink()).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Bebida editada com sucesso'
        });
        this.router.navigate(['../list'], { relativeTo: this.route });
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível editar a bebida'
        })
    });
  }

  cancel(): void {
    this.trackerUi.voltar();
    this.router.navigate(['../list'], { relativeTo: this.route });
  }

  private readDrinkIdFromState(): number | null {
    const state = this.router.currentNavigation()?.extras.state ?? history.state;
    const drink = state?.['drink'] as MonsterDrink | undefined;
    return drink?.id ?? null;
  }
}
