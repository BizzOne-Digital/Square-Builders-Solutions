import { Schema, models, model } from "mongoose";

export interface IPageContent {
  _id: string;
  pageKey: "home" | "about";
  content: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    pageKey: { type: String, enum: ["home", "about"], required: true, unique: true },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default models.PageContent || model<IPageContent>("PageContent", PageContentSchema);
