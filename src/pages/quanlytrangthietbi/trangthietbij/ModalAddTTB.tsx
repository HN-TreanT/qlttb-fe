import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button } from 'antd'
import { canboServices } from "../../../utils/services/canbo";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { TrangthietbiServices } from "../../../utils/services/trangthietbiServices";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    params: any,

}
const ModalAddTTB = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, params } = props
    const { count, data } = useSelector((state: any) => state.trangthietbi.trangthietbis)
    const Loai_TTB = data
        ? data.map((item: any) => ({
            value: item.Ma_Loai_TTB,
            label: item.Ten_Loai,
        }))
        : [];
    console.log("Loai_TTB:", Loai_TTB);
    useEffect(() => {
        if (curData) {
            // console.log(curData)
            form.setFieldsValue({
                Ten_TTB: curData?.Ten_TTB ? curData?.Ten_TTB : "",
                Ten_Loai: curData?.Loai_TTB?.Ten_Loai ? curData?.Loai_TTB?.Ten_Loai : "",
                TenPhong: curData?.PhongHoc?.TenPhong ? curData?.PhongHoc?.TenPhong : "",
                GiangDuong: curData?.PhongHoc?.GiangDuong ? curData?.PhongHoc?.GiangDuong : "",
            })
        }
    }, [curData, form])
    const onFinish = async (values: any) => {
        try {
            if (action === "Add") {
                const res = await TrangthietbiServices.create({
                    ...values,
                    role_id: "U"
                })
                if (res.status) {
                    dispatch(actions.trangthietbiAction.loadData(params))
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await TrangthietbiServices.update(curData.Ma_TTB, values)
                if (res.status) {
                    dispatch(actions.trangthietbiAction.loadData(params))
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
                                "Tên trang thiết bị"
                            }
                            name='Ten_TTB'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên trang thiết bị'
                                }
                            ]}
                        >
                            <Input placeholder='Nhập tên trang thiết bị' />
                        </FormItem>
                    </Col>
                    {
                        action === "Add" ? <Col span={12}>
                            <FormItem
                                style={{ marginBottom: "4px" }}
                                label={
                                    "Loại trang thiết bị"
                                }
                                name='Ten_Loai'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn tên loại trang thiết bị'
                                    }
                                ]}
                            >
                                <Select options={Loai_TTB} placeholder="Chọn loại" />

                            </FormItem>
                        </Col> : ""
                    }
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Phòng học "
                            }
                            name='TenPhong'
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên phòng học '
                                }
                            ]}
                        >
                            <Input placeholder="Nhập tên phòng học" />

                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Giảng đường"
                            }
                            name='GiangDuong'
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giảng đường'
                                }
                            ]}
                        >
                            <Input placeholder="Nhập tên giảng đường" />

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

export default ModalAddTTB