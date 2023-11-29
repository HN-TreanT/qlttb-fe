import React, { Fragment, useEffect, useState } from "react";
import { Form, Row, Col, Modal, Input, DatePicker, Select, Button, Steps,Divider } from 'antd'
import { message } from "antd";
import LopThamGia from "./LopThamGia";
import FormThongTinChung from "./FormThongTinChung";
import { useDispatch } from "react-redux";
import useAction from "../../../redux/useActions";
const FormItem = Form.Item

interface Props {
    curData: any,
    open: boolean,
    handleModal: Function,
    action: string,
    getData: any,
    lops: any[],
    
}

const ModalLichHoc = (props: Props) => {
    const dispatch = useDispatch()
    const actions = useAction()
    
    const { curData, open, handleModal, action, getData } = props
    
    return <Fragment>
       
        {/* <Modal
            width={700}
            title={action === "Add" ? "Thêm mới lịch học" : "Chỉnh sửa lịch học"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
          
               <Steps  onChange={(value : number) => setCurrent(value)} current={current} items={steps}/>
                <Divider />
                <div>{steps[current].content}</div>

        
        </Modal> */}

        <Modal
            width={700}
            title={action === "Add" ? "Thêm mới lịch học" : "Chỉnh sửa lịch học"}
            open={open}
            footer={null}
            onCancel={() => handleModal()}
        >
         <FormThongTinChung lops={props.lops}  handleModal={handleModal}  curData={curData} action={action} getData={getData}/>
        
        </Modal>
    </Fragment>
};

export default ModalLichHoc
