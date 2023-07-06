import React, { useEffect, useState } from "react";
import Localidad from "./Localidad";
import Total from "./Total";
import Zonas from "./Zonas";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import "./app.css";
import axios from "axios";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
); // Registra elementos o plugins de ChartJS si es necesario

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://transito.vicentelopez.gov.ar:3001/control/paseo"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <div className="App">
      <div className="chart-container">
        <div className="chart-wrapper">
          <Localidad data={data} />
        </div>
        <div className="chart-wrapper">
          <Zonas data={data} />
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-wrapper">
          <Total data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
