import DefaultLayout from '@/layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';

const FormLayout = () => {
    const [ showData, setShowData ]         = useState<boolean>(false);
    const id                                = useParams();
    const [ isFirstLoad, setIsFirstLoad ]   = useState<boolean>(false);
    const [ selectedName, setSelectedName ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ]       = useState<boolean>(false);

     const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name' : selectedName,
        }

        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${id.id}`, body)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name)
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
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <BreadcrumbBack pageName="Decks" />
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Edit decks"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                {showData && 
                                    <InputForm
                                        id="name"
                                        name="name"
                                        label="Deck name" 
                                        placeholder="Enter deck name"
                                        selectedOption={selectedName}
                                        setSelectedOption={setSelectedName}
                                    />
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
