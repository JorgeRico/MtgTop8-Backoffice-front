import { useState, useEffect, useId } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import TopTitle from "@/components/Forms/Top";
import BreadcrumbBack from "@/components/BreadcrumsBackoffice";
import { useParams } from 'react-router-dom';
import EditDeckComponent from '@/components/MtgComponent/EditDeckComponent.tsx';

const FormLayout = () => {
    const [ showData, setShowData ]                         = useState<boolean>(false);
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ selectedTournament, setSelectedTournament ]     = useState<number | null>(null);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ selectedDeckName, setSelectedDeckName ]         = useState<string | null>(null);
    const [ selectedPosition, setSelectedPosition ]         = useState<number | null>(null);
    const [ selectedIdDeck, setSelectedIdDeck ]             = useState<number | null>(null);
    const id                                                = useParams();
    const [ cards, setCards ]                               = useState<any[]>([]);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);
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

        const formDataValues = new FormData(event.target)

        const body = {
            'name'         : formDataValues.get(idName),
            'position'     : Number(formDataValues.get(idPosition)),
            'idTournament' : Number(selectedTournament),
            'idDeck'       : Number(selectedIdDeck)
        }
        console.log(body)
                
        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}${routing.players}/${id.id}`, body)
            .then(data => {
                setTimeout(() => setIsLoading(false), 2000);
                setTimeout(() => toast('success', "Player updated correctly"), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create player");
        }
    };
         
    const apiTournamentsCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}`)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.players}/${id.id}`)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.decks}/${idDeck}`)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.decks}/${idDeck}/cards`)
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
        apiTournamentsCall();
        apiGetPlayerCall();
    }, []);

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
                                                    disabled={true}
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
                                            disabled={true}
                                            name={idDeck}
                                            label="Deck name" 
                                            placeholder="Enter deck name"
                                            selectedOption={selectedDeckName}
                                        />
                                        {!isLoading ? (
                                            <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
