import React, { useState } from 'react';
import './calendar.css';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Select } from 'antd';
import moment from 'moment'
import { Grid } from '@mui/material';
import { totalPreviousYears } from '../../utils/consts';

export const Year = (props) => {
    const { dataType, getOnSelectionData } = props
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const year = new Date().getFullYear()
    const years = Array(totalPreviousYears).fill('').reduce((previousValue, currentValue, currentIndex) => {
        previousValue.push(year - currentIndex);
        return previousValue;
    }, []);

    const { Option } = Select;

    return (
        <>
            <Grid item xs={3} className="arrowLeft" onClick={() => {
                if (years.indexOf(selectedYear - 1) >= 0) {
                    setSelectedYear(selectedYear - 1);
                    getOnSelectionData(dataType, `${selectedYear - 1}-${moment().format('MM-DD')}`);
                }
            }} >
                <ArrowBackIos />  {years.indexOf(selectedYear - 1) >= 0 ? selectedYear - 1 : selectedYear}
            </Grid>
            <Grid item xs={6} md={2} className="yearPicker">
                <CalendarMonthIcon className="calendarIcon" />
                <Select id='yearSelector' value={selectedYear} onChange={(val) => {
                    setSelectedYear(val);
                    getOnSelectionData(dataType, `${val}-${moment().format('MM-DD')}`);
                }} className="yearPicker_yearSelect">
                    {
                        years.map((year) => (
                            <Option key={year} value={year}>{year}</Option>
                        ))
                    }
                </Select>
            </Grid>
            <Grid item xs={3} className="arrowRight" style={{ visibility: ((year <= selectedYear)) ? 'hidden' : 'visible' }} onClick={() => {
                if (years.indexOf(selectedYear + 1) < years.length) {
                    setSelectedYear(selectedYear + 1);
                    getOnSelectionData(dataType, `${selectedYear + 1}-${moment().format('MM-DD')}`);
                }
            }} >
                {years.indexOf(selectedYear - 1) < years.length ? selectedYear + 1 : selectedYear}  <ArrowForwardIos />
            </Grid>
        </>
    )
}
