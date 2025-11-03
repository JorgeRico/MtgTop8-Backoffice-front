import { useState } from "react";
import DefaultLayout from '../../../layout/DefaultLayout';
import Loader from '../../../common/LoaderSmall';
import { fetchInstance } from '../../../hooks/apiCalls';
import { routing } from '../../../types/routing';
import { toast } from '../../../hooks/toast';

const FormLayout = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isCreated, setIsCreated ] = useState<boolean>(false);
    
    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name' : document.querySelector<HTMLInputElement>('input[name="name"]')?.value,
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
                                                Deck name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter deck name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    {!isLoading &&
                                        <button className="flex w-full justify-center rounded bg-primary p-3 mt-5 font-medium text-gray hover:bg-opacity-90">
                                            Create Deck
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

export default FormLayout;
