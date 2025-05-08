import { useEffect, useState } from 'react';
import { Table, TableColumnsType, TableProps, Modal, Input, Form, Button, Tooltip } from 'antd';
import userService from '../../services/user';
import { IUser } from '../../schemaValidations/model.schema';
import { DATA_POINTS } from '../../types/IPage';
import { Title } from '../../components/Title';
import Loading from '../../assets/Loading';
import { InfoCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import '../../styles/admin/adminUser.style.scss';

const AdminUsersPage = () => {
    const [data, setData] = useState<DATA_POINTS.IDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<DATA_POINTS.IDataType | null>(null);
    const [form] = Form.useForm();
    const [pointsAfterChange, setPointsAfterChange] = useState<number | null>(null); // Sử dụng state mới để hiển thị kết quả

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
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <Button onClick={() => openEditModal(record)}>Sửa</Button>
            ),
        }
    ];

    useEffect(() => {
        fetchData(search, 1, 10);
    }, [search]);

    const fetchData = async (keyword: string, page: number, size: number) => {
        try {
            const response = await userService.searchByNameOrId(keyword, page, size) as IUser;
            const newData = response?.data?.data?.results?.map((item: any, index: number) => ({
                key: index,
                no: index + 1 + (page - 1) * size,
                ingame: item.ingame,
                id: item.id,
                points: item.points.toLocaleString('vi-VN'),
                rawPoints: item.points, // cần giữ để hiển thị mặc định trong modal
            }));

            setData(newData || []);
            setPagination({
                current: response?.data?.data?.meta.current || 1,
                pageSize: response?.data?.data?.meta.pageSize || 10,
                total: response?.data?.data?.meta.totalItem || 0,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTableChange: TableProps<DATA_POINTS.IDataType>['onChange'] = (pagination) => {
        fetchData(search, pagination.current || 1, pagination.pageSize || 10);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const openEditModal = (user: DATA_POINTS.IDataType) => {
        setSelectedUser(user);
        form.setFieldsValue({
            id: user.id,
            ingame: user.ingame,
            pointsRequest: '',
            description: '',
            admin_key: '',
        });
        setPointsAfterChange(user.rawPoints); // Khởi tạo giá trị điểm ban đầu
        setIsModalVisible(true);
    };

    const handlePointsChange = (value: string) => {
        if (selectedUser) {
            const pointsRequest = Number(value);
            const newPoints = selectedUser.rawPoints + pointsRequest;
            setPointsAfterChange(newPoints); // Cập nhật điểm sau khi thay đổi
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            // Gửi request tới server tại đây
            const response = await userService.updateUser({
                ...values,
                pointsRequest: Number(values.pointsRequest)
            });

            if (response?.status === 200 || response?.status === 201) {
                toast.success('Cập nhật điểm thành công!');
                setIsModalVisible(false);
                fetchData(search, pagination.current, pagination.pageSize);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || 'Có lỗi xảy ra!');
        }
    };

    return (
        <div className="admin-users" style={{ margin: '0 25px' }}>
            <Title className="title">Quản lý thành viên 2116</Title>

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

            {/* Modal chỉnh sửa */}
            <Modal
                title="Chỉnh sửa điểm người chơi"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="id" label="ID người chơi">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="ingame" label="Tên ingame">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="pointsRequest"
                        label={
                            <span>
                                Điểm yêu cầu&nbsp;
                                <Tooltip title={
                                    <>
                                        Cộng điểm thì không bỏ dấu. <br />
                                        Trừ điểm thì thêm dấu '-'. <br />
                                        <strong>Ví dụ:</strong> 5000 hoặc -3000
                                    </>
                                }>
                                    <InfoCircleOutlined style={{ color: '#1890ff' }} />
                                </Tooltip>
                            </span>
                        }
                        rules={[{ required: true, message: 'Vui lòng nhập điểm bị trừ' }]}
                    >
                        <Input type="number" onChange={(e) => handlePointsChange(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Lý do"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="admin_key"
                        label="Mã xác thực"
                        rules={[{ required: true, message: 'Vui lòng nhập mã xác thực' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div>
                        <strong>Số điểm hiện tại: {selectedUser?.rawPoints.toLocaleString('vi-VN')}</strong><br />
                        <strong>Số điểm sau khi thay đổi: {pointsAfterChange?.toLocaleString('vi-VN')}</strong>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUsersPage;
