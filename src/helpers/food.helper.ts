import { Storage } from '../interfaces/food.interface';

function _storage(storage: any) {
  const s = {
    ...storage,
    items: storage.items.length,
  }
  return s;
}

export const publicResponse = (storages: Storage[]) => storages.map((s: Storage) => _storage(s));