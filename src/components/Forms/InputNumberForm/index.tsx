import { useState } from 'react';

interface InputProps {
    id                : string;
    name              : string;
    label             : string;
    placeholder       : string;
    selectedOption    : number | null;
    setSelectedOption : Function;
}

const InputForm = ({ id, name, label, placeholder, selectedOption, setSelectedOption }: InputProps) => {
    const [ option ] = useState<number | null>(selectedOption);

    const onChange = (event: any) => {
        event.preventDefault();
        setSelectedOption(parseInt(event.target.value))
    }

    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                        {label}
                    </label>
                    <input
                        type="number"
                        id={id}
                        name={name}
                        defaultValue={option ?? ''}
                        placeholder={placeholder}
                        onChange={(event) => onChange(event)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        required
                    />
                </article>         
            </section>    
        </>
    );
};

export default InputForm;
