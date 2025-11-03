import { Document, model, Model, Schema } from "mongoose";
import { IVehicle } from "./vehicle.interface";

export interface VehicleDocument extends IVehicle, Document {
  createdAt?: Date;
  updatedAt?: Date;
}

const VehicleSchema = new Schema<VehicleDocument>(
  {
    plate: { type: String, required: true, unique: true, trim: true },
    brand: { type: String, required: true, trim: true },
    year:  { type: Date,  required: true }
  },
  { versionKey: false, timestamps: true }
);

const VehicleModel: Model<VehicleDocument> = model<VehicleDocument>("Vehicle", VehicleSchema);
export default VehicleModel;