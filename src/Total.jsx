import React from "react";
import { Pie } from "react-chartjs-2";
import { vicenteLopezLocations } from "./consts";

function Total({ data }) {
  const vecinosData = data.filter((row) =>
    vicenteLopezLocations.includes(row.barrio)
  ).length;
  const otrosData = data.length - vecinosData;

  const dataSet = {
    labels: ["Vecinos", "Otros"],
    datasets: [
      {
        data: [vecinosData, otrosData],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Gráfico de datos totales",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed;
            const total = vecinosData + otrosData;
            const percentage =
              total === 0 ? 0 : ((value / total) * 100).toFixed(2);
            return `${datasetLabel}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Control Total</h1>
      <div style={{ height: "600px", width: "800px" }}>
        <Pie data={dataSet} options={chartOptions} />
      </div>
    </div>
  );
}

export default Total;
