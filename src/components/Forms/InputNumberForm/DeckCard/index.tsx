import { useState } from 'react';

interface InputProps {
    id                : string;
    name              : string;
    selectedOption    : number;
}

const InputNumberFormSimple = ({ id, name, selectedOption }: InputProps) => {
    return (
        <>
            <input
                disabled
                type="number"
                id={id}
                name={name}
                defaultValue={selectedOption}
                className="w-15 text-end rounded border-[1.5px] border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
            />
        </>
    );
};

export default InputNumberFormSimple;
