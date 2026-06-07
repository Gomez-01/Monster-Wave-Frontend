import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { TrackerService } from '../../tracker.service';
import { TrackerForm } from '../tracker-form/tracker-form.component';
import { MonsterDrink } from '../../tracker.model';

@Component({
  selector: 'app-tracker-edit',
  standalone: true,
  imports: [CommonModule, CardModule, TrackerForm],
  templateUrl: './tracker-edit.html'
})
export class TrackerEdit {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly drink = this.tracker.editDrink;

  constructor() {
    const drink = this.readDrinkFromState();
    if (drink) {
      this.tracker.abrirAlterar(drink);
    }
  }

  save(): void {
    this.tracker.atualizar();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida editada com sucesso' });
    this.router.navigate(['../lista'], { relativeTo: this.route });
  }

  cancel(): void {
    this.tracker.voltar();
    this.router.navigate(['../lista'], { relativeTo: this.route });
  }

  private readDrinkFromState(): MonsterDrink | null {
    const state = this.router.getCurrentNavigation()?.extras.state ?? history.state;
    const drink = state?.['drink'] as MonsterDrink | undefined;
    return drink ?? null;
  }
}