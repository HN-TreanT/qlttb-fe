import React, {Fragment, useEffect, useState} from "react";
import {Form, Row, Col, Modal, Input, Button} from 'antd';
import { message } from "antd";
import dayjs from "dayjs";
import { lopServices } from "../../../utils/services/lopService";
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
        Code: curData?.Code ? curData?.Code :"",
        Ten_Lop: curData?.Ten_Lop ? curData?.Ten_Lop :"",
      })
    }
  }, [curData,form])
  const onFinish =async (values:any) => {
    try {
        if( action === "Add") {
          const res = await lopServices.create({
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
          const res = await lopServices.update(curData.Ma_Lop, values)
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
     title={action === "Add" ? "Thêm mới lớp học" : "Chỉnh sửa lớp học"}
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
               "Mã lớp"
              }
              name='Code'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mã lớp'
                }
              ]}
            >
              <Input placeholder="Nhập mã lớp "/>        
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Tên lớp"
              }
              name='Ten_Lop'
              rules={[
                {
                  required: true,
                  message: 'Hãy tên nhập tên lớp'
                }
              ]}
            >
              <Input style={{width:"100%"}} placeholder="Nhập tên lớp"/>
              
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
