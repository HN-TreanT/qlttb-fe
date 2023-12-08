import React, { Fragment, useEffect, useState } from "react";
import {Modal, Steps, Divider} from 'antd'
import ThongTinChung from "./ThongTinChung";
import ChiTietMuonTra from "./ChiTietMuonTra";
interface props{
    action: string,
    handleModal : any,
    open: boolean,
    lichhoc: any,
    curData: any,
    getData: any,
}

const ModalMuonTra = (props: props) => {
    const {action, handleModal, open, curData, getData} =  props
   const [current, setCurrent] = useState(0);
   const [id, setID] = useState<any>(curData?.Ma_LSM)
   const [Ma_PH, setMaPh] = useState<any>(curData?.LichHoc ? curData?.LichHoc?.Ma_PH : undefined)
   const hanldeCloseModal = () =>  {
    handleModal()
      setID(undefined)
      setMaPh(undefined)
   }
   const steps = [
     {
        key: 1,
        title: 'Thông tin người mượn',
        content: <ThongTinChung setMaPh={setMaPh} setCurrent={setCurrent} current={current}  action={action} handleModal={hanldeCloseModal}  curData={curData} setID={setID} getData={getData} lichhoc={undefined}/>,
        
      },
      {
        key: 2,
        title: 'Trang thiết bị mượn',
        content: <ChiTietMuonTra Ma_PH={Ma_PH ? Ma_PH : curData?.LichHoc?.Ma_PH}  Ma_LSM={id ? id : curData?.Ma_LSM}/>,
      },
    
   ]

   useEffect(() => {
     setCurrent(0)
   }, [])

    return <Fragment>
        
        <Modal 
        open={open} 
        footer={null} 
        width={800}
        title={action === "Add" ? "Thêm mới thông tin mượn trang thiết bị" : "Chỉnh sửa thông tin mượn trang thiết bị"}
        onCancel={() => hanldeCloseModal()}
        >
             <Steps  onChange={(value : number) => setCurrent(value)} current={current} items={steps}/>
                <Divider />
                <div>{steps[current].content}</div>
        </Modal>
    </Fragment>
}

export default ModalMuonTra 