import express, {Express} from "express";
import { ErrorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";
import { MongoService } from "./mongodb";
import vehiclesRouter from "./routes/vehicle.routes"

const app = async (mongo_uri:string):Promise<Express> => {
  const mongoService = new MongoService(mongo_uri)
  await mongoService.connect()
  const app = express()
  app.use(express.json())


  app.use('/api/vehicles', vehiclesRouter)

  app.use(ErrorHandler.handle)
  app.use(logger)

  return app
}
export default app;
