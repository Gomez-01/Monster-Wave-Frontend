import { Injectable, signal, computed } from '@angular/core';
import { MonsterDrink, MonsterFormModel, createEmptyDrink } from './tracker.model';

export type ViewMode = 'listar' | 'incluir' | 'alterar' | 'detalhar';

@Injectable()
export class TrackerService {
  readonly currentYear = new Date().getFullYear();
  private nextId = 6;

  private readonly registros = signal<MonsterDrink[]>([
    { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
    { id: 2, name: 'Monster Energy Zero Sugar',     flavor: 'Classic Citrus', sugarFree: true,  price: 11.49, release: 2023 },
    { id: 3, name: 'Monster Dragon Ice Tea',        flavor: 'Lemon Tea',      sugarFree: false, price: 11.49, release: 2019 },
    { id: 4, name: 'Monster Ultra White',           flavor: 'Light Citrus',   sugarFree: true,  price: 11.49, release: 2012 },
    { id: 5, name: 'Juice Monster Rio Punch',       flavor: 'Papaya Cream',   sugarFree: false, price: 11.49, release: 2024 },
  ]);

  private readonly selecionado = signal<MonsterDrink | null>(null);
  private readonly modoVisualizacao = signal<ViewMode>('listar');

  readonly viewMode   = this.modoVisualizacao.asReadonly();
  readonly selected   = this.selecionado.asReadonly();
  readonly drinks     = this.registros.asReadonly();

  readonly totalDrinks    = computed(() => this.registros().length);
  readonly sugarFreeDrinks = computed(() => this.registros().filter(d => d.sugarFree).length);

  readonly createDrink = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));
  readonly editDrink   = signal<MonsterFormModel>(createEmptyDrink(this.currentYear));

  inserir(): void {
    const newDrink: MonsterDrink = { id: this.nextId++, ...this.createDrink() };
    this.registros.update(list => [newDrink, ...list]);
    this.createDrink.set(createEmptyDrink(this.currentYear));
    this.voltar();
  }

  atualizar(): void {
    const id = this.selecionado()?.id;
    if (id === null || id === undefined) return;

    const updated: MonsterDrink = { id, ...this.editDrink() };
    this.registros.update(list => list.map(d => d.id === id ? updated : d));
    this.voltar();
  }

  remover(id: number): void {
    this.registros.update(list => list.filter(d => d.id !== id));
    if (this.selecionado()?.id === id) {
      this.voltar();
    }
  }

  detalhar(drink: MonsterDrink): void {
    this.selecionado.set(drink);
    this.modoVisualizacao.set('detalhar');
  }

  abrirIncluir(): void {
    this.modoVisualizacao.set('incluir');
  }

  abrirAlterar(drink: MonsterDrink): void {
    this.selecionado.set(drink);
    this.editDrink.set({ ...drink });
    this.modoVisualizacao.set('alterar');
  }

  voltar(): void {
    this.selecionado.set(null);
    this.modoVisualizacao.set('listar');
  }
}