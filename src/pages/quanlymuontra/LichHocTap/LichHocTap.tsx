import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Popconfirm, Button, Select, Typography, Input } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import useAction from "../../../redux/useActions";
import { message } from "antd";
import { lichhoctapServices } from "../../../utils/services/lichhoctapService";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { lopServices } from "../../../utils/services/lopService";
import LopThamGia from "./LopThamGia";
interface DataType {
  Ma_LH: any;
  key: number;
  TenPhong: string;
  Lop: string;
  NgayHoc: Date;
  TG_BD: Date;
  TG_KT: Date;
  LichHoc_Lop :any[]
}



const LichHocTap = () => {
  const dispatch = useDispatch()
  const actions = useAction()

  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [phongHocs, setPhongHocs] = useState([])
  const [rowsPerPage, setRowsPerpage] = useState(9)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [search, setSearch] = useState<string>('')
  const [lops, setLops]= useState([])
  const [messageApi, contextHolder] = message.useMessage();



  const getLops = () => {
    lopServices.get({
      page : 1,
      size : 50
    }).then((res) => {
        if(res.status) {
          const temp = res?.data.data.map((item: any) => {
            return {
              ...item,
              value:item?.Ma_Lop,
              label: item?.Ten_Lop

            }
          })
          setLops(temp)
        }
        
    }).catch((err:any) => {
      console.log(err)
    } )
  }
  const getData = () => {
    dispatch(actions.StateAction.loadingState(true))
    lichhoctapServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== " " && { search })
    }).then((res) => {

      if (res.status) {
        const temp = res.data.data.map((item:any) => {
          return {
            ...item,
            id_lops: item.LichHoc_Lop.map((lh_lop: any) => lh_lop.Ma_Lop)
          }
        })
        setCount(res.data.count)
        // setData(res.data.data)
        setData(temp)

      }
      dispatch(actions.StateAction.loadingState(false))

    }).catch((err: any) => {
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

  const hanldUpdate = (data: any) => {

    setCurData(data)
    setOpenModalEdit(true)
  }

  const hanldeDelete = async (id: number) => {
    try {
      const res = await lichhoctapServices.deleteById(id)
      if (res.status) {
        getData()
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
      dataIndex: "ID",
      width: 30,
      align: 'center',
      render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
    },
    {
      title: "Ngày học",
      dataIndex: "NgayHoc",
      align: 'center',
      //   width: '10%',
      render: (NgayHoc) => <span>{NgayHoc ? dayjs(NgayHoc).format("DD/MM/YYYY") : ""}</span>
    },
    {
      title: "Phòng học",
      dataIndex: "PhongHoc",
      align: 'center',
      render: (PhongHoc) => <span>{PhongHoc ? PhongHoc?.TenPhong : ""}</span>
      
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "TG_BD",
      align: "center",
      // width: '20%',
    },
  
    {
      title: "Thời gian kết thúc",
      dataIndex: "TG_KT",
      align: 'center',
      // width: '20%',
    },
   
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LH)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]


  useEffect(() => {
    getLops()
  }, [])
  useEffect(() => {
    dispatch(actions.phonghocAction.loadData({
      page: 1,
      size: 100,
    })) 
  }, [])

  useEffect(() => {
    getData()
   
  }, [currentPage, rowsPerPage, search])
  return <div className="ds_canbo">
    {contextHolder}
    <Row>
      <Breadcrumb
        style={{ margin: "auto", marginLeft: 0 }}
        items={[
          {
            title: "Quản lý lịch học",
          },
          {
            title: (
              <span style={{ fontWeight: "bold" }}>Lịch học tập</span>
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
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "4px" }}>Tên phòng</label>
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
        style={{ width: "100%" }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data.map((item :any) => {
          return {
            ...item,
            key: item?.Ma_LH
          }
        })}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return <LopThamGia  Ma_LH={record?.Ma_LH}  />
          },
          
        }}
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
    <ModalLichHoc lops={lops} curData={curData} action="Add" handleModal={hanldeModalAdd} open={openModalAdd} getData={getData}
      />
      <ModalLichHoc lops={lops} curData={curData} action="Edit" handleModal={handleModalEdit} open={openModalEdit} getData={getData}
      />  

  </div>;
};

const ModalLichHoc = React.lazy(() => import("./ModalLichHoc"))

export default LichHocTap;
