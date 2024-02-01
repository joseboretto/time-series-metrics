import {GetMetricRequest, GetMetricWindowRequest, WindowDurationUnit, WindowFn} from "../../dtos/getmetric.request";
import {MetricNames} from "../../models/metric.enum";

class metricControllerMapper {
    mapToGetMetricRequest(name?: string,
                          from?: string,
                          to?: string,
                          windowFn?: string,
                          windowDurationUnit?: string,
                          windowDurationValue?: number): GetMetricRequest {
        let getMetricWindowRequest: GetMetricWindowRequest | undefined
        if (windowFn && windowDurationUnit && windowDurationValue) {
            const windowDurationUnitEnum: WindowDurationUnit = WindowDurationUnit[windowDurationUnit];
            if (!windowDurationUnitEnum) {
                throw new Error(`Invalid windowDurationUnit ${windowDurationUnit}`)
            }
            const windowFnEnum: WindowFn = WindowFn[windowFn];
            if (!windowFnEnum) {
                throw new Error(`Invalid windowFn ${windowFn}`)
            }
            getMetricWindowRequest = new GetMetricWindowRequest(
                windowFnEnum,
                windowDurationUnitEnum,
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