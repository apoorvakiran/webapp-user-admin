import React from 'react';
import './calendar.css';
import { Day } from "./Day";
import { Week } from './Week';
import { Year } from './Year';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { Grid } from '@mui/material';
import { Month } from './Month';


const Calendar = ({ getOnSelectionData, dataType }) => {

    dayjs.extend(isBetweenPlugin);

    const getCalendar = () => {
        switch (dataType) {
            case "Day":
                return (
                    <Day dataType={dataType} getOnSelectionData={getOnSelectionData} />
                )

            case "Week":
                return (
                    <Week dataType={dataType} getOnSelectionData={getOnSelectionData} />
                )

            case "Month":
                return (
                    <Month dataType={dataType} getOnSelectionData={getOnSelectionData} />
                )

            case "Year":
                return (
                    <Year dataType={dataType} getOnSelectionData={getOnSelectionData} />

                )
            default:
                return;
        }
    }

    return (
        <Grid container className="datePickerRow">
            {getCalendar()}
        </Grid>
    )
}

export default Calendar