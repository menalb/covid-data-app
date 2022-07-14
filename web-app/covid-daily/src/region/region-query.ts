import { RegionModel, RegionModelApi } from "./model";

export const fetchRegion = async (url: string) => {
    const res = await fetch(url).then(response =>

        response.json())

        .then(response => {
            const mapped: RegionModel[] = (response as RegionModelApi[]).map(r => ({
                date: new Date(Date.parse(r.data)),
                region: r.denominazione_regione ?? '',
                country: r.stato,
                regionCode: r.codice_regione,
                tot: r.totale_casi,
                hospitalizedTotal: r.totale_ospedalizzati,
                homeIsolation: r.isolamento_domiciliare,
                hospitalizedWithSymptoms: r.casi_da_sospetto_diagnostico,
                positiveTotal:r.totale_positivi
            }));
            return mapped;
        });

    return res;
};