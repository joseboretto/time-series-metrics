'use client'

import React from 'react'
import type {TimeRangePickerProps} from 'antd';
import {DatePicker, Form} from "antd";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;


export default function MetricsRangePicker({
                                               dateFrom,
                                               setDateFrom,
                                               dateTo,
                                               setDateTo
                                           }: {
    dateFrom: Date,
    setDateFrom: React.Dispatch<any>,
    dateTo: Date,
    setDateTo: React.Dispatch<any>
}) {// setters
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setDateFrom(new Date(Date.parse(dateStrings[0])))
            setDateTo(new Date(Date.parse(dateStrings[1])))
        }
    };


    // date picker
    const rangePresets: TimeRangePickerProps['presets'] = [{
        label: 'Past 15 Minutes', value: [dayjs().add(-15, 'm'), dayjs()]
    }, {label: 'Past 1 Hour', value: [dayjs().add(-1, 'h'), dayjs()]}, {
        label: 'Past 4 Hours', value: [dayjs().add(-4, 'h'), dayjs()]
    }, {label: 'Past 1 Day', value: [dayjs().add(-1, 'd'), dayjs()]}, {
        label: 'Past 7 Days', value: [dayjs().add(-7, 'd'), dayjs()]
    }];

    return (
        <Form.Item
            label=""
            name="rangePicker"
            rules={[{required: true, message: 'required'}]}
        >
            <RangePicker
                name="rangePicker"
                size="large"
                className=""
                presets={rangePresets}
                format="YYYY/MM/DD HH:mm:ss"
                onChange={onRangeChange}
            />
        </Form.Item>
    )
}
