import React, { Fragment, useEffect, useState } from "react";
import {Modal, Steps, Divider} from 'antd'
import ThongTinChung from "./ThongTinChung";
import ChiTietMuonTra from "./ChiTietMuonTra";
interface props{
    action: string,
    handleModal : any,
    open: boolean,
    lichhoc: any,
    trangThietBi: any,
    curData: any,
    getData: any,
    getTTB: any
}

const ModalMuonTra = (props: props) => {
    const {action, handleModal, open, trangThietBi, curData, getData, getTTB} =  props
   const [current, setCurrent] = useState(0);
   const [id, setID] = useState<any>(curData?.Ma_LSM)
   const hanldeCloseModal = () =>  {
    handleModal()
      setID(undefined)
   }
   const steps = [
     {
        key: 1,
        title: 'Thông tin người mượn',
        content: <ThongTinChung setCurrent={setCurrent} current={current}  action={action} handleModal={hanldeCloseModal} trangThietBi={trangThietBi} curData={curData} setID={setID} getData={getData} lichhoc={undefined}/>,
        
      },
      {
        key: 2,
        title: 'Trang thiết bị mượn',
        content: <ChiTietMuonTra getTTB={getTTB} trangThietBi={trangThietBi} Ma_LSM={id ? id : curData?.Ma_LSM}/>,
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