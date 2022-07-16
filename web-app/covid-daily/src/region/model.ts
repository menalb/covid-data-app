export interface RegionModel {
    date: Date;
    country: string;
    regionCode: number;
    region: string;
    hospitalizedWithSymptoms?: number;
    hospitalizedTotal: number;
    homeIsolation: number;
    infectedTotal: number;    
    totalInfected?:number;
    deltaInfected?: number;
    intensiveCare?: number;
    newInfected?: number;
    deaths?: number;
    dischargedHealed?: number;
    casesFromScreening?: number;
    casesSuspectedScreening?: number;
    tot: number;
    swabs?: number;
}
