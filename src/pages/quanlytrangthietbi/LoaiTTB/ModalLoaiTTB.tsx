import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button } from 'antd'
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { loaittbServices } from "../../../utils/services/loaittbSevices";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    params: any,

}
const ModalLoaiTTB = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, params } = props
    const { count, data } = useSelector((state: any) => state.loaittb.loaittbs);

    useEffect(() => {
        if (curData) {
            // console.log(curData)
            form.setFieldsValue({
                Ten_Loai: curData?.Ten_Loai ? curData?.Ten_Loai : "",

            })
        }
    }, [curData, form])
    const onFinish = async (values: any) => {
        try {
            if (action === "Add") {
                const res = await loaittbServices.create({
                    ...values,
                    role_id: "U"
                })
                if (res.status) {
                    dispatch(actions.loaittbAction.loadData(params))
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await loaittbServices.update(curData.Ma_Loai_TTB, values)
                if (res.status) {
                    dispatch(actions.loaittbAction.loadData(params))
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
            title={action === "Add" ? "Thêm mới loại trang thiết bị" : "Chỉnh sửa loại trang thiết bị"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form onFinish={onFinish} layout="vertical" form={form} >

                <FormItem
                    style={{ marginBottom: "4px" }}
                    label={
                        "Tên loại trang thiết bị"
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

export default ModalLoaiTTB
