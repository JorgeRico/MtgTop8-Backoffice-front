// TODO: functions to control pagination
const TablePagination = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 py-3 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing 1 to 5 of 10 entries
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button disabled className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm">
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded text-gray-700 flex w-10 items-center justify-center h-10 text-sm font-medium bg-blue-500/[0.5] hover:bg-blue-500/[0.08] dark:hover:text-brand-500 dark:text-white">
                            1
                        </button>
                        <button className="px-4 py-2 rounded text-gray-700 dark:text-gray-400 flex w-10 items-center justify-center h-10 text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                            2
                        </button>
                    </div>
                    <button className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
