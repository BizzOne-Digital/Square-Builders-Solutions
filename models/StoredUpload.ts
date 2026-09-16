import { Schema, models, model } from "mongoose";

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;

export interface IStoredUpload {
  _id: string;
  folder: (typeof UPLOAD_FOLDERS)[number];
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: { type: String, required: true, enum: UPLOAD_FOLDERS },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export default models.StoredUpload || model<IStoredUpload>("StoredUpload", StoredUploadSchema);
