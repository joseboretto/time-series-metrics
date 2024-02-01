
import {GetMetricRequest, GetMetricWindowRequest, WindowDurationUnit, WindowFn} from "../../dtos/getmetric.request";
import {MetricNames} from "../../models/metric.enum";

class metricControllerMapper {
    mapToGetMetricRequest(name?: string,
                          from?: string,
                          to?: string,
                          windowFn?: string,
                          windowDurationUnit?: string,
                          windowDurationValue?: number): GetMetricRequest {
        let getMetricWindowRequest
        if (windowFn && windowDurationUnit && windowDurationValue) {
            getMetricWindowRequest = new GetMetricWindowRequest(
                windowFn as WindowFn,
                windowDurationUnit as WindowDurationUnit,
                windowDurationValue)
        }
        return new GetMetricRequest(
            name as MetricNames,
            this.toDate(from),
            this.toDate(to),
            getMetricWindowRequest)
    }

    private toDate(timestamp: any) {
        if (!timestamp) {
            return undefined;
        } else {
            return new Date(timestamp)
        }
    }

}

export const MetricControllerMapper = new metricControllerMapper();