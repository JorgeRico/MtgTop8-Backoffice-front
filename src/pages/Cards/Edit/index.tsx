import DefaultLayout from '@/layout/DefaultLayout';
import { useParams } from 'react-router-dom';
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

const FormLayout = () => {
    const [ showData, setShowData ]                 = useState<boolean>(false);
    const id                                        = useParams();
    const [ isFirstLoad, setIsFirstLoad ]           = useState<boolean>(false);
    const [ selectedName, setSelectedName ]         = useState<string | null>(null);
    const [ selectedNum, setSelectedNum ]           = useState<number | null>(null);
    const [ isLoading, setIsLoading ]               = useState<boolean>(false);
    const [ selectedBoard, setSelectedBoard ]       = useState<string>('');
    const [ selectedCardType, setSelectedCardType ] = useState<string>('');
    const [ selectedIdDeck, setSelectedIdDeck ]     = useState<number | null>(null);
    const [ selectedImgUrl, setSelectedImgUrl ]     = useState<string | null>(null);

     const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name'     : selectedName,
            'num'      : selectedNum,
            'board'    : selectedBoard,
            'cardType' : selectedCardType,
            'idDeck'   : selectedIdDeck,
            'imgUrl'   : selectedImgUrl
        }

        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}/${id.id}`, body)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.cards}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name);
                setSelectedNum(data[0].num);
                setSelectedBoard(data[0].board);
                setSelectedCardType(data[0].cardType);
                setSelectedIdDeck(data[0].idDeck);
                setSelectedImgUrl(data[0].imgUrl);
                setShowData(true);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    }

    useEffect(() => {
        if (!isFirstLoad) {
            getData();
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
                            <TopTitle title="Edit card"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                {showData && 
                                    <>
                                        <InputForm
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
                                        <InputNumberForm
                                            id="idDeck"
                                            name="idDeck"
                                            label="ID deck" 
                                            placeholder="Enter id deck"
                                            selectedOption={selectedIdDeck}
                                            setSelectedOption={setSelectedIdDeck}
                                        />
                                        <InputForm
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
                                            setSelected={setSelectedBoard}
                                            selectedOption={selectedBoard}>
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
                                            setSelected={setSelectedCardType}
                                            selectedOption={selectedCardType}>
                                        </DropdownText> 
                                    </>
                                }
                                {!isLoading ? (
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
                </div>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
