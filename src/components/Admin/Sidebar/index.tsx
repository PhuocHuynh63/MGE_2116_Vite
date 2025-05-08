import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../styles/admin/adminSidebar.style.scss';
import { ROUTES } from '../../../routes';
import { useMenu } from '../../../lib/menu.provider';

const SidebarAdmin: React.FC = () => {
    const menuContext = useMenu();
    const isOpenMenu = menuContext?.isMenuOpen;
    const toggleMenu = menuContext?.toggleMenu;

    return (
        <div className={`sidebar-admin-container ${isOpenMenu ? 'open' : 'close'}`}>
            <div className="logo" onClick={toggleMenu}>
                {isOpenMenu ? 'Admin Panel' : 'AP'}
            </div>
            <ul className="menu">
                <li className="menu-item">
                    <NavLink
                        to={ROUTES.ADMIN_MGE}
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        {isOpenMenu ? 'Cấu hình MGE' : 'MGE'}
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to={ROUTES.ADMIN_USERS}
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        {isOpenMenu ? 'Quản lý Người dùng' : 'Users'}
                    </NavLink>
                </li>
                <li className="menu-item">
                    <NavLink
                        to={ROUTES.ADMIN_HISTORY}
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        {isOpenMenu ? 'Lịch sử MGE' : 'History'}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin;