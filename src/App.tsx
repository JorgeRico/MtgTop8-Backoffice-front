import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tournaments from './pages/Tournaments.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
        <Routes>
            <Route
                index
                path="/"
                element={
                    <>
                        <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <SignIn />
                    </>
                }
            />
            <Route
                path="/signup"
                element={
                    <>
                        <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <SignUp />
                    </>
                }
            />
            <Route
                path="dashboard"
                element={
                    <>
                        <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Dashboard />
                    </>
                }
            />
            <Route
                path="/tournaments"
                element={
                    <>
                        <PageTitle title="Tournaments | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Tournaments />
                    </>
                }
            />
        </Routes>      
        
        <Routes>
            <Route
            path="/profile"
            element={
                <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
                </>
            }
            />
            <Route
            path="/forms/form-elements"
            element={
                <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
                </>
            }
            />
            <Route
            path="/forms/form-layout"
            element={
                <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
                </>
            }
            />
            <Route
            path="/settings"
            element={
                <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
                </>
            }
            />
            <Route
            path="/chart"
            element={
                <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
                </>
            }
            />
            </Routes>
    </>
  );
}

export default App;
