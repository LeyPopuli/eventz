'use server'

import { CreateUserParams, UpdateUserParams } from "@/app/types";
import { handleError } from "../utils";
import { connectToDB } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDB();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}


export async function getUserById(userId: string) {
    try {
        await connectToDB()

        const user = await User.findById(userId)

        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDB()

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

        if (!updatedUser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updatedUser))
    } catch (error) {
        handleError(error)
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDB()

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId })

        if (!userToDelete) {
            throw new Error('User not found')
        }

        // Unlink relationships
        await Promise.all([
            // Update the 'events' collection to remove references to the user
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { organizer: userToDelete._id } }
            ),

        ])

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}