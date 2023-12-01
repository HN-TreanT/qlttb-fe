import React, { useEffect, useState } from "react";
import { Row, Table, Breadcrumb, Divider, Popconfirm, Button, Tooltip, Tag } from "antd"
import { useDispatch } from "react-redux";
import useAction from "../../redux/useActions";
import { DeleteOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import { message } from "antd";
import { muontraServices } from "../../utils/services/muontraService";
import { TrangthietbiServices } from "../../utils/services/trangthietbiServices";
import { lichhoctapServices } from "../../utils/services/lichhoctapService";
import ChiTietMuonTra from "./ChiTietMuonTra";
import { canboServices } from "../../utils/services/canbo";
import Filter from "./Filter";
interface DataType {
  key: number;
  updatedAt: Date;
  Ten_Loai: string;
  Ma_LSM : any
}


const MuonTra = () => {
  const dispatch = useDispatch()
  const actions = useAction()
  const [loading, setLoading]= useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(9)
  const [searchTenNguoiMuon, setSearchTenNguoiMuon] = useState<string>('')
  const [searchMaCB, setSearchMaCB] = useState<any>('')

  const [canbos, setCanbos] = useState([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalTraThietBij, setOpenModalTraThietBi]= useState(false)
  const [curData, setCurData] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const [trangThietBi, setTrangThietBi] = useState([]);
  const [lichhoc, setLichHoc] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const hanldeModalAdd = () => {
    setOpenModalAdd(false)
  }
  const handleModalEdit = () => {
    setOpenModalEdit(false)
  }

  const handleModalTraThietBi = () => {
    setOpenModalTraThietBi(false)
  }

  const hanldUpdate = (data: any) => {

    setCurData(data)
    setOpenModalEdit(true)
  }

  const handleTraThietBi = (data: any) => {
    setCurData(data)
    setOpenModalTraThietBi(true)
  }

  const hanldeDelete = async (id: number) => {
    try {
      const res = await muontraServices.deleteById(id)
      if (res.status) {
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
      dataIndex: "Ma_LSM",
      width: 30,
      align: 'center',
      render: (text, record, index) => <span>{(((currentPage - 1) * rowsPerPage) + index + 1)}</span>
    },
    {
      title: "Tên người mượn",
      dataIndex: "NguoiMuon",
      align: "center",
      width: '15%',
    },
    {
      title: "Số điện thoại",
      dataIndex: "SoDienThoai",
      align: 'center',
      width: '15%',

    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "CanBo",
      align: 'center',
      width: '20%',
      render: (CanBo: any) => <div>{CanBo?.Ten_CB ? CanBo?.Ten_CB : ""}</div>
    },
  
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      align: 'center',
      width: '13%',
      render: (TrangThai) => <div>{TrangThai === 0 ? <Tag color="volcano">Đang mượn</Tag> : <Tag color="green" >Đã trả</Tag>}</div>,

    },
    {
      title: "Chú thích",
      dataIndex: "ChuThich",

    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record: any, index: any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
         <Tooltip placement="top" title="Trả thiết bị">
            <UndoOutlined onClick={() => handleTraThietBi(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
         </Tooltip>
        <EditOutlined onClick={() => hanldUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => hanldeDelete(record.Ma_LSM)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ]
  //lay dữ liệu cán bộ 
  const getCanbo = () => {
    canboServices.get({
      page: 1, 
      size: 100
    }).then((res) => {
   
      if(res.status) {
          const temp = res?.data?.data.map((item: any) => {
            return {
              label: item?.Ten_CB,
              value: item?.Ma_CB
            }
        })
        setCanbos(temp)
        
      }
      
    }).catch((err :any) => console.log(err))
  }
  //lấy trang thiết bị
  const getTTB = () => {
    TrangthietbiServices.get({
      page: 1,
      size: 100
    }).then(res => {
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
    }).catch((err: any) => {
      console.log(err)
    })
  }
  //lấy dữ liệu lịch sử mượn
  const getData = () => {
    setLoading(true)
    muontraServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(searchTenNguoiMuon && searchTenNguoiMuon !== "" && { ten_nguoi_muon: searchTenNguoiMuon }),
      ...(searchMaCB && { Ma_CB: searchMaCB })
    }).then(res => {
      if (res.status) {
        const temp = res.data.data.map((item: any) => {
          const lst_id_ttb = Array.isArray(item?.LSM_TTB) ? item.LSM_TTB.map((ttb: any) => {
            return ttb?.TrangThietBi?.Ma_TTB
          }) : []
          return {
            ...item,
            lst_id_ttb: lst_id_ttb
          }
        })
        setCount(res.data.count)
        setData(temp)

      }
      setLoading(false)
    }).catch((err: any) => {
      console.log(err)
      setLoading(false)
    })
  }
 
  //lấy dữ liệu lịch học
  const getLichHoc = () => {
    lichhoctapServices.get({
      page: 1,
      size: 100
    }).then(res => {
      if (res.status) {
        setLichHoc(res.data.data)
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getLichHoc();
    dispatch(actions.phonghocAction.loadData({
      page: 1,
      size: 100,
    })) 
    getTTB()
    getCanbo()
  }, [])
  useEffect(() => {
    getData()
  }, [currentPage, rowsPerPage, searchTenNguoiMuon, searchMaCB])
  // console.log(data)
  return <div className="ds_muontra">
    {contextHolder}
    <Row>
      <Breadcrumb
        style={{ margin: "auto", marginLeft: 0 }}
        items={[
          {
            title: "Mượn trả trang thiết bị",
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
    <Filter setSearchMaCB={setSearchMaCB} setSearchTenNguoiMuon={setSearchTenNguoiMuon} setCurrentPage={setCurrentPage} canbos={canbos}/>
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
        expandable={{
          expandedRowRender: (record) => {
            return <ChiTietMuonTra trangThietBi={trangThietBi}  Ma_LSM={record?.Ma_LSM} />
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
    <ModalMuonTra  lichhoc={lichhoc} trangThietBi={trangThietBi} curData={curData} open={openModalAdd} handleModal={hanldeModalAdd} action="Add" getData={getData} /> 
     <ModalMuonTra lichhoc={lichhoc} trangThietBi={trangThietBi} curData={curData} open={openModalEdit} handleModal={handleModalEdit} action="Edit" getData={getData} />
    <ModalTraTrangThietBi open={openModalTraThietBij} handleModal={handleModalTraThietBi} curData={curData} />
  </div>;
};

const ModalMuonTra = React.lazy(() => import("./ModalMuonTra"))
const ModalTraTrangThietBi = React.lazy(() => import("./ModalTraThietBi"))
export default MuonTra;
