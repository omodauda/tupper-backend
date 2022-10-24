export interface FoodItem {
  storageId: string;
  name: string;
  quantity: number;
  createdDate: string;
  expiryDate: string;
}

export interface Storage {
  id: string;
  title: string;
  logo: string;
}