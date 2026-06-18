import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MonsterDrink, MonsterFormModel, createEmptyDrink } from '../models/tracker.model';
import { TrackerService } from '../services/tracker.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  providers: [TrackerService, MessageService],
  templateUrl: './tracker.html'
})
export class TrackerComponent {
  readonly tracker = inject(TrackerService);
  private readonly messageService = inject(MessageService);

  readonly currentYear = new Date().getFullYear();
  readonly selected = signal<MonsterDrink | null>(null);
  readonly createDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));
  readonly editDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));

  detalhar(drink: MonsterDrink): void {
    this.selected.set(drink);
  }

  abrirIncluir(): void {
    this.createDrink.set(createEmptyDrink(this.currentYear));
    this.selected.set(null);
  }

  abrirAlterar(drink: MonsterDrink): void {
    this.selected.set(drink);
    this.editDrink.set({ ...drink });
  }

  voltar(): void {
    this.selected.set(null);
    this.editDrink.set(createEmptyDrink(this.currentYear));
  }
}