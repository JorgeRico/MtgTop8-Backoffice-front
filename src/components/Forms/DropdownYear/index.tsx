import { useState, useEffect } from 'react';
import SelectGroupOne from '../SelectGroup/SelectGroupOne';

interface DropdownProps {
    selectedOption : number;
    setSelected    : Function;
}

const DropdownYear = ({ selectedOption, setSelected }: DropdownProps) => {
    const [ selectedYear, setSelectedYear ] = useState<number>(selectedOption);
    const [ years, setYears ]               = useState<Array<{ key: string; value: number }>>([]);

    const getDropdownYears = () => {
        const tempYears: Array<{ key: string; value: number }> = [];
        const now = new Date();

        for (let year = 2016; year <= now.getFullYear(); year++) {
            const item = {
                key   : String(year),
                value : year
            };
            tempYears.push(item);
        }

        setYears(tempYears)
    }

    useEffect(() => {
        getDropdownYears()
    }, []);

    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <SelectGroupOne 
                        options={years}
                        text="Select Year"
                        name="Year"
                        selectedOpt={selectedYear}
                        selectedOptionFunction={setSelectedYear}
                        selectedFunction={setSelected}
                    />
                </article>
            </section>
        </>
    );
};

export default DropdownYear;
