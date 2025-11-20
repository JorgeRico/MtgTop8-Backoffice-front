import SelectGroupOne from '@/components/Dropdowns/SelectGroup/Number/SelectGroupOne';
import InputLabelForm from '@/components/Forms/InputLabel';

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
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full mb-4.5">
                    <InputLabelForm label={label}></InputLabelForm>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <SelectGroupOne 
                            disabled         = {disabled}
                            options          = {options}
                            label            = {label}
                            name             = {name}
                            selectedOpt      = {selectedOption}
                            isOptionSelected = {isOptionSelected}
                            onChangeSubmit   = {onChangeSubmit}
                        />
                    </div>
                </article>
            </section>
        </>
    );
};

export default Dropdown;
