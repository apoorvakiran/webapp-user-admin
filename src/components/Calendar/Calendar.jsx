import React, { useState } from 'react';
import './calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Calendar = () => {
    const[calendarDate,setCalendarDate] = useState(new Date())

    const handleChangeDate = (newValue) => {
        setCalendarDate(newValue)
    }

    return (
        <div  className="datePickerRow">
            <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
                <div className="datePickerStack">
                    <ArrowBackIos className="arrowLeft" /> 
                    <MobileDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={calendarDate}
                        onChange={handleChangeDate}
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
                    />  
                </div>
            </LocalizationProvider>
            <div className="datePickerLive">
                <CalendarMonthIcon className="calendarIcon" /> <span className="liveWord">LIVE</span>
            </div>
        </div>
    )
}

export default Calendar