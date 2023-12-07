import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Row, Divider, Popconfirm, message, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { lichsusudungServices } from "../../utils/services/lichsususungService";
import { ColumnProps } from "antd/es/table";

interface DataType {
    key: number;
    updatedAt: Date;
    TrangThai :any;
    ChuThich: any
    LichSuMuon: any;
  }

  interface props {
    Ma_LSM: any,
    trangThietBi: any[],
    getTTB:any
  }
const ChiTietMuonTra = (props: props) => {
    const {Ma_LSM, getTTB} = props
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(9)
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const [curData, setCurData] = useState({})
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const handleModalAdd = () => {
      setOpenModalAdd(false)
    }
    const handleModalEdit = () => {
      setOpenModalEdit(false)
    }

    

    const getData = () => {
      if (Ma_LSM) {
        setLoading(true)
        lichsusudungServices.get({
          page : 1,
          size: 100,
          Ma_LSM: Ma_LSM
        }).then((res :any) => {
           if(res.status) {
            setData(res.data.data)
            setCount(res.data.count)
           }
           setLoading(false)
        }).catch((err:any) => {
          console.log(err)
          setLoading(false)
        })
      } else {
        setData([])
      }
    }

    const handleUpdate = (data :any) => {
      setCurData(data)
      setOpenModalEdit(true)
    }
    const handleDelete = (id :any) => {
      lichsusudungServices.deleteById(id).then((res: any) => {
        if(res.status) {
          getData()
          getTTB()
           message.success("Xóa thành công")
        }
      }).catch((err: any) => {
        console.log(err)
        message.error("Xóa thất bại")
      })
    }

    const columns: ColumnProps<DataType>[] = [
        {
          title: "TT",
          dataIndex: " Ma_LSM_TTB",
          width: 30,
          align: 'center',
          render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
        },
        {
          title: "Trang thiết bị",
          dataIndex: "TrangThietBi",
          align: "center",
          render: (TrangThietBi) => <span>{TrangThietBi?.Ten_TTB ? TrangThietBi?.Ten_TTB : ""}</span>
        },
        {
          title: "Trạng thái",
          dataIndex: "TrangThai",
          align: 'center',
         render: (TrangThai) => <div>{TrangThai === "Đang mượn" ? <Tag color="volcano">Đang mượn</Tag> : <Tag color="geekblue" >Đã trả</Tag> }</div>,

        },
        {
          title: "Nhận xét",
          dataIndex: "NhanXet",    
          width: '20%',
        },
       
        {
          title: 'Thao tác',
          width: '108px',
          render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
    
            <EditOutlined onClick={() => handleUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
            <Popconfirm onConfirm={() => handleDelete(record.Ma_LSM_TTB)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
              <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
            </Popconfirm>
          </div>
        }
      ]
    useEffect(() => {
       getData()
    }, [Ma_LSM])
    return <Fragment>
        {contextHolder}
         <Row>
            <h3>Danh sách thiết bị mượn</h3>
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
      <Modal getTTB={getTTB} Ma_LSM={Ma_LSM} action="Add" open={openModalAdd} handlModal={handleModalAdd} curData={curData} trangThietBi={props.trangThietBi} getData={getData}/>
      <Modal getTTB={getTTB} Ma_LSM={Ma_LSM} action="Edit" open={openModalEdit} handlModal={handleModalEdit} curData={curData} trangThietBi={props.trangThietBi} getData={getData}/>

    </Fragment>
    
}

const Modal = React.lazy(() => import("./ModalAddChiTietMuonTra"))

export default ChiTietMuonTra