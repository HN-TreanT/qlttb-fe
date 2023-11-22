import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button, Steps } from 'antd'
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { lichhoctapServices } from "../../../utils/services/lichhoctapService";
const FormItem = Form.Item
interface Props {
    curData: any,
    action: string,
    getData: any,

}

const LopThamGia = (props: Props) => {
    const [form] = Form.useForm()
    const { curData, action, getData } = props
    const onFinish = async (values: any) => {
        try {
            if (action === "Add") {
                const res = await lichhoctapServices.create({
                    ...values,
                    role_id: "U"
                })
                if (res.status) {
                    getData()
                   
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await lichhoctapServices.update(curData.Ma_Loai_TTB, values)
                if (res.status) {
                    getData()
                    
                    message.success("Chỉnh sửa thành công")
                } else {
                    message.error(res.message)
                }
            }
        } catch (err: any) {
            console.log(err)
            message.error(" thất bại")
        }

    }
  return  <Form onFinish={onFinish} layout="vertical" form={form} >

  <FormItem
      style={{ marginBottom: "4px" }}
      label={
          "phòng học"
      }
      name='Ten_Loai'
      rules={[
          {
              required: true,
              message: 'Nhập tên loại trang thiết bị'
          }
      ]}
  >
      <Input placeholder='Nhập tên loại trang thiết bị' />
  </FormItem>

  <Row>

      <Col span={4}></Col>
      <Col span={16}
      >
          <Form.Item>
              <div style={{ display: "flex", marginTop: "10px", alignItems: "center", justifyContent: "center" }}>

                  {
                      action === "Add" ? <Button type="primary" htmlType="submit">Thêm mới</Button> : <Button style={{ width: "80px" }} type="primary" htmlType="submit">Lưu</Button>
                  }
                  <Button style={{ width: "80px", marginLeft: "7px" }} >Hủy</Button>

              </div>
          </Form.Item>

      </Col>
      <Col span={4}></Col>

  </Row>
</Form> 
};

export default LopThamGia;
