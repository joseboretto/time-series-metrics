import dotenv from 'dotenv'
import {InfluxDB} from '@influxdata/influxdb-client'

dotenv.config()
//config from the env
const INFLUX_URL = process.env.INFLUX_URL!
const INFLUX_TOKEN = process.env.INFLUX_TOKEN!
const INFLUX_ORG = process.env.INFLUX_ORG!
const INFLUX_BUCKET = process.env.INFLUX_BUCKET!

//influxdb connection
const INFLUX_DB = new InfluxDB({url: INFLUX_URL, token: INFLUX_TOKEN})
export {INFLUX_DB, INFLUX_ORG, INFLUX_BUCKET}
