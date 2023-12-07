import { Modal, Form, Row, Col, Table, Tag, Input, Checkbox, Button, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { ColumnProps } from "antd/es/table";
import { lichsusudungServices } from "../../utils/services/lichsususungService";
import { muontraServices } from "../../utils/services/muontraService";
import { TinhTrangTTBServices } from "../../utils/services/tinhtrangTTB";
import { LichSuTinhTrangServices } from "../../utils/services/lichsuTinhTrang";
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
    curData: any,
    getData: any
}


const ModalTraTrangThietBi = (props: props) => {
    const {open, handleModal, curData, getData} = props
    const [messageApi, contextHolder] = message.useMessage();
    const [dataSource, setDataSource] = useState([])
    const [infoSelected, setInfoSelected] = useState<any[]>([])
    const [loading, setLoading] = useState(false)


    const getDataDD = () => {
      if (curData?.Ma_LSM) {
        setLoading(true)
        lichsusudungServices.get({
          page : 1,
          size: 100,
          Ma_LSM: curData?.Ma_LSM
        }).then((res :any) => {
           if(res.status) {
            setDataSource(res.data.data)   
            setInfoSelected(res.data.data)  
           }
           setLoading(false)
          
        }).catch((err:any) => {
          console.log(err)
          setLoading(false)
         
        })
      } 
    }

    const hanldeSubmit =async () => {
   
        const dataSubmit = infoSelected.map((item: any) => {
          return {
            Ma_LSM_TTB: item?.Ma_LSM_TTB,
            Ma_LSM: item?.Ma_LSM,
            Ma_TTB: item?.Ma_TTB,
            NhanXet: item?.Hong ? item?.NhanXet : "Thiết bị hoạt động bình thường",
            TrangThai: "Đã trả",
            Hong: item?.Hong
          }
        })
       try {
            await muontraServices.traThietBi(curData?.Ma_LSM, dataSubmit) 
            // dataSubmit.forEach(async (item :any) => {
            //     await lichsusudungServices.update(item?.Ma_LSM_TTB, {
            //         TrangThai: "Đã trả",
            //         NhanXet: item.NhanXet,
            //     })
            //     if(item.Hong){
            //       TinhTrangTTBServices.create({
            //         GhiChu: "",
            //         ViTri: "",
            //         TinhTrang: item?.NhanXet
            //       }).then((res: any) => {
            //           if(res.status) {
            //               const Ma_TTTTB = res.data.Ma_TTTTB
            //              LichSuTinhTrangServices.create({
            //                Ma_TTTTB: Ma_TTTTB,
            //                Ma_TTB: item?.Ma_TTB
            //              })
            //           }
            //       })
            //     }
            // })
            handleModal()
            getData()
            message.success("Trả thiết bị thành công")
       } catch (err: any) {
          console.log(err)
          message.error("Trả thiết bị thất bại")
       }
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
          title: "Nhận xét",
          // dataIndex: "NhanXet",
          render: (record: any) => <Input onChange={(e: any) => {
            const updateInfoSeleted = infoSelected.map((item: any) => {
              if(item.Ma_LSM_TTB === record?.Ma_LSM_TTB) {
                  item.NhanXet = e.target.value 
              }
              return item
            })
            setInfoSelected(updateInfoSeleted)
          }} placeholder="Nhập nhận xét"/>
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
        getDataDD()
      
      }, [curData])
    return<Fragment>
      {contextHolder}
       <Modal
        width={700}
        open={open} 
        onCancel={() => handleCloseMOdal()}
        footer={null}
        title="Trả trang thiết bị"
    >
     <Table
        loading={loading}
        bordered
        columns={columns}
        dataSource={dataSource}
        
        pagination={false}
        
     />      
     <Row>

        <Col span={4}></Col>
        <Col span={16}
        >
            <Form.Item>
                <div style={{ display: "flex", marginTop: "15px", alignItems: "center", justifyContent: "center" }}>

                    <Button type="primary" onClick={()=> hanldeSubmit()} >Trả thiết bị</Button>
                    <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handleModal()} >Hủy</Button>

                </div>
            </Form.Item>

        </Col>
        <Col span={4}></Col>

    </Row>
    </Modal>
    </Fragment>
}

export default ModalTraTrangThietBi