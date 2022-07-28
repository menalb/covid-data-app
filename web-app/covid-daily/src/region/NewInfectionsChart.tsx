import React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { LastestValueBox } from "../LastestValueBox";
import { CustomizedAxisTick } from "../CustomizedAxisTick";

export type NewInfectionsChartData = {
    date: string;
    newInfected: number | undefined;
    newInfectedPrev: number | undefined;
}

const NewInfectionsChart: React.FC<{ chartData: NewInfectionsChartData[] }> = ({ chartData }) => {

    const last = chartData && chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (<>
        {last &&
            <p className="flex">
                <LastestValueBox last={{date: last.date, prev:last.newInfectedPrev, current:last.newInfected}} />
            </p>}
        <ComposedChart width={800}
            height={500}
            margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 0,
            }}
            data={chartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="category" dataKey="date" height={80} tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar name="Anno corrente" dataKey="newInfected" fill="#413ea0" />
            <Line name="Anno precedente" type="monotone" dataKey="newInfectedPrev" stroke="#ff7300" />
        </ComposedChart>
    </>)
}

export default NewInfectionsChart;

