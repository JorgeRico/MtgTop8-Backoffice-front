interface InputProps {
    id                : string;
    name              : string;
    selectedOption    : string;
}

const InputFormSimple = ({ id, name, selectedOption }: InputProps) => {
    return (
        <>
            <input
                disabled
                type="text"
                id={id}
                name={name}
                defaultValue={selectedOption}
                className="ml-5 w-3/4 rounded border-[1.5px] border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
            />
        </>
    );
};

export default InputFormSimple;
