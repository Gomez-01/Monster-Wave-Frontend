import { CommonModule } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField, min, required } from '@angular/forms/signals';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { MonsterFormModel, createEmptyDrink } from '../../models/tracker.model';

@Component({
  selector: 'app-tracker-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormField, ButtonModule, InputTextModule, InputNumberModule, ToggleButtonModule],
  templateUrl: './tracker-form.html'
})
export class TrackerForm {
  readonly drink = model<MonsterFormModel>(createEmptyDrink());
  readonly submitLabel = input.required<string>();
  readonly cancelLabel = input('Cancel');

  readonly submitted = output<void>();
  readonly cancelled = output<void>();

  readonly currentYear = new Date().getFullYear();

  readonly monsterForm = form(this.drink, (schemaPath) => {
    required(schemaPath.name, { message: 'O nome da bebida é obrigatório.' });
    required(schemaPath.flavor, { message: 'O sabor é obrigatório.' });
    required(schemaPath.price, { message: 'O preço é obrigatório.' });
    min(schemaPath.price, 0.01, { message: 'O preço deve ser maior que zero.' });
  });

  save() {
    if (this.monsterForm().valid()) {
      this.submitted.emit();
      return;
    }

    this.markAllFieldsTouched();
  }

  cancel() {
    this.cancelled.emit();
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

  fieldErrorMessage(field: { errors(): Array<{ message?: string }> }): string | null {
    return field.errors()[0]?.message ?? null;
  }

  markFieldTouched(field: { markAsTouched(): void }): void {
    field.markAsTouched();
  }

  private markAllFieldsTouched(): void {
    this.monsterForm.name().markAsTouched();
    this.monsterForm.flavor().markAsTouched();
    this.monsterForm.price().markAsTouched();
    this.monsterForm.release().markAsTouched();
    this.monsterForm.sugarFree().markAsTouched();
  }
}