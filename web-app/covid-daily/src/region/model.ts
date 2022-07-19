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
    newInfectedPrevYear?: number;
    deaths?: number;
    deathsPrevYear?: number;
    dischargedHealed?: number;
    casesFromScreening?: number;
    casesSuspectedScreening?: number;
    tot: number;
    infectedPrevYear: number;
    swabs?: number;
    swabsPrevYear?: number;
}
