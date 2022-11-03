import React, { useState, useEffect } from 'react';
import './calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener, Grid } from '@mui/material';
import { customPicker } from '../../features/Routes/style';
import { get } from 'lodash';
import { Box } from '@mui/system';


export const Week = (props) => {
    const { dataType, getOnSelectionData } = props;
    const [value, setValue] = useState(dayjs(new Date()));
    const [weekCalendarVisibility, setWeekCalendarVisibility] = useState(false);
    const [isNextWeekVisible, setIsNextWeekVisible] = useState(true);
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) =>
            prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
    })(({ dayIsBetween, isFirstDay, isLastDay }) => ({
        ...(dayIsBetween && get(customPicker, 'dayBetween')),
        ...(isFirstDay && get(customPicker, 'firstDay')),
        ...(isLastDay && get(customPicker, 'lastDay')),
    }));

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />;
        }

        const start = value.startOf('week');
        const end = value.endOf('week');
        const dayIsBetween = date.isBetween(start, end, null, '[]');
        const isFirstDay = date.isSame(start, 'day');
        const isLastDay = date.isSame(end, 'day');

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    useEffect(() => {
        const now = new Date(dayjs(new Date(value)).startOf("week"));
        const end = new Date(dayjs(new Date(value)).endOf("week"));
        if ((now.getFullYear() === currentYear && (now.getMonth() === currentMonth || end.getMonth() >= currentMonth) &&  today <= end.getDate() )) {
            setIsNextWeekVisible(true);
        } else {
            setIsNextWeekVisible(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <>
            <Grid item xs={3} className="arrowLeft" onClick={() => {
                const now = new Date(dayjs(new Date(value)).startOf("week"));
                setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)));
                getOnSelectionData(dataType, dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).toDate().toISOString());
            }}>
                <ArrowBackIos /> Previous Week
            </Grid>
            <Grid item xs={6} md={3.5} className='weekPickerWrapper'>
                <div className='weekPickerHandler' onClick={() => setWeekCalendarVisibility(prevState => !prevState)}><CalendarMonthIcon className='calendarIcon' /><span className='weekPickerText'> Week of {`${value["$D"]}/${value["$M"] + 1}/${value["$y"]}`}</span> <KeyboardArrowDownIcon className='weekPickerDropdownIcon' /></div>
                {weekCalendarVisibility &&
                    <ClickAwayListener onClickAway={(e) => {
                        if (weekCalendarVisibility) {
                            setWeekCalendarVisibility(false);
                        }
                    }}
                    >
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    label="Week picker"
                                    showToolbar={false}
                                    value={value}
                                    onChange={(newValue) => {
                                        const now = new Date(dayjs(new Date(newValue)).startOf("week"));
                                        setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate())));
                                        setWeekCalendarVisibility(false);
                                        getOnSelectionData(dataType, dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate())).toDate().toISOString());
                                    }}
                                    maxDate={new Date()}
                                    renderDay={renderWeekPickerDay}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="'Week of' MMM d"
                                    className='weekPicker'
                                />
                            </LocalizationProvider>
                        </div>
                    </ClickAwayListener>
                }
            </Grid>
            <Grid item xs={3} className="arrowRightWrapper">
                {
                    !isNextWeekVisible && (
                        <Box className="arrowRight" onClick={() => {
                            const now = new Date(dayjs(new Date(value)).startOf("week"));
                            setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)));
                            getOnSelectionData(dataType, dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)).toDate().toISOString());
                        }}>
                            Next Week  <ArrowForwardIos />
                        </Box>
                    )
                }
            </Grid>
        </>
    );
};
