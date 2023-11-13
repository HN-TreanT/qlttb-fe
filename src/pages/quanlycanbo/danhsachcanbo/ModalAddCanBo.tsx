import React, {Fragment, useEffect, useState} from "react";
import {Form, Row, Col, Modal, Input, DatePicker, Select, Button} from 'antd'
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
const FormItem = Form.Item

const gioitinh = [
  {
    value: 1,
    label: "Nam"
  },
  {
    value: 0,
    label: "Nữ"
  }
]
interface Props {
  curData: any,
  open: boolean,
  handleModal: Function,
  action : string,
  params: any,

}
 const ModalAddCanBo = (props: Props) => {
  const dispatch = useDispatch()
  const actions = useAction()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
  const {curData, open, handleModal, action, params} = props
  useEffect(() => {
    if(curData){
    
      form.setFieldsValue({
        TaiKhoan: curData?.TaiKhoan ? curData?.TaiKhoan :"",
        MatKhau: curData?.MatKhau ? curData?.MatKhau :"",
        Ten_CB: curData?.Ten_CB ? curData?.Ten_CB :"",
         NgaySinh:curData?.NgaySinh ? dayjs(curData?.NgaySinh) :null,
        SoDienThoai: curData?.SoDienThoai ? curData?.SoDienThoai :"",
        GioiTinh: curData?.GioiTinh ? curData?.GioiTinh : 0

      })
    }
  }, [curData, form])
  const onFinish =async (values:any) => {
    try {
        if( action === "Add") {
          const res = await canboServices.create({
            ...values,
            role_id: "U"
          })
          if(res.status) {
            dispatch(actions.CanboAction.loadData(params))
            handleModal()
            message.success("Thêm mới thành công")
          } else {
            message.error(res.message)
          }
        } else {
          const res = await canboServices.update(curData.Ma_CB, values)
          if(res.status) {
            dispatch(actions.CanboAction.loadData(params))
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
     title={action === "Add" ? "Thêm mới cán bộ" : "Chỉnh sửa cán bộ"}
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
                "Tên tài khoản"
              }
              name='TaiKhoan'
              rules={[
                {
                  required: true,
                  message: 'Nhập tài khoản'
                }
              ]}
            >
              <Input  placeholder='Nhập tài khoản' />
            </FormItem>
          </Col>
         {
          action === "Add" ?  <Col span={12}>
          <FormItem
             style={{marginBottom:"4px"}}
            label={
              "Mật khẩu"
            }
            name='MatKhau'
            rules={[
              {
                required: true,
                message: 'Nhập mật khẩu'
              }
            ]}
          >
            <Input
              placeholder='Nhập mật khẩu'
              style={{ width: '100%' }}
            />
          </FormItem>
        </Col> : ""
         }
          <Col span={12}>
            <FormItem
              style={{marginBottom:"4px"}}
              label={
               "Tên cán bộ"
              }
              name='Ten_CB'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên cán bộ'
                }
              ]}
            >
              <Input placeholder="Nhập tên cán bộ"/>
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Ngày sinh"
              }
              name='NgaySinh'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn ngày sinh'
                }
              ]}
            >
              <DatePicker style={{width:"100%"}} placeholder="Chọn ngày sinh"/>
              
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Số điện thoại"
              }
              name='SoDienThoai'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập số điện thoại'
                }
              ]}
            >
              <Input placeholder="Nhập số điện thoại"/>
              
            </FormItem>
            
          </Col>
          <Col span={12}>
            <FormItem
             style={{marginBottom:"4px"}}
              label={
                "Giới tính"
              }
              name='GioiTinh'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn giới tính'
                }
              ]}
            >
              <Select options={gioitinh} placeholder="Chọn giới tính"/>
              
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

export default ModalAddCanBo
