import { useState, useEffect, useId } from 'react'
import DefaultLayout from '@/layout/DefaultLayout';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';
import Dropdown from '@/components/Dropdowns/Dropdown/Number';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import { useParams } from 'react-router-dom';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';
import { getDropdownYears } from '@/hooks/years';

const FormLayout = () => {
    const [ showData, setShowData ]                   = useState<boolean>(false);
    const [ isLoading, setIsLoading ]                 = useState<boolean>(false);
    const [ selectedFormat, setSelectedFormat ]       = useState<number | null>(null);
    const [ selectedCurrent, setSelectedCurrent ]     = useState<number | null>(null);
    const [ selectedActive, setSelectedActive ]       = useState<number | null>(null);
    const [ selectedYear, setSelectedYear ]           = useState<number | null>(null);
    const [ selectedName, setSelectedName ]           = useState<string | null>(null);
    const id                                          = useParams();
    // dropdown selector css
    const [ isYearSelected, setIsYearSelected ]       = useState<boolean>(false);
    const [ isCurrentSelected, setIsCurrentSelected ] = useState<boolean>(false);
    const [ isFormatSelected, setIsFormatSelected ]   = useState<boolean>(false);
    const [ isActiveSelected, setIsActiveSelected ]   = useState<boolean>(false);
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
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}${routing.leagues}/${id.id}`, body)
            .then(data => {
                setTimeout(() => setIsLoading(false), 2000);
                setTimeout(() => toast('success', "League updated correctly"), 2000);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    };

    const getData = async () => {
        try {
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}${routing.leagues}/${id.id}`)
            .then(data => {
                setSelectedName(data[0].name)
                setSelectedFormat(data[0].isLegacy);
                setSelectedCurrent(data[0].current);
                setSelectedActive(data[0].active);
                setSelectedYear(data[0].year);
                setShowData(true);
            })
        } catch (error) {
            toast('error', 'Failed to load leagues');
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <BreadcrumbBack pageName="Leagues" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Edit League"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                {showData && 
                                    <>
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
                                    </>
                                }
                                {!isLoading ? (
                                    <button className="cursor-pointer flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
                </section>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
