'use client'

import React, {useEffect, useState} from 'react'
import ReactEcharts from "echarts-for-react";
import {Button, Col, Form, Row, Select} from "antd";
import {MetricModel} from "@/app/_api/metrics-api";
import MetricsRangePicker from "@/app/_components/metrics/metrics-range-picker";
import {metricApiClient} from "@/app/_api/clients";
import dayjs from "dayjs";

function buildChartOption(dateFrom: Date, dateTo: Date, getMetricResponse: MetricModel[] | null) {
    if (!getMetricResponse) {
        return null
    }
    const data = getMetricResponse
        .filter((item: any) => item.value).map((item: {
            timestamp: string,
            value: any,
        }) => [Date.parse(item.timestamp), item.value])
    return {
        tooltip: {
            trigger: 'axis'
        }, title: {
            left: 'center', text: 'Metric values'
        }, xAxis: {
            type: 'time', min: dateFrom, max: dateTo
        }, yAxis: {
            type: 'value', min: 0
        }, series: [{
            name: 'Metric', type: 'scatter', data: data, large: true
        }]
    };
}

export default function ChartEcharts() {

    const [getMetricResponse, setGetMetricResponse] = useState<MetricModel[] | null>(null)
    const [isLoading, setLoading] = useState(true)
    const [apiError, setApiError] = useState(null)
    const [windowType, setWindowType] = useState<string | undefined>(undefined)
    const d = new Date();
    d.setDate(d.getDate() - 7);
    const [dateFrom, setDateFrom] = useState<any>(d)
    const [dateTo, setDateTo] = useState<any>(new Date())
    const [chartOption, setChartOption] = useState<any>(buildChartOption(dateFrom, dateTo, null))

    let getMetric = async () => {
        setLoading(true)
        let query = {
            name: 'temperature',
            from: dateFrom.toJSON(),
            to: dateTo.toJSON(),
            windowFn: 'mean',
            windowDurationUnit: windowType,
            windowDurationValue: 1,
        }
        metricApiClient.api.getAMetric(query)
            .then((data) => {
                setGetMetricResponse(data.data)
                setChartOption(buildChartOption(dateFrom, dateTo, data.data))
                setLoading(false)
            }).catch((response) => {
            console.error(response.error)
            setApiError(response.toString())
            setLoading(false)
        })

    };
    // on mount
    useEffect(() => {
        getMetric().then(r => r)
    }, [])


    return (<>
            <Row>
                <Col span={24} lg={24} className="p-4 text-right">
                    <Form
                        requiredMark
                        onFinish={() => getMetric()}
                        initialValues={{rangePicker: [dayjs(dateFrom), dayjs(dateTo)]}}
                    > <Row justify={"end"}>
                        <Col span={4}>
                            <Select
                                size="large"
                                placeholder="Select window type"
                                className="mr-4 w-full"
                                value={windowType}
                                allowClear
                                onChange={(value: string) => setWindowType(value)}
                                options={[
                                    {value: 'minute', label: 'minute'},
                                    {value: 'hour', label: 'hour'},
                                    {value: 'day', label: 'day'},
                                ]}
                            />
                        </Col>
                        <Col span={0} lg={2}></Col>
                        <Col span={24} lg={10}>
                            <MetricsRangePicker
                                dateFrom={dateFrom}
                                setDateFrom={setDateFrom}
                                dateTo={dateTo}
                                setDateTo={setDateTo}
                            />
                        </Col>
                        <Col span={2} lg={2}>
                            <Button type="primary"
                                    size="large"
                                    className="ml-2"
                                    onClick={getMetric}>
                                Search
                            </Button>
                        </Col>

                    </Row>

                    </Form>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="p-4 bg-slate-100">
                    {isLoading && <p>Loading...</p>}
                    {apiError && <p>Error... {apiError}</p>}
                    {!isLoading && getMetricResponse && chartOption && <ReactEcharts option={chartOption}/>}
                </Col>
            </Row>
        </>

    )
}
