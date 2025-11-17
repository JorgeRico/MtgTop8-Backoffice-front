import { useState } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from "@/components/Forms/Top";

const FormLayout = () => {
    const [ isLoading, setIsLoading ]       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]       = useState<boolean>(false);
    const [ selectedName, setSelectedName ] = useState<string | null>(null);
    
    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name' : selectedName,
        }

        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.decks}`, body)
            .then(data => {
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "Player created correctly, id: "+data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to create Deck and Player");
        }
    };

    const onClickBack = (event: any) => {
        event.preventDefault();
        window.location.href = routing.decks
    }

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <BreadcrumbBack pageName="Decks" />
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create decks"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    id="name"
                                    name="name"
                                    label="League name" 
                                    placeholder="Enter League name"
                                    selectedOption={selectedName}
                                    setSelectedOption={setSelectedName}
                                />
                                    
                                {(!isLoading && !isCreated) &&
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Deck
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to leagues
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
