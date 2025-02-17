"use server"

import { CreateEventParams } from "@/app/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../database/models/user.model";
import { default as EventModel } from "../database/models/event.model";
import Category from "../database/models/category.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const populateEvent = async (query: any) => {
    return query
    .populate({path: 'createdBy', model: User, select: '_id username firstName lastName email'})
    .populate({path: 'updatedBy', model: User, select: '_id username firstName lastName email'})
    .populate({path: 'category', model: Category, select: '_id name'})
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createEvent = async ({event, userId, path}: CreateEventParams) => {

    try {
        await connectToDB();
        const createdBy = await User.findOne({ clerkId: userId });
        if (!createdBy) {
            throw new Error("User not found");
        }
        const newEvent = await EventModel.create({
            ...event,
            createdBy: createdBy._id,
            ...(event.categoryId && { category: event.categoryId })
          });

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
       handleError(error);
    }

}

export const getEventById = async (id: string) => {
    try {
        await connectToDB();
        const event = await populateEvent(EventModel.findById(id));
        if (!event) {
            throw new Error("Event not found");
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}