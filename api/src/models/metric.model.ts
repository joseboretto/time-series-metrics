import {IsDate, IsEnum, IsNumber} from "class-validator";
import {MetricNames} from "./metric.enum";


export class MetricModel {
    @IsDate()
    timestamp: Date
    @IsEnum(MetricNames)
    name: MetricNames;
    @IsNumber()
    value: number;

    constructor(timestamp: Date, value: number, name: MetricNames) {
        this.timestamp = timestamp
        this.value = value
        this.name = name
    }
}

