import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Breadcrumb, Divider, Popconfirm, Space, Tooltip, Button, Select, Typography, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import useDebounce from "../../../hooks/useDebounce";
import dayjs from "dayjs";
import { message } from "antd";
import { lichsusudungServices } from "../../../utils/services/lichsususungService";
import { error } from "console";
import TrangThietBi from "./TrangThietBi";
import { TrangthietbiServices } from "../../../utils/services/trangthietbiServices";

interface DataType {
  key: number;
  updatedAt: Date;
  Ten_Loai: string;
}
const LichSudung = () => {
  const dispatch = useDispatch()
  const actions = useAction()
  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(9)
  const [search, setSearch] = useState<string>('')
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const [trangThietBi, setTrangThietBi] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
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
      const res = await lichsusudungServices.deleteById(id)
      if (res.status) {
        // dispatch(actions.muontraAction.loadData({
        //   page: currentPage,
        //   size: rowsPerPage,
        //   ...(search && search !== "" && { NguoiMuon: search })
        // }))
        getData();
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
      dataIndex: " Ma_LSM_TTB",
      width: 30,
      align: 'center',
      render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
    },
    {
      title: "Tên người mượn",
      dataIndex: "LichSuMuon",
      align: "center",
      render: (LichSuMuon) => <span>{LichSuMuon?.NguoiMuon ? LichSuMuon?.NguoiMuon : ""}</span>
    },
    {
      title: "Số điện thoại",
      dataIndex: "LichSuMuon",
      align: 'center',
      width: '20%',
      render: (LichSuMuon) => <span>{LichSuMuon?.SoDienThoai ? LichSuMuon?.SoDienThoai : ""}</span>
    },
    {
      title: "chú thích",
      dataIndex: "LichSuMuon",
      align: 'center',
      width: '20%',
      render: (LichSuMuon) => <span>{LichSuMuon?.ChuThich ? LichSuMuon?.ChuThich : ""}</span>
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      render: (TrangThai) => <div>{TrangThai == 0 ? "Đang mượn" : " đã trả "}</div>,
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LSM_TTB)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
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
        setTrangThietBi(res.data.data)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  const getData = () => {
    lichsusudungServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== "" && { Ten_CB: search })
    }).then(res => {
      if (res.status) {
        setCount(res.data.count)
        setData(res.data.data)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getTTB();
  }, [])
  useEffect(() => {
    getData()
  }, [currentPage, rowsPerPage, search])
  // console.log(data)
  return <div className="ds_muontra">
    {contextHolder}
    <Row>
      <Breadcrumb
        style={{ margin: "auto", marginLeft: 0 }}
        items={[
          {
            title: "Quản lý lịch sử mượn",
          },
          {
            title: (
              <span style={{ fontWeight: "bold" }}>Danh sách mượn</span>
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
          <label style={{ marginBottom: "4px" }}>Tên người mượn</label>
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
        dataSource={data.map((item: any) => {
          return {
            ...item,
            key: item.Ma_LSM_TTB
          }
        })}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => {
            return <TrangThietBi ttb={record} />
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
    {/* <ModalAdd trangThietBi={trangThietBi} curData={curData} open={openModalAdd} handleModal={hanldeModalAdd} action="Add" getData={getData} />
    <ModalAdd trangThietBi={trangThietBi} curData={curData} open={openModalEdit} handleModal={handleModalEdit} action="Edit" getData={getData} /> */}

  </div>;
};

// const ModalAdd = React.lazy(() => import("./ModalMuonTra"))

export default LichSudung;
