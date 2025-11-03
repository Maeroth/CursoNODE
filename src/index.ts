/*try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found")
}
import app from "./framework/server"
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})*/

import server from "./framework/server"
try {
    process.loadEnvFile()
} catch (e) {
    console.warn(".env not found")
}

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not found")
    }

    const app = await server(process.env.MONGO_URI)
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
}

start()