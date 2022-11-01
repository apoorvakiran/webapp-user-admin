import React, { useState, useEffect } from 'react';
import './calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from '../../utils/Data/Data';
import { Grid } from '@mui/material';


export const Day = (props) => {
    const { dataType, getOnSelectionData } = props;
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    const handleChangeDate = (newDate) => {
        setCalendarDate(newDate['$d']);
    };

    useEffect(() => {
        setCalendarDate(new Date());
    }, [dataType]);

    useEffect(() => {
        setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    }, []);

    return (
        <>
            <Grid item xs={3} className="previousDatePicker">
                <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
                    <MobileDatePicker
                        label={<ArrowBackIos className="arrowLeft" />}
                        inputFormat="DD/MM/YYYY"
                        value={calendarDate}
                        onChange={handleChangeDate}
                        onAccept={() => getOnSelectionData(null, formatDate(calendarDate))}
                        className="datePicker"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                variant="filled"
                            />
                        }
                        maxDate={new Date()}
                        disableFuture={false}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2} className="datePickerLive">
                <CalendarMonthIcon className="calendarIcon" />
                <span className="liveWord">LIVE</span>
                <span className="liveTime">{clock}</span>
            </Grid>
            <Grid item xs={3} className="nextDatePicker"></Grid>
        </>
    );
};