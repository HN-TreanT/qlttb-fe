import React, { useEffect, useState } from "react";
import { Row, Table, Divider, Popconfirm, Button, Tag } from "antd"
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
    const [rowsPerPage, setRowsPerpage] = useState(10)

    const getData = () => {
        setLoading(true)
        lichsusudungServices.get({
            page: currentPage,
            size: rowsPerPage,
            Ma_LSM: ttb?.Ma_LSM
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
            title: "Trang thiết bị",
            dataIndex: "TrangThietBi",
            align: "center",
            render: (TrangThietBi) => <div>{TrangThietBi ? TrangThietBi?.Ten_TTB : ""}</div>,
        },
        {
            title: "Ngày mượn",
            dataIndex: "TrangThietBi",
            align: "center",
            render: (TrangThietBi) => <div>{TrangThietBi ? dayjs(TrangThietBi?.createdAt).format("DD/MM/YYYY") : ""}</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "TrangThai",
            align: "center",
            render: (TrangThai) => <div>{TrangThai === "Đang mượn" ? <Tag color="volcano">Đang mượn</Tag> : <Tag color="green" >Đã trả</Tag>}</div>,
        },
        {
            title: "Nhận xét",
            dataIndex: "NhanXet",
            align: "center",
            
        }
    ]
    useEffect(() => {
        getData()
    }, [currentPage, rowsPerPage])

    return <div className="ds_trangthietbi">
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
