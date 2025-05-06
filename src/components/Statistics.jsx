import "../stylesheets/Donante.css";
import { useEffect, useState } from "react";
import React from "react";
import CardNumber from "../components/CardNumber.jsx";
import CustomPie from "../components/CustomPie.jsx";
import { BarChart } from "@mui/x-charts";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { GiHealthNormal } from "react-icons/gi";
import { TbHealthRecognition } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";

export default function Statistics() {
  const patientIllness = {
    Cancer: 30,
    Diabetes: 45,
    Hipertension: 25,
    Esquizofrenia: 12,
  };
  const totalPatients = Object.values(patientIllness).reduce(
    (acc, value) => acc + value,
    0
  );

  const donors = { ONG: 3, Gurbernamental: 2, Privada: 2, Natural: 2 };
  const totalDonors = Object.values(donors).reduce(
    (acc, value) => acc + value,
    0
  );

  const donorsDonations = {
    Caritas: 120,
    AliVen: 53,
    MMPS: 70,
    SPPS: 30,
    ManosUnidas: 40,
    Farmatodo: 45,
    Central: 20,
    Jose: 10,
    Maria: 8,
  };
  const sortedDonors = Object.entries(donorsDonations)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
  const dataSector = {
    Diabetes: [
      { region: "Barrio Lindo", pacientes: 20 },
      { region: "Alambique", pacientes: 20 },
      { region: "Cardenales", pacientes: 60 },
      { region: "Los Luises", pacientes: 20 },
      { region: "Santos Luzardo", pacientes: 20 },
    ],
    Cancer: [
      { region: "Barrio Lindo", pacientes: 30 },
      { region: "Alambique", pacientes: 40 },
      { region: "Cardenales", pacientes: 10 },
      { region: "Los Luises", pacientes: 30 },
      { region: "Santos Luzardo", pacientes: 30 },
    ],
    Hipertensión: [
      { region: "Barrio Lindo", pacientes: 40 },
      { region: "Alambique", pacientes: 10 },
      { region: "Cardenales", pacientes: 50 },
      { region: "Los Luises", pacientes: 40 },
      { region: "Santos Luzardo", pacientes: 10 },
    ],
    // Agrega más datos según sea necesario
  };
  const dataDemografia = {
    Diabetes: [
      { sexo: "M", edad: "30-40", pacientes: 10 },
      { sexo: "F", edad: "30-40", pacientes: 20 },
      { sexo: "M", edad: "40-50", pacientes: 15 },
      { sexo: "F", edad: "50-60", pacientes: 25 },
      { sexo: "M", edad: "60-70", pacientes: 30 },
      { sexo: "F", edad: "40-50", pacientes: 20 },
      { sexo: "M", edad: "50-60", pacientes: 20 },
      { sexo: "F", edad: "60-70", pacientes: 10 },
    ],
    Cancer: [
      { sexo: "F", edad: "20-30", pacientes: 15 },
      { sexo: "M", edad: "30-40", pacientes: 10 },
      { sexo: "F", edad: "40-50", pacientes: 20 },
      { sexo: "M", edad: "50-60", pacientes: 25 },
      { sexo: "F", edad: "60-70", pacientes: 30 },
    ],
    Hipertensión: [
      { sexo: "M", edad: "20-30", pacientes: 20 },
      { sexo: "F", edad: "30-40", pacientes: 10 },
      { sexo: "M", edad: "40-50", pacientes: 30 },
      { sexo: "F", edad: "50-60", pacientes: 20 },
      { sexo: "M", edad: "60-70", pacientes: 25 },
    ],
    // Agrega más datos según sea necesario
  };

  const [enfermedad, setEnfermedad] = useState("Diabetes");
  const [chartDataDemografia, setChartDataDemografia] = useState([]);
  const [edades, setEdades] = useState([]);

  useEffect(() => {
    const selectedData = dataDemografia[enfermedad];
    const groupedData = selectedData.reduce((acc, item) => {
      if (!acc[item.edad]) {
        acc[item.edad] = { M: 0, F: 0 };
      }
      acc[item.edad][item.sexo] += item.pacientes;
      return acc;
    }, {});

    const edades = Object.keys(groupedData);
    const dataM = edades.map((edad) => groupedData[edad].M);
    const dataF = edades.map((edad) => groupedData[edad].F);

    setEdades(edades);
    setChartDataDemografia([
      { data: dataM, label: "Hombres", color: "#1f77b4", showLabel: false },
      { data: dataF, label: "Mujeres", color: "#ff003f", showLabel: false },
    ]);
  }, [enfermedad]);
  const handleChange = (event) => {
    setEnfermedad(event.target.value);
  };

  const chartDataSector = dataSector[enfermedad].map((item) => item.pacientes);
  const regions = dataSector[enfermedad].map((item) => item.region);

  return (
    <div>
      <div className={"header-container"}>
        <h2>Reportes y estadísticas</h2>
      </div>
      <p>Pacientes</p>
      <section className={"pacientes"}>
        <div className={"statistics-first-row"}>
          <CardNumber
            number={"111"}
            descriptor={"Pacientes registrados"}
            Icon={TbHealthRecognition}
          />
          <div className={"card pie-group"}>
            <div className={"group-content"}>
              {Object.entries(patientIllness).map(([illness, count]) => {
                const data = [
                  { name: illness, value: count },
                  { name: "Otros", value: totalPatients - count },
                ];
                const percentage = ((count / totalPatients) * 100).toFixed(0);

                return (
                  <CustomPie
                    key={illness}
                    data={data}
                    title={`${illness}`}
                    color="red"
                    size={200}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={"statistics-second-row"}>
          <div className={"card demografia"}>
            <div className={"second-top"}>
              <h3>Demografía</h3>
              <select
                id="enfermedad-select"
                value={enfermedad}
                onChange={handleChange}
                className={"select illness"}
              >
                {Object.keys(dataSector).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <BarChart
              series={chartDataDemografia}
              xAxis={[{ data: edades, scaleType: "band", barGapRatio: 1 }]}
              height={380}
              width={380}
              className={"illness-sector"}
              margin={{ right: 0 }}
            />
          </div>
          <div className={"card distribucion"}>
            <div className={"second-top"}>
              <h3>Distribución geográfica</h3>
              <select
                id="enfermedad-select"
                value={enfermedad}
                onChange={handleChange}
                className={"select illness"}
              >
                {Object.keys(dataSector).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <BarChart
              series={[{ data: chartDataSector }]}
              yAxis={[{ data: regions, scaleType: "band", barGapRatio: 1.0 }]}
              height={380}
              width={560}
              layout={"horizontal"}
              className={"illness-sector"}
              margin={{ left: 100 }}
            />
          </div>
        </div>
      </section>

      <p>Medicamentos y donaciones</p>
      <section className={"medicamentos"}>
        <div className={"statistics-first-row"}>
          <CardNumber
            number={"9"}
            descriptor={"Donantes frecuentes"}
            Icon={GiHealthNormal}
          />
          <div className={"card pie-group"}>
            <div className={"group-content"}>
              {Object.entries(donors).map(([donor, count]) => {
                const data = [
                  { name: donor, value: count },
                  { name: "Otros", value: totalDonors - count },
                ];
                const percentage = ((count / totalDonors) * 100).toFixed(0);

                return (
                  <CustomPie
                    key={donor}
                    data={data}
                    title={`${donor}`}
                    color="red"
                    size={200}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={"statistics-second-row"}>
          <div className={"card donors"}>
            <div className={"second-top"}>
              <h3>Donantes principales</h3>
            </div>
            <BarChart
              series={[{ data: sortedDonors.map((item) => item.value) }]}
              yAxis={[
                {
                  scaleType: "band",
                  data: sortedDonors.map((item) => item.name),
                },
              ]}
              height={320}
              width={560}
              layout={"horizontal"}
              margin={{ left: 100, bottom: 100, top: 10 }}
            />
          </div>
          <div className={"vertical"}>
            <CardNumber
              number={"1240"}
              descriptor={"Medicamentos recibidos"}
              Icon={AiOutlineMedicineBox}
            />
            <CardNumber
              number={"1110"}
              descriptor={"Medicamentos entregados"}
              Icon={FaHandHoldingHeart}
            />
          </div>
        </div>
        <div className={"statistics-third-row"}>
          <div className="card percent">
            <h1 className="green-text-stats">87%</h1>
            <p className="width-80-stats">De los tratamientos cumplidos</p>
          </div>
          <div className="card percent">
            <h1 className="gold-text-stats">13%</h1>
            <p className="width-80-stats">
              De los pacientes no reciben sus tratamientos a tiempo
            </p>
          </div>
          <div className="card percent">
            <h1 className="red-text-stats">9%</h1>
            <p className="width-80-stats">
              De los medicamentos caducaron antes de usarse
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
