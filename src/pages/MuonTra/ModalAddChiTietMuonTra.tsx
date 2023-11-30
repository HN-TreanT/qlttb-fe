import React, { Fragment, useEffect } from "react";
import {Form, Button, Modal, Row, Col, message} from 'antd'
import DebounceSelect from "../../components/DebouceSelect";
import { TrangthietbiServices } from "../../utils/services/trangthietbiServices";
import { lichsusudungServices } from "../../utils/services/lichsususungService";
interface props {
    open : boolean,
    handlModal: any,
    curData: any,
    action: string,
    trangThietBi: any,
    getData: any,
    Ma_LSM: any
}
async function fetchTTB(search: string): Promise<any[]> {
    return TrangthietbiServices.get( {
        page : 1,
        size : 100,
        ...(search && search !== "" && {Ten_TTB : search})
      }
    ).then((res) => {
     
      if(res.status) {
          const temp = res?.data?.data.map((item: any) => {
            return {
              label: item?.Ten_TTB,
              value: item?.Ma_TTB
            }
        })
        return temp
      }else {
        return []
      }
      
    }).catch((err :any) => console.log(err))
  }
const ModalAddChiTietMuonTra = (props: props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm()
    const {open, handlModal, curData, action, trangThietBi, getData, Ma_LSM} = props

    const onFinish = (value: any) => {
        if(action === "Add") {
          
            const dataSubmit = {
                Ma_LSM : Ma_LSM,
                Ma_TTB : value?.Ma_TTB,
                TrangThai:"Đang mượn"
            }
            lichsusudungServices.create(dataSubmit).then((res:any) => {
                if(res.status) {
                   message.success("Thêm mới thành công")
                   getData()
                   handlModal()
                } else {
                   message.error("Thêm mới thất bại")
                }
             }).catch((err:any) => {
                 console.log(err)
                 message.error("Thêm mới thất bại")
 
             })

        } else {
            lichsusudungServices.update(curData?.Ma_LSM_TTB, value).then((res:any) => {
               if(res.status) {
                  message.success("Chỉnh sửa thành công")
                  getData()
                  handlModal()
               } else {
                  message.error("Chỉnh sửa thất bại")
               }
            }).catch((err:any) => {
                console.log(err)
                message.error("Chỉnh sửa thất bại")

            })
        }
    }

    useEffect(() => {
        form.setFieldValue("Ma_TTB", curData?.Ma_TTB ? curData?.Ma_TTB : [])
    }, [curData])
    return <Fragment>
          {contextHolder}
          <Modal
    open={open} 
    footer={null} 
    title={action === "Add" ? "Thêm mới thiết bị" : "Chỉnh sửa thiết bị"}
    onCancel={() => handlModal()}
    >
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
            required
             label="Trang thiết bị"
             rules={[
                {
                    required:true,
                    message:"Hãy chọn trang thiết bị"
                }
             ]}
             name={"Ma_TTB"}
            >
             <DebounceSelect   fetchOptions={fetchTTB} initOption={trangThietBi} placeholder='Chọn thiết bị' />

            </Form.Item>
        
        <Row>

                <Col span={4}></Col>
                <Col span={16}
                >
                    <Form.Item>
                        <div style={{ display: "flex", marginTop: "15px", alignItems: "center", justifyContent: "center" }}>

                            {
                                action === "Add" ? <Button type="primary" htmlType="submit" >Thêm mới</Button> : <Button style={{ width: "80px" }} type="primary" htmlType="submit">Lưu</Button>
                            }
                            <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handlModal()} >Hủy</Button>

                        </div>
                    </Form.Item>

                </Col>
                <Col span={4}></Col>

            </Row>
            </Form>
    </Modal>
    </Fragment>
}

export default ModalAddChiTietMuonTra