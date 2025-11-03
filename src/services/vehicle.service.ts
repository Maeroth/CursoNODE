import { NotFoundError } from "../errors/errorFactory"
import { IVehicle } from "../models/vehicle.interface"
import VehicleModel from "../models/vehicle.model"

export class VehicleService{
    async create(vehicle:IVehicle):Promise<IVehicle> {
        return await VehicleModel.create(vehicle)
    }
    async findById(id: string): Promise<IVehicle | null>{
        return await VehicleModel.findById(id)
    }
    async update(id: string, vehicle:IVehicle): Promise<IVehicle>{
        const updated = await VehicleModel.findByIdAndUpdate(id, vehicle, {new:true})
        if (!updated) throw new NotFoundError("Vehicle not found")
        return updated
    }
    async delete(id: string): Promise<void>{
        await VehicleModel.findByIdAndDelete(id)
    }
}VehicleService