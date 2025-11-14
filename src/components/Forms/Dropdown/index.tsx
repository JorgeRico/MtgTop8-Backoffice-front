import { useState } from 'react';
import SelectGroupOne from '../SelectGroup/SelectGroupOne';

interface DropdownProps {
    options        : Array<{ key: string; value: number }>;
    text           : string;
    name           : string;
    setSelected    : Function;
    selectedOption : number;
}

const Dropdown = ({ options, text, name, setSelected, selectedOption }: DropdownProps) => {
    const [ selectedOpt, setSelectedOpt ] = useState<number>(selectedOption);

    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <SelectGroupOne 
                        options={options}
                        text={text}
                        name={name}
                        selectedOpt={selectedOpt}
                        selectedOptionFunction={setSelectedOpt}
                        selectedFunction={setSelected}
                    />
                </article>
            </section>
        </>
    );
};

export default Dropdown;
