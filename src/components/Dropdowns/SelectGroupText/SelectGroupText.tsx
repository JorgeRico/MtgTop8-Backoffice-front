import { useState } from 'react';
import DropdownArrow from '../../Icons/DropdownArrow';

type OptionType = { key: string; value: string };

interface InputProps {
    options                : OptionType[]; 
    text                   : string, 
    name                   : string, 
    selectedOpt            : string | null, 
    selectedOptionFunction : Function;
    selectedFunction       : Function;
}

const SelectGroupOne = ( { options, text, name, selectedOpt, selectedOptionFunction, selectedFunction }: InputProps)  => {
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const onChangeSubmit = (event: any) => {
        setIsOptionSelected(true);
        selectedOptionFunction(parseInt(event))
        selectedFunction(parseInt(event));
    };

    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {name}
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    required
                    value={selectedOpt ?? ''}
                        onChange={(e) => onChangeSubmit(e.target.value)
                    }
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        isOptionSelected ? 'text-black dark:text-white' : {text}
                    }`}
                >
                    <option value="" className="text-body dark:text-bodydark" hidden>
                        {text}
                    </option>
                    {options.map((item) => (
                        <option key={item.value} value={item.value} className="text-body dark:text-bodydark">
                            {item.key}
                        </option>
                    ))}
                </select>

                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <DropdownArrow></DropdownArrow>
                </span>
            </div>
        </div>
    );
};

export default SelectGroupOne;
