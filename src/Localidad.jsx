import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { vicenteLopezLocations } from "./consts";

function Localidad({ data }) {
  const [selectedYear, setSelectedYear] = useState("");

  const filteredData = data.filter((row) => {
    if (selectedYear) {
      return new Date(row.fecha).getFullYear().toString() === selectedYear;
    }
    return true;
  });

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const labels = months.map((month) => `${month.substring(0, 3)}`);

  const vecinosData = months.map(
    (month, index) =>
      filteredData.filter(
        (row) =>
          new Date(row.fecha).getMonth() === index &&
          vicenteLopezLocations.includes(row.barrio)
      ).length
  );

  const otrosData = months.map(
    (month, index) =>
      filteredData.filter(
        (row) =>
          new Date(row.fecha).getMonth() === index &&
          !vicenteLopezLocations.includes(row.barrio)
      ).length
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Vecinos",
        data: vecinosData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Otros",
        data: otrosData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h1>Control de Localidades</h1>
      <div>
        <label htmlFor="year">Seleccione el año:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
        >
          <option value="">Todos los años</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div style={{ height: "600px", width: "800px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Localidad;
