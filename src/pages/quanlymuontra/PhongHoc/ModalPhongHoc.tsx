import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button } from 'antd'
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { phonghocServices } from "../../../utils/services/phonghocSevices";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    params: any,

}
const ModalPhongHoc = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, params } = props
    useEffect(() => {
        if (curData) {
            // console.log(curData)
            form.setFieldsValue({
                Tenphong: curData?.TenPhong ? curData?.TenPhong : "",

            })
        }
    }, [curData, form])
    const onFinish = async (values: any) => {
        try {
            if (action === "Add") {
                const res = await phonghocServices.create({
                    ...values,
                    role_id: "U"
                })
                if (res.status) {
                    dispatch(actions.phonghocAction.loadData(params))
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await phonghocServices.update(curData.Ma_PH, values)
                if (res.status) {
                    dispatch(actions.phonghocAction.loadData(params))
                    handleModal()
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
    return <Fragment>
        {contextHolder}
        <Modal
            title={action === "Add" ? "Thêm mới phòng học" : "Chỉnh sửa phòng học"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form onFinish={onFinish} layout="vertical" form={form} >

                <FormItem
                    style={{ marginBottom: "4px" }}
                    label={
                        "Tên phòng học"
                    }
                    name='TenPhong'
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tên phòng học'
                        }
                    ]}
                >
                    <Input placeholder='Nhập tên phòng học' />
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
                                <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handleModal()}>Hủy</Button>

                            </div>
                        </Form.Item>

                    </Col>
                    <Col span={4}></Col>

                </Row>
            </Form>

        </Modal>
    </Fragment>
};

export default ModalPhongHoc
