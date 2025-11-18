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
import { useParams } from 'react-router-dom';
import EditDeckComponent from '@/components/MtgComponent/EditDeckComponent.tsx';

const FormLayout = () => {
    const [ showData, setShowData ]                     = useState<boolean>(false);
    const [ isLoading, setIsLoading ]                   = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament ] = useState<number | null>(null);
    const [ isFirstLoad, setIsFirstLoad ]               = useState<boolean>(false);
    const [ tournaments, setTournaments ]               = useState<any[] | null>(null);
    const [ selectedName, setSelectedName ]             = useState<string | null>(null);
    const [ selectedDeckName, setSelectedDeckName ]     = useState<string | null>(null);
    const [ selectedPosition, setSelectedPosition ]     = useState<number | null>(null);
    const [ selectedIdDeck, setSelectedIdDeck ]         = useState<number | null>(null);
    const id                                            = useParams();
    const [ cards, setCards ]                           = useState<any[]>([]);
    
    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        // setIsLoading(true);

        const body = {
            'name'         : selectedName,
            'position'     : selectedPosition,
            'idTournament' : selectedTournament,
            // 'idDeck'       : parseInt(data.data[0].id)
        }
                
        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}`, body)
            .then(data => {
                // updateIdPlayerDeck(idDeck, {'idPlayer' : data.data[0].id})
                // setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "Player created correctly, id: " + data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create player");
        }
    };
    
    // const updateIdPlayerDeck = async (idDeck: number, body: object) => {
    //     try {
    //         await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${idDeck}`, body)
    //     } catch (error) {
    //         toast('error', "Failed to add idPlayer to deck");
    //     }
    // }
        
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

    const apiGetPlayerCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.players}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name);
                setSelectedTournament(data[0].idTournament);
                setSelectedPosition(data[0].position);
                setSelectedIdDeck(data[0].idDeck);
                getCardsDeck(data[0].idDeck);
                apiGetDeckCall(data[0].idDeck);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const apiGetDeckCall = async (idDeck: number) => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${idDeck}`)
            .then(data => {
                setSelectedDeckName(data[0].name);
                setShowData(true);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const getCardsDeck = async (idDeck: number) => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${idDeck}/cards`)
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
    
    useEffect(() => {
        if (isFirstLoad == false) {
            apiTournamentsCall();
            apiGetPlayerCall();
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mb-8">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Cards" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Edit Player"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                {showData && 
                                    <>
                                        <InputForm
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
                                        <InputForm
                                            id="deckName"
                                            name="deckName"
                                            label="Deck name" 
                                            placeholder="Enter deck name"
                                            selectedOption={selectedDeckName}
                                            setSelectedOption={setSelectedDeckName}
                                        />
                                        {!isLoading ? (
                                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                                Save changes
                                            </button>
                                        ) : (
                                            <div className="flex w-full justify-center p-3 m-5">
                                                <Loader></Loader>
                                            </div>
                                        )}
                                    </>
                                }
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
