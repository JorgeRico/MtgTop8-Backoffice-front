import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from '@/common/Loader';
import PageTitle from '@/components/PageTitle';
import SignIn from '@/pages/Authentication/SignIn.tsx';
// import SignUp from '@/pages/Authentication/SignUp.tsx';
import RecoverPassword from '@/pages/Authentication/RecoverPassword.tsx';
import Chart from '@/pages/Chart';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Tournaments from '@/pages/Tournaments/Tournaments.tsx';
import TournamentsEdit from '@/pages/Tournaments/Edit/index.tsx';
import TournamentsCreate from '@/pages/Tournaments/Create/index.tsx';
import Leagues from '@/pages/Leagues/Leagues.tsx';
import LeaguesEdit from '@/pages/Leagues/Edit/index.tsx';
import LeaguesCreate from '@/pages/Leagues/Create/index.tsx';
import Decks from '@/pages/Decks/Decks.tsx';
import DecksEdit from '@/pages/Decks/Edit/index.tsx';
import DecksCreate from '@/pages/Decks/Create/index.tsx';
import Players from '@/pages/Players/Players.tsx';
import PlayersEdit from '@/pages/Players/Edit/index.tsx';
import PlayersCreate from '@/pages/Players/Create/index.tsx';
import { routing } from '@/types/routing.ts';

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
                <Routes>
                    <Route path={routing.home}
                        element={
                            <>
                                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <SignIn />
                            </>
                        }
                    />
                    {/* <Route path={routing.signup}
                        element={
                            <>
                                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <SignUp />
                            </>
                        }
                    /> */}
                    <Route path={routing.recover}
                        element={
                            <>
                                <PageTitle title="Recover password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <RecoverPassword />
                            </>
                        }
                    />
                    <Route path={routing.dashboard}
                        element={
                            <>
                                <PageTitle title="Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Dashboard />
                            </>
                        }
                    />
                    <Route path={routing.tournaments}
                        element={
                            <>
                                <PageTitle title="Tournaments | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Tournaments />
                            </>
                        }
                    />
                    <Route path={routing.tournaments + '/edit/:id'}
                        element={
                            <>
                                <PageTitle title="Tournaments | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <TournamentsEdit />
                            </>
                        }
                    />
                    <Route path={routing.tournaments + '/create'}
                        element={
                            <>
                                <PageTitle title="Tournaments | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <TournamentsCreate />
                            </>
                        }
                    />
                    <Route path={routing.leagues}
                        element={
                            <>
                                <PageTitle title="Leagues | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Leagues />
                            </>
                        }
                    />
                    <Route path={routing.leagues + "/edit/:id"}
                        element={
                            <>
                                <PageTitle title="Leagues | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <LeaguesEdit />
                            </>
                        }
                    />
                    <Route path={routing.leagues + "/create"}
                        element={
                            <>
                                <PageTitle title="Leagues | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <LeaguesCreate />
                            </>
                        }
                    />
                    <Route path={routing.players}
                        element={
                            <>
                                <PageTitle title="Players | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Players />
                            </>
                        }
                    />
                    <Route path={routing.players + "/edit/:id"}
                        element={
                            <>
                                <PageTitle title="Players | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <PlayersEdit />
                            </>
                        }
                    />
                    <Route path={routing.players + "/create"}
                        element={
                            <>
                                <PageTitle title="Players | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <PlayersCreate />
                            </>
                        }
                    />
                    <Route path={routing.decks}
                        element={
                            <>
                                <PageTitle title="Decks | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <Decks />
                            </>
                        }
                    />
                    <Route path={routing.decks + "/edit/:id"}
                        element={
                            <>
                                <PageTitle title="Decks | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <DecksEdit />
                            </>
                        }
                    />
                    <Route path={routing.decks + "/create"}
                        element={
                            <>
                                <PageTitle title="Decks | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                                <DecksCreate />
                            </>
                        }
                    />
                




                    <Route
                        path={routing.profile}
                        element={
                            <>
                            <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                            <Profile />
                            </>
                        }
                    />
                    <Route
                        path={routing.settings}
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
            </BrowserRouter>
        </>
    );
}

export default App;
