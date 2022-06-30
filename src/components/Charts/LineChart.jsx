// Styling
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import SettingIcon from "../../images/setting.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export function LineChart() {
  const [chartData, setChartData] = useState([]);
  const [graphLabel, setGraphLabel] = useState([]);
  const [graphData, setGraphData] = useState([]);

  async function getActiveScores(value) {
    const response = await axios.post(
      "http://localhost:5051/api/user-admin/score-graph-data",
      { type: value },
    );
    let label = [];
    let data = [];
    for (const dataObj of response.data.data.activescore.x) {
      label.push(dataObj);
    }
    for (const dataObj of response.data.data.activescore.y) {
      data.push(dataObj);
    }
    setGraphLabel(label);
    setGraphData(data);
    setChartData({
      labels: label,
      datasets: [
        {
          data: data,
          fill: false, // Don't fill area under the line
          borderWidth: 8, // Line color
        },
      ],
    });

    return response.data;
  }

  useEffect(() => {
    getActiveScores("Day");
  }, []);

  const data = () => {
    return {
      labels: graphLabel,
      datasets: [
        {
          label: "First dataset",
          data: graphData,
          fill: false,
          borderColor: (context: ScriptableContext<"Line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "#8ECF03");
            gradient.addColorStop(0.5, "#F0B152");
            gradient.addColorStop(1, "#FF0000");
            return gradient;
          },
          borderWidth: 10,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.35,
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    interaction: {
      intersect: true,
    },
  };

  return (
    <div>
      <Line data={data()} options={options} />
    </div>
  );
}

export default LineChart;
