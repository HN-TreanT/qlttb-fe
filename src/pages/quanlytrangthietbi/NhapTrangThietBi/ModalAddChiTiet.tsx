import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Select, Button } from 'antd'
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { lscn_trangthietbi } from "../../../utils/services/lscn_ttb";
import { useSelector } from "react-redux";

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData: any,
    Ma_LSCN: any,
    trangthietbi: any
   
    
}

const optionsLoaiCapNhat = [
    {
        label:"Thay mới",
        value: "thaymoi"
    },
    {
        label:"Sửa chữa",
        value: "suachua"
    }
]
const ModalAddEdit = (props: Props) => {
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, getData, Ma_LSCN, trangthietbi } = props
    const onFinish = (value: any) => {
        const dataSubmit = {
            ...value,
            Ma_LSCN: Ma_LSCN
        }
        if (action === "Add") {
            lscn_trangthietbi.create(dataSubmit).then((res :any) => {
                if (res.status) {            
                    getData()
                    handleModal()
                    message.success("Thêm mới thành công")
                }
             }).catch((err:any) => {
                console.log(err)
                message.error("Thêm mới thất bại")
             })
        } else {
            lscn_trangthietbi.update(curData?.Ma_LS_TTB, dataSubmit).then((res: any) => {
                if(res.status) {
                    getData()
                    handleModal()
                    message.success("Chỉnh sửa thành công")
                } else {
                    message.error(res.message)
                }
             }).catch((er: any) => {
                console.log(er)
                message.error("Chỉnh sửa thất bại")
             }
             )
        }
    }


    useEffect(() => {
      form.setFieldsValue({
        Ma_TTB: curData?.Ma_TTB,
        GhiChu: curData?.GhiChu
      })
    }, [curData])

    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return <Fragment>

        <Modal
          
            title={action === "Add" ? "Thêm mới thiết bị cập nhật" : "Chỉnh sửa thiết bị cập nhật"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={15}>
                    <Col span={24}>
                        <Form.Item 
                           label="Trang thiết bị"
                            style={{marginBottom:"7px"}}
                            required
                            name={"Ma_TTB"}
                            rules={[
                                {
                                    required:true,
                                    message:"Hãy chọn trang thiết bị"
                                }
                            ]}

                            >
                                <Select options={trangthietbi} showSearch filterOption={filterOption} allowClear placeholder="Chọn trang thiết bị"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                           label="Ghi chú"
                         
                            name={"GhiChu"}
                          
                            >
                                <TextArea rows={4} placeholder="Nhập ghi chú"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row>

                    <Col span={4}></Col>
                    <Col span={16}
                    >
                        <Form.Item>
                            <div style={{ display: "flex", marginTop: "15px", alignItems: "center", justifyContent: "center" }}>

                                {
                                    action === "Add" ? <Button type="primary" htmlType="submit" >Thêm mới</Button> : <Button style={{ width: "80px" }} type="primary" htmlType="submit">Lưu</Button>
                                }
                                <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handleModal()} >Hủy</Button>

                            </div>
                        </Form.Item>

                    </Col>
                    <Col span={4}></Col>

                </Row>
            </Form>
        
        
        </Modal>
    </Fragment>
};

export default ModalAddEdit
