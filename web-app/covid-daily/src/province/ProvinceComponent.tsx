import React, { useState } from "react";
import { useQuery } from "react-query";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ProvinceModel } from "./model";
import { fetchProv } from "./prov-query";
import ProvinceTable from "./province-table";

const ProvinceComponent: React.FC<{ apiURL: string }> = ({ apiURL }) => {

    // function subtractMonths(numOfMonths:number, date:Date = new Date()) {
    //     date.setMonth(date.getMonth() - numOfMonths);
    //     return date;
    // }

    // const dateFormatted = (dt: Date) => `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2,'0')}-${(dt.getDate()).toString().padStart(2,'0')}`
    const { isLoading, error, data } = useQuery<ProvinceModel[], Error>(
        "prov",
        () => fetchProv(`${apiURL}prov?prov=PD`));

    const chartData = () => data?.map(d => ({ date: d.date.toDateString(), tot: d.tot }));

    return (
        <>
            {isLoading && <p>Loading ...</p>}
            {error && <em>{error.message}</em>}
            {data && <ProvinceTable provinceData={data} />}

            <br />

            {data &&
                <LineChart
                    width={800}
                    height={300}
                    data={chartData()}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="tot"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            }
        </>
    )
}

export default ProvinceComponent;