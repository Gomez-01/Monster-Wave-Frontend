import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';



@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CardModule,
    TagModule
  ],
  templateUrl: './tracker.html',
})

export class Tracker {

  drinks: MonsterDrink[] = [
    { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
    { id: 2, name: 'Monster Energy Zero Sugar', flavor: 'Classic Citrus', sugarFree: true, price: 11.49, release: 2023 },
    { id: 3, name: 'Monster Dragon Ice Tea', flavor: 'Lemon Tea', sugarFree: false, price: 11.49, release: 2019 },
    { id: 4, name: 'Monster Ultra White', flavor: 'Light Citrus', sugarFree: true, price: 11.49, release: 2012 },
    { id: 5, name: 'Juice Monster Rio Punch', flavor: 'Papaya Cream', sugarFree: false, price: 11.49, release: 2024 }
  ];

  formModel: MonsterFormModel = this.getEmptyForm();
  editingId: number | null = null;
  private nextId = 6;

  save(): void {
    if (!this.isValid()) return;

    this.editingId
      ? this.updateDrink()
      : this.addDrink();

    this.reset();
  }

  edit(drink: MonsterDrink): void {
    this.editingId = drink.id;
    const { id, ...rest } = drink;
    this.formModel = rest;
  }

  delete(id: number): void {
    this.drinks = this.drinks.filter(d => d.id !== id);
    if (this.editingId === id) this.reset();
  }

  cancel(): void {
    this.reset();
  }

  private isValid(): boolean {
    const { name, flavor } = this.formModel;
    return !!name.trim() && !!flavor.trim();
  }

  private addDrink(): void {
    this.drinks = [
      { id: this.nextId++, ...this.formModel },
      ...this.drinks
    ];
  }

  private updateDrink(): void {
    this.drinks = this.drinks.map(d =>
      d.id === this.editingId ? { ...d, ...this.formModel } : d
    );
  }

  private reset(): void {
    this.editingId = null;
    this.formModel = this.getEmptyForm();
  }

  private getEmptyForm(): MonsterFormModel {
    return {
      name: '',
      flavor: '',
      sugarFree: false,
      price: 0,
      release: new Date().getFullYear()
    };
  }
}

interface MonsterFormModel {
  name: string;
  flavor: string;
  sugarFree: boolean;
  price: number;
  release: number;
}

interface MonsterDrink extends MonsterFormModel {
  id: number;
}
