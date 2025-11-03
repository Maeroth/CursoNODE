import { IVehicle } from "../models/vehicle.interface"
import { VehicleService } from "../services/vehicle.service"

const vehicleService = new VehicleService()
export class VehicleController{
    async create(vehicle:IVehicle):Promise<IVehicle> {
        return await vehicleService.create(vehicle)
    }
    async findById(id: string): Promise<IVehicle | null>{
        return await vehicleService.findById(id)
    }
    async update(id: string, vehicle:IVehicle): Promise<IVehicle>{
        return await vehicleService.update(id, vehicle)
    }
    async delete(id: string): Promise<void>{
        await vehicleService.delete(id)
    }
}