import { Schema, models, model } from "mongoose";

export interface IService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  bullets: string[];
  imageUrl: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    bullets: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    icon: { type: String, default: "Hammer" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Service || model<IService>("Service", ServiceSchema);
