import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import { useEffect, useState } from 'react';
import { addUrlParam } from '@/hooks/useApiCalls.tsx';

interface TableProps {
    apiCall           : Function;
    endpoint          : string;
    isYearSelected    : boolean;
    setIsYearSelected : Function;
}

const YearFilterComponent = ({ apiCall, endpoint, isYearSelected, setIsYearSelected }: TableProps) => {
    const [ selectedYear, setSelectedYear ] = useState<number | null>(null);
    const currentYear                       = new Date().getFullYear();

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
    
    const onChangeYearSubmit = (event: any) => {
        const year = parseInt(event)
        const url = addUrlParam(endpoint, 'year', year.toString());

        setSelectedYear(year);
        setIsYearSelected(true);
        
        apiCall(url);
    }

    useEffect(() => {
        if (isYearSelected === false) {
            setSelectedYear(null);
        }
    }, [isYearSelected]);

    return (
        <div className="mb-5 rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <Dropdown 
                disabled         = {false}
                options          = {years ?? []}
                label            = "filter by year"
                name             = "idYear"
                selectedOption   = {selectedYear}
                isOptionSelected = {isYearSelected}
                onChangeSubmit   = {onChangeYearSubmit}
                padBottom        = {false}>
            </Dropdown>
        </div>
    );
};

export default YearFilterComponent;
