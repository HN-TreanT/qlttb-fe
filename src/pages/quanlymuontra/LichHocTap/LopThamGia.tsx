import React, { Fragment, useEffect, useState } from "react";
import { Divider, Popconfirm, Row, Table } from 'antd'
import { message } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons' 
import { lichHoc_LopServices } from "../../../utils/services/lichhoc_lopServices";
import { ColumnProps } from "antd/es/table";
interface Props {
    Ma_LH: any,
    // action: string
   
}
interface DataType {
  key: number;
  Code: string;
  TenLop: string;
}



const LopThamGia = (props: Props) => {
    const { Ma_LH } = props
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(9)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)


    const handleUpdate = (data:any) => {}
    const handleDelete = (id : any) => {}
    const columns: ColumnProps<DataType>[] = [
      {
        title: "TT",
        dataIndex: "ID",
        width:30,
         align: 'center',
         render: (text, record, index) => <span>{index + 1}</span>
      },
      {
        title: "Mã lớp ",
        dataIndex: "Lop",
        align:"center",
        render: (text, record, index) => <span>{text?.Code ? text?.Code : ""}</span>
      },   
      {
        title:"Tên lớp",
        dataIndex: "Lop",
        align: 'center',
        render: (text, record, index) => <span>{text?.Ten_Lop ? text?.Ten_Lop : ""}</span>

      //   width: '10%',
      },
      {
          title: 'Thao tác',
          width: '108px',
          render: (record: any, index :any) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>
              
                <EditOutlined onClick={() => handleUpdate(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer'}} />     
                  <Popconfirm onConfirm={() => handleDelete(record.Ma_LH_Lop)} title="Bạn chắc chắn xóa?"cancelText='Hủy' okText='Đồng ý'>
                      <DeleteOutlined  style={{ color: 'red', cursor: 'point' }} />
                  </Popconfirm>
          </div>
      }
  ]
    const getData = () => {
       if(Ma_LH) {
        setLoading(true)
        lichHoc_LopServices.get({
          page: currentPage,
          size: rowsPerPage,
          Ma_LH: Ma_LH
        }).then((res :any) => {

           if(res.status){
            setCount(res?.data?.count)
            setData(res?.data?.data)
           }
           setLoading(false)
        }).catch((err :any) => {
          console.log(err)
          setLoading(false)
        })
       }
    }

    useEffect(() => {
      getData()
    }, [currentPage, rowsPerPage, Ma_LH])
  return  <Fragment>
     <Row>
      <h3>Lớp tham gia</h3>
        {/* <Button
          type="primary"
          style={{ marginLeft: "auto", width: 100 }}
          className="blue-button"
        
        >
          Thêm mới
        </Button> */}
      <Divider style={{ margin: "10px" }}></Divider>
    </Row>
      <Table
       loading={loading}
        columns={columns}
        dataSource={data}
        bordered
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
  </Fragment>
};

export default LopThamGia;
