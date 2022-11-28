import { Grid, Paper, styled, Typography } from "@mui/material";
import { Card, Select, Skeleton, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import {
    DashboardData, ActiveScoreDesc, SafetyScoreDesc, SpeedScoreDesc, RiskScoreDesc, baseUrl,
    formatDate, getColor, ViewBy, getAuthData, generatePdf
} from "../../utils/Data/Data";
import Chart from "../../components/Charts/Chart";
import axios from "axios";
import "./dashboard.css";
import Barchart from "../../components/Charts/BarChart";
import SettingIcon from "../../images/setting.png";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import UserIcon from "../../images/UserIcon.png";
import AllJobSummary from "./AllJobSummary";
import { orderBy, round } from "lodash";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Calendar from "../../components/Calendar/Calendar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { openNotificationWithIcon } from "../../utils/helpers";

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
    const [selectedJobTitle, setSelectedJobTitle] = useState('0');
    const [dataType, setDataType] = useState('Day');
    const [scoreType = "Scores by User", setScoreType] = useState();
    const { route } = useAuthenticator(context => [context.route]);
    const [calendarDate, setCalendarDate] = useState(formatDate(new Date()));
    const [selectedOption, setSelectedOption] = useState(0);
    const [excelData, setExcelData] = useState([]);


    useEffect(() => {

        const current = new Date();
        const date = formatDate(current);

        if (route === 'authenticated') {
            getJobTitleList();
            getUserData();
            // getActiveScores("Day");
            getUserCardData(null, "Day", date);
            getUserSafetyScoreData(null, dataType, date);
            getUserRiskScoreData(null, dataType, date);
            getUserSpeedScoreData(null, dataType, date);
            getUserActiveScoreData(null, dataType, date);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedOption === 0) return;
        handleChange(selectedOption);
        handleScoreCard(scoreType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDate]);


    async function getUserData() {
        // const response = await axios.get(
        //   "http://localhost:5051/api/user-admin/user-list",
        // );
        const idToken = await getAuthData();
        const response = await axios.get(
            baseUrl + "user", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
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
        const idToken = await getAuthData();
        const response = await axios.get(
            baseUrl + "userdetail", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
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


    const getOnSelectionData = (value = dataType, newDate) => {
        const current = new Date();
        const date = formatDate(newDate || current);
        setCalendarDate(date);

        if (selectedJobTitle !== "" && selectedJobTitle !== "0") {
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            if (scoreType === "Scores by User") {
                getUserCardData(jobId, value, date);
                getUserSafetyScoreData(jobId, value, date);
                getUserRiskScoreData(jobId, value, date);
                getUserSpeedScoreData(jobId, value, date);
                getUserActiveScoreData(jobId, value, date);
            } else {
                getJobWiseSummaryGraph(jobId, value, date);
            }
        } else {
            getUserCardData(null, value, date);
            getUserSafetyScoreData(null, value, date);
            getUserRiskScoreData(null, value, date);
            getUserSpeedScoreData(null, value, date);
            getUserActiveScoreData(null, value, date);
            // getActiveScores(value);
        }
    };

    async function onGridSelection(value) {
        setDataType(value);
        // getData(value);
        getOnSelectionData(value);
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
        setSelectedOption(value);
        let val = `${value}`;
        // setDataType("Day");
        // console.log("key", `${jobTitleList.filter(data => data.id === key)[0].name}`);
        if (val !== "0") {
            setSelectedJobTitle(`${jobTitleList.filter(data => data.id === value)[0].name}`);
            // getJobUserList(`${value}`);
            if (scoreType === "Scores by User") {
                getUserCardData(`${value}`, dataType, calendarDate);
                getUserSafetyScoreData(`${value}`, dataType, calendarDate);
                getUserRiskScoreData(`${value}`, dataType, calendarDate);
                getUserSpeedScoreData(`${value}`, dataType, calendarDate);
                getUserActiveScoreData(`${value}`, dataType, calendarDate);
            } else {
                getJobWiseSummaryGraph(`${value}`, dataType, calendarDate);
            }
        } else {
            setSelectedJobTitle("");
            getUserCardData(null, dataType, calendarDate);
            getUserSafetyScoreData(null, dataType, calendarDate);
            getUserRiskScoreData(null, dataType, calendarDate);
            getUserSpeedScoreData(null, dataType, calendarDate);
            getUserActiveScoreData(null, dataType, calendarDate);
            // getActiveScores(dataType);
        }
    };

    async function getJobWiseSummaryGraph(value, durationType) {

        const idToken = await getAuthData();
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-summary-by-job", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: "get-summary-by-job",
                durationType: durationType,
                startdate: calendarDate,
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

    // async function getJobUserList(userId) {
    //     // const response = await axios.get(
    //     //   "http://localhost:5051/api/user-admin/get-user-jobs-list", {
    //     //   params: {
    //     //     id: userId
    //     //   }
    //     // }
    //     // );
    //     const idToken = await getAuthData();
    //     const response = await axios.get(
    //         baseUrl + "userdetail", {
    //         headers: {
    //             "Authorization": `Bearer ${idToken}`
    //         },
    //         params: {
    //             id: userId,
    //             type: "get-user-jobs-list"
    //         }
    //     }
    //     );
    //     setLoading(false);
    // }

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
        setScoreType(type);
        if (type === "Scores by Time") {
            // console.log("scoreType", type)
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            getJobWiseSummaryGraph(jobId, dataType, calendarDate);
        } else {
            // console.log("scoreType", type)
            const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
            getUserCardData(jobId, dataType, calendarDate);
            getUserSafetyScoreData(jobId, dataType, calendarDate);
            getUserRiskScoreData(jobId, dataType, calendarDate);
            getUserSpeedScoreData(jobId, dataType, calendarDate);
            getUserActiveScoreData(jobId, dataType, calendarDate);
        }
    };

    async function getUserCardData(value, durationType, selectedDate) {
        const idToken = await getAuthData();
        const response = await axios.get(
            // "http://localhost:3000/summary", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: "get-summary-card-detail-by-user",
                durationType: durationType,
                startdate: selectedDate,
                jobId: value
            }
        }
        );
        setScores(response.data.card_data);
    }

    async function getUserSafetyScoreData(value, durationType, selectedDate) {
        const idToken = await getAuthData();
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: selectedDate,
                jobId: value,
                scoreType: "safetyscore",
                pageSize: ""
            }
        }
        );
        // console.log("safetyscore:::", response.data.data.userscore)
        if (value !== null) {
            setSafetyGraphData(orderBy(response.data.data.userscore, ['user_score'], ['desc']));
        } else {

            setSafetyGraphData(orderBy(response.data.data.jobscore, ['job_score'], ['desc']));
        }
    }

    async function getUserRiskScoreData(value, durationType, selectedDate) {
        const idToken = await getAuthData();
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: selectedDate,
                jobId: value,
                scoreType: "riskscore",
                pageSize: ""
            }
        }
        );
        // console.log("riskscore:::", response.data.data.userscore)
        if (value !== null) {
            setRiskGraphData(orderBy(response.data.data.userscore, ['user_score'], ['desc']));
        } else {
            setRiskGraphData(orderBy(response.data.data.jobscore, ['job_score'], ['desc']));
        }
    }

    async function getUserSpeedScoreData(value, durationType, selectedDate) {
        const idToken = await getAuthData();
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: selectedDate,
                jobId: value,
                scoreType: "speedscore",
                pageSize: ""
            }
        }
        );
        // console.log("speedscore:::", response.data.data.userscore)
        if (value !== null) {
            setSpeedGraphData(orderBy(response.data.data.userscore, ['user_score'], ['desc']));
        } else {
            setSpeedGraphData(orderBy(response.data.data.jobscore, ['job_score'], ['desc']));
        }
    }

    async function getUserActiveScoreData(value, durationType, selectedDate) {
        const idToken = await getAuthData();
        const response = await axios.get(
            // value !== null ? "http://localhost:5051/api/user-admin/get-summary-by-user" : "http://localhost:5051/api/user-admin/get-summary-by-all-job", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: value !== null ? "get-summary-by-user" : "get-summary-by-all-job",
                durationType: durationType,
                startdate: selectedDate,
                jobId: value,
                scoreType: "activescore",
                pageSize: ""
            }
        }
        );
        //console.log("activescore:::", response.data.data.userscore)
        if (value !== null) {
            setActiveGraphData(orderBy(response.data.data.userscore, ['user_score'], ['desc']));
        } else {
            setActiveGraphData(orderBy(response.data.data.jobscore, ['job_score'], ['desc']));
        }
    }

    const getDataForExcel = async (durationType, selectedDate) => {
        const idToken = await getAuthData();
        const response = await axios.get(
            // "http://localhost:3000/summary", {
            baseUrl + "summary", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
            params: {
                type: "get-data-for-excel",
                durationType: durationType,
                startdate: selectedDate
            }
        }
        );
        const data = [{
            category: dataType,
            data: response.data.data
        }]
        if (response?.data?.data?.length > 0) {
            setExcelData(data);
        } else {
            openNotificationWithIcon(
                "error",
                "Error",
                `No data found or Error while fetching records`,
            );
        }

    };

    // eslint-disable-next-line no-unused-vars
    const [showLoader, setLoader] = useState(false);

    const createDownLoadData = () => {
        handleExport().then((url) => {
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute("download", "Score-Details.xlsx");
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    };

    const handleExport = () => {
        const obj = {
            Sheets: {},
            SheetNames: []
        };
        const wb = XLSX.utils.book_new();
        excelData.map((item, index) => {
            item[`json`] = XLSX.utils.json_to_sheet(item.data);
            obj.Sheets[item.category] = item.json;
            obj.SheetNames.push(item.category);
            // console.log("sheet:::::::", obj.Sheets[item.category], ":::::::sheetName::::::", obj.SheetNames[0]);
            //create a new workbook
            XLSX.utils.book_append_sheet(wb, obj.Sheets[item.category], obj.SheetNames[0]);
        });

        // binary large object
        // Since blobs can store binary data, they can be used to store images or other multimedia files.

        const workbookBlob = workbook2blob(wb);

        var headerIndexes = [];
        excelData.forEach((data, index) => {
            return data["User ID"] === "User ID" ? headerIndexes.push(index) : null;
        });
        const dataInfo = {
            titleCell: "A1",
            titleRange: "A1:G1",
            tbodyRange: `A2:H${Object.keys(excelData[0].data).length + 1}`,
        };

        return addStyle(workbookBlob, dataInfo);
    };

    const addStyle = (workbookBlob, dataInfo) => {
        return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
            workbook.sheets().forEach((sheet) => {
                sheet.usedRange().style({
                    fontFamily: "Arial",
                    verticalAlignment: "center",
                });

                sheet.column("A").width(30);
                sheet.column("B").width(15);
                sheet.column("C").width(20);
                sheet.column("D").width(25);
                sheet.column("E").width(15);
                sheet.column("F").width(15);
                sheet.column("G").width(30);

                sheet.range(dataInfo.titleRange).style({
                    bold: true,
                    fill: "FFFD04",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                });

                if (dataInfo.tbodyRange) {
                    sheet.range(dataInfo.tbodyRange).style({
                        horizontalAlignment: "center",
                        verticalAlignment: "center",
                    });
                }
            });

            return workbook
                .outputAsync()
                .then((workbookBlob) => URL.createObjectURL(workbookBlob));
        });
    };

    const workbook2blob = (workbook) => {
        const wopts = {
            bookType: "xlsx",
            bookSST: false,
            type: "binary",
        };

        const wbout = XLSX.write(workbook, wopts);

        // The application/octet-stream MIME type is used for unknown binary files.
        // It preserves the file contents, but requires the receiver to determine file type,
        // for example, from the filename extension.
        const blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream",
        });

        return blob;
    };

    const s2ab = (s) => {
        // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
        // create an ArrayBuffer with a size in bytes
        const buf = new ArrayBuffer(s.length);

        // console.log(buf);

        //create a 8 bit integer array
        const view = new Uint8Array(buf);

        // console.log(view);
        //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
        for (let i = 0; i !== s.length; ++i) {
            // console.log(s.charCodeAt(i));
            view[i] = s.charCodeAt(i);
        }
        return buf;
    };

    useEffect(() => {
        if (excelData.length > 0 && Object.keys(excelData?.[0]?.data)?.length > 0) {
            createDownLoadData();
        }
    }, [excelData]);

    const saveAsPdf = () => {
        generatePdf('summaryWrapper', setLoader);
    };
    return (
        <BasicLayout >
            {loading ? (
                <Skeleton
                    style={{ position: "absolute", zIndex: "99", padding: "20px" }}
                    loading
                    active
                />
            ) : (
                <Card className="summaryWrapper" id="summaryWrapper">
                    <div className="summary-page-header">
                        <div className="user-score" style={{ marginBottom: 20 }}>Score Summary</div>
                        <div className="jobs-pdf-buttons">
                            <Button
                                shape="round"
                                onClick={() => getDataForExcel(dataType, calendarDate)}
                                icon={<DownloadOutlined />}
                                className="pdf-button"
                                data-html2canvas-ignore="true"
                            >
                                Save as Excel
                            </Button>
                            <Button
                                shape="round"
                                onClick={() => saveAsPdf()}
                                icon={<DownloadOutlined />}
                                className="pdf-button"
                                data-html2canvas-ignore="true"
                            >
                                Save as PDF
                            </Button>
                        </div>
                    </div>
                    <div className="dashboard">
                        <Grid container>
                            <Grid item xs={12} md={3}>
                                <Select defaultValue="All Jobs" className="selectStyle selectJob" style={{ width: "200px" }}
                                    onChange={handleChange} >
                                    <Select.Option value={0}> All Jobs </Select.Option>
                                    {jobTitleList.map((row, index) => (
                                        <Select.Option value={row.id}>{row.name} </Select.Option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={9} className="dateSelectTabsWrapper">
                                <Grid container className="timeSelect">
                                    {DashboardData.map((data, index) => {
                                        return (
                                            <Grid
                                                key={index}
                                                item
                                                xs={2.5}
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
                                    <Grid item xs={2} className="gridData lastItem">
                                        <Item>
                                            <KeyboardArrowDownIcon />
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Calendar getOnSelectionData={getOnSelectionData} dataType={dataType} />
                        <Card className="scoreBoard childCard">

                            {/* <div className="scoreboardTitle">
                                {
                                    selectedJobTitle !== "" & selectedJobTitle !== "0" ?
                                        <span>
                                            {selectedJobTitle}&nbsp;
                                        </span> : ""
                                }

                                <span>Scoreboard</span>
                            </div> */}
                            {/* <div className="calendarWrapper">
                                <Calendar  getOnSelectionData={getOnSelectionData} dataType={dataType} />
                            </div> */}

                            {scores.map((row, index) => (
                                <Card.Grid hoverable={false} className="gridStyle">
                                    <Typography className={"innerCardUpperTitle" + index}>

                                        <span className="imgSpan">
                                            <img src={getIcon(row?.type)} className="cardIcon" alt="" />
                                        </span>
                                        {row.type !== "Risk" ? row.type : "Risk Frequency"}

                                    </Typography>

                                    <Typography className="innerCardValue">{row.type !== "Active" ? row.value : row.value + "%"}</Typography>
                                    <Typography className={"innerCardTitle" + index} style={{ color: getColor(row) }}>
                                        {row.color}
                                    </Typography>
                                </Card.Grid>
                            ))}
                            <Card.Grid hoverable={false} className="gridStyle userCard">
                                <Typography className="innerCardTitle">
                                    <span>
                                        <img src={UserIcon} className="cardIcon" alt="" />
                                    </span>
                                    <span>USERS</span>
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
                                <Grid container spacing={2} className="chartContainer">
                                    <Grid item s={12} lg={6} className="chart">
                                        <Item>
                                            <AllJobSummary
                                                title="Injury Risk Score"
                                                desc={SafetyScoreDesc}
                                                data={safetyGraphData}
                                                labels={safetyGraphLabels}
                                                Icon={Vector2Icon} columns={columns("Injury Risk Score")} showHeader={true}
                                                scoreType="All Jobs" />
                                        </Item>
                                    </Grid>
                                    <Grid item s={12} lg={6} className="chart">
                                        <Item>
                                            <AllJobSummary
                                                title="Risk Frequency Score"
                                                desc={RiskScoreDesc}
                                                data={riskGraphData}
                                                labels={riskGraphLabels}
                                                Icon={PolygonIcon} columns={columns("Risk Frequency Score")} showHeader={true}
                                                scoreType="All Jobs" />
                                        </Item>
                                    </Grid>
                                    <Grid item s={12} lg={6} className="chart">
                                        <Item>
                                            <AllJobSummary
                                                title="Speed Score"
                                                desc={SpeedScoreDesc}
                                                data={speedGraphData}
                                                labels={speedGraphLabels}
                                                Icon={StrokeIcon} columns={columns("Speed Score")} showHeader={true}
                                                scoreType="All Jobs" />
                                        </Item>
                                    </Grid>
                                    <Grid item s={12} lg={6} className="chart">
                                        <Item>
                                            <AllJobSummary
                                                title="Active Score"
                                                desc={ActiveScoreDesc}
                                                data={activeGraphData}
                                                labels={activeGraphLabels}
                                                Icon={SettingIcon} columns={columns("Active Score")} showHeader={true}
                                                scoreType="All Jobs" />
                                        </Item>
                                    </Grid>
                                </Grid>
                                :
                                (scoreType === "Scores by Time")
                                    ?
                                    // scores by Time
                                    <>
                                        <Card className="childCard viewSelect">
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
                                        <Grid container spacing={2}>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <Chart
                                                        title="Injury Risk Score"
                                                        desc={SafetyScoreDesc}
                                                        data={safetyGraphData}
                                                        labels={safetyGraphLabels}
                                                        Icon={Vector2Icon}
                                                        LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                                        yAxisMax={7}
                                                        yAxisMin={0}
                                                        yAxisStep={1}
                                                    />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <Barchart
                                                        title="Risk Frequency"
                                                        desc={RiskScoreDesc}
                                                        data={riskGraphData}
                                                        labels={riskGraphLabels}
                                                        Icon={PolygonIcon}
                                                        LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                                    />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <Chart
                                                        title="Speed Score"
                                                        desc={SpeedScoreDesc}
                                                        data={speedGraphData}
                                                        labels={speedGraphLabels}
                                                        Icon={StrokeIcon}
                                                        LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                                                        yAxisMax={7}
                                                        yAxisMin={0}
                                                        yAxisStep={1}
                                                    />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <Chart
                                                        title="Active Score"
                                                        desc={ActiveScoreDesc}
                                                        data={activeGraphData}
                                                        labels={activeGraphLabels}
                                                        Icon={SettingIcon}
                                                        LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}
                                                        yAxisMax={100}
                                                        yAxisMin={0}
                                                        yAxisStep={10}
                                                    />
                                                </Item>
                                            </Grid>
                                        </Grid>
                                    </>
                                    :
                                    // scores by User
                                    <>
                                        <Card className="childCard viewSelect">
                                            {ViewBy.map((row, index) => (
                                                <Card.Grid
                                                    hoverable={false}
                                                    className="view-by-gridStyle"
                                                    onClick={() => handleScoreCard(row)}
                                                    style={{
                                                        background: scoreType === row ? "#C54B30" : "unset",
                                                        color: scoreType === row ? "#ffffff" : "#585858",
                                                        fontWeight: 700
                                                    }}
                                                    value={scoreType}
                                                >
                                                    <Typography style={{ fontWeight: 600 }}>{row}</Typography>
                                                </Card.Grid>
                                            ))}
                                        </Card>
                                        <Grid container spacing={2}>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <AllJobSummary
                                                        title="Injury Risk Score"
                                                        desc={SafetyScoreDesc}
                                                        data={safetyGraphData}
                                                        labels={safetyGraphLabels}
                                                        Icon={Vector2Icon}
                                                        scoreType="Scores by User" />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <AllJobSummary
                                                        title="Risk Frequency Score"
                                                        desc={RiskScoreDesc}
                                                        data={riskGraphData}
                                                        labels={riskGraphLabels}
                                                        Icon={PolygonIcon}
                                                        scoreType="Scores by User" />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <AllJobSummary
                                                        title="Speed Score"
                                                        desc={SpeedScoreDesc}
                                                        data={speedGraphData}
                                                        labels={speedGraphLabels}
                                                        Icon={StrokeIcon}
                                                        scoreType="Scores by User" />
                                                </Item>
                                            </Grid>
                                            <Grid item s={12} lg={6} className="chart">
                                                <Item>
                                                    <AllJobSummary
                                                        title="Active Score"
                                                        desc={ActiveScoreDesc}
                                                        data={activeGraphData}
                                                        labels={activeGraphLabels}
                                                        Icon={SettingIcon}
                                                        scoreType="Scores by User" />
                                                </Item>
                                            </Grid>
                                        </Grid>
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
