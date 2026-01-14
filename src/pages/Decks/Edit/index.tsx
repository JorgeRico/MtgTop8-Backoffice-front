import DefaultLayout from '@/layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';
import EditDeckComponent from '@/components/MtgComponent/EditDeckComponent.tsx';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';

const FormLayout = () => {
    const [ showData, setShowData ]                         = useState<boolean>(false);
    const id                                                = useParams();
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ cards, setCards ]                               = useState<any[]>([]);
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
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}${routing.decks}/${id.id}`, body)
            .then(data => {
                setTimeout(() => setIsLoading(false), 2000);
                setTimeout(() => toast('success', "Deck updated correctly"), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create Deck");
        }
    };

    const getData = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.decks}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name)
                apiGetPlayerCall(data[0].idPlayer);
                setShowData(true);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    }

    const getCardsDeck = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.decks}/${id.id}/cards`)
            .then(data => {
                const card = (data || []).map((item: any) => ({
                    id    : item.id,
                    name  : item.name,
                    num   : item.num,
                    board : item.board
                }));

                setCards(card);
                setIsLoading(false);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    }

    const apiGetPlayerCall = async (idPlayer: number) => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.players}/${idPlayer}`)
            .then(data => {
                setSelectedTournament(data[0].idTournament);
                setIsTournamentSelected(true);
                apiPlayersCall(data[0].idTournament);
                setSelectedPlayer(data[0].id);
                setIsPlayerSelected(true);
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

    useEffect(() => {
        getData();
        getCardsDeck();
        apiTournamentsCall();
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mb-8">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Decks"  link={routing.cards}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 xl:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Edit decks"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                {showData && 
                                    <>
                                        <InputForm
                                            disabled={false}
                                            name={idName}
                                            label="Deck name" 
                                            placeholder="Enter Deck name"
                                            selectedOption={selectedName}
                                        />
                                        {(tournaments && selectedTournament) ? (
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
                                    </>
                                }
                                {!isLoading ? (
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Save changes
                                    </button>
                                ) : (
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <EditDeckComponent title="Maindeck cards" cards={cards} option="md"></EditDeckComponent>
                        <EditDeckComponent title="Sideboard cards" cards={cards} option="sb"></EditDeckComponent>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
