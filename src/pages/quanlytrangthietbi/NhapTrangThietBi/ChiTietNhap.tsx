import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Input, Tag, Button, Popconfirm, Select } from "antd"
import { ColumnProps } from "antd/es/table";
import { message } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { lscn_trangthietbi } from "../../../utils/services/lscn_ttb";
import { TrangthietbiServices } from "../../../utils/services/trangthietbiServices";
interface DataType {
  key: number;
  createdAt: Date;
  CanBo: any;
  LoaiCapNhat: string,
  NoiDung: string
}
interface props {
  Ma_LSCN: any
}
const ChiTietNhap = (props: props) => {
  const {Ma_LSCN} = props
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [curData, setCurData] = useState({})
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [trangthietbi, setTrangThietBi] = useState([])
  const handleModalAdd = () => {
    setOpenModalAdd(false)
  }

  const handleModalEdit = () => {
    setOpenModalEdit(false)
  }

  const handleUpdate = (data: any) => {
    setCurData(data)
    setOpenModalEdit(true)
  }
  const hanldeDelete = (id:any) => {
    lscn_trangthietbi.deleteById(id).then((res: any) => {
          getData()
          message.success("Xóa thành công")
    }).catch((err:any) => {
      console.log(err)
      message.error("Xóa thất bại")
    })
  }

  const columns: ColumnProps<DataType>[] = [
    {
      title: "TT",
      dataIndex: "Ma_LSM",
      width: 30,
      align: 'center',
      render: (text, record, index) => <span>{(((currentPage - 1) * 10) + index + 1)}</span>
    },
    {
      title: "Trang thiết bị",
      dataIndex: "TrangThietBi",
      align: "center",
      width: '20%',
      render: (TrangThietBi: any) => <div>{TrangThietBi?.Ten_TTB ? TrangThietBi?.Ten_TTB : ""}</div>
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => handleUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LS_TTB)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]

  const getTTB = () => {
    TrangthietbiServices.get({
      page: 1,
      size: 100
    }).then(res => {
      if (res.status) {
        if (res.status) {
          const temp = res.data.data.map((item: any) => {
            return {
              ...item,
              label: item?.Ten_TTB ,
              value: item?.Ma_TTB
            }
          } )
          setTrangThietBi(temp)
        }
        
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  const getData = () => {
   if (Ma_LSCN) {
    setLoading(true)
    lscn_trangthietbi.get({
      page: currentPage,
      size: 10,
      Ma_LSCN: Ma_LSCN
     }).then((res:any) => {
         if (res.status) {
          setCount(res?.data.count)
          setData(res?.data.data)
         }
         setLoading(false)
     }).catch((err:any) => {
      console.log(err)
      setLoading(false)
     })
   }
  }

  useEffect(() => {
    getTTB()
  }, [])
 
  useEffect(() => {
    getData()
  }, [currentPage, Ma_LSCN])
  return <div>
    {contextHolder}
    <Row>
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
        dataSource={data.map((item: any) => {
          return {
            ...item,
            key: item.Ma_LSM
          }
        })}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: 10,
          defaultPageSize: 10,
          showSizeChanger: true,
          total: count,
          showTotal: (total, range) => <span>Tổng số: {total}</span>,
          onShowSizeChange: (current, pageSize) => {
            setCurrentPage(current)
          },
          onChange: (pageNumber) => {
            setCurrentPage(pageNumber)
          }
        }}
      />
    </Row>
    <ModalAddEditChiTiet trangthietbi={trangthietbi} Ma_LSCN={Ma_LSCN} action="Add" open={openModalAdd} handleModal={handleModalAdd} getData={getData} curData={curData}/>
    <ModalAddEditChiTiet trangthietbi={trangthietbi} Ma_LSCN={Ma_LSCN} action="Edit" open={openModalEdit} handleModal={handleModalEdit} getData={getData} curData={curData}/>


  </div>;
};
const ModalAddEditChiTiet = React.lazy(() => import("./ModalAddChiTiet"))
export default ChiTietNhap;
