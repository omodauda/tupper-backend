import HttpException from "utils/handlers/error.handler";
import prisma from "../lib/prisma";
import { Storage } from "@prisma/client";

export default class FoodService {
  public storage = prisma.storage;
  public food = prisma.foodItem;

  public async getStorages(): Promise<Storage[]> {
    return await this.storage.findMany();
  }
}