import InputForm from '@/components/Forms/InputForm';
import { useEffect, useId } from 'react';
import { addUrlParam } from '@/hooks/useApiCalls.tsx';
import { useState } from 'react';

interface TableProps {
    label               : string;
    placeholder         : string;
    apiCall             : Function;
    endpoint            : string;
    isPlayerSelected    : boolean;
    setIsPlayerSelected : Function;
}

const PlayerFilterComponent = ({ endpoint, apiCall, label, placeholder, isPlayerSelected, setIsPlayerSelected }: TableProps) => {
    const [ selectedPlayer, setSelectedPlayer ] = useState<string | null>('');
    const idPlayer                              = useId();
            
    const onSubmitName = (event: any) => {
        event.preventDefault();

        const formDataValues = new FormData(event.target)
        const player         = String(formDataValues.get(idPlayer));
        const url            = addUrlParam(endpoint, 'player', player);

        setSelectedPlayer(player);
        setIsPlayerSelected(true);
        
        apiCall(url);
    };

    useEffect(() => {
        if (isPlayerSelected === false) {
            setSelectedPlayer('');
        }
    }, [isPlayerSelected]);

    return (
        <div className="mb-5 rounded-sm border border-stroke bg-white px-5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full flex-row gap-4">
                <form onSubmit={(event) => onSubmitName(event)} className="flex w-full flex-row gap-4">
                    <div className="flex-[17]">
                        <InputForm
                            disabled       = {false}
                            name           = {idPlayer}
                            label          = {label}
                            placeholder    = {placeholder}
                            selectedOption = {selectedPlayer}
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

export default PlayerFilterComponent;
