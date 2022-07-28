import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Scatter, Tooltip, XAxis, YAxis } from "recharts";
import { defaultDateFrom } from "../date-utils";
import { CustomizedAxisTick } from "../CustomizedAxisTick";
import { RegionModel } from "./model";
import NewInfectionsChart from "./NewInfectionsChart";
import { fetchRegion } from "./region-query";
import InfectionsChart from "./InfectionsChart";
import HealedChart from "./HealedChart";
import SwabsChart from "./SwabsChart";
import DeathsChart from "./DeathsChart";
import TotalChart from "./TotalChart";

const RegionComponent: React.FC<{ apiURL: string }> = ({ apiURL }) => {

    const [searchText, setSearchText] = useState('Veneto');
    const [dateFrom, setDateFrom] = useState(defaultDateFrom);
    const [regionUrl, setRegionUrl] = useState(`region=Veneto&date-from=${dateFrom}`);
    const [tab, setTab] = useState('newInfected');

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

    const buildChartData = () => data?.map(d =>
    ({
        date: d.date.toDateString(),
        delta: d.deltaInfected,
        newInfected: d.newInfected,
        newInfectedPrev: d.newInfectedPrevYear,
        healed: d.dischargedHealed,
        total: d.totalInfected,
        infectedPrev: d.infectedPrevYear,
        swabs: d.swabs,
        swabsPrev: d.swabsPrevYear,
        deaths: d.deaths,
        deathsPrev: d.deathsPrevYear
    }));

    const chartData = useMemo(() => buildChartData(), [data]);

    const renderCustomBarLabel: (args: { x: number, y: number, width: number, height: number, value: number }) => JSX.Element =
        ({ x, y, width, height, value }) => {

            return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value > 0 ? value : ''}</text>;
        };

    const renderLegend = (props: any) => {
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

    const activeTabCss = "inline-block bg-gray-100 text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center active";
    const inactiveTabCss = "inline-block text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-t-lg py-4 px-4 text-sm font-medium text-center";

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
            <ul className="flex flex-wrap border-b border-gray-200">
                <li className="mr-2">
                    <a href="#" onClick={() => setTab('newInfected')}
                        aria-current={tab === 'newInfected' ? 'page' : false}
                        className={tab === 'newInfected' ? activeTabCss : inactiveTabCss}>
                        Nuovi casi
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTab('Infections')}
                        aria-current={tab === 'Infections' ? 'page' : false}
                        className={tab === 'Infections' ? activeTabCss : inactiveTabCss}>
                        Infezioni
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTab('Swabs')}
                        aria-current={tab === 'Swabs' ? 'page' : false}
                        className={tab === 'Swabs' ? activeTabCss : inactiveTabCss}>
                        Tamponi
                    </a>
                </li>
                <li className="mr-2">
                    <a href="#" onClick={() => setTab('Healed')}
                        aria-current={tab === 'Healed' ? 'page' : false}
                        className={tab === 'Healed' ? activeTabCss : inactiveTabCss}>
                        Guarigioni
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => setTab('Deaths')}
                        aria-current={tab === 'Deaths' ? 'page' : false}
                        className={tab === 'Deaths' ? activeTabCss : inactiveTabCss}>
                        Decessi
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => setTab('Total')}
                        aria-current={tab === 'Total' ? 'page' : false}
                        className={tab === 'Total' ? activeTabCss : inactiveTabCss}>
                        Totale casi
                    </a>
                </li>
            </ul>
            {chartData && <>
                {tab === 'newInfected' && <section>
                    <NewInfectionsChart chartData={chartData} />
                </section>}

                {tab === 'Infections' && <section>
                    <InfectionsChart chartData={chartData} />
                </section>}

                {tab === 'Swabs' && <section>
                    <SwabsChart chartData={chartData} />
                </section>}


                {tab === 'Healed' && <section>
                    <HealedChart chartData={chartData} />
                </section>}

                {tab === 'Deaths' && <section>
                    <DeathsChart chartData={chartData} />
                </section>}

                {tab === 'Total' && <section>
                   <TotalChart chartData={chartData} />
                </section>}

            </>
            }

            <br />

            {/* {data && <RegionTable regionData={data} />} */}
        </>
    )
}

export default RegionComponent;