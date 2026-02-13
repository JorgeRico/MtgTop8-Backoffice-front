import { useState, useEffect, useId } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import TopTitle from "@/components/Forms/Top";
import BreadcrumbBack from "@/components/BreadcrumsBackoffice";
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

const CreatePlayer = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament ]     = useState<number | null>(null);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ selectedName ]                                  = useState<string | null>(null);
    const [ selectedDeckName ]                              = useState<string | null>(null);
    const [ selectedPosition, setSelectedPosition ]         = useState<number | null>(null);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);
    const { post, put, get, defaultHeaders }                = fetchInstance;
    const { toast }                                         = commonFunctions;
    const { authToken }                                     = useAuthStore();
    let navigate                                            = useNavigate();

    // form ids
    const idPosition   = useId();
    const idTournament = useId();
    const idDeck       = useId();
    const idName       = useId();

    const onChangeTournamentSubmit = (event: any) => {
        setIsTournamentSelected(true);
        setSelectedTournament(parseInt(event));
    };

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // get form values
        const formDataValues = new FormData(event.target)

        const deckOptions = {
            'name' : formDataValues.get(idName)
        }

        try {
            await post(`${import.meta.env.VITE_API_URL}${routing.decks}`, deckOptions, {headers: defaultHeaders(authToken)})
            .then(data => {
                const body = {
                    'name'         : formDataValues.get(idName),
                    'position'     : Number(formDataValues.get(idPosition)),
                    'idTournament' : Number(formDataValues.get(idTournament)),
                    'idDeck'       : Number(data.data[0].id)
                }

                createPlayer(parseInt(data.data[0].id), body);
            })
        } catch (error) {
            toast('error', "Failed to create Deck and Player");
        }
    };

    const createPlayer = async (idDeck: number, body: object) => {
        try {
            await post(`${import.meta.env.VITE_API_URL}${routing.players}`, body, {headers: defaultHeaders(authToken)})
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
            await put(`${import.meta.env.VITE_API_URL}${routing.decks}/${idDeck}`, body, {headers: defaultHeaders(authToken)})
        } catch (error) {
            toast('error', "Failed to add idPlayer to deck");
        }
    }
    
    const apiTournamentsCall = async () => {
        try {
            await get(`${import.meta.env.VITE_API_URL}${routing.tournaments}`, {headers: defaultHeaders(authToken)})
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
        navigate(routing.players);
    }

    useEffect(() => {
        apiTournamentsCall()
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Players" link={routing.players} />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create Player"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    name={idName}
                                    label="Player name" 
                                    placeholder="Enter player name"
                                    selectedOption={selectedName}
                                />
                                <InputNumberForm
                                    name={idPosition}
                                    label="Position" 
                                    placeholder="Enter player position"
                                    selectedOption={selectedPosition}
                                    setSelectedOption={setSelectedPosition}
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
                                <InputForm
                                    disabled={false}
                                    name={idDeck}
                                    label="Deck name" 
                                    placeholder="Enter deck name"
                                    selectedOption={selectedDeckName}
                                />
                                {(!isLoading && !isCreated) &&
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Player
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="cursor-pointer flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
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
