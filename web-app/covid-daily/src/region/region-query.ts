import { RegionModel } from "./model";

export const fetchRegion = async (url: string) => {

    console.log(url)
    const res = await fetch(url).then(response =>

        response.json())

        .then(response => {
            const mapped: RegionModel[] = (response as any[]).map(r => ({
                date: new Date(Date.parse(r.reporting_date)),
                region: r.region ?? '',
                country: r.country,
                regionCode: r.region_code,
                tot: r.total,
                hospitalizedTotal: r.total_hospitalized,
                homeIsolation: r.home_isolation,
                hospitalizedWithSymptoms: r.hospitalized_with_symptoms,
                totalInfected: r.total_infected,
                deltaInfected: r.delta_infected,
                intensiveCare: r.intensive_care,
                newInfected: r.new_infected,
                deaths: r.deaths,
                dischargedHealed: r.discharged_healed,
                casesFromScreening: r.cases_from_screening,
                casesSuspectedScreening: r.cases_suspected_screening,
                swabs: r.swabs,
                infectedTotal: r.total_infected
            }));
            return mapped;
        });

    return res;
};