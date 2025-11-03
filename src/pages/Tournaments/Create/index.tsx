import { useState, useEffect } from "react";
import SelectGroupOne from '../../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../../layout/DefaultLayout';
import DatePicker from '../../../components/Forms/DatePicker/DatePicker';
import Loader from '../../../common/LoaderSmall';
import { fetchInstance } from '../../../hooks/apiCalls';
import { routing } from '../../../types/routing';
import { toast } from '../../../hooks/toast';

const CreateTournament = () => {
    const [ isLoading, setIsLoading ]          = useState<boolean>(false);
    const [ isCreated, setIsCreated ]          = useState<boolean>(false);
    const [ selectedLeague, setSelectedLeague] = useState<string>('');
    const [ isFirstLoad, setIsFirstLoad ]      = useState(false);
    const [ leagues, setLeagues ]              = useState<any[] | null>(null);

    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // date conversion is done on api
        const dateString   = document.querySelector<HTMLInputElement>('input[name="datepicker"]')?.value;
        const players      = document.querySelector<HTMLInputElement>('input[name="players"]')?.value;
        const idTournament = document.querySelector<HTMLInputElement>('input[name="idTournament"]')?.value;

        if (dateString == null) {
            toast('error', "Date is not selected");
            return ''
        }
        
        if (players == null) {
            toast('error', "Players is not selected");
            return ''
        }
        if (idTournament == null) {
            toast('error', "idTournament is not selected");
            return ''
        }

        const body = {
            'name'         : document.querySelector<HTMLInputElement>('input[name="name"]')?.value,
            'date'         : dateString,
            'idLeague'     : parseInt(selectedLeague),
            'players'      : parseInt(players),
            'idTournament' : parseInt(idTournament)
        }
        console.log(body)
        
        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}`, body)
            .then(data => {
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "Tournament created correctly, id: "+data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', "Failed to load tournaments");
        }
    };

    const apiCall = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}`)
            .then(data => {
                const dataLeague = (data || []).map((item: any) => ({
                    value : item.id,
                    key   : item.name,
                }));

                setLeagues(dataLeague);
                
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    };

    useEffect(() => {
        if (isFirstLoad == false) {
            apiCall()
            setIsFirstLoad(true);
            console.log(leagues)
        }
    }, [isFirstLoad]);
    
    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    New Tournament
                                </h3>
                            </div>
                            <form onSubmit={onSubmitForm}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Tournament name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter tournament name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Id mtgTop8 Tournament
                                            </label>
                                            <input
                                                type="text"
                                                name="idTournament"
                                                placeholder="Enter id tournament from mtgtop8 website"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Number of players
                                            </label>
                                            <input
                                                type="number"
                                                name="players"
                                                placeholder="Enter number of players"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <DatePicker />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            {leagues ? (
                                                <SelectGroupOne 
                                                    options={leagues}
                                                    text="Select League"
                                                    name="League"
                                                    selectedOpt={selectedLeague}
                                                    selectedOptionFunction={setSelectedLeague}
                                                />
                                                ) : (
                                                    <Loader></Loader>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {!isLoading &&
                                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Create Tournament
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
                </section>
            </DefaultLayout>
        </>
    );
};

export default CreateTournament;
