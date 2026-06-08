import { Injectable, signal, computed } from '@angular/core';
import { MonsterDrink, MonsterFormModel } from '../models/tracker.model';

@Injectable()
export class TrackerService {
  private nextId = 6;

  private readonly registros = signal<MonsterDrink[]>([
    { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
    { id: 2, name: 'Monster Energy Zero Sugar', flavor: 'Classic Citrus', sugarFree: true,  price: 11.49, release: 2023 },
    { id: 3, name: 'Monster Dragon Ice Tea', flavor: 'Lemon Tea',sugarFree: false, price: 11.49, release: 2019 },
    { id: 4, name: 'Monster Ultra White',flavor: 'Light Citrus',sugarFree: true, price: 11.49, release: 2012 },
    { id: 5, name: 'Juice Monster Rio Punch', flavor: 'Papaya Cream',sugarFree: false, price: 11.49, release: 2024 },
  ]);

  readonly drinks     = this.registros.asReadonly();

  insert(newDrinkData: MonsterFormModel): void {
    const newDrink: MonsterDrink = { id: this.nextId++, ...newDrinkData };
    this.registros.update(list => [newDrink, ...list]);
  }

  update(id: number, updatedData: MonsterFormModel): void {
    const updated: MonsterDrink = { id, ...updatedData };
    this.registros.update(list => list.map(drink => drink.id === id ? updated : drink));
  }

  remove(id: number): void {
    this.registros.update(list => list.filter(drink => drink.id !== id));
  }
}