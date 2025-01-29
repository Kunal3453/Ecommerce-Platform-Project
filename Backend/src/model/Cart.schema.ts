import { Schema, model } from "mongoose";
import { ICart } from "../interface/user.interface";

const Cartschema = new Schema<ICart>(
  {
    user: {
      fullname: { type: String, required: true },
      phoneno: { type: String, required: true }
    },
    item: [{
      id: {
        type: String,
        required: true,
        unique: true  // Ensure unique IDs within the item array
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      }
    }]
  },
  {
    timestamps: true
  }
);

export const Cart = model<ICart>("Cart", Cartschema);
