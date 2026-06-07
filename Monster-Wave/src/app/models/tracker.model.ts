export interface MonsterFormModel {
  name: string;
  flavor: string;
  sugarFree: boolean;
  price: number;
  release: number;
}

export interface MonsterDrink extends MonsterFormModel {
  id: number;
}

export function createEmptyDrink(currentYear = new Date().getFullYear()): MonsterFormModel {
  return {
    name: '',
    flavor: '',
    sugarFree: false,
    price: 0,
    release: currentYear,
  };
}