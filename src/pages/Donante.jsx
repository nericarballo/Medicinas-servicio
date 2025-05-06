import "../stylesheets/Donante.css";
import { useEffect, useState } from "react";
import React from "react";
import Dropdown from "../components/Dropdown.jsx";
import { FaCalendarAlt } from "react-icons/fa";
import CardNumber from "../components/CardNumber.jsx";
import { SlBadge } from "react-icons/sl";
import { GiMedicines } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import CustomPie from "../components/CustomPie.jsx";
import { BarChart } from "@mui/x-charts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const cardData = [
  { title: "Prednisona", description: "17 pacientes" },
  { title: "Losartan", description: "14 pacientes" },
  { title: "Insulina", description: "12 pacientes" },
  { title: "Xanax", description: "7 pacientes" },
  { title: "Medicamento 5", description: "Descripción 5" },
];

const CardMedicine = ({ title, description }) => (
  <div className="card medicine">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <BiRightArrowAlt />,
    prevArrow: <BiLeftArrowAlt />,
  };

  return (
    <section className={"demandas"}>
      <Slider {...settings}>
        {cardData.map((item, index) => (
          <CardMedicine
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </Slider>
    </section>
  );
};

export default function Donante() {
  //DATOS DE LOS PACIENTES

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

  //DATOS DEL DONANTE

  const name = "CARITAS";

  const data = {
    "25/06/2024": {
      Losartan: { entregadas: 40, espera: 10, caducadas: 2 },
      Prednisona: { entregadas: 15, espera: 15, caducadas: 5 },
      Insulina: { entregadas: 80, espera: 55, caducadas: 18 },
    },
    "16/08/2024": {
      Losartan: { entregadas: 50, espera: 10, caducadas: 3 },
      Prednisona: { entregadas: 40, espera: 15, caducadas: 5 },
      Insulina: { entregadas: 60, espera: 37, caducadas: 17 },
    },
  };

  const donations = ["Todas", ...Object.keys(data)];

  const [selectedDonation, setSelectedDonation] = useState(donations[0]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleSelect = (donation) => {
    setSelectedDonation(donation);
    // setSelectedMedicines([]);
  };

  const handleMedicineChange = (medicine) => {
    setSelectedMedicines((prevSelected) =>
      prevSelected.includes(medicine)
        ? prevSelected.filter((m) => m !== medicine)
        : [...prevSelected, medicine]
    );
  };

  const getTotalData = () => {
    return Object.values(data).reduce((acc, donation) => {
      Object.keys(donation).forEach((medicine) => {
        acc[medicine] = acc[medicine] || {
          entregadas: 0,
          espera: 0,
          caducadas: 0,
        };
        acc[medicine].entregadas += donation[medicine].entregadas;
        acc[medicine].espera += donation[medicine].espera;
        acc[medicine].caducadas += donation[medicine].caducadas;
      });
      return acc;
    }, {});
  };

  const currentData =
    selectedDonation === "Todas" ? getTotalData() : data[selectedDonation];

  const filteredData =
    selectedMedicines.length > 0
      ? selectedMedicines.reduce(
          (acc, medicine) => {
            return {
              entregadas:
                acc.entregadas + (currentData[medicine]?.entregadas || 0),
              espera: acc.espera + (currentData[medicine]?.espera || 0),
              caducadas:
                acc.caducadas + (currentData[medicine]?.caducadas || 0),
            };
          },
          { entregadas: 0, espera: 0, caducadas: 0 }
        )
      : { entregadas: 0, espera: 0, caducadas: 0 };

  const total =
    filteredData.entregadas + filteredData.espera + filteredData.caducadas;

  const chartsData = [
    { value: filteredData.entregadas, label: "Entregadas", color: "green" },
    { value: filteredData.espera, label: "En Espera", color: "yellow" },
    { value: filteredData.caducadas, label: "Caducadas", color: "red" },
  ];

  const totalMedicines = Object.values(currentData).reduce((acc, medicine) => {
    return acc + medicine.entregadas + medicine.espera + medicine.caducadas;
  }, 0);

  const totalDonations = Object.keys(currentData).length;

  //TODO
  //Pasar como prop el número de personas alcanzadas y la posición como donante

  return (
    <div>
      <section className={"donaciones"}>
        <div className={"donaciones-up"}>
          <div className={"donaciones-header"}>
            <h2>Tus donaciones</h2>
            <p>Hola, {name}. ¡Gracias por ayudarnos a ayudar!</p>
          </div>
          <div className={"donaciones-filter"}>
            <Dropdown
              title={"Donaciones"}
              options={donations}
              selectedOption={selectedDonation}
              onSelect={handleSelect}
              Icon={FaCalendarAlt}
            />
          </div>
        </div>
        <div className={"donaciones-first-row"}>
          <CardNumber
            number={"#2"}
            descriptor={"Mayor donante"}
            Icon={SlBadge}
          />
          <CardNumber
            number={totalMedicines}
            descriptor={"Medicamentos donados"}
            Icon={GiMedicines}
          />
          <CardNumber
            number={"63"}
            descriptor={"Personas alcanzadas"}
            Icon={FaHandsHelping}
          />
          <CardNumber
            number={totalDonations}
            descriptor={"Donaciones frecuentes"}
            Icon={AiFillMedicineBox}
          />
        </div>
        <div className={"donaciones-second-row"}>
          <div className={"card second"}>
            <div className={"second-top"}>
              <h3>Uso de medicamentos</h3>
              <div className="checkbox-container">
                {Object.keys(currentData).map((medicine, index) => (
                  <label key={index} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={medicine}
                      checked={selectedMedicines.includes(medicine)}
                      onChange={() => handleMedicineChange(medicine)}
                    />
                    <span className="checkbox-custom"></span>
                    {medicine}
                  </label>
                ))}
              </div>
            </div>
            <div className={"second-content"}>
              {chartsData.map((chart, index) => (
                <CustomPie
                  key={index}
                  data={[
                    { id: 0, value: chart.value },
                    { id: 1, value: total > 0 ? total - chart.value : 1 },
                  ]}
                  title={chart.label}
                  color={chart.color}
                  size={300}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={"donaciones-third-row"}>
          <div className={"card third"}>
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
              height={300}
              width={800}
              layout={"horizontal"}
              className={"illness-sector"}
              margin={{ left: 100 }}
            />
          </div>
          <div className={"card third"}>
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
              height={300}
              width={470}
              className={"illness-sector"}
              margin={{ right: 0 }}
            />
          </div>
        </div>
      </section>
      <section className={"demandas"}>
        <div className={"donaciones-up"}>
          <div className={"donaciones-header"}>
            <h2>Medicamentos en demanda</h2>
            <p>Los medicamentos más necesitados por la comunidad.</p>
          </div>
        </div>
        <div className={"slider"}>
          <Carousel />
        </div>
      </section>
    </div>
  );
}
