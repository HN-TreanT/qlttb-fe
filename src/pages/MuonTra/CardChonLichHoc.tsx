import React, { Fragment, useState } from "react";
import {Card, Select, Form} from 'antd'
import { useSelector } from "react-redux";
import CardInfoLichHoc from "../../components/CardInfoLichHoc";
interface props {
    trangthietbis: any
}
const CardChonLichHoc = (props: props) => {
    const {trangthietbis} = props
    const phongshoc = useSelector((state :any) => state.phonghoc.phonghocs)
    const [valueCheckbox, setValueCheckbox] = useState()
    const handleChangeCheckbox = (e: any) => {
        
        if (e.target.value === valueCheckbox) {
            setValueCheckbox(undefined)
        }
        else {
            setValueCheckbox(e.target.value)
        }
    }
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return <Fragment>
        <Card style={{marginTop:"10px"}} 
            title={ <Select style={{width:"100%"}} allowClear showSearch options={Array.isArray(phongshoc?.data) ? phongshoc?.data.map((item: any) => {
                return {
                    ...item,
                    value: item?.Ma_PH ,
                    label: item?.TenPhong
                }
             }) : []} placeholder="Chọn  phòng học"
                filterOption={filterOption}/>}
            >
                    <CardInfoLichHoc handleChange={handleChangeCheckbox} infoLichHoc={{}} valueSelected={valueCheckbox} valueCheckbox={1}/>
                    <CardInfoLichHoc handleChange={handleChangeCheckbox} infoLichHoc={{}} valueSelected={valueCheckbox} valueCheckbox={2}/>
                    <CardInfoLichHoc handleChange={handleChangeCheckbox} infoLichHoc={{}} valueSelected={valueCheckbox} valueCheckbox={3}/>
            
        </Card>
        <Form.Item
        required
         style={{marginTop:"8px"}}
         label="Chọn trang thiết bị muốn mượn"
         rules={[
            {
                required:true,
                message:"Hãy chọn thiết bị muốn mượn"
            }
         ]}
        >
            <Select allowClear showSearch options={trangthietbis} mode="multiple" placeholder="Chọn thiết bị"/>
        </Form.Item>
    </Fragment>
}
export default CardChonLichHoc