import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Tracker } from './tracker';

describe('Tracker', () => {
  let component: Tracker;
  let fixture: ComponentFixture<Tracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tracker, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Tracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CREATE
  it('should add a new drink', () => {
    component.formModel = {
      name: 'Test Drink',
      flavor: 'Test Flavor',
      sugarFree: false,
      price: 9.99,
      release: 2025
    };

    const initialLength = component.drinks.length;

    component.save();

    expect(component.drinks.length).toBe(initialLength + 1);
    expect(component.drinks[0].name).toBe('Test Drink');
  });

  // VALIDATION
  it('should NOT add drink if name is empty', () => {
    component.formModel = {
      name: '',
      flavor: 'Flavor',
      sugarFree: false,
      price: 10,
      release: 2024
    };

    const initialLength = component.drinks.length;

    component.save();

    expect(component.drinks.length).toBe(initialLength);
  });

  // EDIT START
  it('should load drink into form when editing', () => {
    const drink = component.drinks[0];

    component.edit(drink);

    expect(component.editingId).toBe(drink.id);
    expect(component.formModel.name).toBe(drink.name);
  });

  // UPDATE
  it('should update an existing drink', () => {
    const drink = component.drinks[0];

    component.edit(drink);

    component.formModel.name = 'Updated Name';

    component.save();

    const updated = component.drinks.find(d => d.id === drink.id);

    expect(updated?.name).toBe('Updated Name');
  });

  // DELETE
  it('should delete a drink', () => {
    const id = component.drinks[0].id;

    component.delete(id);

    const exists = component.drinks.some(d => d.id === id);

    expect(exists).toBeFalsy();
  });

  // CANCEL
  it('should reset form on cancel', () => {
    component.formModel.name = 'Something';
    component.editingId = 1;

    component.cancel();

    expect(component.editingId).toBeNull();
    expect(component.formModel.name).toBe('');
  });

});