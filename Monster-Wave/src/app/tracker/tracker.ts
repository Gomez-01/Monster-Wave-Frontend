import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, min } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormField,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    CardModule,
    SelectModule,
    ConfirmDialogModule,
  ],
  templateUrl: './tracker.html',
  providers: [ConfirmationService, MessageService]
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

  drink = signal<MonsterFormModel>({
    name: '',
    flavor: '',
    sugarFree: false,
    price: 0,
    release: new Date().getFullYear()
  });

  monsterForm = form(this.drink, (schemaPath) => {
    required(schemaPath.name, { message: 'O nome da bebida é obrigatório.' });
    required(schemaPath.flavor, { message: 'O sabor é obrigatório.' });
    required(schemaPath.price, { message: 'O preço é obrigatório.' });
    min(schemaPath.price, 0.01, { message: 'O preço deve ser maior que zero.' });
  });

  editingId = signal<number | null>(null);
  selectedDrink = signal<MonsterDrink | null>(null);

  save() {
    if (this.monsterForm().valid()) {
      const newDrink: MonsterDrink = {
        id: this.nextId++,
        ...this.getFormDrinkData()
      };
      this.drinks.update(current => [newDrink, ...current]);
      this.cleanForm();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida adicionada com sucesso' });
    } else {
      this.markAllFieldsTouched();
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique os campos obrigatórios' });
    }
  }

  update() {
    if (this.editingId() !== null && this.monsterForm().valid()) {
      const editedDrink: MonsterDrink = { id: this.editingId()!, ...this.getFormDrinkData() };
      this.drinks.update(current => current.map(d => d.id === editedDrink.id ? editedDrink : d));
      this.cleanForm();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida editada com sucesso' });
    } else {
      this.markAllFieldsTouched();
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique os campos obrigatórios' });
    }
  }

  delete(id: number) {
    this.drinks.update(current => current.filter(d => d.id !== id));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Bebida excluída com sucesso' });
  }

  showUpdateDialog(drink: MonsterDrink) {
    this.editingId.set(drink.id);
    this.loadFormData(drink);
  }

  showDetailDialog(drink: MonsterDrink) {
    this.selectedDrink.set(drink);
  }

  setReleaseYear(value: number | null) {
    this.monsterForm.release().value.set(value ?? this.currentYear);
  }

  setPrice(value: number | null) {
    this.monsterForm.price().value.set(value ?? 0);
  }

  isFieldInvalid(field: { invalid(): boolean; dirty(): boolean; touched(): boolean }): boolean {
    return field.invalid() && (field.dirty() || field.touched());
  }

  fieldErrorMessage(field: { errors(): Array<{ message?: string }>; }): string | null {
    return field.errors()[0]?.message ?? null;
  }

  markFieldTouched(field: { markAsTouched(): void }): void {
    field.markAsTouched();
  }

  private getFormDrinkData(): Omit<MonsterDrink, 'id'> {
    return {
      name: this.monsterForm.name().value(),
      flavor: this.monsterForm.flavor().value(),
      price: this.monsterForm.price().value(),
      release: this.monsterForm.release().value(),
      sugarFree: this.monsterForm.sugarFree().value()
    };
  }

  private loadFormData(drink: MonsterDrink): void {
    this.monsterForm.name().value.set(drink.name);
    this.monsterForm.flavor().value.set(drink.flavor);
    this.monsterForm.price().value.set(drink.price);
    this.monsterForm.release().value.set(drink.release);
    this.monsterForm.sugarFree().value.set(drink.sugarFree);
  }

  private markAllFieldsTouched(): void {
    this.monsterForm.name().markAsTouched();
    this.monsterForm.flavor().markAsTouched();
    this.monsterForm.price().markAsTouched();
    this.monsterForm.release().markAsTouched();
    this.monsterForm.sugarFree().markAsTouched();
  }

  cleanForm() {
    this.monsterForm.name().value.set('');
    this.monsterForm.flavor().value.set('');
    this.monsterForm.price().value.set(0);
    this.monsterForm.release().value.set(this.currentYear);
    this.monsterForm.sugarFree().value.set(false);
    this.editingId.set(null);
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