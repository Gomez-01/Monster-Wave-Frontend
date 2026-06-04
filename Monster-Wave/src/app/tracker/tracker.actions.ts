import { MonsterDrink, MonsterFormModel } from './tracker.model';

export const DADOS_INICIAIS: MonsterDrink[] = [
  { id: 1, name: 'Monster Energy Original Green', flavor: 'Classic Citrus', sugarFree: false, price: 10.49, release: 2002 },
  { id: 2, name: 'Monster Energy Zero Sugar', flavor: 'Classic Citrus', sugarFree: true, price: 11.49, release: 2023 },
  { id: 3, name: 'Monster Dragon Ice Tea', flavor: 'Lemon Tea', sugarFree: false, price: 11.49, release: 2019 },
  { id: 4, name: 'Monster Ultra White', flavor: 'Light Citrus', sugarFree: true, price: 11.49, release: 2012 },
  { id: 5, name: 'Juice Monster Rio Punch', flavor: 'Papaya Cream', sugarFree: false, price: 11.49, release: 2024 }
];

export function adicionarBebida(lista: MonsterDrink[], form: MonsterFormModel, nextId: number): { novaLista: MonsterDrink[], proximoId: number } {
  const novaBebida: MonsterDrink = { id: nextId, ...form };
  return {
    novaLista: [novaBebida, ...lista],
    proximoId: nextId + 1
  };
}

export function atualizarBebida(lista: MonsterDrink[], form: MonsterFormModel, id: number): MonsterDrink[] {
  const bebidaEditada: MonsterDrink = { id, ...form };
  return lista.map(drink => drink.id === id ? bebidaEditada : drink);
}

export function removerBebida(lista: MonsterDrink[], id: number): MonsterDrink[] {
  return lista.filter(drink => drink.id !== id);
}