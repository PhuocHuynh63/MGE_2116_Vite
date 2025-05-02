import React from 'react';
import SidebarAdmin from '../../components/Admin/Sidebar';
import NavbarAdmin from '../../components/Admin/Navbar';
import '../../styles/admin/adminLayout.style.scss';
import { MenuProvider, } from '../../lib/menu.provider';

const AdminLayout: React.FC<{ Component: React.ElementType }> = ({ Component }) => {
    return (
        <MenuProvider>
            <div className="admin-layout">
                <div className={`sidebar-admin`}>
                    <SidebarAdmin />
                </div>
                <div className="admin-main">
                    <NavbarAdmin />
                    <div className="main-content" style={{ padding: '20px', flex: 1 }}>
                        <Component />
                    </div>
                </div>
            </div>
        </MenuProvider>
    );
};

export default AdminLayout;