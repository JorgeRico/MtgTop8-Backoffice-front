import { useState, useEffect } from 'react';
import Header from '@/components/Header/index';
import Sidebar from '@/components/Sidebar/index';
// import { useAuthStore } from '@/store/auth';
// import firebase from '@/hooks/useFirebase.tsx';

interface InputProps {
    children: any;
}

const DefaultLayout = ({ children }: InputProps) => {
    const [ sidebarOpen, setSidebarOpen ]         = useState<boolean>(false);
    // const { authToken, logout, destroyAuthToken } = useAuthStore()
    // const { firebaseLogout }                      = firebase;

    // const handleLogout = () => {
    //     firebaseLogout(logout, destroyAuthToken);
    // }
    
    // useEffect(() => {
    //     if (authToken == '') {
    //         handleLogout()
    //     }
    // }, []);

    return (
        <>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main>
                            <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 2xl:p-10">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
