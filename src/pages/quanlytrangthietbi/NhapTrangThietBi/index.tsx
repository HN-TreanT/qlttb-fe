import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Input, Tag, Button, Popconfirm, Select, Upload } from "antd"
import { ColumnProps } from "antd/es/table";
import { message } from "antd";
import dayjs from "dayjs";
import { lichsucapnhat } from "../../../utils/services/lichsucapnhat";
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons'
import { canboServices } from "../../../utils/services/canbo";
import ChiTietNhap from "./ChiTietNhap";
interface DataType {
  key: number;
  createdAt: Date;
  CanBo: any;
  LoaiCapNhat: string,
  NoiDung: string
}
const NhapThietBi = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [search, setSearch] = useState<string>('')
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)

  const [canbos, setCanbos] = useState([])

  const [Ma_CB, setMaCB] = useState<any>()
  const [LoaiCapNhat, setLoaiCapNhat] = useState<any>()

  const [curData, setCurData] = useState({})
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
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
    lichsucapnhat.deleteById(id).then((res: any) => {
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
      render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
    },
    {
      title: "Cán bộ phụ trách",
      dataIndex: "CanBo",
      align: "center",
      width: '20%',
      render: (CanBo: any) => <div>{CanBo?.Ten_CB ? CanBo?.Ten_CB : ""}</div>
    },
    {
      title: "Loại cập nhập",
      dataIndex: "LoaiCapNhat",
      align: 'center',
      width: '15%',
      render: (LoaiCapNhat: any) => <div>{LoaiCapNhat === "thaymoi" ? "Thay mới" : "Sửa chữa"}</div>
    },
    {
      title: "Ngày thực hiện",
      dataIndex: "createdAt",
      align: 'center',
      // width: '20%',
      render: (createdAt: any) => <div>{createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => handleUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LSCN)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]

  const getCanbo = () => {
    canboServices.get({
      page: 1,
      size: 100
    }).then((res: any) => {
        if(res.status) {
          const temp = res?.data?.data.map((item: any) => {
            return {
              label: item?.Ten_CB,
              value: item?.Ma_CB
            }
        })
        setCanbos(temp)
        
      }
    })
  }

  const getData = () => {
     lichsucapnhat.get({
      page: currentPage,
      size: rowsPerPage,
      ...(Ma_CB && {Ma_CB: Ma_CB}),
      ...(LoaiCapNhat && {LoaiCapNhat: LoaiCapNhat}),
     }).then((res:any) => {
         if (res.status) {
          setCount(res?.data.count)
          setData(res?.data.data)
         }
     }).catch((err:any) => {
      console.log(err)
     })
  }
 
  useEffect(() => {
   getCanbo()
  }, [])
  useEffect(() => {
    getData()
  }, [currentPage, rowsPerPage, Ma_CB, LoaiCapNhat])
  const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return <div className="ds_muontra">
    {contextHolder}
    <Row>
      <Col span={12}>
        <Breadcrumb
          style={{ margin: "auto", marginLeft: 0 }}
          items={[
            {
              title: "Quản lý trang thiết bị",
            },
            {
              title: (
                <span style={{ fontWeight: "bold" }}>Cập nhật trang thiết bị</span>
              ),
            },
          ]}
        />
      </Col>
      <Col span={6}></Col>
       <Col style={{display:"flex", justifyContent:"flex-end"}} span={6}>
        <Upload >
          <Button style={{backgroundColor:"#24A019", color:"white"}} icon={<UploadOutlined />}>Upload</Button>
        </Upload>
          <Button
          style={{   marginLeft:"5px"}}
            type="primary"
            className="blue-button"
            onClick={() => {
              setOpenModalAdd(true)
              setCurData({})
            }}
          >
            Thêm mới
          </Button>
       </Col>
      <Divider style={{ margin: "10px" }}></Divider>
    </Row>
    <Row gutter={15}>
      <Col span={6}>     
          <div style={{ marginBottom: "4px" , textAlign:"start"}}>Cán bộ phụ trách</div>
          <Select onChange={(value) => setMaCB(value)} style={{width:"100%"}} allowClear showSearch filterOption={filterOption} options={canbos} placeholder="Chọn cán bộ phụ trách"/>    
      </Col>
      <Col span={6}>     
          <div style={{ marginBottom: "4px", textAlign:"start" }}>Loại cập nhật</div>
          <Select  onChange={(value) => setLoaiCapNhat(value)} style={{width:"100%"}} allowClear showSearch filterOption={filterOption} options={ [
          {
              label:"Thay mới",
              value: "thaymoi"
          },
          {
              label:"Sửa chữa",
              value: "suachua"
          }
      ]} placeholder="Chọn loại cập nhật"/>    
      </Col>
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
            key: item.Ma_LSCN
          }
        })}
        columns={columns}
        expandable={{
          expandedRowRender: (record: any) => {
            return <ChiTietNhap Ma_LSCN={record?.Ma_LSCN} />
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
    <ModalAddEdit action="Add" open={openModalAdd} handleModal={handleModalAdd} getData={getData} curData={curData}/>
    <ModalAddEdit action="Edit" open={openModalEdit} handleModal={handleModalEdit} getData={getData} curData={curData}/>


  </div>;
};
const ModalAddEdit = React.lazy(() => import("./ModalAddEdit"))
export default NhapThietBi;
