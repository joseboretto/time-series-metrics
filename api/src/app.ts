import express from 'express'
import cors from 'cors'

import {RegisterRoutes} from "../build/routes";
import {errorHandler} from "./errors/error-handler";
import {INFLUX_DB, INFLUX_ORG} from "./configs/infliuxdb.config";


const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


//routes
RegisterRoutes(app);
// Error handling
app.use(errorHandler);  // <--------- using the errorHandler

// Check InfluxDB connection
INFLUX_DB.getQueryApi(INFLUX_ORG).queryRaw("" +
    "import \"array\"\n" +
    "import \"runtime\"\n" +
    "\n" +
    "array.from(rows: [{version: runtime.version()}])")
    .then(result => {
        console.log("InfluxDB connection OK.")
    })
    .then(() => {
        app.listen(7070, () => console.log('Server is listening on port 7070.'))
    })
    .catch(error => {
        console.error("InfluxDB connection error: ", error)
        throw error
    })


