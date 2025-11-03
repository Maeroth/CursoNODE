import request from 'supertest';
import VehicleModel from '../../models/vehicle.model';
import server from '../../framework/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Express } from 'express';

describe("VehicleRouter - Integration Test", () => {
    let mongoServer: MongoMemoryServer;
    let app:Express
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        mongoose.set('debug', true);
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri);	
        app = await server(mongoUri)
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await VehicleModel.deleteMany({});
    });
    afterEach(async () => {
        await VehicleModel.deleteMany({});
    });

    it('should create a new vehicle', async () => {
        const res = await request(app)
            .post('/api/vehicles')
            .send({ brand: 'Toyota', plate: '000XXX', year: new Date() });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get a vehicle by id', async () => {
        const vehicle =await  VehicleModel.create({
            brand: "test",
            plate: "1111XXX",
            year: new Date()
        })
        const res = await request(app).get(`/api/vehicles/${vehicle.id}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.plate).toBe(vehicle.plate);
    });

    it('should update a vehicle', async () => {
        const vehicle =await  VehicleModel.create({
            brand: "test",
            plate: "1111XXX",
            year: new Date()
        })
        const res = await request(app)
            .put(`/api/vehicles/${vehicle.id}`)
            .send({ brand: 'BMW' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.brand).toBe('BMW');
    });

    it('should delete a vehicle', async () => {
        const vehicle =await  VehicleModel.create({
            brand: "test",
            plate: "1111XXX",
            year: new Date()
        })
        const res = await request(app).delete(`/api/vehicles/${vehicle.id}`);
        expect(res.statusCode).toBe(204);
    });
});
