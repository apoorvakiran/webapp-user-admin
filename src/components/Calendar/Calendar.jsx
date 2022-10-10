import React, { useState, useEffect } from 'react';
import './calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment'


const { Option } = Select;

const years = Array(100).fill('').reduce((a,b, i) => {
    a.push(2000 + i );
    return a;
},[]);

const months = [
    {
        label: "January",
        value: 0
    },
    {
        label: "February",
        value: 1
    },
    {
        label: "March",
        value: 2
    },
    {
        label: "April",
        value: 3
    },
    {
        label: "May",
        value: 4
    },
    {
        label: "June",
        value: 5
    },
    {
        label: "July",
        value: 6
    },
    {
        label: "August",
        value: 7
    },
    {
        label: "September",
        value: 8
    },
    {
        label: "October",
        value: 9
    },
    {
        label: "November",
        value: 10
    },
    {
        label: "December",
        value: 11
    }
]

const Calendar = ({ getOnSelectionData, dataType }) => {

    console.log(years)
    const [calendarDate, setCalendarDate] = useState(new Date())
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState({month: new Date().getMonth(), year: new Date().getFullYear()})
    const [selectedweek, setSelectedweek] = useState(moment())
    const handleChangeDate = (newDate) => {
        setCalendarDate(newDate['$d'])
    }

    useEffect(() => {
        setCalendarDate(new Date())
    }, [dataType])

    const [clock, setClock] = useState(new Date().toLocaleTimeString())
    
    useEffect(() => {
        setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    }, []);
    
    const getCalendar = () => {
        switch(dataType){
            case "Day":
                return (
                    <>
                        <div className="previousDatePicker">
                            <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
                                <MobileDatePicker
                                    label={<ArrowBackIos className="arrowLeft" />}
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
                                    disableFuture={true}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="datePickerLive">
                            <CalendarMonthIcon className="calendarIcon" />
                            <span className="liveWord">LIVE</span>
                            <span className="liveTime">{clock}</span>
                        </div>
                        <div className="nextDatePicker"></div>
                    </>
                )
            case "Week":
                return (
                    <>
                        <div className="arrowLeft"  onClick={() => {
                            setSelectedweek(moment(selectedweek).subtract(1, 'week'))
                        }}>
                            <ArrowBackIos  /> Previous Week
                        </div>
                        <DatePicker format='yyyy/MM/DD'  value={selectedweek} onChange={(date, ds) => {
                           setSelectedweek(date)
                        }} picker="week" />
                        <div  className="arrowLeft" onClick={() => {
                            setSelectedweek(moment(selectedweek).add(1, 'week'))
                        }}>
                            Next Week  <ArrowForwardIos />
                        </div>
                    </>
                )
            case "Month":
                return (
                    <>
                        <div  className="arrowLeft" onClick={() => {
                            if(selectedMonth === 0) {
                                setSelectedMonth({year: selectedYear - 1, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month) || 12) - 1) % months.length + months.length) % months.length ]?.value})
                            }else {
                                setSelectedMonth({...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month) || 12) - 1) % months.length + months.length) % months.length ]?.value})

                            }
                        }} >
                             <ArrowBackIos  />  {months[(((months.findIndex(q => q?.value === selectedMonth?.month) || 12) - 1) % months.length + months.length) % months.length ]?.label} 
                        </div>
                        <div className='monthPicker'>
                            <CalendarMonthIcon className="calendarIcon" />
                            <Select value={selectedMonth?.month} onChange={(val) => setSelectedMonth({ ...selectedMonth, month: val})} className="monthPicker_monthSelect">
                                {
                                    months.map((month) => (
                                        <Option key={month.value}  value={month.value}>{month.label}</Option>
                                    ))
                                }
                            </Select>
                            <Select value={selectedMonth?.year} onChange={(val) => setSelectedMonth({ ...selectedMonth, year: val})}  className="monthPicker_yearSelect">
                                {
                                    years.map((item) => (
                                        <Option key={item} value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div  className="arrowLeft"  onClick={() => {
                            if(selectedMonth === 0) {
                                setSelectedMonth({year: selectedYear + 1, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.value})
                            }else {
                                setSelectedMonth({...selectedMonth, month: months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.value})

                            }
                        }}>
                        {months[(((months.findIndex(q => q?.value === selectedMonth?.month)) + 1) % months.length + months.length) % months.length ]?.label}   <ArrowForwardIos />
                        </div>
                    </>
                )
            case "Year":
                return (
                    <>
                        <div  className="arrowLeft" onClick={() => {
                            if(years.indexOf(selectedYear - 1) >= 0) {
                                setSelectedYear(selectedYear - 1);
                            }
                        }} >
                             <ArrowBackIos  />  {years.indexOf(selectedYear - 1) >= 0 ? selectedYear - 1 : selectedYear } 
                        </div>
                        <div className="yearPicker">
                            <CalendarMonthIcon className="calendarIcon" />
                            <Select id='yearSelector' value={selectedYear} onChange={(val) => setSelectedYear(val)} className="yearPicker_yearSelect">
                                {
                                    years.map((year) => (
                                        <Option key={year}  value={year}>{year}</Option>
                                    ))
                                }
                            </Select>
                        </div>
                        <div  className="arrowLeft"  onClick={() => {
                            if(years.indexOf(selectedYear + 1) < years.length) {
                                setSelectedYear(selectedYear + 1);
                            }
                        }} >
                            {years.indexOf(selectedYear - 1) < years.length ? selectedYear + 1 : selectedYear }  <ArrowForwardIos />
                        </div>
                    </>
                )
            default:
                return;
        }
    }


    // return (
    //     <div className="datePickerRow">
    //         <div className="previousDatePicker">
    //             {
    //                 dataType === "Day" &&
    //                 <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
    //                     <MobileDatePicker
    //                         label={<ArrowBackIos className="arrowLeft" />}
    //                         inputFormat="DD/MM/YYYY"
    //                         value={calendarDate}
    //                         onChange={handleChangeDate}
    //                         onAccept={() => getOnSelectionData(null, calendarDate)}
    //                         className="datePicker"
    //                         InputProps={{
    //                             disableUnderline: true,
    //                         }}
    //                         renderInput={(params) =>
    //                             <TextField
    //                                 {...params}
    //                                 inputProps={{
    //                                     ...params.inputProps,
    //                                 }}
    //                                 variant="filled"
    //                             />
    //                         }
    //                         disableFuture={true}
    //                     />
    //                 </LocalizationProvider>
    //             }
    //             {
    //                ( dataType === 'Week' && (
    //                     <div className="arrowLeft">
    //                         <ArrowBackIos  /> Previous Week
    //                     </div>
    //                 ))
    //                 ||( dataType === 'Month' && (

    //                     <div  className="arrowLeft" >
    //                          <ArrowBackIos  />  Previous Month 
    //                     </div>
    //                 ))||( dataType === 'Year' && (
    //                     <div  className="arrowLeft" >
    //                          <ArrowBackIos  />  Previous Year 
    //                     </div>
    //                 ))
    //             }
    //         </div>

    //         <div className="datePickerLive">
    //             {
    //                 dataType === "Day" ?
    //                     <>
    //                         {
    //                             (formatDate(new Date())) === (formatDate(calendarDate)) &&
    //                             <>
    //                                 <CalendarMonthIcon className="calendarIcon" />
    //                                 <span className="liveWord">LIVE</span>
    //                                 <span className="liveTime">1:36:41</span>
    //                             </>
    //                         }
    //                     </>
    //                     :
    //                     <>
    //                         <CalendarMonthIcon className="calendarIcon" />
    //                         <span className="liveWord">LIVE</span>
    //                     </>
    //             }
    //         </div>

    //         <div className='nextDatePicker'>
    //             {
    //                 false &&
    //                 <LocalizationProvider dateAdapter={AdapterDayjs} className="datePickerProvider">
    //                     <ArrowBackIos className="arrowLeft" />
    //                     <MobileDatePicker
    //                         inputFormat="DD/MM/YYYY"
    //                         value={calendarDate}
    //                         onChange={handleChangeDate}
    //                         onAccept={() => getOnSelectionData(null, calendarDate)}
    //                         className="datePicker"
    //                         InputProps={{
    //                             disableUnderline: true,
    //                         }}
    //                         renderInput={(params) =>
    //                             <TextField
    //                                 {...params}
    //                                 inputProps={{
    //                                     ...params.inputProps,
    //                                 }}
    //                                 variant="filled"
    //                             />
    //                         }
    //                         disableFuture={true}
    //                     />
    //                 </LocalizationProvider>
    //             }
    //             {
    //                ( dataType === 'Week' && (
    //                     <div  className="arrowLeft" >
    //                         Next Week  <ArrowForwardIos />
    //                     </div>
    //                 )) ||( dataType === 'Month' && (
    //                     <div  className="arrowLeft" >
    //                         Next Month  <ArrowForwardIos />
    //                     </div>
    //                 )) ||( dataType === 'Year' && (
    //                     <div  className="arrowLeft" >
    //                         Next Year  <ArrowForwardIos />
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     </div>
    // )
    return (
        <div className="datePickerRow">
            {getCalendar()}
        </div>
    )
}

export default Calendar