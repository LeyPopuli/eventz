import { model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    site?: string;
    imageUrl?: string;
    createdBy: {_id: string, username: string, firstName: string, lastName: string, email: string};
    createdAt: Date;
    updatedBy?: {_id: string, username: string, firstName: string, lastName: string, email: string};
    updatedAt?: Date;
    startDateTime: Date;
    endDateTime: Date;
    url?: string;
    active: boolean;
    category?: {_id: string, name: string};
  }

const EventSchema = new Schema({
   title: {type: String, required: true},
   description: {type: String},
   site: {type: String},
   imageUrl: {type: String},
   createdBy: {type: Schema.Types.ObjectId, ref: "User", required: true},
   createdAt: {type: Date, default: Date.now},
   updatedBy: {type: Schema.Types.ObjectId, ref: "User"},
   updatedAt: {type: Date},
   startDateTime: {type: Date, required: true},
   endDateTime: {type: Date, required: true},
   url: {type: String},
   active: {type: Boolean, default: true},
   category: {type: Schema.Types.ObjectId, ref: "Category"},
}); 

const Event = models?.Event || model("Event", EventSchema);

export default Event;