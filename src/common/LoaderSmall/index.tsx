import { useAuthStore } from '@/store/auth';

const Loader = () => {
    const { colorMode } = useAuthStore();

    return (
        <div className={`flex items-center justify-center ${colorMode === 'dark' ? 'dark:border-strokedark dark:bg-boxdark' : 'border-stroke bg-white'}`}>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
};

export default Loader;
