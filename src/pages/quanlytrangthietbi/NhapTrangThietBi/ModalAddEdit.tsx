import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Select, Button } from 'antd'
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { lichsucapnhat } from "../../../utils/services/lichsucapnhat";
import { useSelector } from "react-redux";

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData: any,
   
    
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
    const { curData, open, handleModal, action, getData } = props
    const canbo = useSelector((state:any) => state.auth.user_info)
    const onFinish = (value: any) => {
        const dataSubmit = {
            ...value,
            Ma_CB: canbo?.Ma_CB
        }
        if (action === "Add") {
             lichsucapnhat.create(dataSubmit).then((res :any) => {
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
             lichsucapnhat.update(curData?.Ma_LSCN, dataSubmit).then((res: any) => {
                if(res.status) {
                    getData()
                    handleModal()
                    message.success("Chỉnh sửa thành công")
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
        LoaiCapNhat: curData?.LoaiCapNhat,
        NoiDung: curData?.NoiDung
      })
    }, [curData])
    return <Fragment>

        <Modal
          
            title={action === "Add" ? "Thêm mới cập nhật thiết bị" : "Chỉnh sửa cập nhật thiết bị"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={15}>
                    <Col span={24}>
                        <Form.Item 
                           label="Loại cập nhật"
                            style={{marginBottom:"7px"}}
                            required
                            name={"LoaiCapNhat"}
                            rules={[
                                {
                                    required:true,
                                    message:"Hãy chọn loại cập nhật"
                                }
                            ]}

                            >
                                <Select options={optionsLoaiCapNhat} allowClear placeholder="Chọn loại cập nhật"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item 
                           label="Nội dung"
                             required
                            name={"NoiDung"}
                            rules={[
                                {
                                    required:true,
                                    message:"Hãy nhập nội dung cập nhật"
                                }
                            ]}
                            >
                                <TextArea rows={4} placeholder="Nhập nội dung cạp nhật"/>
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
