import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button } from 'antd'
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import { TinhTrangTTBServices } from "../../../utils/services/tinhtrangTTB";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    params: any
}
const ModalAdd = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, params } = props
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                TinhTrang: curData?.TinhTrang ? curData?.TinhTrang : "",
                ViTri: curData?.ViTri ? curData?.ViTri : "",
                GhiChu: curData?.GhiChu ? curData?.GhiChu : ""
            })
        }
    }, [curData, form])
    const onFinish = async (values: any) => {
        try {
            if (action === "Add") {
                const res = await TinhTrangTTBServices.create({
                    ...values,
                    // role_id: "U"
                })
                if (res.status) {
                    dispatch(actions.tinhtrangTTBActions.loadData(params))
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await TinhTrangTTBServices.update(curData.Ma_TTTTB, values)
                if (res.status) {
                    dispatch(actions.tinhtrangTTBActions.loadData(params))
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
            title={action === "Add" ? "Thêm mới trang thiết bị" : "Chỉnh sửa trang thiết bị"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form onFinish={onFinish} layout="vertical" form={form} >
                <Row gutter={15}>
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Tên loại tình trạng"
                            }
                            name='TinhTrang'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên loại tình trạng'
                                }
                            ]}
                        >
                            <Input placeholder='Nhập tên loại tình trạng' />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Vị trí"
                            }
                            name='ViTri'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập  vị trí'
                                }
                            ]}
                        >
                            <Input placeholder='Nhập vị trí' />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Ghi chú "
                            }
                            name='Ma_PH'
                        >
                            <Input.TextArea  rows={4} placeholder="Nhập ghi chú" />

                        </FormItem>
                    </Col>



                </Row>
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

export default ModalAdd
