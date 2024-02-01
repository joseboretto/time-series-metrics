//import modules
import {MetricService} from '../services/metric.service'
import {NextFunction, Request, Response} from 'express'
import {MetricModel} from '../models/metric.model'
import {validate} from "class-validator";
import {MetricControllerMapper} from "./mappers/metric.controller.mapper";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";

@Route("api/v1/metrics")
export class MetricController extends Controller {


    @Post()
    public async addMetric(@Body() body: MetricModel) {
        //validating the request
        const errors = await validate(body)
        if (errors.length > 0) {
            this.setStatus(400)
            return
        } else {
            // create a metric
            this.setStatus(201)
            return MetricService.writeMetric(body)
        }


    }

    @Get()
    public async getAMetric(@Query() name?: string,
                            @Query() from?: string,
                            @Query() to?: string,
                            @Query() windowFn?: string,
                            @Query() windowDurationUnit?: string,
                            @Query() windowDurationValue?: number) {
        //get id from the parameter
        const data = MetricControllerMapper.mapToGetMetricRequest(name, from, to, windowFn, windowDurationUnit, windowDurationValue);
        //validating the request
        const errors = await validate(data)
        if (errors.length > 0) {
            this.setStatus(400)
            return
        } else {
            // create a metric
            const metric = await MetricService.getMetric(data)
            this.setStatus(200)
            return metric
        }

    }


}