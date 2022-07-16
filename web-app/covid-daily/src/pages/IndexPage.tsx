import React, { useState } from "react";
import ProvinceComponent from "../province/ProvinceComponent";
import RegionComponent from "../region/RegionComponent";

const IndexPage = () => {
    const apiURL = import.meta.env.VITE_API;
    const [mode, setMode] = useState<'prov' | 'region'>('region');

    const provClick = () => {
        setMode('prov');
    }
    const regionClick = () => {
        setMode('region');
    }

    return (
        <>
            <div className="container flex space-x-4">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${mode === 'region' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={regionClick}
                >
                    Regioni
                </button>
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${mode === 'prov' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={provClick}
                >
                    Province
                </button>                
            </div>            
            {mode === 'region' && <RegionComponent apiURL={apiURL} />}
            {mode == 'prov' && <ProvinceComponent apiURL={apiURL} />}
        </>
    );
}

export default IndexPage;