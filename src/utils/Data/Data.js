import {
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilClipboardAlt
} from "@iconscout/react-unicons";
import SettingIcon from "../../images/setting.png";
import PolygonIcon from "../../images/risk-icon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import { Paper, styled } from "@mui/material";
import { Auth } from "aws-amplify";
import axios from "axios";
import get from "lodash/get";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ACTIVE, ACTIVE_SCORE, INJURY_RISK_SCORE, RISK_FREQUENCY, SPEED_SCORE } from "../consts";
// import { consts } from "../../utils/consts";
// import { convertLegacyProps } from "antd/lib/button/button";


export const baseUrl = process.env.REACT_APP_API_HOST; //Change for localhost

export const getAuthData = async () => {
    const data = await Auth.currentAuthenticatedUser()
        .then(user => {
            return user.signInUserSession.idToken.jwtToken;
        });
    return data;
};

export const getUserRole = async () => {
    const data = await Auth.currentAuthenticatedUser()
        .then(user => {
            return Object.values(user?.attributes['custom:role'])?.[0] || null;
        });
    return data;
};

export const getUserEmail = async () => {
    const data = await Auth.currentAuthenticatedUser()
        .then(user => {
            // console.log("::::checkmail:::::", user?.attributes['email']);
            return user?.attributes['email'];
        });
    return data;
};

export const compareString = (str1, str2) => {
    return (String(str1).toLowerCase().includes(String(str2).toLowerCase()));
};

export const sortTableColumns = (str1, str2) => {
    return (String(str1).localeCompare(String(str2)));
};

export const getCurrIcon = icon => {
    switch (icon) {
        case ACTIVE_SCORE:
            return SettingIcon;
        case INJURY_RISK_SCORE:
            return Vector2Icon;
        case RISK_FREQUENCY:
            return PolygonIcon;
        case SPEED_SCORE:
            return StrokeIcon;
        default:
            return SettingIcon;
    }
};

export const Item = styled(Paper)(({ theme }) => ({
    borderColor: "black",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
}));

export const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
};

export const getColor = icon => {
    let type = icon.type;
    let value = icon.color;
    if (type !== ACTIVE) {
        switch (value) {
            case "LOW":
                return "#8ECF03";
            case "MEDIUM":
                return "#FFA700";
            case "HIGH":
                return "#FF0A0A";
            default:
                return "#8ECF03";
        }
    } else {
        switch (value) {
            case "LOW":
                return "#FF0A0A";
            case "MEDIUM":
                return "#FFA700";
            case "HIGH":
                return "#8ECF03";
            default:
                return "#FF0A0A";
        }
    }

};

export const DashboardData = ['Day', 'Week', 'Month', 'Year'];


export const ScoresTabData = ['Injury Risk Score', 'Risk Frequency', 'Speed Score', 'Active Score'];
export const ViewBy = ['Scores by User', 'Scores by Time'];

export const AdminRole = '1';
export const UserRole = '2';

export const ActiveScoreDesc = "A metric of productivity measured by the proportion of time (0 - 100%) when users are performing mild and intense motions of the arm.  Active scores greater than 80% are considered high (green) and an indicator of productivity. Active scroes less than 20% are considered low (red) and could be an indicator of wait times.";
export const SafetyScoreDesc = "Measures the risk of injury due to poor ergonomic motion. Values range from 0 to 7. The higher the number, the higher the risk of injury. The dominant motion type (e.g. pitch, yaw, roll) used in this index is speed of pitch.";
export const SpeedScoreDesc = "Measures the speed (and force) on the hand and wrist. Value ranges from 0 to 7. The higher the number, the higher the force. The speed score takes into account maximum values among pitch, yaw and roll for each sample. It is a measure of how fast the hand and wrist are moving.";
export const RiskScoreDesc = "A count of the number of times the Injury Risk Score exceeds a safe value of 3. The higher Risk Frequency count, the higher the risk of injury.";

