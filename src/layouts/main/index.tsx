import HeaderHome from "../../components/HeaderHome";
import SideBarMain from "../../components/Sidebar";
import { MenuProvider } from "../../lib/menu.provider";
import '../../styles/layout.style.scss';

const MainLayout: React.FC<{ Component: React.ElementType }> = ({ Component }) => {

    return (
        <MenuProvider>
            <div className="layout-main">
                <div className="sidebar">
                    <SideBarMain />
                </div>

                <div className="main">
                    <HeaderHome />
                    <Component />
                </div>
            </div>
        </MenuProvider>
    );
}

export default MainLayout;