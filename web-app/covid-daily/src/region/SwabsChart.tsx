import React from "react";
import { CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { LastestValueBox } from "../LastestValueBox";
import { CustomizedAxisTick } from "../CustomizedAxisTick";

export type SwabsChartData = {
    date: string;
    swabs: number | undefined;
    swabsPrev: number | undefined;
}

const SwabsChart: React.FC<{ chartData: SwabsChartData[] }> = ({ chartData }) => {

    const last = chartData && chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (<>
        {last &&
            <p className="flex">
                <LastestValueBox last={{ date: last.date, prev: last.swabsPrev, current: last.swabs }} />
            </p>}
        <ComposedChart width={800}
            height={500}
            margin={{
                top: 20,
                right: 20,
                bottom: 10,
                left: 30,
            }}
            data={chartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="category" dataKey="date" height={80} tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line name="Anno corrente" dataKey="swabs" fill="#413ea0" />
            <Line name="Anno precedente" type="monotone" dataKey="swabsPrev" stroke="#ff7300" />

        </ComposedChart>
    </>)
}

export default SwabsChart;

