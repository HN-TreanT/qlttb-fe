import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table, Breadcrumb, Divider, Popconfirm, Tooltip, Button, Select, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import useDebounce from "../../../hooks/useDebounce";
import dayjs from "dayjs";
import { message } from "antd";
import { TinhTrangTTBServices } from "../../../utils/services/tinhtrangTTB";
interface DataType {
  key: number;
  ViTri: string;
  TinhTrang: string;
  GhiChu: string

}

const TinhTrangTTB = () => {
  const dispatch = useDispatch()
  const actions = useAction()
  const { count, data } = useSelector((state: any) => state.tinhtrangttb.tinhtrangTTB)
  const loading = useSelector((state: any) => state.state.loadingState)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [search, setSearch] = useState<string>('')
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const hanldeModalAdd = () => {
    setOpenModalAdd(false)
  }
  const handleModalEdit = () => {
    setOpenModalEdit(false)
    setCurData({})
  }

  const hanldUpdate = (data: any) => {
    setCurData(data)
    setOpenModalEdit(true)
  }

  const hanldeDelete = async (id: number) => {
      TinhTrangTTBServices.deleteById(id).then((res) => {
        dispatch(actions.tinhtrangTTBActions.loadData({
          page: currentPage,
          size: rowsPerPage
        }))
      }).catch((err :any) => {
        console.log(err)
        message.error("Xóa tình trạng thất bại")
      })
  };

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
      dataIndex: "TinhTrang",
      align: "center"
    },
    {
      title: "Vị trí",
      dataIndex: "ViTri",
      align: "center"
     
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_TTTTB)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]

  useEffect(() => {
    dispatch(actions.tinhtrangTTBActions.loadData({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== "" && {TinhTrang: search})
    }))
  }, [actions.tinhtrangTTBActions, currentPage, dispatch, rowsPerPage, search])
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
              <span style={{ fontWeight: "bold" }}>Loại tình trạng trang thiết bị</span>
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
    <ModalAdd curData={curData} action="Add" open={openModalAdd} handleModal={hanldeModalAdd} params={{
        page: currentPage,
        size: rowsPerPage,
    }}/>
    <ModalAdd curData={curData} action="Edit" open={openModalEdit} handleModal={handleModalEdit} params={{
        page: currentPage,
        size: rowsPerPage,
    }}/>

  </div>;
};

const ModalAdd = React.lazy(() => import("./ModalAdd"))
export default TinhTrangTTB;
