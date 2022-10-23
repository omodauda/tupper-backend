import HttpException from "../utils/handlers/error.handler";
import prisma from "../lib/prisma";
import { Storage } from "@prisma/client";
import { FoodItem } from "interfaces/food.interface";

export default class FoodService {
  public storage = prisma.storage;
  public food = prisma.foodItem;

  public async getStorages(): Promise<Storage[]> {
    return await this.storage.findMany();
  }

  public async addFood(userId: string, foodItemData: FoodItem) {
    // check if storage exists
    const storage = await this.storage.findUnique({ where: { id: foodItemData.storageId } })
    if (!storage) {
      throw new HttpException(409, 'Invalid storage')
    }
    return await this.food.create({
      data: {
        userId,
        storageId: foodItemData.storageId,
        name: foodItemData.name,
        quantity: foodItemData.quantity,
        createdDate: foodItemData.createdDate,
        expiryDate: foodItemData.expiryDate
      }
    })
  }
}