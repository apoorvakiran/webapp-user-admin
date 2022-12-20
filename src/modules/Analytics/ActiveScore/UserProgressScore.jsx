import { Col, Progress, Row } from "antd";
import { round } from "lodash";
import React, { useEffect, useState } from "react";
import { ACTIVE_SCORE, ANALYTICS, INJURY_RISK_SCORE, RISK_FREQUENCY_SCORE, SPEED_SCORE } from "../../../utils/consts";
import HeaderCard from "./HeaderCard";

const UserProgressScore = props => {
  const [scores, setScores] = useState([]);
  const [avgSafetyScore, setAvgSafetyScore] = useState(0);
  const [avgSpeedScore, setAvgSpeedScore] = useState(0);
  const [avgRiskScore, setAvgRiskScore] = useState(0);
  const [avgActiveScore, setAvgActiveScore] = useState(0);

  useEffect(() => {
    // setScores(ProgressBarChart);
    if (props.scoreName === INJURY_RISK_SCORE) {
      setAvgSafetyScore(props.totalAvgScore);
    } else if (props.scoreName === SPEED_SCORE) {
      setAvgSpeedScore(props.totalAvgScore);
    } else if (props.scoreName === RISK_FREQUENCY_SCORE) {
      setAvgRiskScore(props.totalAvgScore);
    } else if (props.scoreName === ACTIVE_SCORE) {
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
      props.scoreName === INJURY_RISK_SCORE ||
        props.scoreName === SPEED_SCORE
        ? "block"
        : "none",
  };

  const renderRisk = {
    display: props.scoreName === RISK_FREQUENCY_SCORE ? "block" : "none",
  };

  const renderActive = {
    display: props.scoreName === ACTIVE_SCORE ? "block" : "none",
  };

  const renderMaxScore = {
    display: (props.inheritedFrom !== ANALYTICS && props.scoreName !== RISK_FREQUENCY_SCORE) ? "block" : "none",
  };

  // const strokeColor = {
  //     '0%': '#45CF03',
  //     '50%': '#FFD705',
  //     '100%': '#D10000',
  // }

  function calcAverage() {
    // console.log("props.scoreName", avgActiveScore);
    if (props.scoreName === INJURY_RISK_SCORE) {
      return 33 + (67 * avgSafetyScore) / 7 + "%";
    } else if (props.scoreName === SPEED_SCORE) {
      return 33 + (67 * avgSpeedScore) / 7 + "%";
    } else if (props.scoreName === RISK_FREQUENCY_SCORE) {
      return 33 + (67 * avgRiskScore) / props.maxValue + "%";
    } else if (props.scoreName === ACTIVE_SCORE) {
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
        scoreName={props.scoreName}
        inheritedFrom={props.inheritedFrom}
        handleChange={handleFilterChange}
      />
      <div style={averageLine} class="avgLine"></div>
      <Row style={{ marginTop: "20px" }}>
        {scores?.map((row, index) => (
          <>
            <Col className="userProgress"
              xs={5} xl={5}
            >
              <p className="userNameText">
                {row?.first_name + " " + row?.last_name}
              </p>
            </Col>
            <Col xs={3} xl={3}>
              <p className="maxScoreText" style={renderMaxScore}>
                {props.scoreName !== ACTIVE_SCORE ? row?.max_score : ((row?.max_score / 1) * 100) + "%"}
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
                percent={round(100 - (row.user_score / props.maxValue) * 100)}
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
                  `${round((row.user_score * 100) / 1)}%`
                }
                showInfo={true}
                strokeWidth={30}
                percent={round(100 - (row.user_score / 1) * 100)}
              />
            </Col>
          </>
        ))}
      </Row>
    </div >
  );
};

export default UserProgressScore;
