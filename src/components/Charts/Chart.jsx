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
import { Line } from "react-chartjs-2";
import "./chart.css";
import { Typography } from "antd";
import SettingIcon from "../../images/setting.png";
import { ACTIVE_SCORE } from "../../utils/consts";

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

const Chart = props => {
  const { Icon, LinearGradientColor } = props;
  const data = () => {
    return {
      labels: props?.labels,
      datasets: [
        {
          label: "",
          data: props?.data,
          fill: false,
          borderColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, LinearGradientColor[0] ? LinearGradientColor[0] : "#8ECF03");
            gradient.addColorStop(0.5, LinearGradientColor[1] ? LinearGradientColor[1] : "#F0B152");
            gradient.addColorStop(1, LinearGradientColor[2] ? LinearGradientColor[2] : "#FF0000");
            return gradient;
          },
          borderWidth: 5,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    tension: 0.4,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          lineWidth: 12,
        },
        ticks: {
          callback: function (value, index, ticks) {
            return props.title === ACTIVE_SCORE ? value + '%' : value;
          }
        },
        min: props.yAxisMin,
        max: props.yAxisMax,
        stepSize: props.yAxisStep,
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="Chart">
      <h3 className="SettingTitle">
        <img className="icon-css" src={Icon ? Icon : SettingIcon} alt="" />
        {props.title}
      </h3>
      <div className="description">
        <Typography className="desc">
          {props.desc}
        </Typography>

        {/* <FormButton
          className="viewBtn"
          id="viewButton"
          title={"View " + props.title}
          changeStyleClass="ViewScoreSm"
        /> */}

      </div>
      <article className="canvas-container">
        <Line
          height={200}
          width={600}
          id="canvas"
          data={data()}
          options={options}
        />
      </article>
      {/* <FormButton
        id="viewButton"
        title={"View " + props.title}
        changeStyleClass="ViewScore"
      /> */}
    </div>
  );
};

export default Chart;
