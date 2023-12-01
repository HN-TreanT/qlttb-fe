import React, {Fragment, useEffect, useState} from "react";
import {Form, Row, Col, Modal, Input, DatePicker, Select, Button, InputNumber} from 'antd';
import { lichlamviceServices } from "../../../utils/services/lichlamviecService";
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import DebounceSelect from "../../../components/DebouceSelect"
const FormItem = Form.Item

interface Props {
  curData: any,
  open: boolean,
  handleModal: Function,
  action : string,
  getData: any,
  Ma_CB: number

}



 const ModalAdd = (props: Props) => {
  const dispatch = useDispatch()
  const actions = useAction()
  const [messageApi, contextHolder] = message.useMessage();
  const canbos = useSelector((state: any) => state.canbo.canbos)
  const [form] = Form.useForm()
  const {curData, open, handleModal, action, getData} = props
  useEffect(() => {
    if(curData){
      form.setFieldsValue({ 
         Ma_CB: curData?.CanBo?.Ten_CB ? curData?.CanBo?.Ten_CB : undefined,
        

        CongViec: curData?.CongViec ? curData?.CongViec :"",
        Kip: curData?.Kip ? curData?.Kip :"",
        Ngay:curData?.Ngay ? dayjs(curData?.Ngay) :null,
      })
    }
  }, [curData,form])
  const onFinish =async (values:any) => {
    try {
      const dataSubmit = {
        ...values,
        Ma_CB : props.Ma_CB
      }
        if( action === "Add") {
          const res = await lichlamviceServices.create({
            ...dataSubmit,
          })
          if(res.status) {
            getData()
            handleModal()
            message.success("Thêm mới thành công")
          } else {
            message.error(res.message)
          }
        } else {
          const res = await lichlamviceServices.update(curData.Ma_LLV, dataSubmit)
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
  useEffect(() => {
    dispatch(actions.CanboAction.loadData({
      page: 1,
      size: 9
    }))
  }, [actions.CanboAction, dispatch])
  return  <Fragment>
    {contextHolder}
    <Modal
     title={action === "Add" ? "Thêm mới lịch làm việc" : "Chỉnh sửa lịch làm việc"}
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
               "Công việc"
              }
              name='CongViec'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập công việc'
                }
              ]}
            >
              <Input placeholder="Nhập công việc "/>
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Ngày thực hiện"
              }
              name='Ngay'
             
            >
              <DatePicker style={{width:"100%"}} placeholder="Chọn ngày thực hiện"/>
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Kíp"
              }
              name='Kip'
              
            >
              <InputNumber style={{width:"100%"}} placeholder="Nhập kíp"/>
              
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
