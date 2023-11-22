import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Popconfirm, Button, Select, Typography, Input} from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons' 
import { ColumnProps } from "antd/es/table";
import dayjs from "dayjs";
import { message } from "antd";
import {lichlamviceServices} from "../../../utils/services/lichlamviecService"
import { useSelector } from "react-redux";
interface DataType {
  key: number;
  CanBo: any;
  CongViec: string;
  Ngay: Date,
  Kip: number;
}



const LichLamViec = () => {
  
  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(9)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  const getData = () => {
    lichlamviceServices.get({
      page: currentPage,
      size: rowsPerPage
    }).then((res) => {
       if(res.status) {
          setCount(res.data.count)
          setData(res.data.data)
       }
    }).catch((err :any) => {
      console.log(err)
    })
  }
  const hanldeModalAdd = () => {
       setOpenModalAdd(false)
  }
  const handleModalEdit = () => {
    setOpenModalEdit(false)
  }

  const hanldUpdate = (data :any) => {
   
    setCurData(data)
    setOpenModalEdit(true)
  }

  const hanldeDelete =async (id:number) => {
    try {
       const res = await lichlamviceServices.deleteById(id)
       if(res.status) {
          getData()
       }else {
         message.error(res.message)
       }
    }catch(err: any) {
        console.log(err)
        message.error("Xóa thất bại")
    }
  }

  
  const columns: ColumnProps<DataType>[] = [
    {
      title: "TT",
      dataIndex: "ID",
      width:30,
       align: 'center',
       render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
    },
    {
      title: "Cán bộ phụ trách",
      dataIndex: "CanBo",
      align:"center",
      render: (text, record, index) => <span>{text?.Ten_CB ? text?.Ten_CB : ""}</span>
    },
    {
      title: "Công việc",
      dataIndex: "CongViec",
      align: 'center',
      width: '25%',
    },
    {
      title: "Ngày ",
      dataIndex: "Ngay",
      align: 'center',
      width: '20%',
      render: (text, record, index) => <span>{text ? dayjs(text).format("DD/MM/YYYY") : ""}</span>
    },
    
    {
      title: "Kíp",
      dataIndex: "Kip",
      align: 'center',
      width: '10%',
    },
    {
        title: 'Thao tác',
        width: '108px',
        render: (record: any, index :any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
            
              <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer'}} />     
                <Popconfirm onConfirm={() => hanldeDelete(record.Ma_CB)} title="Bạn chắc chắn xóa?"cancelText='Hủy' okText='Đồng ý'>
                    <DeleteOutlined  style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
        </div>
    }
]

  useEffect(() => {
     getData()
  }, [ currentPage, rowsPerPage])
  return <div className="ds_canbo">
    {contextHolder}
      <Row>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Quản lý cán bộ",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>Lịch làm việc</span>
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
          <div style={{ width: "100%", display:"flex", flexDirection:"column", justifyContent:"flex-start",alignItems:"flex-start"}}>
            <label style={{marginBottom:"4px"}}>Tìm kiếm</label>
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
          </div>
        </Col>
        <Divider style={{ margin: "10px" }}></Divider>
      </Row>
      <Row>

      <Table
             loading={loading}
            style={{width:"100%"}}
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
      <ModalAdd curData={curData} action="Add" handleModal={hanldeModalAdd} open={openModalAdd} getData={getData}
      />
      <ModalAdd curData={curData} action="Edit" handleModal={handleModalEdit} open={openModalEdit} getData={getData}
      />

  </div>;
};

const ModalAdd = React.lazy(() => import("./ModalAdd"))

export default LichLamViec;
