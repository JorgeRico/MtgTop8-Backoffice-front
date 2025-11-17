import DefaultLayout from '@/layout/DefaultLayout';
import { routing } from '@/types/routing';
import TrophyIcon from '@/components/Icons/Trophy.tsx';
import TournamentIcon from '@/components/Icons/TournamentIcon';
import DeckIcon from '@/components/Icons/Deck.tsx';
import CardsIcon from '@/components/Icons/Cards.tsx';
import UsersIcon from '@/components/Icons/Users.tsx';
import CardDashboard from '@/pages/Dashboard/Card';

const Dashboard = () => {
    return (
        <>
            <DefaultLayout>
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardDashboard
                        link={routing.leagues}
                        icon={<TrophyIcon></TrophyIcon>}
                        title="Leagues">
                    </CardDashboard>
                    <CardDashboard
                        link={routing.tournaments}
                        icon={<TournamentIcon></TournamentIcon>}
                        title="Tournaments">
                    </CardDashboard>
                </section>
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-10">
                    <CardDashboard
                        link={routing.players}
                        icon={<UsersIcon></UsersIcon>}
                        title="Players">
                    </CardDashboard>
                    <CardDashboard
                        link={routing.decks}
                        icon={<DeckIcon></DeckIcon>}
                        title="Decks">
                    </CardDashboard>
                    <CardDashboard
                        link={routing.cards}
                        icon={<CardsIcon></CardsIcon>}
                        title="Cards">
                    </CardDashboard>
                </section>
            </DefaultLayout>
        </>
    );
};

export default Dashboard;
