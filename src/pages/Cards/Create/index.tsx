import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect, useId } from 'react';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import DropdownText from '@/components/Dropdowns/Dropdown/Text';
import TopTitle from '@/components/Forms/Top';
import { cardTypes } from "@/types/card-types";
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

const FormLayout = () => {
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedName ]                                  = useState<string | null>(null);
    const [ selectedNum, setSelectedNum ]                   = useState<number | null>(null);
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ selectedBoard, setSelectedBoard ]               = useState<string>('');
    const [ selectedCardType, setSelectedCardType ]         = useState<string>('');
    const [ selectedImgUrl  ]                               = useState<string | null>(null);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ selectedTournament, setSelectedTournament ]     = useState<number | null>(null);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);
    const [ isBoardSelected, setIsBoardSelected ]           = useState<boolean>(false);
    const [ isCardTypeSelected, setIsCardTypeSelected]      = useState<boolean>(false);
    const [ decks, setDecks ]                               = useState<any[] | null>(null);
    const [ selectedDeck, setSelectedDeck ]                 = useState<number | null>(null);
    const [ isDeckSelected, setIsDeckSelected ]             = useState<boolean>(false);
    const { post, get, defaultHeaders }                     = fetchInstance;
    const { toast }                                         = commonFunctions;
    const { authToken }                                     = useAuthStore();
    let navigate                                            = useNavigate();

    // form ids
    const idName       = useId();
    const idNum        = useId();
    const idTournament = useId();
    const idImgUrl     = useId();
    const idDeck       = useId();
    const idBoard      = useId();
    const idCardType   = useId();
    
    const onChangeDeckSubmit = (event: any) => {
        setIsDeckSelected(true);
        setSelectedDeck(parseInt(event));
    };

    const onChangeTournamentSubmit = (event: any) => {
        setIsTournamentSelected(true);
        setSelectedTournament(parseInt(event));
        apiTournamentDecksCall(parseInt(event));
    };

    const onChangeBoardSubmit = (event: any) => {
        setIsBoardSelected(true);
        setSelectedBoard(event);
    };

    const onChangeCardTypeSubmit = (event: any) => {
        setIsCardTypeSelected(true);
        setSelectedCardType(event);
    };

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // get form values
        const formDataValues = new FormData(event.target)

        const body = {
            'name'     : formDataValues.get(idName),
            'num'      : Number(formDataValues.get(idNum)),
            'board'    : formDataValues.get(idBoard),
            'cardType' : formDataValues.get(idCardType),
            'idDeck'   : Number(formDataValues.get(idDeck)),
            'imgUrl'   : formDataValues.get(idImgUrl)
        }

        try {
            await post(`${import.meta.env.VITE_API_URL}${routing.cards}`, body, {headers: defaultHeaders(authToken)})
            .then(data => {
                setTimeout(() => setIsLoading(false), 2000);
                setTimeout(() => setIsCreated(false), 2000);
                setTimeout(() => toast('success', "Card added correctly: " + data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create Deck");
        }
    };

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

    const apiTournamentDecksCall = async (id: number) => {
        try {
            await get(`${import.meta.env.VITE_API_URL}${routing.tournaments}/${id}/decks`, {headers: defaultHeaders(authToken)})
            .then(data => {
                const dataDeck = (data || []).map((item: any) => ({
                    value : item.decks.id,
                    key   : item.name +" - " + item.decks.name
                }));

                setDecks(dataDeck);
            })
        } catch (error) {
            toast('error', 'Failed to load tournaments');
        }
    };

    const onClickBack = (event: any) => {
        event.preventDefault();
        navigate(routing.cards);
    }

    useEffect(() => {
        apiTournamentsCall();
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mb-8">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Cards" link={routing.cards}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 xl:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create card"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    name={idName}
                                    label="Card name" 
                                    placeholder="Enter card name"
                                    selectedOption={selectedName}
                                />
                                <InputNumberForm
                                    name={idNum}
                                    label="Num cards" 
                                    placeholder="Enter num card"
                                    selectedOption={selectedNum}
                                    setSelectedOption={setSelectedNum}
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
                                {decks &&
                                    <Dropdown
                                        disabled={false}
                                        options={decks}
                                        label="Select Deck"
                                        name={idDeck}
                                        selectedOption={selectedDeck}
                                        isOptionSelected={isDeckSelected}
                                        onChangeSubmit={onChangeDeckSubmit}>
                                    </Dropdown>
                                }
                                <InputForm
                                    disabled={false}
                                    name={idImgUrl}
                                    label="ImgUrl" 
                                    placeholder="Enter image url"
                                    selectedOption={selectedImgUrl}
                                />
                                <DropdownText 
                                    disabled={false}
                                    options={[
                                        { value: cardTypes.MD, key: cardTypes.MD },
                                        { value: cardTypes.SB, key: cardTypes.SB }
                                    ]}
                                    label="Select deck option"
                                    name={idBoard}
                                    selectedOption={selectedBoard}
                                    isOptionSelected={isBoardSelected}
                                    onChangeSubmit={onChangeBoardSubmit}>
                                </DropdownText>  
                                <DropdownText 
                                    disabled={false}
                                    options={[
                                        { value: cardTypes.CREATURE,     key: cardTypes.CREATURE },
                                        { value: cardTypes.INSTANT,      key: cardTypes.INSTANT },
                                        { value: cardTypes.SORCERY,      key: cardTypes.SORCERY },
                                        { value: cardTypes.ARTIFACT,     key: cardTypes.ARTIFACT },
                                        { value: cardTypes.ENCHANTMENT,  key: cardTypes.ENCHANTMENT },
                                        { value: cardTypes.LAND,         key: cardTypes.LAND },
                                        { value: cardTypes.PLANESWALKER, key: cardTypes.PLANESWALKER },
                                    ]}
                                    label="Select Card Type"
                                    name={idCardType}
                                    selectedOption={selectedCardType}
                                    isOptionSelected={isCardTypeSelected}
                                    onChangeSubmit={onChangeCardTypeSubmit}>
                                </DropdownText>
                                {(!isLoading && !isCreated) &&
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Card
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="cursor-pointer flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to cards
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
