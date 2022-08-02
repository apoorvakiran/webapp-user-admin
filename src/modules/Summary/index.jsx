import { Grid, Paper, styled, Typography } from "@mui/material";
import { Card, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { DashboardData, ActiveScoreDesc, SafetyScoreDesc, SpeedScoreDesc, RiskScoreDesc, baseUrl, formatDate, getColor, ProgressBarChart, ViewBy } from "../../utils/Data/Data";
import Chart from "../../components/Charts/Chart";
import axios from "axios";
import "./dashboard.css";
import Barchart from "../../components/Charts/BarChart";
import SettingIcon from "../../images/setting.png";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import UserIcon from "../../images/UserIcon.png";
import { cardIconStyle } from "../../modules/Users/style";
import Table from "../../components/Table/index";
import Meta from "antd/lib/card/Meta";
import AllJobSummary from "./AllJobSummary";
import UserProgressScore from "../Analytics/ActiveScore/UserProgressScore";
import { round } from "lodash";

const Summary = (props) => {
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(0);
    const [scores, setScores] = useState([]);
    const [activeGraphLabels, setActiveGraphLabels] = useState([]);
    const [activeGraphData, setActiveGraphData] = useState([]);
    const [safetyGraphLabels, setSafetyGraphLabels] = useState([]);
    const [safetyGraphData, setSafetyGraphData] = useState([]);
    const [speedGraphLabels, setSpeedGraphLabels] = useState([]);
    const [speedGraphData, setSpeedGraphData] = useState([]);
    const [riskGraphLabels, setRiskGraphLabels] = useState([]);
    const [riskGraphData, setRiskGraphData] = useState([]);
    const [userCount, setUserCount] = useState([]);
    const [jobTitleList, setJobTitleList] = useState([]);
    const [jobTeamList, setJobTeamList] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState('0');
    const [dataType, setDataType] = useState('Day');
    const [scoreType = "View by User", setScoreType] = useState();

    async function getActiveScores(value) {

        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/summary-graph-data", {
            baseUrl + "summary", {
            params: {
                type: "summary-graph-data",
                durationType: value,
                startdate: date
            }
        }
        );
        const data = response.data.data;
        setScores(response.data.card_data);
        let activeLabels = data["activescore"]?.x || [];
        let activeData = data["activescore"]?.y || [];
        let safetyLabels = data["safetyscore"]?.x || [];
        let safetyData = data["safetyscore"]?.y || [];
        let speedLabels = data["speedscore"]?.x || [];
        let speedData = data["speedscore"]?.y || [];
        let riskLabels = data["riskexposures"]?.x || [];
        let riskData = data["riskexposures"]?.y || [];
        setActiveGraphLabels(activeLabels);
        setActiveGraphData(activeData);
        setSafetyGraphLabels(safetyLabels);
        setSafetyGraphData(safetyData);
        setSpeedGraphLabels(speedLabels);
        setSpeedGraphData(speedData);
        setRiskGraphLabels(riskLabels);
        setRiskGraphData(riskData);
        return response.data;
    }

    useEffect(() => {
        getJobTitleList();
        getUserData();
        // getActiveScores("Day");
        getUserCardData(null, "Day");
        getUserSafetyScoreData(null, dataType);
        getUserRiskScoreData(null, dataType);
        getUserSpeedScoreData(null, dataType);
        getUserActiveScoreData(null, dataType);
    }, []);

    async function getUserData() {
        // const response = await axios.get(
        //   "http://localhost:5051/api/user-admin/user-list",
        // );
        const response = await axios.get(
            baseUrl + "user", {
            params: {
                type: "user-list"
            }
        }
        );
        setLoading(false);
        setUserCount(response.data.meta.total);
    }

    async function getJobTitleList() {
        // const response = await axios.get(
        //   "http://localhost:5051/api/user-admin/get-jobs-list",
        // );
        const response = await axios.get(
            baseUrl + "userdetail", {
            params: {
                type: "get-jobs-list"
            }
        }
        );
        setLoading(false);
        setJobTitleList(response.data);
    }

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
        borderColor: "black",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "black",
    }));

    async function onGridSelection(value) {
        setDataType(value);
        // getData(value);
        // console.log("selectedJobTitle::::", selectedJobTitle)
        if (selectedJobTitle !== "" && selectedJobTitle !== "0") {
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            // console.log("scoreType:::::", scoreType);
            if (scoreType === "View by User") {
                getUserCardData(jobId, value);
                getUserSafetyScoreData(jobId, value);
                getUserRiskScoreData(jobId, value);
                getUserSpeedScoreData(jobId, value);
                getUserActiveScoreData(jobId, value);
            } else {
                getJobWiseSummaryGraph(jobId, value)
            }
        } else {
            getUserCardData(null, value);
            getUserSafetyScoreData(null, value);
            getUserRiskScoreData(null, value);
            getUserSpeedScoreData(null, value);
            getUserActiveScoreData(null, value);
            // getActiveScores(value);
        }

    }

    const getIcon = icon => {
        switch (icon) {
            case "Active":
                return SettingIcon;
            case "Injury":
                return Vector2Icon;
            case "Speed":
                return StrokeIcon;
            case "Risk":
                return PolygonIcon;
            default:
                return SettingIcon;
        }
    };

    const handleChange = (value) => {
        let val = `${value}`;
        // setDataType("Day");
        // console.log("key", `${jobTitleList.filter(data => data.id === key)[0].name}`);
        if (val !== "0") {
            setSelectedJobTitle(`${jobTitleList.filter(data => data.id === value)[0].name}`);
            // getJobUserList(`${value}`);
            if (scoreType === "View by User") {
                getUserCardData(`${value}`, dataType);
                getUserSafetyScoreData(`${value}`, dataType);
                getUserRiskScoreData(`${value}`, dataType);
                getUserSpeedScoreData(`${value}`, dataType);
                getUserActiveScoreData(`${value}`, dataType);
            } else {
                getJobWiseSummaryGraph(`${value}`, dataType)
            }
        } else {
            setSelectedJobTitle("");
            getUserCardData(null, dataType);
            getUserSafetyScoreData(null, dataType);
            getUserRiskScoreData(null, dataType);
            getUserSpeedScoreData(null, dataType);
            getUserActiveScoreData(null, dataType);
            // getActiveScores(dataType);
        }
    };

    async function getJobWiseSummaryGraph(value, durationType) {

        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-summary-by-job", {
            baseUrl + "summary", {
            params: {
                type: "get-summary-by-job",
                durationType: durationType,
                startdate: date,
                jobId: value
            }
        }
        );
        const data = response.data.data;
        setScores(response.data.card_data);
        let activeLabels = data["activescore"]?.x || [];
        let activeData = data["activescore"]?.y || [];
        let safetyLabels = data["safetyscore"]?.x || [];
        let safetyData = data["safetyscore"]?.y || [];
        let speedLabels = data["speedscore"]?.x || [];
        let speedData = data["speedscore"]?.y || [];
        let riskLabels = data["riskexposures"]?.x || [];
        let riskData = data["riskexposures"]?.y || [];
        setActiveGraphLabels(activeLabels);
        setActiveGraphData(activeData);
        setSafetyGraphLabels(safetyLabels);
        setSafetyGraphData(safetyData);
        setSpeedGraphLabels(speedLabels);
        setSpeedGraphData(speedData);
        setRiskGraphLabels(riskLabels);
        setRiskGraphData(riskData);
        return response.data;
    }

    async function getJobUserList(userId) {
        // const response = await axios.get(
        //   "http://localhost:5051/api/user-admin/get-user-jobs-list", {
        //   params: {
        //     id: userId
        //   }
        // }
        // );
        const response = await axios.get(
            baseUrl + "userdetail", {
            params: {
                id: userId,
                type: "get-user-jobs-list"
            }
        }
        );
        setLoading(false);
        setJobTeamList(response.data);
    }

    const columns = type => [
        {
            title: "Job Type",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(item, record) {
                return {
                    props: {
                        style: { color: "#C54B30" },
                    },
                    children: <div>{`${record.name}`}</div>,
                };
            },
        },
        {
            title: "",
            dataIndex: "job_score",
            key: "job_score",
            render(item, record) {
                return {
                    props: {
                        style: { color: "#C54B30", fontWeight: 700, textAlign: "right" },
                    },
                    children: <div>{type !== "Active Score" ? record.job_score : round((record.job_score * 100) / 1.0) + "%"}</div>,
                };
            },
        },
    ];

    const handleScoreCard = async type => {
        setScoreType(() => type)
        // console.log("type", type)
        if (type === "View by Time") {
            // console.log("scoreType", type)
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            getJobWiseSummaryGraph(jobId, dataType)
        } else {
            // console.log("scoreType", type)
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            getUserCardData(jobId, dataType);
            getUserSafetyScoreData(jobId, dataType);
            getUserRiskScoreData(jobId, dataType);
            getUserSpeedScoreData(jobId, dataType);
            getUserActiveScoreData(jobId, dataType);
        }
    };

    async function getUserCardData(value, durationType) {
        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-summary-card-detail-by-user", {
            baseUrl + "summary", {
            params: {
                type: "get-summary-card-detail-by-user",
                durationType: durationType,
                startdate: date,
                jobId: value
            }
        }
        );
        setScores(response.data.card_data);
    }

    async function getUserSafetyScoreData(value, durationType) {
        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: date,
                jobId: value,
                scoreType: "safetyscore",
                pageSize: ""
            }
        }
        );
        // console.log("safetyscore:::", response.data.data.userscore)
        if (value !== null) {
            setSafetyGraphData(response.data.data.userscore);
        } else {
            setSafetyGraphData(response.data.data.jobscore);
        }
    }

    async function getUserRiskScoreData(value, durationType) {
        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: date,
                jobId: value,
                scoreType: "riskscore",
                pageSize: ""
            }
        }
        );
        // console.log("riskscore:::", response.data.data.userscore)
        if (value !== null) {
            setRiskGraphData(response.data.data.userscore);
        } else {
            setRiskGraphData(response.data.data.jobscore);
        }
    }

    async function getUserSpeedScoreData(value, durationType) {
        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: date,
                jobId: value,
                scoreType: "speedscore",
                pageSize: ""
            }
        }
        );
        // console.log("speedscore:::", response.data.data.userscore)
        if (value !== null) {
            setSpeedGraphData(response.data.data.userscore);
        } else {
            setSpeedGraphData(response.data.data.jobscore);
        }
    }

    async function getUserActiveScoreData(value, durationType) {
        const current = new Date();
        const date = formatDate(current);
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: date,
                jobId: value,
                scoreType: "activescore",
                pageSize: ""
            }
        }
        );
        //console.log("activescore:::", response.data.data.userscore)
        if (value !== null) {
            setActiveGraphData(response.data.data.userscore);
        } else {
            setActiveGraphData(response.data.data.jobscore);
        }
    }

    return (
        <BasicLayout pageTitle={"Summary"}>
            {loading ? (
                <Skeleton
                    style={{ position: "absolute", zIndex: "99" }}
                    loading
                    active
                />
            ) : (
                <Card style={{ marginLeft: 10 }}>
                    <div style={{ marginBottom: 2 }}>Tampa, Florida</div>
                    <div className="user-score" style={{ marginBottom: 20 }}>Dashboard</div>
                    <Select defaultValue="All Jobs" className="selectStyle" style={{ width: "200px", marginBottom: "20px" }}
                        onChange={handleChange} >
                        <Select.Option value={0}> All Jobs </Select.Option>
                        {jobTitleList.map((row, index) => (
                            <Select.Option value={row.id}>{row.name} </Select.Option>
                        ))}
                    </Select>
                    <div className="dashboard">
                        {/* <h1 className="dashboardTitle">Dashboard</h1> */}
                        <Grid container spacing={0.2}>
                            {DashboardData.map((data, index) => {
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        xs={3}
                                        onClick={() => {
                                            setSelected(index);
                                        }}
                                    >
                                        <Item
                                            className={
                                                selected === index ? "gridData activeGrid" : "gridData"
                                            }
                                            onClick={e => {
                                                e.preventDefault();
                                                onGridSelection(data);
                                            }}
                                        >
                                            {data}
                                        </Item>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <Card className="childCard">
                            {
                                selectedJobTitle !== "" & selectedJobTitle !== "0" ?
                                    <Meta style={{ margin: "10px" }} title={
                                        <span style={{ fontWeight: "700", color: "#535353" }}>{selectedJobTitle}</span>
                                    } /> : ""
                            }

                            {scores.map((row, index) => (
                                <Card.Grid hoverable={false} className="gridStyle">
                                    <Typography className={"innerCardUpperTitle" + index}>
                                        <span>
                                            <img src={getIcon(row?.type)} className="cardIcon" style={cardIconStyle} />
                                        </span>
                                        {row.type !== "Risk" ? row.type : "Risk Frequency"}
                                    </Typography>

                                    <Typography className="innerCardValue">{row.type !== "Active" ? row.value : round(row.value * 100 / 1.0) + "%"}</Typography>
                                    <Typography className={"innerCardTitle" + index} style={{ color: getColor(row) }}>
                                        {row.color}
                                    </Typography>
                                </Card.Grid>
                            ))}
                            <Card.Grid hoverable={false} className="gridStyle userCard">
                                <Typography className="innerCardTitle">
                                    <span>
                                        <img src={UserIcon} />
                                    </span>
                                    &nbsp; USERS
                                </Typography>

                                <Typography className="innerCardValue">{userCount}</Typography>
                                <Typography className="innerCardTitle12">
                                    {/* VIEW ALL  */}
                                    USERS
                                </Typography>
                            </Card.Grid>
                        </Card>

                        {
                            (selectedJobTitle === "" || selectedJobTitle === "0")
                                ?
                                // view all jobs summary
                                <>
                                    <div className="chart">
                                        <AllJobSummary
                                            title="Injury Risk Score"
                                            desc={SafetyScoreDesc}
                                            data={safetyGraphData}
                                            labels={safetyGraphLabels}
                                            Icon={Vector2Icon} columns={columns("Injury Risk Score")} showHeader={true}
                                            scoreType="All Jobs" />

                                        <AllJobSummary
                                            title="Risk Frequency Score"
                                            desc={RiskScoreDesc}
                                            data={riskGraphData}
                                            labels={riskGraphLabels}
                                            Icon={PolygonIcon} columns={columns("Risk Frequency Score")} showHeader={true}
                                            scoreType="All Jobs" />
                                    </div>
                                    <div className="chart">
                                        <AllJobSummary
                                            title="Speed Score"
                                            desc={SpeedScoreDesc}
                                            data={speedGraphData}
                                            labels={speedGraphLabels}
                                            Icon={StrokeIcon} columns={columns("Speed Score")} showHeader={true}
                                            scoreType="All Jobs" />

                                        <AllJobSummary
                                            title="Active Score"
                                            desc={ActiveScoreDesc}
                                            data={activeGraphData}
                                            labels={activeGraphLabels}
                                            Icon={SettingIcon} columns={columns("Active Score")} showHeader={true}
                                            scoreType="All Jobs" />
                                    </div>
                                </>
                                :
                                (scoreType === "View by Time")
                                    ?
                                    // view by Time
                                    <>
                                        <Card className="childCard">
                                            {ViewBy.map((row, index) => (
                                                <Card.Grid
                                                    hoverable={false}
                                                    className="view-by-gridStyle"
                                                    onClick={() => handleScoreCard(row)}
                                                    style={{
                                                        background: scoreType === row ? "#C54B30" : "unset",
                                                        color: scoreType === row ? "#ffffff" : "#C54B30",
                                                    }}
                                                    value={scoreType}
                                                >
                                                    <Typography style={{ fontWeight: 600 }}>{row}</Typography>
                                                </Card.Grid>
                                            ))}
                                        </Card>
                                        <div className="chart">
                                            <Chart
                                                title="Injury Risk Score"
                                                desc={SafetyScoreDesc}
                                                data={safetyGraphData}
                                                labels={safetyGraphLabels}
                                                Icon={Vector2Icon}
                                                LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                            />
                                            <Barchart
                                                title="Risk Frequency"
                                                desc={RiskScoreDesc}
                                                data={riskGraphData}
                                                labels={riskGraphLabels}
                                                Icon={PolygonIcon}
                                                LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                            />
                                        </div>
                                        <div className="chart">
                                            <Chart
                                                title="Speed Score"
                                                desc={SpeedScoreDesc}
                                                data={speedGraphData}
                                                labels={speedGraphLabels}
                                                Icon={StrokeIcon}
                                                LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                            />
                                            <Chart
                                                title="Active Score"
                                                desc={ActiveScoreDesc}
                                                data={activeGraphData}
                                                labels={activeGraphLabels}
                                                Icon={SettingIcon}
                                                LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}
                                            />
                                        </div>
                                    </>
                                    :
                                    // view by User
                                    <>
                                        <Card className="childCard">
                                            {ViewBy.map((row, index) => (
                                                <Card.Grid
                                                    hoverable={false}
                                                    className="view-by-gridStyle"
                                                    onClick={() => handleScoreCard(row)}
                                                    style={{
                                                        background: scoreType === row ? "#C54B30" : "unset",
                                                        color: scoreType === row ? "#ffffff" : "#C54B30",
                                                        fontWeight: 700
                                                    }}
                                                    value={scoreType}
                                                >
                                                    <Typography style={{ fontWeight: 600 }}>{row}</Typography>
                                                </Card.Grid>
                                            ))}
                                        </Card>
                                        <div className="chart">
                                            <AllJobSummary
                                                title="Injury Risk Score"
                                                desc={SafetyScoreDesc}
                                                data={safetyGraphData}
                                                labels={safetyGraphLabels}
                                                Icon={Vector2Icon}
                                                scoreType="View by User" />

                                            <AllJobSummary
                                                title="Risk Frequency Score"
                                                desc={RiskScoreDesc}
                                                data={riskGraphData}
                                                labels={riskGraphLabels}
                                                Icon={PolygonIcon}
                                                scoreType="View by User" />
                                        </div>
                                        <div className="chart">
                                            <AllJobSummary
                                                title="Speed Score"
                                                desc={SpeedScoreDesc}
                                                data={speedGraphData}
                                                labels={speedGraphLabels}
                                                Icon={StrokeIcon}
                                                scoreType="View by User" />

                                            <AllJobSummary
                                                title="Active Score"
                                                desc={ActiveScoreDesc}
                                                data={activeGraphData}
                                                labels={activeGraphLabels}
                                                Icon={SettingIcon}
                                                scoreType="View by User" />
                                        </div>
                                    </>
                        }
                    </div>
                </Card>
            )
            }
        </BasicLayout >
    );
};

export default Summary;
