import { useState, useEffect, useId } from "react";
import DefaultLayout from '@/layout/DefaultLayout';
import DatePicker from '@/components/Forms/DatePicker/DatePicker';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import TopTitle from '@/components/Forms/Top';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import { useAuthStore } from "@/store/auth";
import { useNavigate } from 'react-router-dom';

const CreateTournament = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedLeague, setSelectedLeague]              = useState<number | null>(null);
    const [ leagues, setLeagues ]                           = useState<any[] | null>(null);
    const [ selectedName ]                                  = useState<string | null>(null);
    const [ selectedNumber, setSelectedNumber ]             = useState<number | null>(null);
    const [ selectedDate ]                                  = useState<string>('');
    const [ selectedIdTournament, setSelectedIdTournament ] = useState<number | null>(null);
    const [ isLeagueSelected, setIsLeagueSelected ]         = useState<boolean>(false);
    const { post, get, defaultHeaders }                     = fetchInstance;
    const { toast }                                         = commonFunctions;
    const { authToken }                                     = useAuthStore();
    let navigate                                            = useNavigate();

    // form ids
    const idName       = useId();
    const idDay        = useId();
    const idMonth      = useId();
    const idYear       = useId();
    const idLeague     = useId();
    const idNumber     = useId();
    const idTournament = useId();

    const onChangeLeagueSubmit = (event: any) => {
        setIsLeagueSelected(true);
        setSelectedLeague(parseInt(event));
    };

    function getDateConverted(day: string, month: string, year: string) {
        return day + '/' + month + '/' + year;
    }

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // get form values
        const formDataValues = new FormData(event.target)

        const body = {
            'name'         : formDataValues.get(idName),
            'date'         : getDateConverted(formDataValues.get(idDay) as string ?? '' , formDataValues.get(idMonth) as string ?? '', formDataValues.get(idYear) as string ?? ''),
            'idLeague'     : Number(formDataValues.get(idLeague)),
            'players'      : Number(formDataValues.get(idNumber)),
            'idTournament' : Number(formDataValues.get(idTournament)),
        }
        
        try {
            await post(`${import.meta.env.VITE_API_URL}${routing.tournaments}`, body, {headers: defaultHeaders(authToken)})
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
            await get(`${import.meta.env.VITE_API_URL}${routing.leagues}`, {headers: defaultHeaders(authToken)})
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
        navigate(routing.tournaments);
    }

    useEffect(() => {
        apiCall()
    }, []);
    
    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Tournaments" link={routing.tournaments} />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="New Tournament"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    name={idName}
                                    label="Tournament name" 
                                    placeholder="Enter Tournament name"
                                    selectedOption={selectedName}
                                />
                                <InputNumberForm
                                    name={idTournament}
                                    label="Id mtgTop8 Tournament" 
                                    placeholder="Enter id tournament from mtgtop8 website"
                                    selectedOption={selectedIdTournament}
                                    setSelectedOption={setSelectedIdTournament}
                                />
                                <InputNumberForm
                                    name={idNumber}
                                    label="Number of players" 
                                    placeholder="Enter number of players"
                                    selectedOption={selectedNumber}
                                    setSelectedOption={setSelectedNumber}
                                />
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <DatePicker 
                                            idDay={idDay}
                                            idMonth={idMonth}
                                            idYear={idYear}
                                            label="Tournament date (DD/MM/YY)"
                                            selectedDate={selectedDate} 
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                                {leagues ? (
                                        <Dropdown 
                                            disabled={false}
                                            options={leagues}
                                            label="Select League"
                                            name={idLeague}
                                            selectedOption={selectedLeague}
                                            isOptionSelected={isLeagueSelected}
                                            onChangeSubmit={onChangeLeagueSubmit}>
                                        </Dropdown>
                                    ) : (
                                        <Loader></Loader>
                                    )
                                }
                                {(!isLoading && !isCreated) &&
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create Tournament
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="cursor-pointer flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
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
