import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { vicenteLopezLocations } from "./consts";

function Zonas({ data }) {
  const [selectedYear, setSelectedYear] = useState("");

  const filteredData = data.filter((row) => {
    if (selectedYear) {
      return new Date(row.fecha).getFullYear().toString() === selectedYear;
    }
    return true;
  });

  const zonas = [
    "YRIGOYEN A SAN MARTIN",
    "SAN MARTIN A ROCA",
    "ROCA A MELO",
    "MELO A LAVALLE",
    "LAVALLE A LAPRIDA",
    "LAPRIDA A J. C. CRUZ",
  ];

  const vecinosData = zonas.map(
    (zona) =>
      filteredData.filter(
        (row) => row.zona === zona && vicenteLopezLocations.includes(row.barrio)
      ).length
  );

  const otrosData = zonas.map(
    (zona) =>
      filteredData.filter(
        (row) =>
          row.zona === zona && !vicenteLopezLocations.includes(row.barrio)
      ).length
  );

  const chartData = {
    labels: zonas,
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

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Gráfico de datos por zona",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            return datasetLabel + ": " + value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Control de Zonas</h1>
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
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Zonas;
