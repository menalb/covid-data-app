export interface RegionModel {
    date: Date;
    country: string;
    regionCode: number;
    region: string;
    hospitalizedWithSymptoms?: number;
    intensiveCare?: number;
    hospitalizedTotal: number;
    homeIsolation: number;
    positiveTotal: number;
    // variazione_totale_positivi: number;
    // nuovi_positivi: number;
    // dimessi_guariti: number;
    // deceduti: number;
    // casi_da_sospetto_diagnostico?: number;
    // casi_da_screening?: number;
    tot: number;
    //tamponi: number;
}
export interface RegionModelApi {
    data: string;
    stato: string;
    codice_regione: number;
    denominazione_regione: string;
    ricoverati_con_sintomi: number;
    terapia_intensiva: number;
    totale_ospedalizzati: number;
    isolamento_domiciliare: number;
    totale_positivi: number;
    variazione_totale_positivi: number;
    nuovi_positivi: number;
    dimessi_guariti: number;
    deceduti: number;
    casi_da_sospetto_diagnostico?: number;
    casi_da_screening?: number;
    totale_casi: number;
    tamponi: number;
}