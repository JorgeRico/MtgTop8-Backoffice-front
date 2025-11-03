import React, { useState, useEffect } from 'react';
import SelectGroupOne from '../../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../../layout/DefaultLayout';
import Loader from '../../../common/LoaderSmall';
import { fetchInstance } from '../../../hooks/apiCalls';
import { routing } from '../../../types/routing';
import { toast } from '../../../hooks/toast';

const CreateLeague = () => {
    const [ isLoading, setIsLoading ]            = useState<boolean>(false);
    const [ isCreated, setIsCreated ]            = useState<boolean>(false);
    const [ selectedFormat, setSelectedFormat]   = useState<string>('');
    const [ selectedCurrent, setSelectedCurrent] = useState<string>('');
    const [ selectedActive, setSelectedActive]   = useState<string>('');
    const [ selectedYear, setSelectedYear]       = useState<string>('');
    const [ years, setYears ]                    = useState<Array<{ key: string; value: string }>>([]);

    const getDropdownYears = () => {
        const tempYears: Array<{ key: string; value: string }> = [];
        const now = new Date();

        for (let year = 2016; year <= now.getFullYear(); year++) {
            const item = {
                key   : String(year),
                value : String(year)
            };
            tempYears.push(item);
        }

        setYears(tempYears)
    }
    
    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const body = {
            'name'     : document.querySelector<HTMLInputElement>('input[name="name"]')?.value,
            'isLegacy' : parseInt(selectedFormat),
            'year'     : parseInt(selectedYear),
            'current'  : parseInt(selectedCurrent),
            'active'   : parseInt(selectedActive)
        }
        
        try {
            await fetchInstance.post(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}${routing.leagues}`, body)
            .then(data => {
                setTimeout(() => setIsCreated(true), 2000);
                setTimeout(() => toast('success', "League created correctly, id: "+data.data[0].id), 2000);
            })
        } catch (error) {
            console.error('Failed to load leagues', error);
        }
    };

    useEffect(() => {
        getDropdownYears()
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    New League
                                </h3>
                            </div>
                            <form onSubmit={onSubmitForm}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                League name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter League name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <SelectGroupOne 
                                                options={[
                                                    { value: '1', key: 'Legacy' }
                                                ]}
                                                text="Select Format"
                                                name="Format"
                                                selectedOpt={selectedFormat}
                                                selectedOptionFunction={setSelectedFormat}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <SelectGroupOne 
                                                options={years}
                                                text="Select Year"
                                                name="Year"
                                                selectedOpt={selectedYear}
                                                selectedOptionFunction={setSelectedYear}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <SelectGroupOne 
                                                options={[
                                                    { value: '1', key: 'Current season' },
                                                    { value: '0', key: 'Past season' }
                                                ]}
                                                text="Select Current Season"
                                                name="Current"
                                                selectedOpt={selectedCurrent}
                                                selectedOptionFunction={setSelectedCurrent}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <SelectGroupOne
                                                options={[
                                                    { value: '1', key: 'Active' },
                                                    { value: '0', key: 'Disabled' }
                                                ]}
                                                text="Select Active Status"
                                                name="Active"
                                                selectedOpt={selectedActive}
                                                selectedOptionFunction={setSelectedActive}
                                            />
                                        </div>
                                    </div>
                                    {!isLoading &&
                                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Create League
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

export default CreateLeague;
