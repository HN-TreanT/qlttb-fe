import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button, Steps } from 'antd'
import { message } from "antd";
import LopThamGia from "./LopThamGia";
import FormThongTinChung from "./FormThongTinChung";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData: any,

}
const ModalLichHoc = (props: Props) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const { curData, open, handleModal, action, getData } = props

    const [current, setCurrent] = useState(0)
    const steps = [
        {
            key:"1",
            title: 'Thông tin chung',
            content:<FormThongTinChung curData={undefined} action={""} getData={undefined}/>,
          },
          {
            key:"2",
            title: 'Lớp tham gia',
            content: <LopThamGia curData={undefined} action={""} getData={undefined}/>,
          },
    ]
   
    
    return <Fragment>
        {contextHolder}
        <Modal
            title={action === "Add" ? "Thêm mới lịch học" : "Chỉnh sửa lịch học"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
            <Steps current={current} items={steps}/>
        
        </Modal>
    </Fragment>
};

export default ModalLichHoc
