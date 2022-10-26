import HttpException from "../utils/handlers/error.handler";
import prisma from "../lib/prisma";
import { Storage } from "@prisma/client";
import { FoodItem } from "interfaces/food.interface";

export default class FoodService {
  public storage = prisma.storage;
  public food = prisma.foodItem;

  private async existingStorage(storageTitle: string) {
    return await this.storage.findUnique({ where: { title: storageTitle } })
  }

  public async getStorages(userId: string): Promise<Storage[]> {
    return await this.storage.findMany({
      include: {
        items: {
          where: {
            userId
          },
        }
      }
    });
  }

  public async getStorageFoods(userId: string, storageTitle: any, orderData: any) {
    const existingStorage = await this.existingStorage(storageTitle)
    if (!existingStorage) {
      throw new HttpException(409, `invalid storage`);
    }
    return await this.food.findMany({
      where: {
        userId,
        storageId: existingStorage.id,
      },
      orderBy: orderData
    })
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

  public async getAllFoods(userId: string, orderData: any) {
    return await this.food.findMany({
      where: { userId },
      orderBy: orderData
    })
  }

  public async updateFood(userId: string, foodId: string, update: FoodItem) {
    // check if food exist
    const existingFood = await this.food.findUnique({ where: { id: foodId } });
    if (!existingFood) {
      throw new HttpException(409, 'Food item does not exist')
    }
    // check if food belongs to user
    if (existingFood.userId !== userId) {
      throw new HttpException(409, 'Unauthorized')
    }

    return await this.food.update({ where: { id: foodId }, data: update })
  }
}