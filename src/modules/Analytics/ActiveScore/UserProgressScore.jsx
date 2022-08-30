import { Col, Progress, Row } from "antd";
import { countBy, round, toLower } from "lodash";
import React, { useEffect, useState } from "react";
import HeaderCard from "./HeaderCard";
import { sumBy } from "lodash";

const UserProgressScore = props => {
  const [scores, setScores] = useState([]);
  const [avgSafetyScore, setAvgSafetyScore] = useState(0);
  const [avgSpeedScore, setAvgSpeedScore] = useState(0);
  const [avgRiskScore, setAvgRiskScore] = useState(0);
  const [avgActiveScore, setAvgActiveScore] = useState(0);

  useEffect(() => {
    // setScores(ProgressBarChart);
    if (props.scoreName === "Injury Risk Score") {
      setAvgSafetyScore(props.totalAvgScore);
    } else if (props.scoreName === "Speed Score") {
      setAvgSpeedScore(props.totalAvgScore);
    } else if (props.scoreName === "Risk Frequency Score") {
      setAvgRiskScore(props.totalAvgScore);
    } else if (props.scoreName === "Active Score") {
      setAvgActiveScore(props.totalAvgScore);
    }
  }, [props]);

  useEffect(() => {
    if (props.userScore.length && typeof props.userScore[0] === "object") {
      setScores(props.userScore);
    }
  }, [props.userScore]);

  const renderSafetySpeed = {
    display:
      props.scoreName === "Injury Risk Score" ||
      props.scoreName === "Speed Score"
        ? "block"
        : "none",
  };

  const renderRisk = {
    display: props.scoreName === "Risk Frequency Score" ? "block" : "none",
  };

  const renderActive = {
    display: props.scoreName === "Active Score" ? "block" : "none",
  };

  // const strokeColor = {
  //     '0%': '#45CF03',
  //     '50%': '#FFD705',
  //     '100%': '#D10000',
  // }

  function calcAverage() {
    // console.log("props.scoreName", avgActiveScore);
    if (props.scoreName === "Injury Risk Score") {
      return 33 + (67 * avgSafetyScore) / 7 + "%";
    } else if (props.scoreName === "Speed Score") {
      return 33 + (67 * avgSpeedScore) / 7 + "%";
    } else if (props.scoreName === "Risk Frequency Score") {
      return 33 + (67 * avgRiskScore) / 10 + "%";
    } else if (props.scoreName === "Active Score") {
      return 33 + (67 * avgActiveScore) / 1 + "%";
    }
  }

  const averageLine = {
    width: "4px",
    "background-color": "transparent",
    position: "absolute",
    "padding-left": calcAverage(),
    "border-right": "1px solid #727272",
    "z-index": "99",
    top: "44px",
    bottom: "0px",
  };

  const handleFilterChange = value => {
    const filterSpeedScoreData = scores;
    if (value === "low") {
      filterSpeedScoreData.sort((a, b) =>
        parseFloat(a.user_score) > parseFloat(b.user_score)
          ? 1
          : parseFloat(b.user_score) > parseFloat(a.user_score)
          ? -1
          : 0,
      );
    } else {
      filterSpeedScoreData.sort((a, b) =>
        parseFloat(a.user_score) < parseFloat(b.user_score)
          ? 1
          : parseFloat(b.user_score) < parseFloat(a.user_score)
          ? -1
          : 0,
      );
    }
    setScores([...filterSpeedScoreData]);
  };

  return (
    <div className="progressContainer-1">
      {/* <HeaderCard date={showDate} /> */}
      <HeaderCard
        maxValue={props.maxValue}
        minValue={props.minValue}
        handleChange={handleFilterChange}
      />
      <div style={averageLine} class="avgLine"></div>
      <Row style={{ marginTop: "20px" }}>
        {scores?.map((row, index) => (
              <>
                <Col className="userProgress" xs={8} xl={8}>
                  <p className="userNameText">
                    {row?.first_name + " " + row?.last_name}
                  </p>
                </Col>
                <Col
                  className="userProgress"
                  xs={16}
                  xl={16}
                  style={renderSafetySpeed}
                >
                  <Progress
                    format={percent => `${row.user_score}`}
                    showInfo={true}
                    strokeWidth={30}
                    percent={round(100 - (row.user_score / 7) * 100)}
                  />
                </Col>
                <Col
                  className="userProgress"
                  xs={16}
                  xl={16}
                  style={renderRisk}
                >
                  <Progress
                    format={percent => `${row.user_score}`}
                    showInfo={true}
                    strokeWidth={30}
                    percent={round(100 - (row.user_score / 10) * 100)}
                  />
                </Col>
                <Col
                  className="userProgress"
                  xs={16}
                  xl={16}
                  style={renderActive}
                >
                  <Progress
                    format={percent =>
                      `${round((row.user_score * 100) / 1)}` + "%"
                    }
                    showInfo={true}
                    strokeWidth={30}
                    percent={round(100 - (row.user_score / 1) * 100)}
                  />
                </Col>
              </>
            ))}
      </Row>
    </div>
  );
};

export default UserProgressScore;
