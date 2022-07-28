import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { LastestValueBox } from "../LastestValueBox";
import { CustomizedAxisTick } from "../CustomizedAxisTick";

export type HealedChartData = {
    date: string;
    healed: number | undefined;
}

const HealedChart: React.FC<{ chartData: HealedChartData[] }> = ({ chartData }) => {

    const last = chartData && chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (<>
        {last &&
            <p className="flex">
                <LastestValueBox last={{ date: last.date, current: last.healed }} />
            </p>}
        <LineChart data={chartData} width={800} height={350} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
            <Line type="monotone" dataKey="healed" stroke="#1d8102" />
            <YAxis type="number" dataKey="healed" />
            <XAxis type="category" dataKey="date" tick={<CustomizedAxisTick />} />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        </LineChart>
    </>)
}

export default HealedChart;

