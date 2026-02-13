import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { routing } from '@/types/web-routing';
import PageTitle from '@/components/PageTitle';
import { ProtectedRoute } from '@/components/ProtectedRoute'

const SignIn            = lazy(() => import("@/pages/Authentication/SignIn.tsx"));
// const SignUp            = lazy(() => import("@/pages/Authentication/SignUp.tsx"));
const RecoverPassword   = lazy(() => import("@/pages/Authentication/RecoverPassword.tsx"));
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
                        <PageTitle title="Signin | MTG STATS Admin Tailwind CSS backoffice" />
                        <SignIn />
                    </>
                }
            />
            <Route path={routing.recover}
                element={
                    <>
                        <PageTitle title="Recover password | MTG STATS Admin Tailwind CSS backoffice" />
                        <RecoverPassword />
                    </>
                }
            />
            {/* <Route path={routing.signup}
                element={
                    <>
                        <PageTitle title="Signup | MTG STATS Admin Tailwind CSS backoffice" />
                        <SignUp />
                    </>
                }
            /> */}
            
            
            <Route path={routing.dashboard}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Dashboard | MTG STATS Admin Tailwind CSS backoffice" />
                            <Dashboard />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.tournaments}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Tournaments | MTG STATS Admin Tailwind CSS backoffice" />
                            <Tournaments />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.tournaments + '/edit/:id'}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Tournaments | MTG STATS Admin Tailwind CSS backoffice" />
                            <TournamentsEdit />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.tournaments + '/create'}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Tournaments | MTG STATS Admin Tailwind CSS backoffice" />
                            <TournamentsCreate />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.leagues}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Leagues | MTG STATS Admin Tailwind CSS backoffice" />
                            <Leagues />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.leagues + "/edit/:id"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Leagues | MTG STATS Admin Tailwind CSS backoffice" />
                            <LeaguesEdit />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.leagues + "/create"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Leagues | MTG STATS Admin Tailwind CSS backoffice" />
                            <LeaguesCreate />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.players}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Players | MTG STATS Admin Tailwind CSS backoffice" />
                            <Players />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.players + "/edit/:id"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Players | MTG STATS Admin Tailwind CSS backoffice" />
                            <PlayersEdit />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.players + "/create"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Players | MTG STATS Admin Tailwind CSS backoffice" />
                            <PlayersCreate />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.decks}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Decks | MTG STATS Admin Tailwind CSS backoffice" />
                            <Decks />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.decks + "/edit/:id"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Decks | MTG STATS Admin Tailwind CSS backoffice" />
                            <DecksEdit />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.decks + "/create"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Decks | MTG STATS Admin Tailwind CSS backoffice" />
                            <DecksCreate />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.cards}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Cards | MTG STATS Admin Tailwind CSS backoffice" />
                            <Cards />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.cards + "/edit/:id"}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Cards | MTG STATS Admin Tailwind CSS backoffice" />
                            <CardsEdit />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path={routing.cards + "/create"}
                element={
                    <>  <ProtectedRoute>
                            <PageTitle title="Cards | MTG STATS Admin Tailwind CSS backoffice" />
                            <CardsCreate />
                        </ProtectedRoute>
                    </>
                }
            />

            
            <Route
                path={routing.profile}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Profile | MTG STATS Admin Tailwind CSS backoffice" />
                            <Profile />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route
                path={routing.settings}
                element={
                    <>
                        <ProtectedRoute>
                            <PageTitle title="Settings | MTG STATS Admin Tailwind CSS backoffice" />
                            <Settings />
                        </ProtectedRoute>
                    </>
                }
            />
        </Routes>
    </Suspense>
);

export default Router;