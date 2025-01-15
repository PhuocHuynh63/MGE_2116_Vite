
import { FiAlignJustify } from 'react-icons/fi'
import { useMenu } from '../../lib/menu.provider';
import { useEffect, useState } from 'react';
import mgeService from '../../services/mge';
import { IMGE } from '../../schemaValidations/model.schema';
import '../../styles/main/home.style.scss';

const HeaderHome = () => {
    const menuContext = useMenu();
    const toggleMenu = menuContext?.toggleMenu;

    const [mge, setMge] = useState<IMGE[]>([]);
    useEffect(() => {
        mgeService.getMge(1, 10)
            .then((res) => {
                setMge(res.data.data.results);
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="header-home">
            <div className="top d-flex">
                <div className="left">
                    <button title="Menu" onClick={toggleMenu} className="btn-menu">
                        <FiAlignJustify className="icon" />
                    </button>
                </div>

                <div className="right container">
                    <div className="row justify-content-center">
                        {mge.map((item: any, index: number) => (
                            <div key={index} className="command">
                                <img src={item.img} className="logo-command" alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bottom">
                <p className='text'>Kingdom 2116</p>
                <p className='text'>Minimum point bid stage: <span className='minimum-bid'>10,000,000</span></p>
            </div>

            <div className="type">
                <span className='typeMge'></span>
            </div>
        </div>
    )
}

export default HeaderHome