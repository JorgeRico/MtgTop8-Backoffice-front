import { useState, useEffect } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import Dropdown from '@/components/Dropdowns/Dropdown';

const CreatePlayer = () => {
    const [ isLoading, setIsLoading ]                   = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                   = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament ] = useState<number | null>(null);
    const [ isFirstLoad, setIsFirstLoad ]               = useState<boolean>(false);
    const [ tournaments, setTournaments ]               = useState<any[] | null>(null);

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const tournamentPosition = document.querySelector<HTMLInputElement>('input[name="position"]')?.value;

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
            'name' : document.querySelector<HTMLInputElement>('input[name="deck"]')?.value
        }

        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}`, deckOptions)
            .then(data => {
                const body = {
                    'name'         : document.querySelector<HTMLInputElement>('input[name="name"]')?.value,
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
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Contact Form
                                </h3>
                            </div>
                            <form onSubmit={onSubmitForm}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Player name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter player name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Top position
                                        </label>
                                        <input
                                            type="number"
                                            name="position"
                                            min="1"
                                            placeholder="Select tournament position"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            {tournaments ? (
                                                    <Dropdown 
                                                        options={tournaments}
                                                        text="Select Tournament"
                                                        name="Tournament"
                                                        setSelected={setSelectedTournament}
                                                        selectedOption={selectedTournament}>
                                                    </Dropdown>
                                                ) : (
                                                    <Loader></Loader>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-8.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Deck name
                                        </label>
                                        <input
                                            type="text"
                                            name="deck"
                                            placeholder="Deck name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            required
                                        />  
                                    </div>
                                    {!isLoading &&
                                        <button className="flex w-full justify-center rounded bg-primary p-3 mt-5 font-medium text-gray hover:bg-opacity-90">
                                            Create Player
                                        </button>
                                    }
                                    {(isLoading && !isCreated) &&
                                        <div className="flex w-full justify-center p-3 m-5">
                                            <Loader></Loader>
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default CreatePlayer;
