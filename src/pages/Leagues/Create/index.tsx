import { useState, useId } from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/useApiCalls.tsx';
import { routing } from '@/types/web-routing';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import { commonFunctions } from '@/hooks/useCommonFunctions.tsx';
import { useAuthStore } from '@/store/auth';

const CreateLeague = () => {
    const { getDropdownYears, toast }                 = commonFunctions;
    const [ isLoading, setIsLoading ]                 = useState<boolean>(false);
    const [ isCreated, setIsCreated ]                 = useState<boolean>(false);
    const [ selectedFormat, setSelectedFormat ]       = useState<number | null>(null);
    const [ selectedCurrent, setSelectedCurrent ]     = useState<number | null>(null);
    const [ selectedActive, setSelectedActive ]       = useState<number | null>(null);
    const [ selectedYear, setSelectedYear ]           = useState<number | null>(null);
    const [ selectedName ]                            = useState<string | null>(null);
    // dropdown selector css
    const [ isYearSelected, setIsYearSelected ]       = useState<boolean>(false);
    const [ isCurrentSelected, setIsCurrentSelected ] = useState<boolean>(false);
    const [ isFormatSelected, setIsFormatSelected ]   = useState<boolean>(false);
    const [ isActiveSelected, setIsActiveSelected ]   = useState<boolean>(false);
    const { post, defaultHeaders }                    = fetchInstance;
    const { authToken }                               = useAuthStore();

    // form ids
    const idFormat  = useId();
    const idCurrent = useId();
    const idActive  = useId();
    const idYear    = useId();
    const idName    = useId();

    const onChangeYearSubmit = (event: any) => {
        setIsYearSelected(true);
        setSelectedYear(parseInt(event));
    };

    const onChangeCurrentSubmit = (event: any) => {
        setIsCurrentSelected(true);
        setSelectedCurrent(parseInt(event));
    };

    const onChangeFormatSubmit = (event: any) => {
        setIsFormatSelected(true);
        setSelectedFormat(parseInt(event));
    };

    const onChangeActiveSubmit = (event: any) => {
        setIsActiveSelected(true);
        setSelectedActive(parseInt(event));
    };
    
    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // get form values
        const formDataValues = new FormData(event.target)

        const body = {
            'name'     : formDataValues.get(idName),
            'isLegacy' : Number(formDataValues.get(idFormat)),
            'year'     : Number(formDataValues.get(idYear)),
            'current'  : Number(formDataValues.get(idCurrent)),
            'active'   : Number(formDataValues.get(idActive))
        }
        
        try {
            await post(`${import.meta.env.VITE_API_URL}${routing.leagues}`, body, {headers: defaultHeaders(authToken)})
            .then(data => {
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "League created correctly, id: " + data.data[0].id), 2000);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
            setIsLoading(false);
        }
    };

    const onClickBack = (event: any) => {
        event.preventDefault();
        window.location.href = routing.leagues
    }

    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Leagues"  link={routing.leagues}/>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create League"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
                                    disabled={false}
                                    name={idName}
                                    label="League name" 
                                    placeholder="Enter League name"
                                    selectedOption={selectedName}
                                />
                                <Dropdown 
                                    disabled={false}
                                    options={[{ value: 1, key: 'Legacy' }]}
                                    label="Select Format"
                                    name={idFormat}
                                    selectedOption={selectedFormat}
                                    isOptionSelected={isFormatSelected}
                                    onChangeSubmit={onChangeFormatSubmit}>
                                </Dropdown>
                                <Dropdown
                                    disabled={false}
                                    options={getDropdownYears()}
                                    label="Select year"
                                    name={idYear}
                                    selectedOption={selectedYear}
                                    isOptionSelected={isYearSelected}
                                    onChangeSubmit={onChangeYearSubmit}>
                                </Dropdown>
                                <Dropdown 
                                    disabled={false}
                                    options={[
                                        { value: 1, key: 'Current season' },
                                        { value: 0, key: 'Past season' }
                                    ]}
                                    label="Select Current Season"
                                    name={idCurrent}
                                    selectedOption={selectedCurrent}
                                    isOptionSelected={isCurrentSelected}
                                    onChangeSubmit={onChangeCurrentSubmit}>
                                </Dropdown>
                                <Dropdown 
                                    disabled={false}
                                    options={[
                                        { value: 1, key: 'Active' },
                                        { value: 0, key: 'Disabled' }
                                    ]}
                                    label="Select Active Status"
                                    name={idActive}
                                    selectedOption={selectedActive}
                                    isOptionSelected={isActiveSelected}
                                    onChangeSubmit={onChangeActiveSubmit}>
                                </Dropdown>
                                {(!isLoading && !isCreated) &&
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create League
                                    </button>
                                }
                                {(isLoading && !isCreated) &&
                                    <div className="flex w-full justify-center p-3 m-5">
                                        <Loader></Loader>
                                    </div>
                                }
                                {isCreated &&
                                    <button onClick={(event) => onClickBack(event)}className="cursor-pointer flex w-full justify-center rounded bg-secondary p-3 font-medium text-white hover:bg-opacity-90">
                                        Back to leagues
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

export default CreateLeague;
