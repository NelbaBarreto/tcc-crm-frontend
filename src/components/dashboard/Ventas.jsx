import React from "react";
import BarChart from "./assets/js/BarChart";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getLeadsPorEstado,
  getLeadsPorOrigen
} from "../../api/dashboard";

const MainDash = () => {
  const [leadEstadoData, setLeadEstadoData] = useState({ datasets: [] });
  const [leadOrigenData, setLeadOrigenData] = useState({ datasets: [] });

  const {
    data: leadsPorEstado,
    leadsEFetching
  } = useQuery(["leadsPorEstado"], getLeadsPorEstado);

  const {
    data: leadsPorOrigen,
    leadsOFetching
  } = useQuery(["leadsPorOrigen"], getLeadsPorOrigen);


  useEffect(() => {
    if (!leadsEFetching) {
      setLeadEstadoData({
        labels: leadsPorEstado?.map((data) => data.estado),
        datasets: [{
          label: "Leads",
          data: leadsPorEstado?.map((data) => data.total),
          backgroundColor: ["#3296ed", "#96d44e", "#c398f5", "#50d4cd"]
        },],
      });
    }
  }, [leadsPorEstado, leadsEFetching]);

  useEffect(() => {
    if (!leadsOFetching && leadsPorOrigen?.length) {
      setLeadOrigenData(
        {
          labels: leadsPorOrigen[0]?.map((data) => data.origen),
          datasets: [
            {
              label: "Leads",
              data: leadsPorOrigen[0]?.map((data) => data.total),
              backgroundColor: ["#00bfc4"]
            },
            {
              label: "Leads Convertidos",
              data: leadsPorOrigen[1]?.map((data) => data.total),
              backgroundColor: ["#c77cff"]
            }
          ],
        }
      )
    }
  }, [leadsPorOrigen, leadsOFetching]);

  return (
    <div
      className="grid grid-cols-2 gap-1"
    >
      <div className="rounded-md shadow-md bg-white p-2">
        <BarChart
          chartData={leadOrigenData}
          stacked={true}
          title="Leads y Leads Convertidos Por Origen"
        />
      </div>
      <div className="rounded-md shadow-md bg-white p-2">
        <BarChart
          chartData={leadEstadoData}
          title="Leads Por Estado"
        />
      </div>
    </div>
  )
}


export default MainDash;