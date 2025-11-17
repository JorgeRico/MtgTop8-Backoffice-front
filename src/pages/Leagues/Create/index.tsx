import { useState } from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import Loader from '@/common/LoaderSmall';
import { fetchInstance } from '@/hooks/apiCalls';
import { routing } from '@/types/routing';
import { toast } from '@/hooks/toast';
import DropdownYear from '@/components/Forms/DropdownYear';
import InputForm from '@/components/Forms/InputForm';
import TopTitle from '@/components/Forms/Top';
import Dropdown from '@/components/Forms/Dropdown';
import BreadcrumbBack from '@/components/BreadcrumsBackoffice';

const CreateLeague = () => {
    const [ isLoading, setIsLoading ]             = useState<boolean>(false);
    const [ isCreated, setIsCreated ]             = useState<boolean>(false);
    const [ selectedFormat, setSelectedFormat ]   = useState<number | null>(null);
    const [ selectedCurrent, setSelectedCurrent ] = useState<number | null>(null);
    const [ selectedActive, setSelectedActive ]   = useState<number | null>(null);
    const [ selectedYear, setSelectedYear ]       = useState<number | null>(null);
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
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}`, body)
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
                        <BreadcrumbBack pageName="Leagues" />
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <TopTitle title="Create League"></TopTitle>
                            <form onSubmit={onSubmitForm} className="p-6.5">
                                <InputForm
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
                                        { value: 1, key: 'Current season' },
                                        { value: 0, key: 'Past season' }
                                    ]}
                                    text="Select Current Season"
                                    name="Current"
                                    setSelected={setSelectedCurrent}
                                    selectedOption={selectedCurrent}>
                                </Dropdown>
                                <Dropdown 
                                    options={[
                                        { value: 1, key: 'Active' },
                                        { value: 0, key: 'Disabled' }
                                    ]}
                                    text="Select Active Status"
                                    name="Active"
                                    setSelected={setSelectedActive}
                                    selectedOption={selectedActive}>
                                </Dropdown>
                                {(!isLoading && !isCreated) &&
                                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        Create League
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
                </section>
            </DefaultLayout>
        </>
    );
};

export default CreateLeague;
