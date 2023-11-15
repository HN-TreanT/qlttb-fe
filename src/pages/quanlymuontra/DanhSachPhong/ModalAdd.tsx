import React, {Fragment, useEffect, useState} from "react";
import {Form, Row, Col, Modal, Input, Button} from 'antd';
import { message } from "antd";
import dayjs from "dayjs";
import { phonghocServices } from "../../../utils/services/phonghocServices";
const FormItem = Form.Item

interface Props {
  curData: any,
  open: boolean,
  handleModal: Function,
  action : string,
  getData: any

}


 const ModalAdd = (props: Props) => {

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
  const {curData, open, handleModal, action, getData} = props
  useEffect(() => {
    if(curData){
      console.log(curData)
      form.setFieldsValue({ 
        TenPhong: curData?.TenPhong ? curData?.TenPhong :"",
        GiangDuong: curData?.GiangDuong ? curData?.GiangDuong :"",
      })
    }
  }, [curData,form])
  const onFinish =async (values:any) => {
    try {
        if( action === "Add") {
          const res = await phonghocServices.create({
            ...values,
          })
          if(res.status) {
            getData()
            handleModal()
            message.success("Thêm mới thành công")
          } else {
            message.error(res.message)
          }
        } else {
          const res = await phonghocServices.update(curData.Ma_PH, values)
          if(res.status) {
            getData()
            handleModal()
            message.success("Chỉnh sửa thành công")
          } else {
            message.error(res.message)
          }
        }
    } catch (err :any) {
      console.log(err)
      message.error(" thất bại")
    }
    
  }
  return  <Fragment>
    {contextHolder}
    <Modal
     title={action === "Add" ? "Thêm mới phòng học" : "Chỉnh sửa phòng học"}
     open={open}
     footer={null}
     onCancel={() => handleModal()}
     >
    <Form onFinish={onFinish} layout="vertical" form={form} >
      <Row gutter={15}>
          <Col span={12}>
            <FormItem
              style={{marginBottom:"4px"}}
              label={
               "Tên phòng"
              }
              name='TenPhong'
              rules={[
                {
                  required: true,
                  message: 'Hãy tên phòng'
                }
              ]}
            >
              <Input placeholder="Nhập tên phòng "/>        
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Giảng đường"
              }
              name='GiangDuong'
             
            >
              <Input style={{width:"100%"}} placeholder="Giảng đường"/>
              
            </FormItem>
          </Col>
      
        </Row>
        <Row>
           
              <Col span={4}></Col>
              <Col span={16} 
              >
                <Form.Item>
                      <div style={{display:"flex", marginTop:"10px", alignItems:"center", justifyContent:"center"}}>
                          
                          {
                            action === "Add" ? <Button type="primary" htmlType="submit">Thêm mới</Button> : <Button style={{width:"80px"}} type="primary" htmlType="submit">Lưu</Button>
                          }
                          <Button style={{width:"80px", marginLeft:"7px"}} onClick={() => handleModal()}>Hủy</Button>
                      
                      </div>
                </Form.Item>
                
              </Col>
              <Col span={4}></Col>
          
        </Row>
      </Form>

  </Modal>
  </Fragment>
};

export default ModalAdd
