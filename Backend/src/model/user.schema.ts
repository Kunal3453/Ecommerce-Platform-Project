import { Document, Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";


const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      require:true
    }
  },

  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", UserSchema)

