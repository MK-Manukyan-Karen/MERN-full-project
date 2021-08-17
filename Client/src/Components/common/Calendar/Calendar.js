import React, { useState } from 'react';
import './Calendar.css';
import Calendar from 'react-calendar';


const MyCalendar = React.memo( (props) => {

    const [date, setValue] = useState(new Date());

    const onChangeDate = (date) => {
        setValue(date)
        let dd = date.getDate();
        let mm = date.getMonth() + 1; // January is 0!
        let yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        const formattedDate = (yyyy + '-' + mm + '-' + dd)
      
         props.setSearchByPriceTotalCount(null)
         props.setOrdersTotalCount(null)
         props.changeShowModalActive()
         props.searchOrdersByDate(props.currentPage, props.pageSize, formattedDate)
    }

    return (
        <Calendar onChange={onChangeDate} value={date} maxDate = {new Date()} />
    )
})

export default MyCalendar;






