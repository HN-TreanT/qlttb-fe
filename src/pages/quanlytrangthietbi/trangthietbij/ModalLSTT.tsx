import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, DatePicker, Select, Button } from 'antd'
import { message } from "antd";
import { useDispatch } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { LichSuTinhTrangServices } from "../../../utils/services/lichsuTinhTrang";
import locale from 'antd/es/date-picker/locale/vi_VN'

const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData:any ,
    tinhtrangTTbs: any,
    ma_ttb: any
}
const ModalLSTT = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, getData } = props

    const onFinish = async (values: any) => {
        const dataSubmit = {
            ...values,
            Ma_TTB: props.ma_ttb,
        }
        try {
            if (action === "Add") {
                const res = await LichSuTinhTrangServices.create(dataSubmit)
                if (res.status) {
                    getData()
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await LichSuTinhTrangServices.update(curData.Ma_LSTT, dataSubmit)
                if (res.status) {
                    getData()
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

    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        form.setFieldsValue({
            Ma_TTTTB : curData?.Ma_TTTTB,
            TG_DB : curData?.TG_DB ? dayjs(curData?.TG_DB ) : null ,
            TG_KT : curData?.TG_KT ? dayjs(curData?.TG_KT ) : null ,
        })
    }, [curData])
    return <Fragment>
        {contextHolder}
        <Modal
            title={action === "Add" ? "Thêm mới tình trạng trang thiết bị" : "Chỉnh sửa tình trạng trang thiết bị"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form onFinish={onFinish} layout="vertical" form={form} >
                <Row gutter={15}>
                    <Col span={24}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Tình trạng trang thiết bị" 
                            }
                            name='Ma_TTTTB'
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn tình trạng trang thiết bị'
                                }
                            ]}
                        >
                            <Select allowClear showSearch options={Array.isArray(props.tinhtrangTTbs) ? props.tinhtrangTTbs.map((item :any) => {
                                return {
                                    ...item,
                                    value: item.Ma_TTTTB,
                                    label: item.TinhTrang
                                }
                            }) : []} placeholder="Chọn tình trạng trang thiét bị " 
                            filterOption={filterOption}
                            />

                        </FormItem>
                    </Col>
                
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Thời gian bắt đầy"
                            }
                            name='TG_DB'
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn thời gian bắt đầu'
                                }
                            ]}
                        >
                            <DatePicker format={"DD/MM/YYYY"} locale={locale} style={{width:"100%"}} placeholder='Chọn thời gian bắt đầu' />
                        </FormItem>
                    </Col>
                
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Thời gian kết thúc "
                            }
                            name='TG_KT'
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn thới gian kết thúc '
                                }
                            ]}
                        >
                            <DatePicker format={"DD/MM/YYYY"} locale={locale} style={{width:"100%"}} placeholder="Chọn thời gian kết thúc" />

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

export default ModalLSTT
