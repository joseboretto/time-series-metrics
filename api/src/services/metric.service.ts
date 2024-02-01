import {MetricRepository} from '../repositories/metric.repository'
import {MetricModel} from "../models/metric.model";
import {GetMetricRequest} from "../dtos/getmetric.request";
import {Point} from "@influxdata/influxdb-client";


class metricService {
    //create a metric
    async writeMetric(metricModel: MetricModel): Promise<MetricModel> {
        return await MetricRepository.createMetric(metricModel)
    }

    //get a single metric
    async getMetric(data: GetMetricRequest): Promise<MetricModel[]> {
        return await MetricRepository.getMetric(data)
    }

}

export const MetricService = new metricService();