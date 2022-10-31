import React, { useState, useEffect } from 'react';
import './calendar.css';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Select } from 'antd';
import moment from 'moment'
import { Box, Grid } from '@mui/material';
import { months } from '../../utils/consts';
import { totalPreviousYears } from '../../utils/consts';
import get from "lodash/get";

export const Month = (props) => {
    const { dataType, getOnSelectionData } = props
    const [selectedMonth, setSelectedMonth] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() })
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const { Option } = Select;
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth();
    const years = Array(totalPreviousYears).fill('').reduce((previousValue, currentValue, currentIndex) => {
        previousValue.push(currentYear - currentIndex);
        return previousValue;
    }, []);

    useEffect(() => {
        if (selectedYear === currentYear && get(selectedMonth, 'month') > currentMonth) {
            setSelectedMonth({ month: currentMonth, year: currentYear })
        }
    }, [selectedYear])


    return (

        <>
            <Grid item xs={3} className="arrowLeft" onClick={() => {
                if (selectedMonth?.month === 0) {
                    setSelectedMonth({ year: selectedMonth?.year - 1, month: 11 });
                    getOnSelectionData(dataType, `${selectedMonth?.year - 1}-12-${moment().format('DD')}`);
                } else {
                    setSelectedMonth({ ...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) - 1) % months.length + months.length) % months.length]?.value })
                    const sMonth = months[(((months.findIndex(q => q?.value === selectedMonth?.month)) - 1) % months.length + months.length) % months.length]?.value;
                    getOnSelectionData(dataType, `${selectedMonth?.year}-${String(sMonth + 1).length === 1 ? `0${sMonth + 1}` : `${sMonth + 1}`}-${moment().format('DD')}`);
                }
            }} >
                <ArrowBackIos />  {months[(((months.findIndex(q => q?.value === selectedMonth?.month) || 12) - 1) % months.length + months.length) % months.length]?.label}
            </Grid>
            <Grid item xs={6} md={4} className='monthPicker'>
                <CalendarMonthIcon className="calendarIcon" />
                <Select value={selectedMonth?.month} onChange={(val) => {
                    setSelectedMonth({ ...selectedMonth, month: val });
                    getOnSelectionData(dataType, `${selectedYear}-${String(val + 1).length === 1 ? `0${val + 1}` : `${val}`}-${moment().format('DD')}`);
                }} className="monthPicker_monthSelect">
                    {
                        months.map((month) => (
                            <Option key={month.value} value={month.value} {...((get(selectedMonth, 'year') === currentYear && month.value > currentMonth) && { disabled: true })}>{month.label}</Option>
                        ))
                    }
                </Select>
                <Select value={selectedMonth?.year} onChange={(val) => {
                    setSelectedMonth({ ...selectedMonth, year: val })
                    setSelectedYear(val)
                    getOnSelectionData(dataType, `${val}-${String(selectedMonth?.month + 1).length === 1 ? `0${selectedMonth?.month + 1}` : `${selectedMonth?.month}`}-${moment().format('DD')}`);
                }
                } className="monthPicker_yearSelect">
                    {
                        years.map((item) => (
                            <Option key={item} value={item}>{item}</Option>
                        ))
                    }
                </Select>
            </Grid>
            <Grid item xs={3} className="arrowRightWrapper">
                <Box className="arrowRight" onClick={() => {
                    if (selectedMonth?.month === 11) {
                        setSelectedMonth({ year: selectedMonth?.year + 1, month: 0 });
                        getOnSelectionData(dataType, `${selectedMonth?.year + 1}-01-${moment().format('DD')}`);
                    } else {
                        setSelectedMonth({ ...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length]?.value })
                        const sMonth = months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length]?.value;
                        getOnSelectionData(dataType, `${selectedMonth?.year}-${String(sMonth + 1).length === 1 ? `0${sMonth + 1}` : `${sMonth + 1}`}-${moment().format('DD')}`);
                    }
                }}>
                    {(get(selectedMonth, 'month') === currentMonth && get(selectedMonth, 'year') === currentYear) ? <></> : <>{months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length]?.label} <ArrowForwardIos /></>}
                </Box>
            </Grid>
        </>
    )
}
