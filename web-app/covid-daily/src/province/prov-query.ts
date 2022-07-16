import { useEffect, useMemo, useState } from "react";
import { ServiceStatus } from "../models";
import { ProvinceModel } from "./model";

export const useProvQuery = (url: string) => {
    const [result, setResult] = useState<ServiceStatus<ProvinceModel[]>>({
        status: 'loading'
    });

    useEffect(() => {
        setResult({ status: 'loading' })
        fetch(url)
            .then(response => {
                if (response.status === 204)
                    return []
                return response.json();
            })
            .then(response => {
                const mapped: ProvinceModel[] = (response as any[]).map(r => ({
                    date: new Date(Date.parse(r.data)),
                    region: r.denominazione_regione ?? '',
                    province: r.denominazione_provincia ?? '',
                    initials: r.sigla_provincia ?? '',
                    tot: r.totale_casi ?? 0
                }));
                setResult({ status: 'loaded', payload: mapped })
            })
            .catch(error => setResult({ status: 'error', error }));

    }, [url]);

    return result;
};

export const fetchProv = async (url: string) => {
    const res = await fetch(url).then(response =>

        response.json())

        .then(response => {
            const mapped: ProvinceModel[] = (response as any[]).map(r => ({
                date: new Date(Date.parse(r.reporting_date)),
                region: r.region ?? '',
                province: r.province ?? '',
                initials: r.province_initials ?? '',
                tot: r.total ?? 0
            }));
            return mapped;
        });

    return res;
};