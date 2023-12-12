import { Descriptions, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { lichhoctapServices } from "../../../utils/services/lichhoctapService";
import CardInfoLichHoc from "../../../components/CardInfoLichHoc";
interface props {
    open: boolean,
    handleModal: any,
    curData: any
}
const ModalChiTiet = (props: props) => {
    const {open, handleModal, curData} = props
    const [lichhoc, setLichHoc] = useState()

    const getLichHocDetail = (Ma_LH :any) => {
        lichhoctapServices.getById(Ma_LH).then((res: any) => {
            if(res.status) {
                setLichHoc(res.data)
            }
        }).catch((err :any) => {
            console.log(err)
        })
    }

    useEffect(() => {
       getLichHocDetail(curData?.LichHoc.Ma_LH)
    }, [curData])
    return <Modal
    width={500}
    open={open} 
    onCancel={() => handleModal()}
    footer={null}
    title="Chi tiết"
    >
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
            <div>
                 <label style={{fontWeight:"600"}}>Người mượn: </label>{curData?.NguoiMuon ? curData?.NguoiMuon : ""}
            </div>
            <div>
                 <label style={{fontWeight:"600"}}>Số điện thoại: </label>{curData?.SoDienThoai ? curData?.SoDienThoai : ""}
            </div>
        </div>
        <CardInfoLichHoc  infoLichHoc={lichhoc} />
         {/* <Descriptions >
            <Descriptions.Item label="Người mượn">{curData?.NguoiMuon ? curData?.NguoiMuon : ""}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{curData?.SoDienThoai ? curData?.SoDienThoai : ""}</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions> */}
    </Modal>
}

export default ModalChiTiet