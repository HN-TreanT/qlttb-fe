import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Popconfirm, Button, Select, DatePicker, Upload, UploadProps } from "antd"
import { DeleteOutlined, EditOutlined , UploadOutlined} from '@ant-design/icons'
import { ColumnProps } from "antd/es/table";
import useAction from "../../../redux/useActions";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { lopServices } from "../../../utils/services/lopService";
import LopThamGia from "./LopThamGia";
import locale from 'antd/es/date-picker/locale/vi_VN'
import { lichhoctapServices } from "../../../utils/services/lichhoctapService";
const { RangePicker } = DatePicker;
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
  const phongshoc = useSelector((state :any) => state.phonghoc.phonghocs)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [curData, setCurData] = useState({})
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [search, setSearch] = useState<string>('')
  const [lops, setLops]= useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const [searchPhongHoc, setSearchPhongHoc] = useState<any>()
  const [searchNgayHoc, setSearchNgayhoc] = useState<any>()



  const hanldeChangeRangePicker = (value: any) => {
    if (value) {
      const data = {
        batdau: dayjs(value[0]),
        ketthuc: dayjs(value[1])
      }
      setSearchNgayhoc(data)
    }else {
      setSearchNgayhoc(null)
    }
  }

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
      ...(search && search !== " " && { search }),
      ...(searchPhongHoc && {Ma_PH: searchPhongHoc}),
      ...(searchNgayHoc && {batdau: searchNgayHoc?.batdau , ketthuc: searchNgayHoc?.ketthuc})

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
   
  }, [currentPage, rowsPerPage, search, searchPhongHoc, searchNgayHoc])
  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const props: UploadProps = {
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    // listType: 'picture',
    beforeUpload(file: any) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
         const formData = new FormData()
         formData.set("file", file)
         lichhoctapServices.importExcel(formData).then((res) => {
            if (res.status) {
               getData()
               message.success("Nhập file thành công")
            }
         }).catch((err :any) => {
          console.log(err)
           message.error("Nhập file thất bại")

         })
      
        };
      });
    },
  }
  return <div className="ds_canbo">
    {contextHolder}
    <Row>
      <Col span={12}>
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
      </Col>
      <Col span={8}></Col>
      <Col style={{display:"flex", justifyContent:"flex-end"}} span={4}>
            <Upload
            {...props}
            >
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
      <Col span={4}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "4px" }}>Phòng học</label>
          <Select
            onChange={(value) => setSearchPhongHoc(value)}
           style={{width:"100%"}} allowClear showSearch 
          options={Array.isArray(phongshoc?.data) ? phongshoc?.data.map((item: any) => {
              return {
                  ...item,
                  value: item?.Ma_PH ,
                  label: item?.TenPhong
              }
          }) : []} placeholder="Chọn  phòng học"
              filterOption={filterOption}
              />
        </div>
      </Col>
      <Col span={4}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "4px" }}>Ngày học</label>
          <RangePicker locale={locale} format={"DD/MM/YYYY"} onChange={(value: any) => hanldeChangeRangePicker(value)} placeholder={["Bắt đầu", "Kết thúc"]}/>
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
