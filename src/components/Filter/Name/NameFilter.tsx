import InputForm from '@/components/Forms/InputForm';
import { useId } from 'react';

interface TableProps {
    label               : string;
    placeholder         : string;
    selectedName        : string | null;
    setSelectedName     : Function;
    setIsFilterSelected : Function;
}

const NameFilterComponent = ({ label, placeholder, selectedName, setSelectedName, setIsFilterSelected }: TableProps) => {
    const idName = useId();
            
    const onSubmitName = (event: any) => {
        event.preventDefault();
        const formDataValues = new FormData(event.target)

        setSelectedName(formDataValues.get(idName));
        setIsFilterSelected(true);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full flex-row gap-4">
                <form onSubmit={(event) => onSubmitName(event)} className="flex w-full flex-row gap-4">
                    <div className="flex-[17]">
                        <InputForm
                            disabled       = {false}
                            name           = {idName}
                            label          = {label}
                            placeholder    = {placeholder}
                            selectedOption = {selectedName}
                        />
                    </div>

                    <button 
                        style     = {{ margin: '30px auto' }}
                        className = "flex-[3] cursor-pointer justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        type      = "submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default NameFilterComponent;
