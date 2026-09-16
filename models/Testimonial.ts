import { Schema, models, model } from "mongoose";

export interface ITestimonial {
  _id: string;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  projectType: string;
  imageUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    projectType: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
