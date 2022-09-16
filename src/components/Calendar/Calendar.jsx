import React, { useState, useEffect } from 'react';
import './calendar.css';
import { formatDate } from '../../utils/Data/Data';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Calendar = ({ getOnSelectionData, dataType }) => {
    const [calendarDate, setCalendarDate] = useState(new Date())

    const handleChangeDate = (newDate) => {
        setCalendarDate(newDate['$d'])
    }

    useEffect(() => {
        setCalendarDate(new Date())
    }, [dataType])
    

    return (
        <div  className="datePickerRow">
            <div className="previousDatePicker">
                {
                    dataType === "Day" &&
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
                            <ArrowBackIos className="arrowLeft" /> 
                            <MobileDatePicker
                                inputFormat="DD/MM/YYYY"
                                value={calendarDate}
                                onChange={handleChangeDate}
                                onAccept={() => getOnSelectionData(null, calendarDate)}
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
                        </LocalizationProvider>
                }
            </div>
            
            <div className="datePickerLive">
                {
                    dataType === "Day" ?  
                    <>
                        {
                        (formatDate(new Date())) === (formatDate(calendarDate)) &&
                            <>
                                <CalendarMonthIcon className="calendarIcon" />
                                <span className="liveWord">LIVE</span>
                            </>
                        }
                    </>
                    :
                    <>
                        <CalendarMonthIcon className="calendarIcon" />
                        <span className="liveWord">LIVE</span>
                    </>
                }
            </div>

            <div className='nextDatePicker'>
            {
                false &&
                    <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
                        <ArrowBackIos className="arrowLeft" /> 
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={calendarDate}
                            onChange={handleChangeDate}
                            onAccept={() => getOnSelectionData(null, calendarDate)}
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
                    </LocalizationProvider>
                }
            </div>
        </div>
    )
}

export default Calendar