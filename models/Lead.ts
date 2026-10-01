import { Schema, models, model } from "mongoose";
import { PROJECT_TYPES, PROPERTY_TYPES, LEAD_STATUSES } from "@/lib/constants";

export { PROJECT_TYPES, PROPERTY_TYPES, LEAD_STATUSES };

export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: (typeof PROJECT_TYPES)[number];
  propertyType: (typeof PROPERTY_TYPES)[number];
  message: string;
  status: (typeof LEAD_STATUSES)[number];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    projectType: { type: String, enum: PROJECT_TYPES, required: true },
    propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: LEAD_STATUSES, default: "new" },
  },
  { timestamps: true }
);

export default models.Lead || model<ILead>("Lead", LeadSchema);