export const getDescription = activeTab => {
    switch (activeTab) {
        case ACTIVE_SCORE:
            return ActiveScoreDesc;
        case INJURY_RISK_SCORE:
            return SafetyScoreDesc;
        case RISK_FREQUENCY:
            return RiskScoreDesc;
        case SPEED_SCORE:
            return SpeedScoreDesc;
        default:
            return "";
    }
};

export const ProgressBarChart = [

    {
        name: "Alessandro Cross",
        value: 95.8
    },
    {
        name: "Kaley Sexton",
        value: 95.2
    },
    {
        name: "Chanel Brock",
        value: 95.1
    },
    {
        name: "Alayna Chen",
        value: 85.0
    },
    {
        name: "Amya Valdez",
        value: 85.0
    },
    {
        name: "Adeline Willis",
        value: 85.0
    },
    {
        name: "Chaim Avery",
        value: 74.8
    },
    {
        name: "Laney Taylor",
        value: 74.4
    },
    {
        name: "Tessa Kaufman",
        value: 74.4
    },
    {
        name: "Nathalia James",
        value: 74.0
    }
];

export const LineChartData = {
    labels: [
        '10/04/2018', '10/05/2018',
        '10/06/2018', '10/07/2018',
        '10/08/2018', '10/09/2018',
        '10/10/2018', '10/11/2018',
        '10/12/2018', '10/13/2018',
        '10/14/2018', '10/15/2018'
    ],
    datasets: [
        {
            data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24, 20, 19],
            fill: true,          // Don't fill area under the line
            borderColor: "#535353",  // Line color

        }
    ]
};

export const SidebarData = [
    {
        parent: 'Menu',
        heading: 'Summary'
    },
    {
        parent: 'Menu',
        heading: 'Locations',
        child: [
            {
                heading: 'Holton, KS'
            },
            {
                heading: 'Momence, IL'
            },
            {
                heading: 'Sheboygan, WI'
            }
        ]
    },
    {
        parent: 'Menu',
        heading: 'Users'
    },
    {
        parent: 'Menu',
        heading: 'Scores'
    },
    {
        parent: 'Menu',
        heading: 'Jobs'
    },
    {
        parent: 'Menu',
        heading: 'Teams/Groups'
    },
    {
        parent: 'Menu',
        heading: 'Devices'
    },
    {
        parent: 'Menu',
        heading: 'Member Rating'
    },
    {
        parent: 'Menu',
        heading: 'Recommendations'
    },
    {
        parent: 'Menu',
        heading: 'Settings'
    },
];

export const cardsData = [
    {
        title: "Sales",
        color: {
            background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100]
            }
        ]
    },
    {
        title: "Revenue",
        color: {
            background: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40]
            }
        ]
    },
    {
        title: "Expenses",
        color: {
            background: "linear-gradient(rgb(248 212 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20]
            }
        ]
    },
];

export const data1 = [
    {
        id: 1,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 2,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 3,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 4,

        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 5,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 6,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 7,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 8,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 9,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 10,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
    {
        id: 11,
        name: "Amy Wang",
        role: "User",
        title: "Beef Cutter",
        email: "Amy.Wang@Johnsonville.com",
        phone: "415-321-4567",
        device: "SS_GW4",
        macId: "02-11-34-DF-33-44",
        hand: "Left",
    },
];

export const defaultJobName = "Unassigned";

export const usersJobsList = async () => {
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
    const defaultJob = get(response, "data", []).find((job) => job.name === defaultJobName);
    return defaultJob;
};


export const generatePdf = (id) => {
    // console.debug = () => {};
    const viewportMeta = document.getElementById("viewportMeta").getAttribute("content");
    document.getElementById("viewportMeta").setAttribute("content", "width=1280");
    const currentPosition = document.getElementById(id).scrollTop;
    document.getElementById(id).style.height = "auto";
    html2canvas(document.getElementById(id), { dpi: 300, scale: 3 })
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            const doc = new jsPDF('p', 'mm', 'a4', true);
            let position = 15; // give some top padding to first page

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position += heightLeft - imgHeight; // top padding for other pages
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save(`${new Date().toISOString()}.pdf`);
            document.getElementById(id).scrollTop = currentPosition;
            document.getElementById("viewportMeta").setAttribute("content", viewportMeta);
        });
};