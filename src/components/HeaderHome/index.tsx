
import { FiAlignJustify } from 'react-icons/fi'
import { useMenu } from '../../lib/menu.provider';
import '../../styles/main/home.style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectMge } from '../../modules/global/selector';
import { useEffect } from 'react';

const HeaderHome = () => {
    /**
     * Toggle menu
     */
    const menuContext = useMenu();
    const toggleMenu = menuContext?.toggleMenu;
    //-------------------End-------------------//


    /**
     * Get MGE by type MGE
     */
    const mge = useSelector(selectMge);
    //-------------------End-------------------//

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'getTimer', payload: 'desc' });
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
                        {mge?.map((item: any, index: number) => (
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
                <span className='typeMge'>{mge[0]?.typeMge}</span>
            </div>
        </div>
    )
}

export default HeaderHome