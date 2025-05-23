import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    clerkId: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique: true},
    photo: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
}); 

const User = models?.User || model("User", UserSchema);

export default User;