import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  readonly drinks = this.tracker.drinks;      
  readonly deleted = output<string>();

  showDetail(drink: MonsterDrink): void {
    this.tracker.detalhar(drink);
  }

  showEdit(drink: MonsterDrink): void {
    this.tracker.abrirAlterar(drink);
  }

  openCreate(): void {
    this.tracker.abrirIncluir();
  }

  delete(drink: MonsterDrink): void { 
    this.tracker.remover(drink.id);
    this.deleted.emit('Bebida excluída com sucesso');
  }
}