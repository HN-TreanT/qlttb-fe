import React, { useEffect, useState } from "react";
import {  Row, Col, Table, Breadcrumb, Divider, Popconfirm, Button, Select, Input, Tag } from "antd"
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import dayjs from "dayjs";
import { message } from "antd";
import { TrangthietbiServices } from "../../../utils/services/trangthietbiServices";
import { loaittbServices } from "../../../utils/services/loaittbSevices";
import { phonghocServices } from "../../../utils/services/phonghocSevices";
import LichSuTinhTrang from "./LichSuTinhTrang";
interface DataType {
  key: number;
  NgayNhap: Date;
  // SoDienThoai: string;
  Ten_TTB: string;

}

const TrangThietBi = () => {
  const dispatch = useDispatch()
  const actions = useAction()
  const { count, data } = useSelector((state: any) => state.trangthietbi.trangthietbis)
  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [search, setSearch] = useState<string>('')
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [loaiTTb, setLoaiTTB] = useState([])
  const [phongHoc, setPhongHoc] = useState([])
  const [maLoaiTTB, setMaLoaiTTB] = useState<any>()
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

  const hanldeDelete = async (id: number) => {
    try {
      const res = await TrangthietbiServices.deleteById(id)
      if (res.status) {
        dispatch(actions.trangthietbiAction.loadData({
          page: currentPage,
          size: rowsPerPage,
          ...(search && search !== "" && { Ten_TTB: search })
        }))
      } else {
        message.error(res.message)
      }
    } catch (err: any) {
      console.log(err)
      message.error("Xóa thất bại")
    }
  };

  const getLoaiTtb = () => {
    loaittbServices.get({
      page: 1,
      size: 100
    }).then((res: any) => {
      if (res.status) {
        const temp = res.data.data.map((item: any) => {
          return {
            ...item,
            value: item.Ma_Loai_TTB,
            label: item.Ten_Loai
          }
        })
        setLoaiTTB(temp)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  const getPhonghoc = () => {
    phonghocServices.get({
      page: 1,
      size: 100
    }).then((res: any) => {
      if (res.status) {
        const temp = res.data.data.map((item: any) => {
          return {
            ...item,
            value: item.Ma_PH,
            label: item.TenPhong
          }
        })
        setPhongHoc(temp)
      }
    }).catch((err: any) => {
      console.log(err)
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
      title: "Tên trang thiết bị",
      dataIndex: "Ten_TTB",
      align: "center"
    },
    {
      title: "Loại",
      dataIndex: "Loai_TTB",
      render: (Loai_TTB) => <div>{Loai_TTB ? Loai_TTB.Ten_Loai : ""}</div>,
      align: 'center',
    },
    {
      title: "Phòng học",
      dataIndex: "PhongHoc",
      render: (PhongHoc) => <div>{PhongHoc ? PhongHoc.TenPhong : ""}</div>,
      align: 'center',
    },
    {
      title: "Giảng đường",
      dataIndex: "PhongHoc",
      render: (PhongHoc) => <div>{PhongHoc ? PhongHoc.GiangDuong : ""}</div>,
      align: 'center',
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      render: (TrangThai) => <div>{TrangThai === 1 ? <Tag color="volcano">Đang mượn</Tag> : TrangThai === 0 ?  <Tag color="green" >Có sẵn</Tag> : <Tag color="red" >Hỏng</Tag>}</div>,
      align: 'center',
    },
    // {
    //   title: "Ngày nhập",
    //   dataIndex: "NgayNhap",
    //   align: 'center',
    //   width: '20%',
    //   render: (text, record, index) => <span>{text ? dayjs(text).format("DD/MM/YYYY") : ""}</span>
    // },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_TTB)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]
  useEffect(() => {
      getLoaiTtb()
      getPhonghoc()
  }, [])

  useEffect(() => {
    dispatch(actions.trangthietbiAction.loadData({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== "" && { Ten_TTB: search }),
      ...(maLoaiTTB && {Ma_Loai_TTB: maLoaiTTB})
    }))
  }, [actions.trangthietbiAction, dispatch, currentPage, rowsPerPage, search, maLoaiTTB])
  // console.log(data)
  return <div className="ds_trangthietbi">
    {contextHolder}
    <Row>
      <Breadcrumb
        style={{ margin: "auto", marginLeft: 0 }}
        items={[
          {
            title: "Quản lý trang thiết bị",
          },
          {
            title: (
              <span style={{ fontWeight: "bold" }}>Danh sách trang thiết bị</span>
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
    <Row gutter={15}>
      <Col span={6}>
        <div style={{ width: "100%", display:"flex", flexDirection:"column", justifyContent:"flex-start",alignItems:"flex-start"}}>
          <label style={{marginBottom:"4px"}}>Tên trang thiết bị</label>
          <Input
            type="text"
            placeholder="Tìm kiếm"
           
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
      <Col span={6}>
          <div style={{textAlign:"start", marginBottom:"4px"}}>Loại trang thiết bị</div>
          <Select style={{width:"100%"}} options={loaiTTb} placeholder="Loại trang thiết bị" allowClear onChange={(value) => setMaLoaiTTB(value) }/>     
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
            key: item.Ma_TTB
          }
        })}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return <LichSuTinhTrang  ttb={record} />
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
    <ModalAdd ten_PH={phongHoc} loai_ttbs={loaiTTb} curData={curData} action="Add" handleModal={hanldeModalAdd} open={openModalAdd} params={
      {
        page: currentPage,
        size: rowsPerPage,
        ...(search && search !== "" && { Ten_TTB: search })
      }
    }
    />
    <ModalAdd ten_PH={phongHoc} loai_ttbs={loaiTTb} curData={curData} action="Edit" handleModal={handleModalEdit} open={openModalEdit}
      params={
        {
          page: currentPage,
          size: rowsPerPage,
          ...(search && search !== "" && { Ten_TTB: search })
        }
      }
    />

  </div>;
};

const ModalAdd = React.lazy(() => import("./ModalAddTTB"))

export default TrangThietBi;
