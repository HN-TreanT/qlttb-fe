import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Breadcrumb, Divider, Popconfirm, Space, Tooltip, Button, Select, Typography, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import useDebounce from "../../../hooks/useDebounce";
import dayjs from "dayjs";
import { message } from "antd";
import { loaittbServices } from "../../../utils/services/loaittbSevices";
import { error } from "console";
import { phonghocServices } from "../../../utils/services/phonghocSevices";
interface DataType {
    key: number;
    updatedAt: Date;
    TenPhong: string;
    GiangDuong: string;
}
const PhongHoc = () => {
    const dispatch = useDispatch()
    const actions = useAction()
    const { count, data } = useSelector((state: any) => state.phonghoc.phonghocs)
    const loading = useSelector((state: any) => state.state.loadingState)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(9)
    const [search, setSearch] = useState<string>('')
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [curData, setCurData] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const hanldeModalAdd = () => {
        setOpenModalAdd(false)
    }
    const handleModalEdit = () => {
        setOpenModalEdit(false)
    }

    const hanldUpdate = (data: any) => {

        setCurData(data)
        setOpenModalEdit(true)
    }
    console.log(data)
    const hanldeDelete = async (id: number) => {
        try {
            const res = await phonghocServices.deleteById(id)
            if (res.status) {
                dispatch(actions.phonghocAction.loadData({
                    page: currentPage,
                    size: rowsPerPage,
                    ...(search && search !== "" && { TenPhong: search })
                }))
            } else {
                message.error(res.message)
            }
        } catch (err: any) {
            console.log(err)
            message.error("Xóa thất bại")
        }
    }


    const columns: ColumnProps<DataType>[] = [
        {
            title: "TT",
            dataIndex: "Ma_PH",
            width: 30,
            align: 'center',
            render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
        },
        {
            title: "Tên phòng",
            dataIndex: "TenPhong",
            align: "center"
        },
        {
            title: "Giảng đường",
            dataIndex: "GiangDuong",
            align: "center"
        },
        {
            title: "Ngày cập nhập",
            dataIndex: "updatedAt",
            align: 'center',
            width: '20%',
            render: (text, record, index) => <span>{text ? dayjs(text).format("DD/MM/YYYY") : ""}</span>
        },
        {
            title: 'Thao tác',
            width: '108px',
            render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

                <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
                <Popconfirm onConfirm={() => hanldeDelete(record.Ma_PH)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ]

    useEffect(() => {
        dispatch(actions.phonghocAction.loadData({
            page: currentPage,
            size: rowsPerPage,
            ...(search && search !== "" && { TenPhong: search })
        }))
    }, [actions.phonghocAction, dispatch, currentPage, rowsPerPage, search])
    console.log(data)
    return <div className="ds_phonghoc">
        {contextHolder}
        <Row>
            <Breadcrumb
                style={{ margin: "auto", marginLeft: 0 }}
                items={[
                    {
                        title: "Quản lý phòng học",
                    },
                    {
                        title: (
                            <span style={{ fontWeight: "bold" }}>Danh sách phòng học</span>
                        ),
                    },
                ]}
            />
            <Button
                type="primary"
                style={{ marginLeft: "auto", width: 100 }}
                className="blue-button"
                onClick={() => {
                    setOpenModalAdd(true)
                    setCurData({})
                }}
            >
                Thêm mới
            </Button>
            <Divider style={{ margin: "10px" }}></Divider>
        </Row>
        <Row>
            <Col span={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Typography.Text>Tên phòng học</Typography.Text>
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        style={{ height: "34px" }}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setSearch('')
                            }
                        }}
                        onKeyPress={(e: any) => {
                            if (e.key === "Enter") {
                                setSearch(e.target?.value)
                                setCurrentPage(1)
                            }
                        }}
                    />
                </Space>
            </Col>
            <Divider style={{ margin: "10px" }}></Divider>
        </Row>
        <Row>

            <Table
                loading={loading}
                style={{ width: "100%" }}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={data}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: rowsPerPage,
                    defaultPageSize: rowsPerPage,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30", '100'],
                    total: count,
                    locale: { items_per_page: "/ trang" },
                    showTotal: (total, range) => <span>Tổng số: {total}</span>,
                    onShowSizeChange: (current, pageSize) => {
                        setCurrentPage(current)
                        setRowsPerpage(pageSize)
                    },
                    onChange: (pageNumber) => {
                        setCurrentPage(pageNumber)
                    }
                }}
            />

        </Row>
        {/* <ModalAdd curData={curData} action="Add" handleModal={hanldeModalAdd} open={openModalAdd} params={
      {
        page: currentPage,
        size: rowsPerPage,
        ...(search && search !== "" && { Ten_Loai: search })
      }
    }
    />
    <ModalAdd curData={curData} action="Edit" handleModal={handleModalEdit} open={openModalEdit}
      params={
        {
          page: currentPage,
          size: rowsPerPage,
          ...(search && search !== "" && { Ten_Loai: search })
        }
      }
    /> */}

    </div>;
};

// const ModalAdd = React.lazy(() => import("./ModalLoaiTTB"))

export default PhongHoc;
