import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { MonsterDrink } from '../tracker.model';

@Component({
  selector: 'app-tracker-list',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './tracker-list.html'
})
export class TrackerList {
  readonly drinks = input.required<MonsterDrink[]>();

  readonly detail = output<MonsterDrink>();
  readonly edit = output<MonsterDrink>();
  readonly delete = output<number>();

  showDetail(drink: MonsterDrink) {
    this.detail.emit(drink);
  }

  showEdit(drink: MonsterDrink) {
    this.edit.emit(drink);
  }

  requestDelete(drink: MonsterDrink) {
    this.delete.emit(drink.id);
  }
}