'use client'
import {Col, Row} from "antd";
import dynamic from "next/dynamic";

import MetricForm from "@/app/_components/metrics/form";
// https://javascript.plainenglish.io/how-to-fix-the-window-is-not-defined-error-in-next-js-d8b132f24a23
const ChartEcharts = dynamic(() => import("@/app/_components/metrics/chart-echarts"), {ssr: false})


export default function Home() {


    return (<>
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">Factorial HR - Metrics App</h1>
        </header>
        <Row>
            <Col span={24} lg={8} className="p-4 shadow">
                <MetricForm></MetricForm>
            </Col>
            <Col span={24} lg={16} className="p-4 shadow">
                <ChartEcharts></ChartEcharts>
            </Col>
        </Row>
    </>);
}
