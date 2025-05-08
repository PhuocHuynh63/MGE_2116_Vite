import { Navigate } from 'react-router-dom';
import { CookiesService } from '../../utils/helpers/cookie';

interface Props {
    children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
    const token = CookiesService.get('access_token');
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;