import { Modal, Form, Row, Col, Table, Tag, Input, Checkbox, Button } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { ColumnProps } from "antd/es/table";
interface DataType {
    key: number;
    updatedAt: Date;
    TrangThai :any;
    ChuThich: any
    LichSuMuon: any;
}
interface props{
    open: boolean,
    handleModal: any,
    curData: any
}


const ModalTraTrangThietBi = (props: props) => {
    const {open, handleModal, curData} = props

    const [dataSource, setDataSource] = useState([])
    const [infoSelected, setInfoSelected] = useState<any[]>([])


    const hanldeSubmit = () => {
        console.log(infoSelected)
    }
    const handleCloseMOdal = () => {
      handleModal()
      setDataSource([])
    }
    const columns: ColumnProps<DataType>[] = [
        {
          title: "TT",
          dataIndex: " Ma_LSM_TTB",
          width: 30,
          align: 'center',
          render: (text, record, index) => <span>{index + 1}</span>
        },
        {
          title: "Trang thiết bị",
          dataIndex: "TrangThietBi",
          align: "center",
          width: '15%',
          render: (TrangThietBi) => <span>{TrangThietBi?.Ten_TTB ? TrangThietBi?.Ten_TTB : ""}</span>
        },
        {
          title: "Trạng thái",
          dataIndex: "TrangThai",
          align: 'center',
          width: '13%',
          render: (TrangThai) => <div>{TrangThai !== "Chưa trả" ?  <Tag color="green" >Đã trả</Tag> : <Tag color="volcano">Đang mượn</Tag>}</div>,

        },
        {
          title: "Nhận xét",
          dataIndex: "NhanXet",
          render: () => <Input placeholder="Nhập nhận xét"/>
        },
        {
          title: "Hỏng",
          width: '7%',
          render: (record: any) => <Checkbox onChange={(e: any) => {
              const updateInfoSeleted = infoSelected.map((item: any) => {
                if(item.Ma_LSM_TTB === record?.Ma_LSM_TTB) {
                    item.Hong = e.target.checked
                }
                return item
              })
              setInfoSelected(updateInfoSeleted)
          }} />,
          align: 'center'
        }
      ]
      
      useEffect(() => {
        setDataSource(Array.isArray(curData?.LSM_TTB) ? curData?.LSM_TTB.map((item: any) => {
          return {
            ...item,
            key: item?.Ma_LSM_TTB
          }
        } ) : [])
      
      }, [curData])
    return <Modal
        width={700}
        open={open} 
        onCancel={() => handleCloseMOdal()}
        footer={null}
        title="Trả trang thiết bị"
    >
     <Table
         rowSelection={{
          type: "checkbox",
          ...{
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
               setInfoSelected(selectedRows)
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        
     />

     <Row gutter={15}>
        <Button onClick={()=> hanldeSubmit()}>Trar</Button>
     </Row>
    </Modal>
}

export default ModalTraTrangThietBi