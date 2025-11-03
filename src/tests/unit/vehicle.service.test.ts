import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoService } from "../../framework/mongodb"
import { IVehicle } from "../../models/vehicle.interface"
import VehicleModel from "../../models/vehicle.model"
import { VehicleService } from "../../services/vehicle.service"
import mongoose from "mongoose";
import { NotFoundError } from "../../errors/errorFactory";


describe("VehicleService - Unit Test", () => {
  
    let mongoServer: MongoMemoryServer;
    let vehicleService: VehicleService;
    beforeAll(async () => {
        vehicleService = new VehicleService()
        mongoServer = await MongoMemoryServer.create();
        mongoose.set('debug', true);
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri);	
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await VehicleModel.deleteMany({});
    });
    describe('create', () => {
        it("should create a vehicle", async () => {
            const vehicle: IVehicle = {
            plate: "0000XXX",
            brand: "Test",
            year: new Date(),
            };
    
            const result = await vehicleService.create(vehicle);
    
            expect(result).toHaveProperty("_id");
            expect(result.plate).toBe(vehicle.plate);
        });
    })
    
    describe('findById', () => {
        it("should find a vehicle by ID", async () => {
            const vehicle = await VehicleModel.create({
                plate: "1234ABC",
                brand: "Toyota",
                year: new Date(),
            });
    
            const found = await vehicleService.findById(vehicle._id as string);
    
            expect(found).not.toBeNull();
            expect(found?.plate).toBe("1234ABC");
        });
    
        it("should return null when vehicle is not found", async () => {
            const found = await vehicleService.findById(new mongoose.Types.ObjectId().toString());
            expect(found).toBeNull();
        });  
    })
    
    describe('update', () => {
        it("should update a vehicle", async () => {
            const vehicle = await VehicleModel.create({
              plate: "5678XYZ",
              brand: "Honda",
              year: new Date(),
            });
            const updatedVehicle = await vehicleService.update(vehicle.id, {
              plate: "9999ZZZ",
              brand: "Nissan",
              year: new Date(),
            });
        
            expect(updatedVehicle.plate).toBe("9999ZZZ");
        });
        
        it("should throw NotFoundError when updating a non-existent vehicle", async () => {
            await expect(
                vehicleService.update(new mongoose.Types.ObjectId().toString(), {
                plate: "notfound",
                brand: "Unknown",
                year: new Date(),
                } as IVehicle)
            ).rejects.toThrow(NotFoundError);
        });
    })

    describe('delete', () => {
        it("should delete a vehicle", async () => {
            const vehicle = await VehicleModel.create({
              plate: "1111AAA",
              brand: "Ford",
              year: new Date(),
            });
        
            await vehicleService.delete(vehicle._id as string);
        
            const found = await VehicleModel.findById(vehicle._id);
            expect(found).toBeNull();
        });
    })
  

  
});
