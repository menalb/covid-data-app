import React from "react";
import { CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { LastestValueBox } from "../LastestValueBox";
import { CustomizedAxisTick } from "../CustomizedAxisTick";

export type InfectionsChartData = {
    date: string;
    total: number | undefined;
    infectedPrev: number | undefined;
}

const InfectionsChart: React.FC<{ chartData: InfectionsChartData[] }> = ({ chartData }) => {

    const last = chartData && chartData.length > 0 ? chartData[chartData.length - 1] : null;
    return (
        <>
            {last &&
                <p className="flex">
                    <LastestValueBox last={{ date: last.date, prev: last.infectedPrev, current: last.total }} />
                </p>}
            <ComposedChart width={800}
                height={500}
                margin={{
                    top: 0,
                    right: 20,
                    bottom: 60,
                    left: 0,
                }}
                data={chartData}>
                <Line type="monotone" dataKey="total" stroke="red" />
                <YAxis type="number" dataKey="total" />
                <Legend verticalAlign="top" />
                <XAxis type="category" dataKey="date" tick={<CustomizedAxisTick />} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line name="Anno precedente" type="monotone" dataKey="infectedPrev" stroke="#ff7300" />
            </ComposedChart>
        </>
    )
}

export default InfectionsChart;