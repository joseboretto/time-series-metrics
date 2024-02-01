import React, {useEffect, useState} from "react";
import {Form, DatePicker, DatePickerProps, InputNumber, Select, message, Button} from 'antd';
import {MetricNames} from "@/app/_api/metrics-api";
import {metricApiClient} from "@/app/_api/clients";


export default function MetricForm() {
    const [loadingPost, setLoadingPost] = useState<boolean>(false);
    const [metricName, setMetricName] = useState<string | undefined>("temperature");
    const [metricValue, setMetricValue] = useState<number | null>(0);
    const [metricTimestamp, setMetricTimestamp] = useState<any | null | undefined>(new Date());
    // message
    const [messageApi, contextHolder] = message.useMessage();
    // form
    const [form] = Form.useForm();
    let handleSubmit = () => {
        setLoadingPost(true)

        metricApiClient.api.addMetric({
            name: metricName as MetricNames,
            value: metricValue as number,
            timestamp: metricTimestamp
        })
            .then((res: Response) => {
                    if (res.status === 201) {
                        form.resetFields();
                        messageApi.success('Metric saved successfully!');

                    } else {
                        messageApi.error('Error saving metric. Detail:' + res.json());

                    }
                    setLoadingPost(false)

                }
            ).catch((error) => {
            messageApi.destroy()
            messageApi.error('Error saving metric. Detail:' + error);
            setLoadingPost(false)
        })
    }


    const onChangeDatePicker: DatePickerProps['onChange'] = (date, dateString) => {
        setMetricTimestamp(new Date(Date.parse(dateString)))
    };

    return (
        // update form to use onValuesChange
        <>
            {contextHolder}
            <Form
                layout="vertical"
                requiredMark
                onFinish={() => handleSubmit()}
                form={form}
                initialValues={{metricName: null, metricValue: null, metricTimestamp: null}}
            >
                <Form.Item
                    label="Metric name"
                    name="metricName"
                    rules={[{required: true, message: 'required'}]}
                >
                    {/*todo: fetch metrics from back adn store it state*/}
                    <Select
                        size="large"
                        placeholder="Select metric"
                        className="mb-4 w-full"
                        allowClear
                        value={metricName}
                        onChange={(value: string) => setMetricName(value)}
                        options={[
                            {value: 'temperature', label: 'temperature'}
                        ]}
                    />
                </Form.Item>
                <Form.Item

                    label="Metric value"
                    name="metricValue"
                    rules={[{required: true, message: 'required'}]}
                >
                    <InputNumber
                        size="large"
                        placeholder="Enter value"
                        className="mb-4 w-full"
                        value={metricValue}
                        onChange={(value: number | null) => setMetricValue(value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Metric date time"
                    name="metricTimestamp"
                >
                    <DatePicker
                        size="large"
                        className="mb-4  w-full"
                        showTime
                        value={metricTimestamp}
                        onChange={onChangeDatePicker}
                    />
                </Form.Item>
                <Button type="primary"
                        size="large"
                        className="w-full"
                        htmlType="submit"
                        loading={loadingPost}>
                    Save metric value
                </Button>
            </Form>
        </>
    )
}