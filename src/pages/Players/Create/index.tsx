import { useState, useEffect } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import Dropdown from '@/components/Dropdowns/Dropdown';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import TopTitle from "@/components/Forms/Top";
import BreadcrumbBack from "@/components/BreadcrumsBackoffice";

const CreatePlayer = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament ]     = useState<number | null>(null);
    const [ isFirstLoad, setIsFirstLoad ]                   = useState<boolean>(false);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ selectedDeckName, setSelectedDeckName ]         = useState<string | null>(null);
    const [ selectedPosition, setSelectedPosition ]         = useState<number | null>(null);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);

    const onChangeTournamentSubmit = (event: any) => {
        setIsTournamentSelected(true);
        setSelectedTournament(parseInt(event));
    };

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const tournamentPosition = selectedPosition;

        if (selectedTournament == null) {
            toast('error', "idTournament is not selected");
            return ''
        }

        if (tournamentPosition == null) {
            toast('error', "Position is not selected");
            return ''
        }

        // create deck
        const deckOptions = {
            'name' : selectedDeckName
        }

        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}`, deckOptions)
            .then(data => {
                const body = {
                    'name'         : selectedName,
                    'position'     : tournamentPosition,
                    'idTournament' : selectedTournament,
                    'idDeck'       : parseInt(data.data[0].id)
                }

                createPlayer(parseInt(data.data[0].id), body);
            })
        } catch (error) {
            toast('error', "Failed to create Deck and Player");
        }
    };

    const createPlayer = async (idDeck: number, body: object) => {
        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}`, body)
            .then(data => {
                updateIdPlayerDeck(idDeck, {'idPlayer' : data.data[0].id})
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "Player created correctly, id: " + data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create player");
        }
    }

    const updateIdPlayerDeck = async (idDeck: number, body: object) => {
        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${idDeck}`, body)
        } catch (error) {
            toast('error', "Failed to add idPlayer to deck");
        }
    }
    
    const apiTournamentsCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}`)
            .then(data => {
                const dataTournament = (data || []).map((item: any) => ({
                    value : item.id,
                    key   : item.date + ' - ' + item.name
                }));

                setTournaments(dataTournament);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const onClickBack = (event: any) => {
        event.preventDefault();
        window.location.href = routing.players
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            apiTournamentsCall()
            
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Cards" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create Player"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    id="name"
                                    name="name"
                                    label="Player name" 
                                    placeholder="Enter player name"
                                    selectedOption={selectedName}
                                    setSelectedOption={setSelectedName}
                                />
                                <InputNumberForm
                                    id="position"
                                    name="position"
                                    label="Position" 
                                    placeholder="Enter player position"
                                    selectedOption={selectedPosition}
                                    setSelectedOption={setSelectedPosition}
                                />
                                {tournaments ? (
                                        <Dropdown 
                                            disabled={false}
                                            options={tournaments}
                                            text="Select Tournament"
                                            name="Tournament"
                                            selectedOption={selectedTournament}
                                            isOptionSelected={isTournamentSelected}
                                            onChangeSubmit={onChangeTournamentSubmit}>
                                        </Dropdown>
                                    ) : (
                                        <Loader></Loader>
                                    )
                                }
                                <InputForm
                                    disabled={false}
                                    id="deckName"
                                    name="deckName"
                                    label="Deck name" 
                                    placeholder="Enter deck name"
                                    selectedOption={selectedDeckName}
                                    setSelectedOption={setSelectedDeckName}
                                />
                                {(!isLoading && !isCreated) &&
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Player
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to Players
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

export default CreatePlayer;
