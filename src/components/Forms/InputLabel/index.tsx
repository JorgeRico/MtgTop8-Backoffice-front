interface InputProps {
    label : string;
}

const InputLabelForm = ({ label }: InputProps) => {

    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {label}
            </label>    
        </>
    );
};

export default InputLabelForm;
