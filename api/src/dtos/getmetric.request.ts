import {IsDate, IsEnum, IsNumber} from "class-validator";
import {MetricNames} from "../models/metric.enum";

export enum WindowFn {
    mean = 'mean',
}

// https://docs.influxdata.com/flux/v0/spec/types/#duration-types
export enum WindowDurationUnit {
    minute = 'm',
    hour = 'h',
    day = 'd',
}

export class GetMetricWindowRequest {
    @IsEnum(WindowFn)
    fn: WindowFn;
    @IsEnum(WindowDurationUnit)
    durationUnit: WindowDurationUnit;
    @IsNumber()
    durationValue: number;


    constructor(fn: WindowFn, durationUnit: WindowDurationUnit, durationValue: number) {
        this.fn = fn;
        this.durationUnit = durationUnit;
        this.durationValue = durationValue;
    }
}

export class GetMetricRequest {
    @IsEnum(MetricNames)
    name: MetricNames;
    @IsDate()
    from?: Date | undefined;
    @IsDate()
    to?: Date | undefined;
    window?: GetMetricWindowRequest | undefined;


    constructor(name: MetricNames, from: Date | undefined, to: Date | undefined, window: GetMetricWindowRequest | undefined) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.window = window;
    }
}