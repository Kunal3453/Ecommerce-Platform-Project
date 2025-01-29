import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

enum SessionStatus {
  Active = "Active",
  Blocked = "Blocked",
  Inactive = "Inactive",
  Deleted = "Deleted",
}

interface Session extends Document {
  _id: string;
  email: string;
  status: SessionStatus;
  token:string;
}

const SessionSchema: Schema = new mongoose.Schema<Session>(
  {
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      required: true,
    },
    token: {
      type:String
    }
  },
  {
    timestamps: true,
  },
);

const session = mongoose.model<Session>("session", SessionSchema);

export { session, SessionStatus };
