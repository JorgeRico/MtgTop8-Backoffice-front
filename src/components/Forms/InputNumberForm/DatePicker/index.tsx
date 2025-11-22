import { useState } from 'react';

interface InputProps {
    name              : string;
    placeholder       : string;
    selectedOption    : number | null;
    setSelectedOption : Function;
    disabled          : boolean;
}

const InputDatePickerForm = ({ name, placeholder, selectedOption, setSelectedOption, disabled }: InputProps) => {
    const [ option ] = useState<number | null>(selectedOption);

    const onChange = (event: any) => {
        event.preventDefault();
        setSelectedOption(parseInt(event.target.value))
    }

    return (
        <>
            <div className="flex w-auto rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <input
                    disabled={disabled}
                    type="number"
                    name={name}
                    defaultValue={option ?? ''}
                    pattern="[0-9]{1,2}" 
                    maxLength={2} 
                    placeholder={placeholder}
                    onChange={(event) => onChange(event)}
                    className="text-center mx-2 my-0"
                    required
                />
            </div>
        </>
    );
};

export default InputDatePickerForm;
