import { Link } from 'react-router-dom';
import { routing } from '../../types/web-routing';

interface BreadcrumbProps {
  pageName : string;
  link     : string;
}

const BreadcrumbBack = ({ pageName, link }: BreadcrumbProps) => {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium" to={routing.dashboard}>
                        Dashboard / 
                        </Link>
                    </li>
                    <li className="font-medium text-primary">
                    <Link className="font-medium" to={link}>
                        {pageName}
                    </Link>
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default BreadcrumbBack;
