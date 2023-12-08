import React, { useEffect, useState } from "react";
import { Row, Col, Table, Breadcrumb, Divider, Input, Tag } from "antd"
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions"
import { ColumnProps } from "antd/es/table";
import { message } from "antd";
import TrangThietBi from "./TrangThietBi";
import { muontraServices } from "../../../utils/services/muontraService";
import dayjs from "dayjs";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0)


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
      title: "Ngày học",
      dataIndex: "LichHoc",
      align: 'center',
      // width: '20%',
      render: (LichHoc: any) => <div>{LichHoc?.NgayHoc ? dayjs(LichHoc?.NgayHoc).format("DD/MM/YYYY") : ""}</div>
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
      width: '13%',
      render: (TrangThai) => <div>{TrangThai === 0 ? <Tag color="volcano">Đang mượn</Tag> : <Tag color="green" >Đã trả</Tag>}</div>,

    },
    {
      title: "Chú thích",
      dataIndex: "ChuThich",

    },
  ]

  const getData = () => {
    setLoading(true)
    muontraServices.get({
      page: currentPage,
      size: rowsPerPage,
      ...(search && search !== "" && { Ten_CB: search })
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
    getData()
  }, [currentPage, rowsPerPage, search])
 
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
    

  </div>;
};

export default LichSudung;
