import { useState } from 'react';
import SelectGroupText from '@/components/Dropdowns/SelectGroupText/SelectGroupText';

interface DropdownProps {
    options        : Array<{ key: string; value: string }>;
    text           : string;
    name           : string;
    setSelected    : Function;
    selectedOption : string | null;
}

const DropdownText = ({ options, text, name, setSelected, selectedOption }: DropdownProps) => {
    const [ selectedOpt, setSelectedOpt ] = useState<string | null>(selectedOption);

    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <SelectGroupText
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

export default DropdownText;
