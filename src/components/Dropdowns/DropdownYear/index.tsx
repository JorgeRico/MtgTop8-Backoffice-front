import { useState, useEffect } from 'react';
import SelectGroupOne from '../SelectGroup/SelectGroupOne';

interface DropdownProps {
    selectedOption   : number | null;
    isOptionSelected : boolean;
    onChangeSubmit   : Function;
}

const DropdownYear = ({ selectedOption, isOptionSelected, onChangeSubmit }: DropdownProps) => {
    const [ years, setYears ] = useState<Array<{ key: string; value: number }>>([]);

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
                        selectedOpt={selectedOption}
                        isOptionSelected={isOptionSelected}
                        onChangeSubmit={onChangeSubmit}
                    />
                </article>
            </section>
        </>
    );
};

export default DropdownYear;
