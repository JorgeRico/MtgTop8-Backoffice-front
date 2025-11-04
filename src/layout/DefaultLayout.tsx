import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import Cookies from 'js-cookie';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false);
    const [ isLogued, setIsLogued ]       = useState<boolean>(false);
    const [ isFirstLoad, setIsFirstLoad ] = useState<boolean>(false);

    const logout = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        if (isFirstLoad == false) {
            if (Cookies.get('authToken') !== undefined) {
                setIsLogued(true);
            } else {
                logout();
            }
            setIsFirstLoad(true);
        }
    }, [isFirstLoad == true]);

    return (
        (isLogued === true) && (
            <>
                <div className="dark:bg-boxdark-2 dark:text-bodydark">
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                            <main>
                                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default DefaultLayout;
