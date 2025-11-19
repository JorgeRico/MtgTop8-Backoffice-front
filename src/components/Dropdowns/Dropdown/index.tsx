import SelectGroupOne from '../SelectGroup/SelectGroupOne';

interface DropdownProps {
    options          : Array<{ key: string; value: number }>;
    text             : string;
    name             : string;
    onChangeSubmit   : Function;
    selectedOption   : number | null;
    isOptionSelected : boolean;
    disabled         : boolean;
}

const Dropdown = ({ options, text, name, selectedOption, isOptionSelected, onChangeSubmit, disabled }: DropdownProps) => {
    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <SelectGroupOne 
                        disabled={disabled}
                        options={options}
                        text={text}
                        name={name}
                        selectedOpt={selectedOption}
                        isOptionSelected={isOptionSelected}
                        onChangeSubmit={onChangeSubmit}
                    />
                </article>
            </section>
        </>
    );
};

export default Dropdown;
