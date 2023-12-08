import React, { useEffect, useState } from "react";
import {Row, Table, Divider, Popconfirm, Button } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import { LichSuTinhTrangServices } from "../../../utils/services/lichsuTinhTrang";
import { TinhTrangTTBServices } from "../../../utils/services/tinhtrangTTB";
import dayjs from "dayjs";
import { message } from "antd";

interface DataType {
  key: number;
  TG_DB: Date;
  TG_KT: Date;
  TinhTrangTTB:any

}


const LichSuTinhTrang = ({ttb} : any) => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const [tinhtragnTTbs, setTinhTrangTTbs] = useState([])
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
    LichSuTinhTrangServices.deleteById(id).then((res) => {
        getData()
    }).catch((err :any) => {
        console.log(err)
        message.error("Xóa thất bại")
    })
  };

  const getTinhTrangTTB = () => {
    TinhTrangTTBServices.get({
      page: 1,
      size : 100
    }).then(res => {
        if(res.status) {
          setTinhTrangTTbs(res.data.data)
        }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  const getData = () => {
    setLoading(true)
    LichSuTinhTrangServices.get({
        page: currentPage,
        size: rowsPerPage,
        Ma_TTB: ttb?.Ma_TTB
    }).then((res) => {
        if(res.status) {
            setCount(res.data.count)
            setData(res.data.data)
        }
        setLoading(false)
    }).catch((err :any) => {
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
      title: "Tình trạng",
      dataIndex: "TinhTrangTTB",
      align: "center",
      render: (TinhTrangTTB) => <div>{TinhTrangTTB ? TinhTrangTTB?.TinhTrang : ""}</div>,
    },
    {
      title: "Vị trí",
      dataIndex: "TinhTrangTTB",
      align: "center",
      render: (TinhTrangTTB) => <div>{TinhTrangTTB ? TinhTrangTTB?.ViTri : ""}</div>,
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "TG_DB",
      align: "center",
      render: (TG_DB) => <div>{TG_DB ? dayjs(TG_DB).format("DD/MM/YYYY") : ""}</div>,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "TG_KT",
      align: "center",
      render: (TG_KT) => <div>{TG_KT ? dayjs(TG_KT).format("DD/MM/YYYY") : ""}</div>,
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LSTT)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]

  useEffect(() => {
      getTinhTrangTTB()
  }, [])

  useEffect(() => {
     getData()
  }, [currentPage, rowsPerPage])

  return <div className="ds_trangthietbi">
    {contextHolder}
    <Row>
      <h3>Lịch sử tình trạng trang thiết bị</h3>
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
    <ModalLSTTB ma_ttb={ttb?.Ma_TTB} tinhtrangTTbs={tinhtragnTTbs} curData={curData} open={openModalAdd} handleModal={hanldeModalAdd} action="Add" getData={getData} />
    <ModalLSTTB ma_ttb={ttb?.Ma_TTB} tinhtrangTTbs={tinhtragnTTbs} curData={curData} open={openModalEdit} handleModal={handleModalEdit} action="Edit"  getData={getData}/>


  </div>;
};
const ModalLSTTB = React.lazy(() => import("./ModalLSTT"))
export default LichSuTinhTrang;
