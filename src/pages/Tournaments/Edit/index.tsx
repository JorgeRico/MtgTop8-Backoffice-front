import { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';

const FormLayout = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedLeague, setSelectedLeague]              = useState<number | null>(null);
    const [ isFirstLoad, setIsFirstLoad ]                   = useState<boolean>(false);
    const [ leagues, setLeagues ]                           = useState<any[] | null>(null);
    const [ selectedNumber, setSelectedNumber ]             = useState<number | null>(null);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ selectedDate, setSelectedDate ]                 = useState<string | null>(null);
    const [ selectedIdTournament, setSelectedIdTournament ] = useState<string | null>(null);
    const id                                                = useParams();
    const [ showData, setShowData ]                         = useState<boolean>(false);

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // extra double check
        if (selectedName == null) {
            toast('error', "Name is not added");
            setIsLoading(false);
            return ''
        }

        if (selectedDate == null) {
            toast('error', "Date is not selected");
            setIsLoading(false);
            return ''
        }
        
        if (selectedNumber == null) {
            toast('error', "Players is not selected");
            setIsLoading(false);
            return ''
        }

        if (selectedIdTournament == null) {
            toast('error', "idTournament is not selected");
            setIsLoading(false);
            return ''
        }

        const body = {
            'name'         : selectedName,
            'date'         : selectedDate,
            'idLeague'     : selectedLeague,
            'players'      : selectedNumber,
            'idTournament' : selectedIdTournament
        }
        
        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}/${id.id}`, body)
            .then(data => {
                setTimeout(() => toast('success', "Tournament updated correctly"), 2000);
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => setIsLoading(false), 2000);
            })
        } catch (error) {
            toast('error', "Failed to load tournaments");
        }
    };

    const getTournament = async() => {
         try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.tournaments}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name)
                setSelectedLeague(data[0].idLeague);
                setSelectedIdTournament(data[0].idTournament);
                setSelectedDate(data[0].date);
                setSelectedNumber(data[0].players);
                setShowData(true);
            })
        } catch (error) {
            toast('error', "Failed to load tournaments");
        }
    }

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
            apiCall();
            getTournament();
            setIsFirstLoad(true);
        }
    }, [isFirstLoad]);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Tournaments" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Edit Tournament"></TopTitle>
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                
                                <form onSubmit={onSubmitForm} className="p-6.5">
                                    {showData &&
                                        <>
                                            <InputForm
                                                id="name"
                                                name="name"
                                                label="Tournament name" 
                                                placeholder="Enter Tournament name"
                                                selectedOption={selectedName}
                                                setSelectedOption={setSelectedName}
                                            />
                                            <InputForm
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
                                                    <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
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
                                        </>
                                    }
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
