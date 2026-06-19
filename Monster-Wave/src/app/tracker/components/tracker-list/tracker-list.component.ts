import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { MonsterDrink } from '../../../models/tracker.model';
import { TrackerService } from '../../../services/tracker.service';
import { TrackerComponent } from '../../tracker.component';

@Component({
  selector: 'app-tracker-list',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './tracker-list.html'
})
export class TrackerList implements OnInit {
  readonly tracker = inject(TrackerService);
  readonly trackerUi = inject(TrackerComponent);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly drinks = this.tracker.drinks;

  ngOnInit(): void {
    this.tracker.list().subscribe({
      error: () => this.showError('Não foi possível carregar a listagem de bebidas')
    });
  }

  showDetail(drink: MonsterDrink): void {
    this.trackerUi.detalhar(drink);
    this.router.navigate(['../detail'], {
      relativeTo: this.route,
      state: { drink }
    });
  }

  showEdit(drink: MonsterDrink): void {
    this.trackerUi.abrirAlterar(drink);
    this.router.navigate(['../update'], {
      relativeTo: this.route,
      state: { drink }
    });
  }

  openCreate(): void {
    this.trackerUi.abrirIncluir();
    this.router.navigate(['../new_drink'], {
      relativeTo: this.route
    });
  }

  delete(drink: MonsterDrink): void {
    this.tracker.remove(drink.id).subscribe({
      next: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Bebida excluída com sucesso'
        }),
      error: () => this.showError('Não foi possível excluir a bebida')
    });
  }

  private showError(detail: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }
}
