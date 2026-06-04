import { inject, Injectable, signal } from '@angular/core';

import { MessageService } from 'primeng/api';

import { MonsterDrink, MonsterFormModel, createEmptyDrink } from './tracker.model';

@Injectable()
export class TrackerService {
  private readonly messageService = inject(MessageService);

  readonly currentYear = new Date().getFullYear();
  private nextId = 6;

  readonly drinks = signal<MonsterDrink[]>([
    { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
    { id: 2, name: 'Monster Energy Zero Sugar', flavor: 'Classic Citrus', sugarFree: true, price: 11.49, release: 2023 },
    { id: 3, name: 'Monster Dragon Ice Tea', flavor: 'Lemon Tea', sugarFree: false, price: 11.49, release: 2019 },
    { id: 4, name: 'Monster Ultra White', flavor: 'Light Citrus', sugarFree: true, price: 11.49, release: 2012 },
    { id: 5, name: 'Juice Monster Rio Punch', flavor: 'Papaya Cream', sugarFree: false, price: 11.49, release: 2024 }
  ]);

  readonly editingId = signal<number | null>(null);
  readonly selectedDrink = signal<MonsterDrink | null>(null);
  readonly detailVisible = signal(false);

  readonly createDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));
  readonly editDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));

  save(): void {
    const newDrink: MonsterDrink = {
      id: this.nextId++,
      ...this.createDrink()
    };

    this.drinks.update(current => [newDrink, ...current]);
    this.createDrink.set(createEmptyDrink(this.currentYear));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida adicionada com sucesso' });
  }

  update(): void {
    const editingId = this.editingId();

    if (editingId === null) {
      return;
    }

    const editedDrink: MonsterDrink = { id: editingId, ...this.editDrink() };

    this.drinks.update(current => current.map(drink => drink.id === editedDrink.id ? editedDrink : drink));

    if (this.selectedDrink()?.id === editedDrink.id) {
      this.selectedDrink.set(editedDrink);
    }

    this.cancelEdit();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida editada com sucesso' });
  }

  delete(id: number): void {
    this.drinks.update(current => current.filter(drink => drink.id !== id));

    if (this.selectedDrink()?.id === id) {
      this.selectedDrink.set(null);
      this.detailVisible.set(false);
    }

    if (this.editingId() === id) {
      this.cancelEdit();
    }

    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida excluída com sucesso' });
  }

  showUpdateDialog(drink: MonsterDrink): void {
    this.editingId.set(drink.id);
    this.editDrink.set({ ...drink });
  }

  showDetailDialog(drink: MonsterDrink): void {
    this.selectedDrink.set(drink);
    this.detailVisible.set(true);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editDrink.set(createEmptyDrink(this.currentYear));
  }

  closeDetail(): void {
    this.detailVisible.set(false);
    this.selectedDrink.set(null);
  }
}