import { useEffect, useState } from 'react';
import { DATA_POINTS } from '../../types/IPage';
import { Table, TableColumnsType, TableProps } from 'antd';
import userService from '../../services/user';
import { IUser } from '../../schemaValidations/model.schema';
import { Title } from '../../components/Title';
import '../../styles/main/data-points.scss';
import Loading from '../../assets/Loading';

const DataPointsPage = () => {
    const columns: TableColumnsType<DATA_POINTS.IDataType> = [
        {
            title: 'NO',
            dataIndex: 'no',
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
            title: 'POINTS',
            dataIndex: 'points',
        },
    ];


    /**
     * Take data from props and set it to state
     */
    const [data, setData] = useState<DATA_POINTS.IDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        userService.searchByNameOrId('', 1, 10)
            .then((response) => {
                const newData = response?.data?.data?.results?.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
                    key: index,
                    no: index + 1,
                    ingame: item.ingame,
                    id: item.id,
                    points: item.points.toLocaleString('vi-VN'),
                }));
                setData(newData || []);
                const timer = setTimeout(() => {
                    setIsLoading(false);
                }, 500);

                return () => clearTimeout(timer);
            },)
            .catch(() => setIsLoading(false));
    }, []);
    //-------------------------------End-----------------------------------//


    /**
     * Handle table change
     */
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const handleTableChange: TableProps<DATA_POINTS.IDataType>['onChange'] = async (pagination) => {
        try {
            const { current, pageSize } = pagination;

            const response = await userService.searchByNameOrId(search, current || 1, pageSize || 10) as IUser;
            const newData = response?.data?.data?.results?.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
                key: index,
                no: index + 1 + ((current || 1) - 1) * (pageSize || 10),
                ingame: item.ingame,
                id: item.id,
                points: item.points.toLocaleString('vi-VN'),
            }));

            setData(newData || []);
            setPagination({
                current: response?.data?.data?.meta.current ?? current ?? 1,
                pageSize: response?.data?.data?.meta.pageSize ?? pageSize ?? 10,
                total: response?.data?.data?.meta.totalItem || 0,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    //-------------------------------End-----------------------------------//


    /**
     * Handle search
     */
    const [search, setSearch] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    useEffect(() => {
        const searchByNameOrId = async () => {
            const response = await userService.searchByNameOrId(search, 1, 10) as IUser;
            const newData = response?.data?.data?.results?.map((item: { id: string; ingame: string; points: number; }, index: number) => ({
                key: index,
                no: index + 1,
                ingame: item.ingame,
                id: item.id,
                points: item.points.toLocaleString('vi-VN'),
            }));
            setData(newData || []);
            setPagination({
                current: response?.data?.data?.meta.current || 1,
                pageSize: response?.data?.data?.meta.pageSize || 10,
                total: response?.data?.data?.meta.totalItem || 0,
            });
        };
        searchByNameOrId();
    }, [search]);
    //-------------------------------End-----------------------------------//

    return (
        <div className="data-points" style={{ margin: '0 25px' }}>
            <Title className="title">TOTAL POINT MEMBER 2116</Title>

            <div className="search d-flex justify-content-end">
                <input type="text" className="search-input1" placeholder="Search..." onChange={handleSearch} />
            </div>

            {isLoading ? (
                <div style={{ overflow: 'hidden' }}>
                    <Loading />
                </div>
            ) : (
                <Table<DATA_POINTS.IDataType>
                    className="custom-table"
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '15', '20', '50'],
                    }}
                    onChange={handleTableChange}
                    bordered={true}
                />
            )}
        </div>
    );
};

export default DataPointsPage;
