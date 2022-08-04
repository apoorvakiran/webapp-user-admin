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

export const baseUrl = 'https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/';

export const getCurrIcon = icon => {
    switch (icon) {
        case "Active Score":
            return SettingIcon;
        case "Injury Risk Score":
            return Vector2Icon;
        case "Risk Frequency":
            return PolygonIcon;
        case "Speed Score":
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
}

export const getColor = icon => {
    let type = icon.type;
    let value = icon.color;
    if (type !== "Active") {
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

export const DashboardData = ['Day', 'Week', 'Month', 'Year']

export const ScoresTabData = ['Injury Risk Score', 'Risk Frequency', 'Speed Score', 'Active Score']
export const ViewBy = ['View by User', 'View by Time']

export const ActiveScoreDesc = "A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.";
export const SafetyScoreDesc = "Measures the risk of injury due to poor ergonomic motion. Value ranges from 0 to 7. The higher the number, the higher the risk of injury. The dominant motion (pitch, yaw, roll) used in this index is speed of pitch. It is a measure of force on the hand and wrist.";
export const SpeedScoreDesc = "Measures the speed (and force) on the hand and wrist. Value ranges from 0 to 7. The higher the number, the higher the force. The speed score takes into account maximum values among pitch, yaw and roll for each sample. It is a measure of how fast the hand and wrist are moving.";
export const RiskScoreDesc = "A count of the number of times the Risk Index exceeds a safe value. Value ranges from 0 to 10. The higher the number, the higher the risk of injury. The maximum value is capped at 10.";

export const getDescription = activeTab => {
    switch (activeTab) {
        case "Active Score":
            return "A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.";
        case "Injury Risk Score":
            return "Measures the risk of injury due to poor ergonomic motion. Value ranges from 0 to 7. The higher the number, the higher the risk of injury. The dominant motion (pitch, yaw, roll) used in this index is speed of pitch. It is a measure of force on the hand and wrist.";
        case "Risk Frequency":
            return "A count of the number of times the Risk Index exceeds a safe value. Value ranges from 0 to 10. The higher the number, the higher the risk of injury. The maximum value is capped at 10.";
        case "Speed Score":
            return "Measures the speed (and force) on the hand and wrist. Value ranges from 0 to 7. The higher the number, the higher the force. The speed score takes into account maximum values among pitch, yaw and roll for each sample. It is a measure of how fast the hand and wrist are moving. ";
        default:
            return "A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.";
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
]

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
]

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
]

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