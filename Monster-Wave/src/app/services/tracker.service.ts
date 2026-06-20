import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { MonsterDrink, MonsterFormModel } from '../models/tracker.model';

const API_BASE_URL = 'http://localhost:8000/api/drinks'; // ALTERAR NA APRESENTACAO

@Injectable()
export class TrackerService {
  private readonly http = inject(HttpClient);

  private readonly registros = signal<MonsterDrink[]>([]);
  readonly drinks = this.registros.asReadonly();

  list(): Observable<MonsterDrink[]> {
    return this.http.get<MonsterDrink[]>(`${API_BASE_URL}/`).pipe(
      map(drinks => drinks.map(drink => this.normalizeDrink(drink))),
      tap(drinks => this.registros.set(drinks))
    );
  }

  getById(id: number): Observable<MonsterDrink> {
    return this.http.get<MonsterDrink>(`${API_BASE_URL}/${id}/`).pipe(
      map(drink => this.normalizeDrink(drink))
    );
  }

  insert(newDrinkData: MonsterFormModel): Observable<MonsterDrink> {
    return this.http.post<MonsterDrink>(`${API_BASE_URL}/`, newDrinkData).pipe(
      map(drink => this.normalizeDrink(drink)),
      tap(drink => this.registros.update(list => [drink, ...list]))
    );
  }

  update(id: number, updatedData: MonsterFormModel): Observable<MonsterDrink> {
    return this.http.put<MonsterDrink>(`${API_BASE_URL}/${id}/`, updatedData).pipe(
      map(drink => this.normalizeDrink(drink)),
      tap(updated =>
        this.registros.update(list => list.map(drink => (drink.id === id ? updated : drink)))
      )
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/${id}/`).pipe(
      tap(() => this.registros.update(list => list.filter(drink => drink.id !== id)))
    );
  }

  private normalizeDrink(drink: MonsterDrink): MonsterDrink {
    return {
      ...drink,
      price: Number(drink.price)
    };
  }
}
