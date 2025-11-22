import SelectGroupOne from '@/components/Dropdowns/SelectGroup/Number/SelectGroupOne';

interface DropdownProps {
    options          : Array<{ key: string; value: number }>;
    label            : string;
    name             : string;
    onChangeSubmit   : Function;
    selectedOption   : number | null;
    isOptionSelected : boolean;
    disabled         : boolean;
}

const Dropdown = ({ options, label, name, selectedOption, isOptionSelected, onChangeSubmit, disabled }: DropdownProps) => {
    return (
        <>
            <SelectGroupOne 
                disabled         = {disabled}
                options          = {options}
                label            = {label}
                name             = {name}
                selectedOpt      = {selectedOption}
                isOptionSelected = {isOptionSelected}
                onChangeSubmit   = {onChangeSubmit}
            />
        </>
    );
};

export default Dropdown;
