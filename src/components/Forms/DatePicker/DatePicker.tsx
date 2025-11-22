import InputLabelForm from '@/components/Forms/InputLabel';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdowns/Dropdown/DatePicker';
import InputDatePickerForm from '@/components/Forms/InputNumberForm/DatePicker';

interface DatePickerProps {
    selectedDate : string;
    disabled     : boolean;
    label        : string;
    idDay        : string;
    idMonth      : string;
    idYear       : string;
    isEdit       : boolean;
}

const DatePickerOne = ({ idDay, idMonth, idYear, label, selectedDate, disabled, isEdit}: DatePickerProps) => {
    const [ day, setDay ]                         = useState<number | null>(null);
    const [ month, setMonth ]                     = useState<number>(0);
    const [ year, setYear ]                       = useState<number>(0);
    const [ isMonthSelected, setIsMonthSelected ] = useState<boolean>(false);
    const [ isValueLoaded, setIsValueLoaded ]     = useState<boolean>(false);

    const months = [
        {  value : 1, key: "January (1)" },
        {  value : 2, key: "Feabruary (2)" },
        {  value : 3, key: "March (3)" },
        {  value : 4, key: "April (4)" },
        {  value : 5, key: "May (5)" },
        {  value : 6, key: "June (6)" },
        {  value : 7, key: "July (7)" },
        {  value : 8, key: "August (8)" },
        {  value : 9, key: "September (9)" },
        {  value : 10, key: "Octobrer (10)" },
        {  value : 11, key: "November (11)" },
        {  value : 12, key: "December (12)" }
    ]

    function splitSelectedDate(dateValue: string) {
        let splitValues = dateValue.split('/');

        setDay(parseInt(splitValues[0]));
        setMonth(parseInt(splitValues[1]));
        setYear(parseInt(splitValues[2]));
        setIsValueLoaded(true)
    }

    const onChangeMonthSubmit = (event: any) => {
        setIsMonthSelected(true);
        setMonth(parseInt(event));
    }

     useEffect(() => {
        if (selectedDate != '') {
            splitSelectedDate(selectedDate);
        }
    }, [day]);

    return (
        <>
            <section className="mb-2.5 flex flex-row items-center gap-6">
                <InputLabelForm label={label}></InputLabelForm>
            </section>
            <section className="mb-4.5 flex flex-row items-center gap-6">
                {(isEdit && isValueLoaded) ? (
                        <>
                            <InputDatePickerForm
                                disabled={disabled}
                                name={idDay}
                                placeholder="DD"
                                selectedOption={day}
                                setSelectedOption={setDay}
                            />
                        </>
                    ) : (
                        <InputDatePickerForm
                            disabled={disabled}
                            name={idDay}
                            placeholder="DD"
                            selectedOption={0}
                            setSelectedOption={setDay}
                        />
                    )
                }
                {months &&
                    <Dropdown 
                        disabled={disabled}
                        options={months ?? []}
                        label="-"
                        name={idMonth}
                        selectedOption={month}
                        isOptionSelected={isMonthSelected}
                        onChangeSubmit={onChangeMonthSubmit}>
                    </Dropdown>
                }
                {(isEdit && isValueLoaded) ? ( 
                        <>
                            <InputDatePickerForm
                                disabled={disabled}
                                name={idYear}
                                placeholder="YY"
                                selectedOption={year}
                                setSelectedOption={setDay}
                            />
                        </>
                    ) : (
                        <InputDatePickerForm
                            disabled={disabled}
                            name={idYear}
                            placeholder="YY"
                            selectedOption={0}
                            setSelectedOption={setDay}
                        />
                    )
                }
                
            </section>    
        </>
    );
};

export default DatePickerOne;
