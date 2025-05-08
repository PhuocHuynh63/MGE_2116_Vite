import { useEffect, useState } from 'react';
import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { DATA_POINTS } from '../../types/IPage';
import { Title } from '../../components/Title';
import Loading from '../../assets/Loading';
import '../../styles/admin/adminUser.style.scss';
import historyService from '../../services/history';

const AdminHistoryPage = () => {
    const [data, setData] = useState<DATA_POINTS.IDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const columns: TableColumnsType<DATA_POINTS.IDataType> = [
        {
            title: 'NO',
            dataIndex: 'no',
            width: 70,
        },
        {
            title: 'Ingame',
            dataIndex: 'ingame',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            width: 150,
        },
        {
            title: 'Điểm chênh lệch',
            dataIndex: 'point_difference',
            render: (value: number) => {
                const color = value < 0 ? 'red' : 'green';
                const formatted = `${value > 0 ? '+' : ''}${value.toLocaleString('vi-VN')}`;
                return <span style={{ color }}>{formatted}</span>;
            },
            width: 230,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            width: 300,
        }
    ];

    useEffect(() => {
        fetchData(1, 10, 'desc');
    }, [search]);

    const fetchData = async (current: number, pageSize: number, sort: string) => {
        try {
            const response = await historyService.getHisory(current, pageSize, sort);
            const newData = response?.data?.data?.histories?.map((item: any, index: number) => ({
                key: index,
                no: index + 1,
                ingame: item.ingame,
                id: item.id,
                point_difference: item.points,
                description: item.description || 'Chưa có ghi chú',
                createdAt: new Date(item.createdAt).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            }));

            setData(newData || []);
            setPagination({
                current: response?.data?.data?.metadata.currentPage || 1,
                pageSize: response?.data?.data?.metadata.pageSize || 10,
                total: response?.data?.data?.metadata.totalItems || 0,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTableChange: TableProps<DATA_POINTS.IDataType>['onChange'] = (pagination) => {
        fetchData(pagination.current || 1, pagination.pageSize || 10, 'desc');
    };

    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(e.target.value);
    // };

    const handleExport = async () => {
        try {
            const response = await historyService.exportHistory();
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'history.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Failed to export data:', error);
        }
    };

    return (
        <div className="admin-users" style={{ margin: '0 25px' }}>
            <Title className="title">Danh sách lịch sử</Title>

            {/* <div className="search d-flex justify-content-end">
                <input type="text" className="search-input1" placeholder="Search..." onChange={handleSearch} />
            </div> */}

            <div className="search d-flex justify-content-start mb-2">
                <Button type="primary" onClick={handleExport}>Xuất dữ liệu</Button>
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

export default AdminHistoryPage;
