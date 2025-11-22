import { useState, useEffect, useId } from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import DatePicker from '@/components/Forms/DatePicker/DatePicker';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import InputForm from '@/components/Forms/InputForm';
import InputNumberForm from '@/components/Forms/InputNumberForm';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import TopTitle from '@/components/Forms/Top';
import { useParams } from 'react-router-dom';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';

const FormLayout = () => {
    const [ isLoading, setIsLoading ]                       = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                       = useState<boolean>(false);
    const [ selectedLeague, setSelectedLeague]              = useState<number | null>(null);
    const [ leagues, setLeagues ]                           = useState<any[] | null>(null);
    const [ selectedNumber, setSelectedNumber ]             = useState<number | null>(null);
    const [ selectedName, setSelectedName ]                 = useState<string | null>(null);
    const [ selectedDate, setSelectedDate ]                 = useState<string>('');
    const [ selectedIdTournament, setSelectedIdTournament ] = useState<number | null>(null);
    const id                                                = useParams();
    const [ showData, setShowData ]                         = useState<boolean>(false);
    const [isLeagueSelected, setIsLeagueSelected]           = useState<boolean>(false);

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
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}${routing.tournaments}/${id.id}`, body)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.tournaments}/${id.id}`)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.leagues}`)
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
        apiCall();
        getTournament();
    }, []);

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
                                            {selectedDate != '' &&
                                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                                    <div className="w-full">
                                                        <DatePicker 
                                                            idDay={idDay}
                                                            idMonth={idMonth}
                                                            idYear={idYear}
                                                            label="Tournament date (DD/MM/YY)"
                                                            selectedDate={selectedDate} 
                                                            disabled={false}
                                                            isEdit={true}
                                                        />
                                                    </div>
                                                </div>
                                            }
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
                                        </>
                                    }
                                    {!isLoading &&
                                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Edit Tournament
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
