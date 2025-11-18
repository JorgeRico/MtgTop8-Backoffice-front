
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
    endpoint  : string;
    title     : string;
    pathValue : string
    image     : any;
}

const NavBlock = ({ endpoint, title, pathValue, image }: SidebarProps) => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <li>
            <NavLink
                to={endpoint}
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes(pathValue) && 'bg-graydark dark:bg-meta-4'
                }`}
            >
                {image}
                {title}
            </NavLink>
        </li>                
    );
};

export default NavBlock;
