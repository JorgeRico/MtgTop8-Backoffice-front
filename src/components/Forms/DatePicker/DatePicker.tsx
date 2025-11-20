import flatpickr from 'flatpickr';
import { useEffect } from 'react';
import DatePicker from '../../Icons/DatePicker';
import Flatpickr from "react-flatpickr";
import InputLabelForm from '@/components/Forms/InputLabel';

interface DatePickerProps {
    name            : string;
    selectedDate    : string | null;
    setSelectedDate : Function;
}

const DatePickerOne = ({ name, selectedDate, setSelectedDate}: DatePickerProps) => {
    useEffect(() => {
        // Init flatpickr
        flatpickr('.form-datepicker', {
            mode              : 'single',
            static            : false,
            monthSelectorType : 'static',
            dateFormat        : 'M j, Y',
            prevArrow         : '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow         : '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });        
    }, []);

    const onHandleChange = (event: any) => {
        setSelectedDate(new Date(event).toISOString());
    }

    return (
        <section>
            <InputLabelForm label="Select Date"></InputLabelForm>
            <div className="relative">
                <Flatpickr
                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="dd/mm/yy"
                    data-class="flatpickr-right"
                    name={name}
                    options={{
                        altInput: true, 
                        altFormat: "M j, Y",
                        dateFormat: "M j, Y",
                    }}
                    defaultValue={selectedDate ??  ''}
                    onChange={(event)=>onHandleChange(event)}
                />
                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                   <DatePicker></DatePicker>
                </div>
            </div>
        </section>
    );
};

export default DatePickerOne;
