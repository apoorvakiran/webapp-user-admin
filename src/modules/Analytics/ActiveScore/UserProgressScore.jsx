import { Col, Progress, Row } from 'antd'
import React, { useEffect, useState } from 'react';
import HeaderCard from './HeaderCard';

const UserProgressScore = (props) => {
    const [scores, setScores] = useState([]);
    useEffect(() => {
        // setScores(ProgressBarChart);
        setScores(props.userScore);
    }, [props])

    const strokeColor = {
        '0%': '#FFD705',
        '100%': '#45CF03',
    }

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
        <div>
            {/* <HeaderCard date={showDate} /> */}
            <HeaderCard handleChange={handleFilterChange} />
            <div className="average-line-1"></div>
            <Row style={{ marginTop: "20px" }}>
                {scores.map((row, index) => (
                    <>
                        <Col className="userProgress" xs={8} xl={8}>
                            <p className="userNameText">
                                {row?.first_name + " " + row?.last_name}
                            </p>
                        </Col>
                        <Col className="userProgress" xs={16} xl={16}>
                            <Progress format={percent => `${percent}`} showInfo={true} strokeWidth={30} percent={row?.user_score} strokeColor={strokeColor} />
                        </Col>
                    </>
                ))}
            </Row>
        </div>





    )
}

export default UserProgressScore