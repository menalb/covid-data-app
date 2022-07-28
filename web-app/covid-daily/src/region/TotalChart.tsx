import React from "react";
import { CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { LastestValueBox } from "../LastestValueBox";
import { CustomizedAxisTick } from "../CustomizedAxisTick";

export type TotalChartData = {
    date: string;
    total: number | undefined;    
}

const TotalChart: React.FC<{ chartData: TotalChartData[] }> = ({ chartData }) => {

    const last = chartData && chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (<>
        {last &&
            <p className="flex">
                <LastestValueBox last={{ date: last.date, current: last.total }} />
            </p>}
        <LineChart data={chartData} width={800} height={350} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
            <Line type="monotone" dataKey="total" stroke="red" />
            <YAxis type="number" dataKey="total" />
            <XAxis type="category" dataKey="date" tick={<CustomizedAxisTick />} />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        </LineChart>
    </>)
}

export default TotalChart;

