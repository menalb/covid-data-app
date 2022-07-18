import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Scatter, Tooltip, XAxis, YAxis } from "recharts";
import { defaultDateFrom } from "../date-utils";
import { RegionModel } from "./model";
import { fetchRegion } from "./region-query";
import RegionTable from "./region-table";

const RegionComponent: React.FC<{ apiURL: string }> = ({ apiURL }) => {

    const [searchText, setSearchText] = useState('Veneto');
    const [dateFrom, setDateFrom] = useState(defaultDateFrom);
    const [regionUrl, setRegionUrl] = useState(`region=Veneto&date-from=${dateFrom}`);

    const { isLoading, error, data, refetch } = useQuery<RegionModel[], Error>(
        "region",
        () => fetchRegion(`${apiURL}region?${regionUrl}`));

    const search = (e: any) => {

        e.preventDefault();
        if (searchText && searchText.length > 3) {

            setRegionUrl(`region=${searchText}&date-from=${dateFrom}`);
        }
    };
    useEffect(() => {
        refetch();
    }, [regionUrl]);


    const chartData = () => data?.map(d =>
    ({
        date: d.date.toDateString(),
        delta: d.deltaInfected,
        newInfected: d.newInfected,
        newInfectedPrev: d.newInfectedPrevYear,
        healed: d.dischargedHealed,
        total: d.totalInfected
    }));

    const renderCustomBarLabel: (args: { x: number, y: number, width: number, height: number, value: number }) => JSX.Element =
        ({ x, y, width, height, value }) => {

            return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value > 0 ? value : ''}</text>;
        };

    const renderLegend = (props:any) => {
        const { payload } = props;

        return (
            <ul>
                {
                    (payload as any[]).map((entry, index) => (
                        <li key={`item-${index}`}>{entry.value}</li>
                    ))
                }
            </ul>
        );
    }

    return (
        <>
            <form onSubmit={search} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none"
                    placeholder="Nome regione"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Aggiorna
                </button>
            </form>
            {isLoading && <p>Loading ...</p>}
            {error && <em>{error.message}</em>}

            {data && <>
                <h3 className="font-bold mb-5">Nuovi casi</h3>
                <ComposedChart width={800}
                    height={500}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 10,
                        left: 0,
                    }}
                    data={chartData()}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="category" dataKey="date" height={80} tick={<CustomizedAxisTick />} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Bar name="Anno corrente"  dataKey="newInfected" fill="#413ea0" />
                    <Line name="Anno precedente" type="monotone" dataKey="newInfectedPrev" stroke="#ff7300" />

                </ComposedChart>


                <h3 className="font-bold mb-5">Guarigioni</h3>
                <LineChart data={chartData()} width={800} height={350} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
                    <Line type="monotone" dataKey="healed" stroke="#1d8102" />
                    <YAxis type="number" dataKey="healed" />
                    <XAxis type="category" dataKey="date" tick={<CustomizedAxisTick />} />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                </LineChart>

                <h3 className="font-bold mb-5">Totale casi</h3>
                <LineChart data={chartData()} width={800} height={350} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
                    <Line type="monotone" dataKey="total" stroke="red" />
                    <YAxis type="number" dataKey="total" />
                    <XAxis type="category" dataKey="date" tick={<CustomizedAxisTick />} />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                </LineChart>
            </>
            }

            <br />

            {/* {data && <RegionTable regionData={data} />} */}
        </>
    )
}

const CustomizedAxisTick: React.FC<any> = (props: any) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
            >
                {payload.value}
            </text>
        </g>
    );
};

export default RegionComponent;