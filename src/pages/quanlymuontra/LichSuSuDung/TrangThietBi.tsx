import React, { useEffect, useState } from "react";
import { Row, Table, Divider, Popconfirm, Button } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import { lichsusudungServices } from "../../../utils/services/lichsususungService";
import dayjs from "dayjs";
import { message } from "antd";
interface DataType {
    key: number;
    TG_DB: Date;
    TG_KT: Date;
    TinhTrangTTB: any

}
const TrangThietBi = ({ ttb }: any) => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(9)
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
        setOpenModalEdit(true)
        setCurData(data)
    }

    const hanldeDelete = async (id: number) => {
        lichsusudungServices.deleteById(id).then((res) => {
            getData()
        }).catch((err: any) => {
            console.log(err)
            message.error("Xóa thất bại")
        })
    };


    const getData = () => {
        setLoading(true)
        lichsusudungServices.get({
            page: currentPage,
            size: rowsPerPage,
            Ma_TTB: ttb?.Ma_TTB
        }).then((res) => {
            if (res.status) {
                setCount(res.data.count)
                setData(res.data.data)
            }
            setLoading(false)
        }).catch((err: any) => {
            console.log(err)
            setLoading(false)
        })
    }


    const columns: ColumnProps<DataType>[] = [
        {
            title: "TT",
            dataIndex: "ID",
            width: 30,
            align: 'center',
            render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
        },
        {
            title: "tên trang thiết bị",
            dataIndex: "TrangThietBi",
            align: "center",
            render: (TrangThietBi) => <div>{TrangThietBi ? TrangThietBi?.Ten_TTB : ""}</div>,
        },
        {
            title: "ngày mượn",
            dataIndex: "TrangThietBi",
            align: "center",
            render: (TrangThietBi) => <div>{TrangThietBi ? TrangThietBi?.createdAt : ""}</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "TrangThietBi",
            align: "center",
            render: (TrangThietBi) => <div>{TrangThietBi.TrangThai == 0 ? "Đang mượn" : " chưa trả "}</div>,
        }
    ]
    useEffect(() => {
        getData()
    }, [currentPage, rowsPerPage])

    return <div className="ds_trangthietbi">
        {contextHolder}
        <Row>
            <h3>Danh sách các trang thiết bị mượn</h3>
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

    </div>;
};
export default TrangThietBi;
