
import { useEffect, useState } from 'react'
import '../../styles/main/history.style.scss'
import historyService from '../../services/history'

const HistoryPage = () => {
    const handleColorPoints = (points: number) => {
        return points < 0 ? 'negative' : 'positive'
    }

    const [history, setHistory] = useState([])
    useEffect(() => {
        historyService.getHistoryLimitNine(1, 9, 'desc')
            .then((res) => {
                setHistory(res.data.data.histories)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="history-page ">
            <div className="container my-3 mb-5">
                <div className="row mx-3 g-4">
                    {history?.map((item: any, index: number) => (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title card_ingame">INGAME: {item.ingame}</h5>
                                    <h5 className="card-title card_id">ID: {item.id}</h5>
                                    <span className={`card-points ${handleColorPoints(item.points)}`}>{item.points.toLocaleString('vi-vn')}</span>
                                    <p className="card-text card-description">{item.description}</p>
                                    <span className='card-time'>{item.createdAt} (UTC)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HistoryPage