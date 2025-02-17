import { model, models, Schema } from "mongoose";

export interface ICategory  extends Document {
    _id: string;
    name: string;
    createdBy: {_id: string, username: string, firstName: string, lastName: string, email: string};
    createdAt: Date;
}

const CategorySchema = new Schema({
    name: {type: String, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now},
}); 

const Category = models?.Category || model("Category", CategorySchema);

export default Category;