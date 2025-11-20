import { useState } from 'react';
import InputLabelForm from '@/components/Forms/InputLabel';

interface InputProps {
    name           : string;
    label          : string;
    placeholder    : string;
    selectedOption : string | null;
    disabled       : boolean;
}

const InputForm = ({ name, label, placeholder, selectedOption, disabled }: InputProps) => {
    const [ option ] = useState<string | null>(selectedOption);

    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <InputLabelForm label={label}></InputLabelForm>
                    <input
                        disabled={disabled}
                        type="text"
                        name={name}
                        defaultValue={option ?? ''}
                        placeholder={placeholder}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        required
                    />
                </article>         
            </section>    
        </>
    );
};

export default InputForm;
