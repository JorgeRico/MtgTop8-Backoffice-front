import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import DropdownText from '@/components/Dropdowns/DropdownText';
import TopTitle from '@/components/Forms/Top';
import { cardTypes } from "@/types/cardTypes";
import Dropdown from '@/components/Dropdowns/Dropdown';

const FormLayout = () => {
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ isFirstLoad, setIsFirstLoad ]                   = useState<boolean>(false);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ selectedNum, setSelectedNum ]                   = useState<number | null>(null);
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ selectedBoard, setSelectedBoard ]               = useState<string>('');
    const [ selectedCardType, setSelectedCardType ]         = useState<string>('');
    const [ selectedImgUrl, setSelectedImgUrl ]             = useState<string | null>(null);
    const [ tournaments, setTournaments ]                   = useState<any[] | null>(null);
    const [ selectedTournament, setSelectedTournament ]     = useState<number | null>(null);
    const [ isTournamentSelected, setIsTournamentSelected ] = useState<boolean>(false);
    const [ isBoardSelected, setIsBoardSelected ]           = useState<boolean>(false);
    const [ isCardTypeSelected, setIsCardTypeSelected]      = useState<boolean>(false);
    const [ decks, setDecks ]                               = useState<any[] | null>(null);
    const [ selectedDeck, setSelectedDeck ]                 = useState<number | null>(null);
    const [ isDeckSelected, setIsDeckSelected ]             = useState<boolean>(false);
    
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

        const body = {
            'name'     : selectedName,
            'num'      : selectedNum,
            'board'    : selectedBoard,
            'cardType' : selectedCardType,
            'idDeck'   : selectedDeck,
            'imgUrl'   : selectedImgUrl
        }

        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}${routing.cards}`, body)
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

    const apiTournamentDecksCall = async (id: number) => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}/${id}/decks`)
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
        window.location.href = routing.cards
    }

    useEffect(() => {
        if (!isFirstLoad) {
            apiTournamentsCall();
            setIsFirstLoad(true);
        }
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mb-8">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Cards" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 xl:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create card"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    id="name"
                                    name="name"
                                    label="Card name" 
                                    placeholder="Enter card name"
                                    selectedOption={selectedName}
                                    setSelectedOption={setSelectedName}
                                />
                                <InputNumberForm
                                    id="num"
                                    name="num"
                                    label="Num cards" 
                                    placeholder="Enter num card"
                                    selectedOption={selectedNum}
                                    setSelectedOption={setSelectedNum}
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
                                {decks &&
                                    <Dropdown
                                        disabled={false}
                                        options={decks}
                                        text="Select Deck"
                                        name="Deck"
                                        selectedOption={selectedDeck}
                                        isOptionSelected={isDeckSelected}
                                        onChangeSubmit={onChangeDeckSubmit}>
                                    </Dropdown>
                                }
                                <InputForm
                                    disabled={false}
                                    id="imgUrl"
                                    name="imgUrl"
                                    label="ImgUrl" 
                                    placeholder="Enter image url"
                                    selectedOption={selectedImgUrl}
                                    setSelectedOption={setSelectedImgUrl}
                                />
                                <DropdownText 
                                    options={[
                                        { value: cardTypes.MD, key: cardTypes.MD },
                                        { value: cardTypes.SB, key: cardTypes.SB }
                                    ]}
                                    text="Select deck option"
                                    name="board"
                                    selectedOption={selectedBoard}
                                    isOptionSelected={isBoardSelected}
                                    onChangeSubmit={onChangeBoardSubmit}>
                                </DropdownText>  
                                <DropdownText 
                                    options={[
                                        { value: cardTypes.CREATURE,     key: cardTypes.CREATURE },
                                        { value: cardTypes.INSTANT,      key: cardTypes.INSTANT },
                                        { value: cardTypes.SORCERY,      key: cardTypes.SORCERY },
                                        { value: cardTypes.ARTIFACT,     key: cardTypes.ARTIFACT },
                                        { value: cardTypes.ENCHANTMENT,  key: cardTypes.ENCHANTMENT },
                                        { value: cardTypes.LAND,         key: cardTypes.LAND },
                                        { value: cardTypes.PLANESWALKER, key: cardTypes.PLANESWALKER },
                                    ]}
                                    text="Select Card Type"
                                    name="cardType"
                                    selectedOption={selectedCardType}
                                    isOptionSelected={isCardTypeSelected}
                                    onChangeSubmit={onChangeCardTypeSubmit}>
                                </DropdownText>
                                {(!isLoading && !isCreated) &&
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Card
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
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
