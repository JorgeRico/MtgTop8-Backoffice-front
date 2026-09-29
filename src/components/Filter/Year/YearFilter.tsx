import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import { useState } from 'react';

interface TableProps {
    selectedYear    : number | null;
    setSelectedYear : Function;
    setIsFilterSelected : Function;
}

const YearFilterComponent = ({ selectedYear, setSelectedYear, setIsFilterSelected }: TableProps) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2016 + 1 },
        (_, i) => {
            const year = currentYear - i;

            return {
                value: year,
                key: String(year),
            };
        }
    );

    const [ isSelectedYear, setIsSelectedYear ] = useState<boolean>(false);
    
        const onChangeYearSubmit = (event: any) => {
            setSelectedYear(parseInt(event));
            setIsSelectedYear(true);
            setIsFilterSelected(true);
        }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <Dropdown 
                disabled         = {false}
                options          = {years ?? []}
                label            = "filter by year"
                name             = "idYear"
                selectedOption   = {selectedYear}
                isOptionSelected = {isSelectedYear}
                onChangeSubmit   = {onChangeYearSubmit}
                padBottom        = {false}>
            </Dropdown>
        </div>
    );
};

export default YearFilterComponent;
