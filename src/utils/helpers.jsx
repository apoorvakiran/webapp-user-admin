import { notification } from "antd";

export const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description,
  });
};

export const getSpeedScoreColor = (value) => {
  if (value > 85 && value <= 100) {
    return "#D10000";
  }
  else if (value > 75 && value <= 85) {
    return "#E75300";
  }
  else if (value > 65 && value <= 75) {
    return "#E75300";
  }
  else if (value > 55 && value <= 65) {
    return "#F3AF00";
  }
  else if (value > 45 && value <= 55) {
    return "#F3BE00";
  }
  else if (value > 35 && value <= 45) {
    return "#DFD600";
  }
  else {
    return "#D5ED42";
  }
};

export const colorizePercentageChart = (myObjBar) => {

  let bars = myObjBar?.datasets?.[0]?.data;

  for (let i = 0; i < bars?.length; i++) {

    let color = "#45CF03";

    if (parseFloat(bars?.[i]) > 95) {
      color = "#D10000";
    }
    if (parseFloat(bars?.[i]) > 20 && parseFloat(bars?.[i]) < 95) {
      color = "#DFD600";
    }
    if (parseFloat(bars?.[i]) < 20) {
      color = "#45CF03";
    }

    // no optinal chaining because it is an assignment 
    myObjBar.datasets[0].backgroundColor[i] = color;

  }
  return myObjBar;

};