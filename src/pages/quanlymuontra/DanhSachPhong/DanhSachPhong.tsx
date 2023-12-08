import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Popconfirm, Button, Select, Typography, Input} from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons' 
import { ColumnProps } from "antd/es/table";
import useAction from "../../../redux/useActions";
import { message } from "antd";
import { phonghocServices } from "../../../utils/services/phonghocServices";
import { useSelector , useDispatch} from "react-redux";
interface DataType {
  key: number;
  TenPhong: string;
  GiangDuong: string;
}



const DanhSachPhong = () => {
    const dispatch = useDispatch()
    const actions = useAction()
  
  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [search, setSearch] = useState<string>('')
  const [messageApi, contextHolder] = message.useMessage();

  const getData = () => {
    dispatch(actions.StateAction.loadingState(true))
    phonghocServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== " " && {search})
    }).then((res) => {
       if(res.status) {
          setCount(res.data.count)
          setData(res.data.data)
       }
    dispatch(actions.StateAction.loadingState(false ))

    }).catch((err :any) => {
      console.log(err)
    dispatch(actions.StateAction.loadingState(false))

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
       const res = await phonghocServices.deleteById(id)
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
      title: "Tên phòng học",
      dataIndex: "TenPhong",
      align:"center",
    },   
    {
      title: "Giảng đường",
      dataIndex: "GiangDuong",
      align: 'center',
    //   width: '10%',
    },
    {
        title: 'Thao tác',
        width: '108px',
        render: (record: any, index :any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
            
              <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer'}} />     
                <Popconfirm onConfirm={() => hanldeDelete(record.Ma_PH)} title="Bạn chắc chắn xóa?"cancelText='Hủy' okText='Đồng ý'>
                    <DeleteOutlined  style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
        </div>
    }
]

  useEffect(() => {
     getData()
  }, [ currentPage, rowsPerPage, search])
  return <div className="ds_canbo">
    {contextHolder}
      <Row>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Quản lý mượn trả",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>Phòng học</span>
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
            <label style={{marginBottom:"4px"}}>Tên phòng</label>
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

export default DanhSachPhong;
