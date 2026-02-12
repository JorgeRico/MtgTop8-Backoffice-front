import CardDataStats from '@/components/CardDataStats';
import { NavLink } from 'react-router-dom';
import { routing } from '@/types/web-routing';

interface DashboardProps {
    link  : string;
    icon  : any;
    title : string;
}

const Dashboard = ({link, icon, title}: DashboardProps) => {
    return (
        <>
            <NavLink to={link}>
                <CardDataStats total="" levelUp rate="" title={title}>
                    {icon}
                </CardDataStats>
            </NavLink>    
        </>
    );
};

export default Dashboard;
