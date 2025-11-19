import { useState, useEffect } from 'react'
import DefaultLayout from '@/layout/DefaultLayout';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';
import Dropdown from '@/components/Dropdowns/Dropdown';
import DropdownYear from '@/components/Dropdowns/DropdownYear';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import { useParams } from 'react-router-dom';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';

const FormLayout = () => {
    const [ showData, setShowData ]               = useState<boolean>(false);
    const [ isLoading, setIsLoading ]             = useState<boolean>(false);
    const [ selectedFormat, setSelectedFormat ]   = useState<number | null>(null);
    const [ selectedCurrent, setSelectedCurrent ] = useState<number | null>(null);
    const [ selectedActive, setSelectedActive ]   = useState<number | null>(null);
    const [ selectedYear, setSelectedYear ]       = useState<number | null>(null);
    const id                                      = useParams();
    const [ isFirstLoad, setIsFirstLoad ]         = useState<boolean>(false);
    const [ selectedName, setSelectedName ]       = useState<string | null>(null);

    const onSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // extra double check
        if (selectedName == null) {
            toast('error', "Name is not added");
            setIsLoading(false);
            return ''
        }

        if (selectedFormat == null) {
            toast('error', "Date is not selected");
            setIsLoading(false);
            return ''
        }
        
        if (selectedYear == null) {
            toast('error', "Players is not selected");
            setIsLoading(false);
            return ''
        }

        if (selectedCurrent == null) {
            toast('error', "idTournament is not selected");
            setIsLoading(false);
            return ''
        }

        if (selectedActive == null) {
            toast('error', "idTournament is not selected");
            setIsLoading(false);
            return ''
        }

        const body = {
            'name'     : selectedName,
            'isLegacy' : selectedFormat,
            'year'     : selectedYear,
            'current'  : selectedCurrent,
            'active'   : selectedActive
        }
        
        try {
            await fetchInstance.put(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}/${id.id}`, body)
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
            await fetchInstance.get(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}/${id.id}`)
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
        if (!isFirstLoad) {
            getData();
            setIsFirstLoad(true);
        }
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
                                            id="name"
                                            name="name"
                                            label="League name" 
                                            placeholder="Enter League name"
                                            selectedOption={selectedName}
                                            setSelectedOption={setSelectedName}
                                        />
                                        <Dropdown 
                                            options={[{ value: 1, key: 'Legacy' }]}
                                            text="Select Format"
                                            name="Format"
                                            setSelected={setSelectedFormat}
                                            selectedOption={selectedFormat}>
                                        </Dropdown>
                                        <DropdownYear 
                                            setSelected={setSelectedYear}
                                            selectedOption={selectedYear}>
                                        </DropdownYear>
                                        <Dropdown 
                                            options={[
                                                { value: 0, key: 'Past season' },
                                                { value: 1, key: 'Current season' }
                                            ]}
                                            text="Select Current Season"
                                            name="Current"
                                            setSelected={setSelectedCurrent}
                                            selectedOption={selectedCurrent}>
                                        </Dropdown>    
                                        <Dropdown 
                                            options={[
                                                { value: 0, key: 'Disabled' },
                                                { value: 1, key: 'Active' }
                                            ]}
                                            text="Select Active Status"
                                            name="Active"
                                            setSelected={setSelectedActive}
                                            selectedOption={selectedActive}>
                                        </Dropdown>
                                    </>
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
                </section>
            </DefaultLayout>
        </>
    );
};

export default FormLayout;
