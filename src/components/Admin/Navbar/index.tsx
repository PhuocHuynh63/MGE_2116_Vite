import React from 'react';
import '../../../styles/admin/adminNavbar.style.scss';
import { useMenu } from '../../../lib/menu.provider';
import { FiAlignJustify } from 'react-icons/fi';

const NavbarAdmin: React.FC = () => {
    const menuContext = useMenu();
    const toggleMenu = menuContext?.toggleMenu;

    return (
        <div className="navbar">
            <button title="Menu" onClick={toggleMenu} className="btn-menu">
                <FiAlignJustify className="icon" />
            </button>
            <div className="user-info">Chào Admin!</div>
        </div>
    );
};

export default NavbarAdmin;
