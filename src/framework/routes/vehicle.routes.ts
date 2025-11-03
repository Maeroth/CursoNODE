import { NextFunction, Request, Response, Router } from "express"
import { VehicleController } from "../../controllers/vehicle.controller"

const router = Router()
const vehicleController = new VehicleController()
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicle = await vehicleController.create(req.body)
        res.status(201).send(vehicle)
    } catch (e) {
        next(e)
    }    
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicle = await vehicleController.findById(req.params.id)
        res.status(200).send(vehicle)
    } catch (e) {
        next(e)
    }    
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicle = await vehicleController.update(req.params.id, req.body)
        res.status(200).send(vehicle)
    } catch (e) {
        next(e)
    }    
})

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await vehicleController.delete(req.params.id)
        res.status(204).send()
    } catch (e) {
        next(e)
    }    
})
export default router