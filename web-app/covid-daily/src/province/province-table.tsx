import React from "react";
import { ProvinceModel } from "./model";

const ProvinceTable: React.FC<{ provinceData: ProvinceModel[] }> = ({ provinceData }) => <table className="table-auto min-w-full shadow-md rounded" >
    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-5" >
        <tr>
            <th className="font-semibold text-left" >
                Data
            </th>
            <th className="font-semibold text-left" >
                Regione
            </th>
            <th className="font-semibold text-left" >
                Provincia
            </th>
            <th className="font-semibold text-left" >
                Totale casi
            </th>
        </tr>
    </thead>
    <tbody className="text-sm divide-y divide-gray-100" >
        {provinceData && provinceData.map((p, i) =>
            <tr key={i} >
                <td>
                    {p.date.toDateString()}
                </td>
                <td >
                    {p.region}
                </td>
                < td >
                    {p.province}
                </td>
                < td >
                    {p.tot}
                </td>
            </tr>)}
    </tbody>
</table>

export default ProvinceTable;