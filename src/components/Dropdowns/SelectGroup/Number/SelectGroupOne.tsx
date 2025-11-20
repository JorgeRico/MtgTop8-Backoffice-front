import DropdownArrow from '@/components/Icons/DropdownArrow';

type OptionType = { key: string; value: number };

interface InputProps {
    options          : OptionType[]; 
    label            : string, 
    name             : string, 
    selectedOpt      : number | null, 
    isOptionSelected : boolean;
    onChangeSubmit   : Function;
    disabled         : boolean;
}

const SelectGroupOne = ( { options, label, name, selectedOpt, isOptionSelected, onChangeSubmit, disabled }: InputProps)  => {
    return (
        <>
            <select
                name      = {name}
                disabled  = {disabled}
                required
                value     = {selectedOpt ?? ''}
                    onChange={(e) => onChangeSubmit(e.target.value)
                }
                className = {`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    isOptionSelected ? 'text-black dark:text-white' : {label}
                }`}
            >
                <option value="" className="text-body dark:text-bodydark" hidden>
                    {label}
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
        </>
    );
};

export default SelectGroupOne;
