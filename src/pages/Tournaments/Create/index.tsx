import { useState, useEffect } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import DatePicker from '@/components/Forms/DatePicker/DatePicker';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import Dropdown from '@/components/Dropdowns/Dropdown';
import TopTitle from '@/components/Forms/Top';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';

const CreateTournament = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedLeague, setSelectedLeague]              = useState<number | null>(null);
    const [ isFirstLoad, setIsFirstLoad ]                   = useState<boolean>(false);
    const [ leagues, setLeagues ]                           = useState<any[] | null>(null);
    const [ selectedNumber, setSelectedNumber ]             = useState<number | null>(null);
    const [ selectedDate, setSelectedDate ]                 = useState<string | null>(null);
    const [ selectedIdTournament, setSelectedIdTournament ] = useState<number | null>(null);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name'         : selectedName,
            'date'         : selectedDate,
            'idLeague'     : selectedLeague,
            'players'      : selectedNumber,
            'idTournament' : selectedIdTournament
        }
        
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

    const onClickBack = (event: any) => {
        event.preventDefault();
        window.location.href = routing.tournaments
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            apiCall()
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);
    
    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Tournaments" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="New Tournament"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    id="name"
                                    name="name"
                                    label="Tournament name" 
                                    placeholder="Enter Tournament name"
                                    selectedOption={selectedName}
                                    setSelectedOption={setSelectedName}
                                />
                                <InputNumberForm
                                    id="idTournament"
                                    name="idTournament"
                                    label="Id mtgTop8 Tournament" 
                                    placeholder="Enter id tournament from mtgtop8 website"
                                    selectedOption={selectedIdTournament}
                                    setSelectedOption={setSelectedIdTournament}
                                />
                                <InputNumberForm
                                    id="players"
                                    name="players"
                                    label="Number of players" 
                                    placeholder="Enter number of players"
                                    selectedOption={selectedNumber}
                                    setSelectedOption={setSelectedNumber}
                                />
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                    </div>
                                </div>
                                {leagues ? (
                                        <Dropdown 
                                            options={leagues}
                                            text="Select League"
                                            name="League"
                                            setSelected={setSelectedLeague}
                                            selectedOption={selectedLeague}>
                                        </Dropdown>
                                    ) : (
                                        <Loader></Loader>
                                    )
                                }
                                {(!isLoading && !isCreated) &&
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Tournament
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to tournaments
                                    </button>
                                }
                            </form>
                        </div>
                    </div>
                </section>
            </DefaultLayout>
        </>
    );
};

export default CreateTournament;
