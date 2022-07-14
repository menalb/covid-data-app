import React, { useEffect, useMemo, useState } from "react";
import { ServiceStatus } from "../models";
import { ProvinceModel } from "../province/model";
import { fetchProv, useProvQuery } from "../province/prov-query";
import ProvinceTable from "../province/province-table";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RegionTable from "../region/region-table";
import { RegionModel } from "../region/model";
import { fetchRegion } from "../region/region-query";

const IndexPage = () => {
    const apiURL = import.meta.env.VITE_API;
    const [mode, setMode] = useState<'prov' | 'region'>('prov');

    const { isLoading: isLoadingProv, error: errorProv, data: provinceData } = useQuery<ProvinceModel[], Error>(
        "prov",
        () => fetchProv(apiURL + 'prov?prov=PD'), {
        enabled: mode === 'prov'
    });

    const { isLoading: isLoadingRegion, error: errorRegion, data: regionData } = useQuery<RegionModel[], Error>(
        "region",
        () => fetchRegion(apiURL + 'region?region=Veneto'), {
        enabled: mode === 'region'
    });

    const provClick = () => {
        console.log('Prov');
        setMode('prov');
    }
    const regionClick = () => {
        console.log('Region');
        setMode('region');
    }

    return (
        <>
            {(isLoadingProv || isLoadingRegion) && <p>Loading ...</p>}
            {errorProv && <em>{errorProv.message}</em>}
            {errorRegion && <em>{errorRegion.message}</em>}
            <div className="container flex space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={provClick}
                >
                    Province
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={regionClick}
                >
                    Regioni
                </button>
            </div>
            {mode === 'prov' && provinceData && <ProvinceTable provinceData={provinceData} />}
            {mode === 'region' && regionData && <RegionTable regionData={regionData} />}
        </>
    );
}

export default IndexPage;