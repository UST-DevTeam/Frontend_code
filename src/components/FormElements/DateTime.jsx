import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';

const DateTime = ({ itm, errors, handleSubmit, setValue, getValues, register }) => {
    const [selectedDate, setSelectedDate] = useState(
        getValues(itm.name) ? moment(getValues(itm.name), itm?.formatop).toDate() : null
    );

    const handleChange = (date) => {
        if (date) {
            const formattedDate = moment(date).format(itm?.formatop || "DD/MM/YYYY HH:mm");
            setValue(itm.name, formattedDate);
            setSelectedDate(date);
        } else {
            setValue(itm.name, null);
            setSelectedDate(null);
        }
    };

    return (
        <>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                showTimeSelect
                timeIntervals={15}
                dateFormat={itm?.formatop || "dd/MM/yyyy HH:mm"}
                timeFormat="HH:mm"
                maxDate={itm?.props?.maxSelectableDate ? moment(itm.props.maxSelectableDate, itm.formatop).toDate() : null}
                minDate={itm?.props?.minSelectableDate ? moment(itm.props.minSelectableDate, itm.formatop).toDate() : null}
                showIcon
                className='bg-white border-black border block h-9 w-full rounded-md py-0.5 p-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />

            {
                (itm.required && !getValues(itm.name)) &&
                <p className='text-xs text-rose-400 font-bold'>This Field is required</p>
            }
        </>
    );
};

export default DateTime;
