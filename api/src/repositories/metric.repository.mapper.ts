import {Point} from "@influxdata/influxdb-client";
import {MetricModel} from "../models/metric.model";

class metricRepositoryMapper {
    //create a metric
    modelToPoint(metricModel: MetricModel, fieldName: string): Point {
        return new Point(metricModel.name)
            .floatField(fieldName, metricModel.value)
            .timestamp(metricModel.timestamp)
    }
}

export const MetricRepositoryMapper = new metricRepositoryMapper();