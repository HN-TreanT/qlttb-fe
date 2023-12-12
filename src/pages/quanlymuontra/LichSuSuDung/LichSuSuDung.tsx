import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Input, Tag, Select, DatePicker } from "antd"
import { ColumnProps } from "antd/es/table";
import { message } from "antd";
import {  EyeOutlined } from '@ant-design/icons'

import TrangThietBi from "./TrangThietBi";
import { muontraServices } from "../../../utils/services/muontraService";
import dayjs from "dayjs";
import { canboServices } from "../../../utils/services/canbo";
import locale from 'antd/es/date-picker/locale/vi_VN'
const { RangePicker } = DatePicker;
interface DataType {
  key: number;
  updatedAt: Date;
  Ten_Loai: string;
}
const LichSudung = () => {
  // const loading = useSelector((state: any) => state.state.loadingState)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerpage] = useState(10)
  const [search, setSearch] = useState<string>('')
  const [searchMaCB, setSearchMaCB] = useState<any>()
  const [khoangthoigian, setKhoangThoiGian] = useState<any>()
  const [canbos, setCanbos] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)
  const [curData, setCurdata] = useState<any>()
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setOpenModal(false)
  }
  const handleDetail = (data: any) => {
    setCurdata(data)
    setOpenModal(true)
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
      title: "Ngày mượn",
      dataIndex: "createdAt",
      align: 'center',
      // width: '20%',
      render: (createdAt) => <div>{createdAt  ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>,
      // render: (LichHoc: any) => <div>{LichHoc?.NgayHoc ? dayjs(LichHoc?.NgayHoc).format("DD/MM/YYYY") : ""}</div>
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "LichHoc",
      align: 'center',
      // width: '20%',
      render: (LichHoc: any) => <div>{LichHoc?.TG_BD ? LichHoc?.TG_BD : ""}</div>
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "LichHoc",
      align: 'center',
      // width: '20%',
      render: (LichHoc: any) => <div>{LichHoc?.TG_KT ? LichHoc?.TG_KT : ""}</div>
    },
  
  
  
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      align: 'center',
      width: '7%',
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
        <EyeOutlined onClick={() => handleDetail(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />     
      </div>
    }
  ]

  //get can bo
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

  const getData = () => {
    setLoading(true)
    muontraServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== "" && { ten_nguoi_muon: search }),
      ...(searchMaCB && { Ma_CB: searchMaCB }),
      ...(khoangthoigian && {batdau: khoangthoigian?.batdau , ketthuc: khoangthoigian?.ketthuc})
    }).then(res => {
      if (res.status) {
        setCount(res.data.count)
        setData(res.data.data)
        
      }
      setLoading(false)
    }).catch((err: any) => {
      console.log(err)
      setLoading(false)
    })
  }
  useEffect(() => {
    getCanbo()
  }, [])
 
  useEffect(() => {
    getData()
  }, [currentPage, rowsPerPage, search, searchMaCB, khoangthoigian])

  const hanldeChangeRangePicker = (value: any) => {
    if (value) {
      const data = {
        batdau: dayjs(value[0]),
        ketthuc: dayjs(value[1])
      }
      setKhoangThoiGian(data)
    }else {
      setKhoangThoiGian(null)
    }
  }
  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
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
              <span style={{ fontWeight: "bold" }}>Lịch sử mượn</span>
            ),
          },
        ]}
      />
   
      <Divider style={{ margin: "10px" }}></Divider>
    </Row>
    <Row gutter={15}>
      <Col span={6}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "4px" }}>Tên người mượn</label>
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
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "4px" }}>Nhân viên phụ trách</label>
            <Select filterOption={filterOption} allowClear showSearch options={canbos} style={{width:"100%"}} onChange={(value) => setSearchMaCB(value) } placeholder="Chọn nhân viên phụ trách"/>
          </div>
       </Col>
       <Col span={6}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <label style={{ marginBottom: "4px" }}>Chọn khoảng thời gian</label>
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
        dataSource={data.map((item: any) => {
          return {
            ...item,
            key: item.Ma_LSM
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
    <ModalChiTiet open={openModal} handleModal={handleModal} curData={curData}/>

  </div>;
};

const ModalChiTiet = React.lazy(() => import("./ModalChitiet"))
export default LichSudung;
