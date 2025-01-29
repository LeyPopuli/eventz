"use server"

import { CreateEventParams } from "@/app/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createEvent = async ({event, userId, path}: CreateEventParams) => {

    try {
        await connectToDB();
        console.log(userId);
        const createdBy = await User.findById(userId);

        if (!createdBy) {
            throw new Error("User not found");
        }
        const newEvent = await Event.create({...event, createdBy: createdBy, category: event.categoryId});

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
       handleError(error);
    }

}