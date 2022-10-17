import React, { useState, useEffect } from 'react';
import './calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Select } from 'antd';
import moment from 'moment'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatDate } from '../../utils/Data/Data';
import { Grid } from '@mui/material';
import { customPicker } from '../../features/Routes/style';
import { get } from 'lodash'
import { months } from '../../utils/consts';


const { Option } = Select;

const year = new Date().getFullYear()

const years = Array(25).fill('').reduce((previousValue, currentValue, currentIndex) => {
    previousValue.push(year - currentIndex);
    return previousValue;
}, []);

const Calendar = ({ getOnSelectionData, dataType }) => {

    const [calendarDate, setCalendarDate] = useState(new Date())
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState({month: new Date().getMonth(), year: new Date().getFullYear()})
    // const [selectedweek, setSelectedweek] = useState(moment())
    const handleChangeDate = (newDate) => {
        setCalendarDate(newDate['$d'])
    }

    const [value, setValue] = useState(dayjs(new Date()));
    const [weekCalendarVisibility, setWeekCalendarVisibility] = useState(false);

    // useEffect(() => {
    //     getOnSelectionData(null, `${selectedMonth.month + 1}-${selectedMonth.year}`)
    //     console.log(`${selectedMonth.month + 1}-${selectedMonth.year}`)
    // }, [selectedMonth])
    

    useEffect(() => {
        setCalendarDate(new Date())
    }, [dataType])

    const [clock, setClock] = useState(new Date().toLocaleTimeString())
    
    useEffect(() => {
        setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    }, []);

    dayjs.extend(isBetweenPlugin);

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) =>
            prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
        })(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
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
    
    const getCalendar = () => {
        switch(dataType){
            case "Day":
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
                                    disableFuture={true}
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
                )
            case "Week":
                return (
                    <>
                        <Grid item xs={3} className="arrowLeft" onClick={() => {
                            const now = new Date(dayjs(new Date(value)).startOf("week"))
                            setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)))
                            getOnSelectionData(dataType, dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).toDate().toISOString() )
                        }}>
                            <ArrowBackIos  /> Previous Week
                        </Grid>
                        {/* <DatePicker className='weekPickerAntD' format='yyyy/MM/DD'  value={selectedweek} onChange={(date, ds) => {
                           setSelectedweek(date)
                           console.log(date, 'week')
                        }} picker="week" /> */}
                        <Grid item xs={6} md={3.5} className='weekPickerWrapper'>
                            <div className='weekPickerHandler' onClick={() => setWeekCalendarVisibility(prevState => !prevState)}><CalendarMonthIcon className='calendarIcon' /><span className='weekPickerText'> Week of {`${value["$D"]}/${value["$M"] + 1}/${value["$y"]}`}</span> <KeyboardArrowDownIcon className='weekPickerDropdownIcon' /></div>
                            { weekCalendarVisibility && 
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        label="Week picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            const now = new Date(dayjs(new Date(newValue)).startOf("week"))
                                            setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate())));
                                            setWeekCalendarVisibility(false)
                                        }}
                                        maxDate={new Date()}
                                        renderDay={renderWeekPickerDay}
                                        renderInput={(params) => <TextField {...params} />}
                                        inputFormat="'Week of' MMM d"
                                        className='weekPicker'
                                    />
                                </LocalizationProvider>
                            }                        
                        </Grid>
                        <Grid item xs={3} className="arrowRight" onClick={() => {
                            const now = new Date(dayjs(new Date(value)).startOf("week"))
                            setValue(dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)))
                            getOnSelectionData(dataType, dayjs(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)).toDate().toISOString() )
                        }}>
                            Next Week  <ArrowForwardIos />
                        </Grid>
                    </>
                )
            case "Month":
                return (
                    <>
                        <Grid item xs={3} className="arrowLeft" onClick={() => {
                               if(selectedMonth?.month === 0) {
                                setSelectedMonth({year: selectedMonth?.year - 1, month: 11});
                                getOnSelectionData(dataType, `${selectedMonth?.year - 1}-12-${moment().format('DD')}` );
                            }else {
                                setSelectedMonth({...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) - 1) % months.length + months.length) % months.length ]?.value})
                                const sMonth =  months[(((months.findIndex(q => q?.value === selectedMonth?.month)) - 1) % months.length + months.length) % months.length ]?.value;
                                getOnSelectionData(dataType, `${selectedMonth?.year}-${String(sMonth + 1).length === 1 ? `0${sMonth + 1}` : `${sMonth + 1}`}-${moment().format('DD')}` );
                            }
                        }} >
                             <ArrowBackIos  />  {months[(((months.findIndex(q => q?.value === selectedMonth?.month) || 12) - 1) % months.length + months.length) % months.length ]?.label} 
                        </Grid>
                        <Grid item xs={6} md={4} className='monthPicker'>
                            <CalendarMonthIcon className="calendarIcon" />
                            <Select value={selectedMonth?.month} onChange={(val) => {
                                setSelectedMonth({ ...selectedMonth, month: val});
                                getOnSelectionData(dataType, `${selectedYear}-${String(val + 1).length === 1 ? `0${val+1}` : `${val}`}-${moment().format('DD')}` );
                            }} className="monthPicker_monthSelect">
                                {
                                    months.map((month) => (
                                        <Option key={month.value}  value={month.value}>{month.label}</Option>
                                    ))
                                }
                            </Select>
                            <Select value={selectedMonth?.year} onChange={(val) => {
                                setSelectedMonth({ ...selectedMonth, year: val})
                                getOnSelectionData(dataType, `${val}-${String(selectedMonth?.month + 1).length === 1 ? `0${selectedMonth?.month + 1}` : `${selectedMonth?.month}`}-${moment().format('DD')}` );
                            }
                                }  className="monthPicker_yearSelect">
                                {
                                    years.map((item) => (
                                        <Option key={item} value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={3} className="arrowRight"  onClick={() => {
                            if(selectedMonth?.month === 11) {
                                setSelectedMonth({year: selectedMonth?.year + 1, month: 0});
                                getOnSelectionData(dataType, `${selectedMonth?.year + 1}-01-${moment().format('DD')}` );
                            }else {
                                setSelectedMonth({...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.value})
                                const sMonth =  months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.value;
                                getOnSelectionData(dataType, `${selectedMonth?.year}-${String(sMonth + 1).length === 1 ? `0${sMonth + 1}` : `${sMonth + 1}`}-${moment().format('DD')}` );
                            }
                        }}>
                        {months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.label}   <ArrowForwardIos />
                        </Grid>
                    </>
                )
            case "Year":
                return (
                    <>
                        <Grid item xs={3} className="arrowLeft" onClick={() => {
                            if(years.indexOf(selectedYear - 1) >= 0) {
                                setSelectedYear(selectedYear - 1);
                                getOnSelectionData(dataType, `${selectedYear - 1}-${moment().format('MM-DD')}` );
                            }
                        }} >
                             <ArrowBackIos  />  {years.indexOf(selectedYear - 1) >= 0 ? selectedYear - 1 : selectedYear } 
                        </Grid>
                        <Grid item xs={6} md={2} className="yearPicker">
                            <CalendarMonthIcon className="calendarIcon" />
                            <Select id='yearSelector' value={selectedYear} onChange={(val) => {
                                setSelectedYear(val);
                                getOnSelectionData(dataType, `${val}-${moment().format('MM-DD')}` );
                                }} className="yearPicker_yearSelect">
                                {
                                    years.map((year) => (
                                        <Option key={year}  value={year}>{year}</Option>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={3} className="arrowRight"  onClick={() => {
                            if(years.indexOf(selectedYear + 1) < years.length) {
                                setSelectedYear(selectedYear + 1);
                                getOnSelectionData(dataType, `${selectedYear + 1}-${moment().format('MM-DD')}` );
                            }
                        }} >
                            {years.indexOf(selectedYear - 1) < years.length ? selectedYear + 1 : selectedYear }  <ArrowForwardIos />
                        </Grid>
                    </>
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