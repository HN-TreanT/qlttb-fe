import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, DatePicker, Select, Button, Input } from 'antd'
import { message } from "antd";
import { useDispatch } from "react-redux";
import useAction from "../../../redux/useActions";
import dayjs from "dayjs";
import { muontraServices } from "../../../utils/services/muontraService";
import { lichsusudungServices } from "../../../utils/services/lichsususungService";
import type { SelectProps } from 'antd';
import { Space } from 'antd';
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData: any,
    trangThietBi: any,
    canbo: any,
    lichhoc: any,
}

const ModalMuonTra = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, getData } = props;

    // const options: SelectProps['options'] = Array.isArray(props.trangThietBi)
    //     ? props.trangThietBi.map((item: any) => ({
    //         ...item,
    //         value: item.Ma_TTB,
    //         label: item.Ten_TTB,
    //     }))
    //     : [];
    const onFinish = async (values: any) => {
        const dataSubmit = {
            ...values,
            // Ma_TTB: props.ma_ttb,
        }
        try {
            if (action === "Add") {
                const res = await muontraServices.create(dataSubmit)
                if (res.status) {
                    getData()
                    handleModal()
                    message.success("Thêm mới thành công")
                } else {
                    message.error(res.message)
                }
            } else {
                const res = await muontraServices.update(curData.Ma_LSTT, dataSubmit)
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
            Ma_TTTTB: curData?.Ma_TTTTB,
            TG_DB: curData?.TG_DB ? dayjs(curData?.TG_DB) : null,
            TG_KT: curData?.TG_KT ? dayjs(curData?.TG_KT) : null,
        })
    }, [curData])
    return <Fragment>
        {contextHolder}
        <Modal
            title={action === "Add" ? "Thêm mới người mượn " : "Chỉnh sửa người mượn"}
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
                                " trang thiết bị"
                            }
                            name='lst_id_ttb'
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn  trang thiết bị'
                                }
                            ]}
                        >
                            <Select allowClear showSearch options={Array.isArray(props.trangThietBi) ? props.trangThietBi.map((item: any) => {
                                return {
                                    ...item,
                                    value: item.Ma_TTB,
                                    label: item.Ten_TTB
                                }
                            }) : []} placeholder="Chọn  trang thiét bị "
                                filterOption={filterOption}
                            />

                            {/* <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="chọn trang thiết bị cần mượn"
                                defaultValue={[]}
                                // onChange={handleChange}
                                optionLabelProp="label"
                                options={options}

                            /> */}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Người mượn "
                            }
                            name='NguoiMuon'
                            rules={[
                                {
                                    required: true,
                                    message: 'nhập người mượn'
                                }
                            ]}
                        >
                            <Input placeholder='Nhập tên tên người mượn' />
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Số điện thoại "
                            }
                            name='SoDienThoai'
                            rules={[
                                {
                                    required: true,
                                    message: 'nhập số điện thoại'
                                }
                            ]}
                        >
                            <Input placeholder='Nhập số điện thoại' />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "Cán bộ "
                            }
                            name='Ma_CB'
                            rules={[
                                {
                                    required: true,
                                    message: 'nhập Tên cán bộ'
                                }
                            ]}
                        >
                            <Select allowClear showSearch options={Array.isArray(props.canbo) ? props.canbo.map((item: any) => {
                                return {
                                    ...item,
                                    value: item.Ma_CB,
                                    label: item.Ten_CB
                                }
                            }) : []} placeholder="Chọn cán bộ "
                                filterOption={filterOption}
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            style={{ marginBottom: "4px" }}
                            label={
                                "phòng học "
                            }
                            name='Ma_LH'
                            rules={[
                                {
                                    required: true,
                                    message: 'nhập phòng học'
                                }
                            ]}
                        >
                            <Select allowClear showSearch options={Array.isArray(props.lichhoc) ? props.lichhoc.map((item: any) => {
                                return {
                                    ...item,
                                    value: item.Ma_LH,
                                    label: item.PhongHoc.GiangDuong
                                }
                            }) : []} placeholder="Chọn phòng học  "
                                filterOption={filterOption}
                            />
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

export default ModalMuonTra
