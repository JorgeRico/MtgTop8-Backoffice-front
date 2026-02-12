import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { routing } from '@/types/routing.ts';
import PageTitle from '@/components/PageTitle';

const SignIn            = lazy(() => import("@/pages/Authentication/SignIn.tsx"));
// const SignUp            = lazy(() => import("@/pages/Authentication/SignUp.tsx"));
const RecoverPassword   = lazy(() => import("@/pages/Authentication/RecoverPassword.tsx"));
const Chart             = lazy(() => import("@/pages/Chart.tsx"));
const Dashboard         = lazy(() => import("@/pages/Dashboard/Dashboard.tsx"));
const Profile           = lazy(() => import("@/pages/Profile.tsx"));
const Settings          = lazy(() => import("@/pages/Settings.tsx"));
const Tournaments       = lazy(() => import("@/pages/Tournaments/Tournaments.tsx"));
const TournamentsEdit   = lazy(() => import("@/pages/Tournaments/Edit/index.tsx"));
const TournamentsCreate = lazy(() => import("@/pages/Tournaments/Create/index.tsx"));
const Leagues           = lazy(() => import("@/pages/Leagues/Leagues.tsx"));
const LeaguesEdit       = lazy(() => import("@/pages/Leagues/Edit/index.tsx"));
const LeaguesCreate     = lazy(() => import("@/pages/Leagues/Create/index.tsx"));
const Decks             = lazy(() => import("@/pages/Decks/Decks.tsx"));
const DecksEdit         = lazy(() => import("@/pages/Decks/Edit/index.tsx"));
const DecksCreate       = lazy(() => import("@/pages/Decks/Create/index.tsx"));
const Players           = lazy(() => import("@/pages/Players/Players.tsx"));
const PlayersEdit       = lazy(() => import("@/pages/Players/Edit/index.tsx"));
const PlayersCreate     = lazy(() => import("@/pages/Players/Create/index.tsx"));
const Cards             = lazy(() => import("@/pages/Cards/Cards.tsx"));
const CardsEdit         = lazy(() => import("@/pages/Cards/Edit/index.tsx"));
const CardsCreate       = lazy(() => import("@/pages/Cards/Create/index.tsx"));

const Router = () => (  
    <Suspense fallback={<p>Loading data . . .</p>}>
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
            <Route path={routing.cards}
                element={
                    <>
                        <PageTitle title="Cards | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Cards />
                    </>
                }
            />
            <Route path={routing.cards + "/edit/:id"}
                element={
                    <>
                        <PageTitle title="Cards | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <CardsEdit />
                    </>
                }
            />
            <Route path={routing.cards + "/create"}
                element={
                    <>
                        <PageTitle title="Cards | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <CardsCreate />
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
    </Suspense>
);

export default Router;