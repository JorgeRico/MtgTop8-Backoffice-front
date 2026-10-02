import InputNumberForm from '@/components/Forms/InputNumberForm';
import { useEffect, useId } from 'react';
import { addUrlParam } from '@/hooks/useApiCalls.tsx';
import { useState } from 'react';

interface TableProps {
    label             : string;
    placeholder       : string;
    apiCall           : Function;
    endpoint          : string;
    isDeckSelected    : boolean;
    setIsDeckSelected : Function;
}

const DeckFilterComponent = ({ endpoint, apiCall, label, placeholder, isDeckSelected, setIsDeckSelected }: TableProps) => {
    const [ selectedDeck, setSelectedDeck ] = useState<number>(0);
    const idDeck                            = useId();
            
    const onSubmitName = (event: any) => {
        event.preventDefault();

        const formDataValues = new FormData(event.target)
        const idDeckValue    = formDataValues.get(idDeck);
        const idDeckId       = typeof idDeckValue === 'string' ? Number(idDeckValue) : 0;
        const url            = addUrlParam(endpoint, 'idDeck', String(idDeckId));

        setSelectedDeck(idDeckId);
        setIsDeckSelected(true);
        
        apiCall(url);
    };

    useEffect(() => {
        if (isDeckSelected === false) {
            setSelectedDeck(0);
        }
    }, [isDeckSelected]);

    return (
        <div className="mb-5 rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full flex-row gap-4">
                <form onSubmit={(event) => onSubmitName(event)} className="flex w-full flex-row gap-4">
                    <div className="flex-[17]">
                        <InputNumberForm
                            name              = {idDeck}
                            label             = {label}
                            placeholder       = {placeholder}
                            selectedOption    = {selectedDeck}
                            setSelectedOption = {setSelectedDeck}
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

export default DeckFilterComponent;
