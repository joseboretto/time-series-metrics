import {INFLUX_BUCKET, INFLUX_ORG, INFLUX_DB} from '../configs/infliuxdb.config'
import {FluxTableMetaData, ParameterizedQuery, Point} from "@influxdata/influxdb-client";
import {MetricModel} from "../models/metric.model";
import {GetMetricRequest} from "../dtos/getmetric.request";
import {MetricRepositoryMapper} from "./metric.repository.mapper";

const fieldName = 'value'

class metricRepository {
    //create a metric
    async createMetric(metricModel: MetricModel): Promise<MetricModel> {
        const writeApi = INFLUX_DB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET)
        const point = MetricRepositoryMapper.modelToPoint(metricModel, fieldName)
        writeApi.writePoint(point)
        await writeApi.close()
        return metricModel
    }

    //get a single metric
    async getMetric(data: GetMetricRequest): Promise<MetricModel[]> {
        const queryApi = INFLUX_DB.getQueryApi(INFLUX_ORG)
        const fluxQuery = this.buildQuery(data);
        console.log(fluxQuery)

        return await new Promise((resolve, reject) => {
            const result: MetricModel[] = [];
            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta: FluxTableMetaData) {
                    const o = tableMeta.toObject(row)
                    const metric: MetricModel = {
                        value: o['_' + fieldName],
                        timestamp: o._time,
                        name: o._measurement,
                    }
                    result.push(metric)
                },
                error: reject,
                complete() {
                    resolve(result)
                },
            })
        })
    }


    /**
     *
     * https://docs.influxdata.com/influxdb/v2/query-data/flux/window-aggregate/
     */
    private buildQuery(data: GetMetricRequest): string {
        if (data.from && data.to) {
            if (data.window && data.window.durationUnit && data.window.durationValue && data.window.fn) {
                // TODO: FIX QUERY
                return `from(bucket: "${INFLUX_BUCKET}")
                |> range(start  : ${data.from.toJSON()}, stop: ${data.to.toJSON()})
                |> filter(fn: (r) => r._measurement == "${data.name}")
                |> aggregateWindow(every: ${data.window.durationValue}${data.window.durationUnit}, fn: ${data.window.fn})
                `
            }
            return `from(bucket: "${INFLUX_BUCKET}")
                |> range(start: ${data.from.toJSON()}, stop: ${data.to.toJSON()})
                |> filter(fn: (r) => r._measurement == "${data.name}")
                `
        } else {
            return `from(bucket: "${INFLUX_BUCKET}")
                |> range(start: 0)
                |> filter(fn: (r) => r._measurement == "${data.name}")
                `
        }
    }
}


export const MetricRepository = new metricRepository();