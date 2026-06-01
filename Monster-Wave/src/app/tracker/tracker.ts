import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TrackerCreate } from './components/tracker-create/tracker-create';
import { TrackerDetail } from './components/tracker-detail/tracker-detail.component';
import { TrackerEdit } from './components/tracker-edit/tracker-edit.component';
import { TrackerList } from './tracker-list/tracker-list';
import { MonsterDrink, MonsterFormModel, createEmptyDrink } from './tracker.model';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, ToastModule, TrackerCreate, TrackerDetail, TrackerEdit, TrackerList],
  templateUrl: './tracker.html',
  providers: [MessageService]
})
export class Tracker {
  private messageService = inject(MessageService);

  readonly currentYear = new Date().getFullYear();
  private nextId = 6;

  drinks = signal<MonsterDrink[]>([
    { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
    { id: 2, name: 'Monster Energy Zero Sugar', flavor: 'Classic Citrus', sugarFree: true, price: 11.49, release: 2023 },
    { id: 3, name: 'Monster Dragon Ice Tea', flavor: 'Lemon Tea', sugarFree: false, price: 11.49, release: 2019 },
    { id: 4, name: 'Monster Ultra White', flavor: 'Light Citrus', sugarFree: true, price: 11.49, release: 2012 },
    { id: 5, name: 'Juice Monster Rio Punch', flavor: 'Papaya Cream', sugarFree: false, price: 11.49, release: 2024 }
  ]);

  editingId = signal<number | null>(null);
  selectedDrink = signal<MonsterDrink | null>(null);
  detailVisible = signal(false);

  createDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));
  editDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));

  save() {
    const newDrink: MonsterDrink = {
      id: this.nextId++,
      ...this.createDrink()
    };

    this.drinks.update(current => [newDrink, ...current]);
    this.createDrink.set(createEmptyDrink(this.currentYear));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida adicionada com sucesso' });
  }

  update() {
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

  delete(id: number) {
    this.drinks.update(current => current.filter(d => d.id !== id));

    if (this.selectedDrink()?.id === id) {
      this.selectedDrink.set(null);
      this.detailVisible.set(false);
    }

    if (this.editingId() === id) {
      this.cancelEdit();
    }

    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida excluída com sucesso' });
  }

  showUpdateDialog(drink: MonsterDrink) {
    this.editingId.set(drink.id);
    this.editDrink.set({ ...drink });
  }

  showDetailDialog(drink: MonsterDrink) {
    this.selectedDrink.set(drink);
    this.detailVisible.set(true);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editDrink.set(createEmptyDrink(this.currentYear));
  }

  closeDetail() {
    this.detailVisible.set(false);
    this.selectedDrink.set(null);
  }
}