import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { MonsterDrink } from '../tracker.model';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-list',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './tracker-list.html'
})
export class TrackerList {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly drinks = this.tracker.drinks;      

  showDetail(drink: MonsterDrink): void {
    this.tracker.detalhar(drink);
    this.router.navigate(['../detalhe'], {
      relativeTo: this.route,
      state: { drink }
    });
  }

  showEdit(drink: MonsterDrink): void {
    this.tracker.abrirAlterar(drink);
    this.router.navigate(['../atualizar'], {
      relativeTo: this.route,
      state: { drink }
    });
  }

  openCreate(): void {
    this.tracker.abrirIncluir();
    this.router.navigate(['../novo'], {
      relativeTo: this.route
    });
  }

  delete(drink: MonsterDrink): void { 
    this.tracker.remover(drink.id);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida excluída com sucesso' });
  }
}