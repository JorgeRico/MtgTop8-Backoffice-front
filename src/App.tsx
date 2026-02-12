import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from '@/common/Loader';
import Router from "@/router/routes.tsx";

function App() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <BrowserRouter>
                <Router></Router>
            </BrowserRouter>
        </>
    );
}

export default App;
