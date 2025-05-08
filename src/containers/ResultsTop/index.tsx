import { Modal, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { formatDate } from '../../utils/helpers/date/date';
import { useTimeLeft } from '../../utils/hooks/TimeLeft';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import userService from '../../services/user';
import { useForm } from 'react-hook-form';
import '../../styles/main/result-top.style.scss';
import { useSelector } from 'react-redux';
import { selectTimer } from '../../modules/global/selector';
import toast from 'react-hot-toast';

interface DataType {
    key: number;
    top: number;
    ingame: string;
    id: string;
    points: number;
    date: string
}



const ResultsTopPage = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<{ secretKey: string }>();

    const handleOk = async (data: { secretKey: string }) => {
        const res = await userService.kingConfirm(data.secretKey);
        console.log(res);

        if (res.status === 200) {
            setConfirmLoading(false);
            setOpen(false);
            toast.success(res.data.message);
        } else {
            setConfirmLoading(false);
            if (errors.secretKey) {
                errors.secretKey.message = res.data.message;
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const columns: TableColumnsType<DataType> = [
        {
            title: 'TOP',
            dataIndex: 'top',
        },
        {
            title: 'Ingame',
            dataIndex: 'ingame',
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Points',
            dataIndex: 'points',
        },
        {
            title: 'Date (YYYY/MM/DD HH:MM:SS)',
            dataIndex: 'date',
        }
    ];


    /**
     * Handle timer pending
     */
    const timer = useSelector(selectTimer);

    const data: DataType[] = timer?.users?.map((item: any, index: number) => {
        return {
            key: index,
            top: index + 1,
            ingame: item.ingame,
            id: item.id,
            points: item.points,
            date: formatDate(item?.date)
        }
    }) || [];
    //----------------------End----------------------//


    /**
     * Handle timer active
     */
    const timeLeft = useTimeLeft(timer?.endTime ?? '');
    //----------------------End----------------------//

    return (
        <div className="results-top" style={{ margin: '0 25px 50px 25px' }}>
            <Title className="title">LIST MEMBER BID SUCCES</Title>

            {timer?.status === 'active' ?
                <div className="count-time">
                    <h1 className='coming-soon'>COMING SOON</h1>
                    <h2 className='time'>
                        <div className="day">
                            <span className="number">{timeLeft?.days}</span><span className="text">DAY</span>
                        </div>
                        <div className="hr">
                            <span className="number">{timeLeft?.hours}</span><span className="text">HR</span>
                        </div>
                        <div className="min">
                            <span className="number">{timeLeft?.minutes}</span><span className="text">MIN</span>
                        </div>
                        <div className="sec">
                            <span className="number">{timeLeft?.seconds}</span><span className="text">SEC</span>
                        </div>
                    </h2>
                </div>
                :
                <>
                    <Table<DataType> className='custom-table' columns={columns} dataSource={data} pagination={false} />
                    <Button timeDelay={900} onClick={showModal}>King Confirm</Button>
                    <Modal
                        title="King Confirm"
                        open={open}
                        onOk={() => handleSubmit(handleOk)()}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <form onSubmit={handleSubmit(handleOk)}>
                            <input type="text" className={`${errors.secretKey ? 'input-error' : 'input-king-confirm'}`}{...register('secretKey')} />
                            {errors.secretKey && <span className={`${errors.secretKey ? 'text-error' : ''}`}>{errors.secretKey.message}</span>}
                        </form>
                    </Modal>
                </>
            }
        </div>
    )
}

export default ResultsTopPage