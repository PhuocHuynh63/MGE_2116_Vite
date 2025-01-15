import { useEffect, useState } from 'react';
import './index.scss'
interface LoadingWrapperProps {
    children?: React.ReactNode;
}

const LoadingLogo: React.FC<LoadingWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
        return (
            <div className="loading-main">
                <div className="loading-page">
                    <div className="img-loading">
                        <img src="https://res.cloudinary.com/dtl80dani/image/upload/v1735753178/logo_2116_zdhili.png" alt="Loading..." className="loading" />
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default LoadingLogo
