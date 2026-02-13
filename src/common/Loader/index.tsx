import { useAuthStore } from '@/store/auth';

const Loader = () => {
    const { colorMode } = useAuthStore();

    return (
        <div className={`flex h-screen items-center justify-center rounded-sm border shadow-default' ${colorMode === 'dark' ? 'dark:border-strokedark dark:bg-boxdark' : 'border-stroke bg-white'}`}>
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};

export default Loader;
