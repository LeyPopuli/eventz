"use server"

import { handleError } from "../utils"
import Category from "../database/models/category.model"
import { connectToDB } from "../database";
import { CreateCategoryParams } from "@/app/types";
import User from "../database/models/user.model";

export const createCategory = async ({ category, userId }: CreateCategoryParams) => {
  try {
    await connectToDB();
    const createdBy = await User.findOne({ clerkId: userId });
        if (!createdBy) {
            throw new Error("User not found");
        }

    const newCategory = await Category.create({ ...category, createdBy: createdBy._id });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDB();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}