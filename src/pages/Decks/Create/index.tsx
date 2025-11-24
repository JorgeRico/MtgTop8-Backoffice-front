import { useState, useEffect, useId } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from "@/components/Forms/Top";
import Dropdown from '@/components/Dropdowns/Dropdown/Number';

const FormLayout = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedName ]                                  = useState<string | null>(null);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament]      = useState<number | null>(null);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ isPlayerSelected, setIsPlayerSelected ]         = useState<boolean>(false);
    const [ selectedPlayer, setSelectedPlayer]              = useState<number | null>(null);
    const [ players, setPlayers ]                           = useState<any[] | null>(null);
    // form ids
    const idPlayer     = useId();
    const idTournament = useId();
    const idName       = useId();

    const onChangeTournamentSubmit = (event: any) => {
        setIsTournamentSelected(true);
        setSelectedTournament(parseInt(event));
        apiPlayersCall(parseInt(event));
    };
    
    const onChangePlayerSubmit = (event: any) => {
        setIsPlayerSelected(true);
        setSelectedPlayer(parseInt(event));
    };
    
    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // get form values
        const formDataValues = new FormData(event.target)

        const body = {
            'name'     : formDataValues.get(idName),
            'isPlayer' : Number(formDataValues.get(idPlayer))
        }

        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}${routing.decks}`, body)
            .then(data => {
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "Player created correctly, id: "+data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create Deck and Player");
        }
    };

    const apiTournamentsCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}`)
            .then(data => {
                const dataTournament = (data || []).map((item: any) => ({
                    value : item.id,
                    key   : item.date + ' - ' + item.name,
                }));

                setTournaments(dataTournament);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const apiPlayersCall = async (id: number) => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}/${id}/players`)
            .then(data => {
                const dataPlayer = (data || []).map((item: any) => ({
                    value : item.id,
                    key   : item.name,
                }));

                setPlayers(dataPlayer);
            })
        } catch (error) {
            toast('error', 'Failed to load players');
        }
    };

    const onClickBack = (event: any) => {
        event.preventDefault();
        window.location.href = routing.decks
    }

    useEffect(() => {
        apiTournamentsCall()
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Decks" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create decks"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    name={idName}
                                    label="Deck name" 
                                    placeholder="Enter Deck name"
                                    selectedOption={selectedName}
                                />
                                {tournaments ? (
                                        <Dropdown 
                                            disabled={false}
                                            options={tournaments}
                                            label="Select Tournament"
                                            name={idTournament}
                                            selectedOption={selectedTournament}
                                            isOptionSelected={isTournamentSelected}
                                            onChangeSubmit={onChangeTournamentSubmit}>
                                        </Dropdown>
                                    ) : (
                                        <Loader></Loader>
                                    )
                                }
                                {players &&
                                    <Dropdown 
                                        disabled={false}
                                        options={players}
                                        label="Select Player"
                                        name={idPlayer}
                                        selectedOption={selectedPlayer}
                                        isOptionSelected={isPlayerSelected}
                                        onChangeSubmit={onChangePlayerSubmit}>
                                    </Dropdown>
                                }
                                {(!isLoading && !isCreated) &&
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Deck
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="cursor-pointer flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to tournaments
                                    </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
