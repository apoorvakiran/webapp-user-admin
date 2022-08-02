import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SettingsIcon from "@mui/icons-material/Settings";
import { FormButton } from "../formComponents/FormButton";
import "./chart.css";
import { Typography } from "antd";
import SettingIcon from "../../images/setting.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

const Barchart = props => {
  const { Icon } = props;
  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          lineWidth: 12,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          // display: false, //this will remove only the label
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "",
        data: props.data,
        backgroundColor: [
          "#DFD600",
          "#F3BE00",
          "#FF6E1C",
          "#E65300",
          "#D10000",
          "#DFD600",
          "#F3BE00",
        ],
      },
    ],
  };

  return (
    <div className="Chart">
      <h3 className="SettingTitle">
        <img className="icon-css" src={Icon ? Icon : SettingIcon} />
        {props.title}
      </h3>
      <div className="description">
        <Typography className="desc">
          {props.desc}
        </Typography>
{/*        <FormButton
          id="viewButton"
          title={"View " + props.title}
          changeStyleClass="ViewScoreSm"
        />*/}
      </div>
      <article className="canvas-container">
        <Bar
          height={200}
          width={600}
          id="canvas"
          data={data}
          options={options}
        />
      </article>
      <FormButton
        id="viewButton"
        title={"View Risk Events"}
        changeStyleClass="ViewScore"
      />
    </div>
  );
};

export default Barchart;
