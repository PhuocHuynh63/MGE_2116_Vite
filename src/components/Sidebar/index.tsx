import { useMenu } from '../../lib/menu.provider';
import { ROUTES } from '../../routes';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/main/sidebar.style.scss'


const SideBarMain = () => {
    const menuContext = useMenu();
    const isOpenMenu = menuContext?.isMenuOpen;
    const toggleMenu = menuContext?.toggleMenu;

    return (
        <div className='sidebar-main-container'>
            <div className={`sidebar-main ${isOpenMenu ? 'open' : 'close'}`}>
                <div className="filter-blur" onClick={toggleMenu} />
                <Link to={ROUTES.BID_MGE}>
                    <div className="logo" />
                </Link>
                <ul className="content">
                    <NavLink to={ROUTES.BID_MGE}>
                        <li className='bid_mge'>
                            Bid MGE
                        </li>
                    </NavLink>
                    <NavLink to={ROUTES.DATA_POINTS}>
                        <li className='data_points'>
                            Data Points
                        </li>
                    </NavLink>
                    <NavLink to={ROUTES.RESULTS_TOP}>
                        <li className='results_top'>
                            Results Top
                        </li>
                    </NavLink>
                    <NavLink to={ROUTES.HISTORY}>
                        <li className='history'>
                            History
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default SideBarMain;