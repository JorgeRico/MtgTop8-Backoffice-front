import SelectGroupText from '@/components/Dropdowns/SelectGroupText/SelectGroupText';

interface DropdownProps {
    options          : Array<{ key: string; value: string }>;
    text             : string;
    name             : string;
    onChangeSubmit   : Function;
    selectedOption   : string | null;
    isOptionSelected : boolean;
}

const DropdownText = ({ options, text, name, selectedOption, isOptionSelected, onChangeSubmit }: DropdownProps) => {
    return (
        <>
            <section className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <article className="w-full">
                    <SelectGroupText
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

export default DropdownText;
