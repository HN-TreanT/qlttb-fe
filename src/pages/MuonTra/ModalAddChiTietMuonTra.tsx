import React, { Fragment, useEffect, useState } from "react";
import {Form, Button, Modal, Row, Col, message, Select} from 'antd'
import DebounceSelect from "../../components/DebouceSelect";
import { TrangthietbiServices } from "../../utils/services/trangthietbiServices";
import { lichsusudungServices } from "../../utils/services/lichsususungService";
import {  useSelector } from "react-redux";
interface props {
    open : boolean,
    handlModal: any,
    curData: any,
    action: string,
    getData: any,
    Ma_LSM: any,
    Ma_PH: any
}

const ModalAddChiTietMuonTra = (props: props) => {
    const [messageApi, contextHolder] = message.useMessage();
    
    const [form] = Form.useForm()
    const {open, handlModal, curData, action, getData, Ma_LSM, Ma_PH} = props
    const [ttbs, setTtbs] = useState<any[]>()
    const { count, data } = useSelector((state: any) => state.loaittb.loaittbs)
    const [Ma_Loai, setMaLoai] = useState<any>()

    const getTTB = () => {
        TrangthietbiServices.getTTB({
          page: 1,
          size: 100,
        //  TrangThai: 0,
        ...(Ma_PH && {Ma_PH: Ma_PH}),
         ...(Ma_Loai && {Ma_Loai_TTB: Ma_Loai})
        }).then(res => {
          if (res.status) {
            const temp = res.data.data.map((item: any) => {
              return {
                ...item,
                label: item?.Ten_TTB ,
                value: item?.Ma_TTB
              }
            } )
            const t = temp.filter((item: any) => item?.TrangThai === 0)
            setTtbs(t)
          }
        }).catch((err: any) => {
          console.log(err)
        })
      }


    const onFinish = async (value: any) => {
        if(action === "Add") {          
           try {
            if (Array.isArray(value?.Ma_TTB)) {
              await Promise.all( value.Ma_TTB.map( async (item: any) => {
                const dataSubmit = {
                    Ma_LSM : Ma_LSM,
                    Ma_TTB : item,
                    TrangThai:"Đang mượn"
                }
                await lichsusudungServices.create(dataSubmit)
            }))
                message.success("Thêm mới thành công")
                getData()
                getTTB()
                handlModal()
            } else {
                message.error("Thêm mới thất bại")
            }
           } catch (err: any) {
            console.log(err)
           }
           

        } else {
           
            if(value?.Ma_TTB === curData?.TrangThietBi?.Ten_TTB)
            {
               value.Ma_TTB = curData?.Ma_TTB
            }
        
            lichsusudungServices.update(curData?.Ma_LSM_TTB, value).then((res:any) => {
               if(res.status) {
                  message.success("Chỉnh sửa thành công")
                  getData()
                  getTTB()
                  handlModal()
               } else {
                  message.error("Chỉnh sửa thất bại")
               }
            }).catch((err:any) => {
                console.log(err)
                message.error("Chỉnh sửa thất bại")

            })
        }
    }

    useEffect(() => {
        getTTB()
    }, [Ma_Loai, curData, Ma_PH])

    useEffect(() => {

        form.setFieldValue("Ma_TTB", curData?.Ma_TTB ? curData?.TrangThietBi?.Ten_TTB : [])

    }, [curData])
    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return <Fragment>
          {contextHolder}
          <Modal
    open={open} 
    footer={null} 
    title={action === "Add" ? "Thêm mới thiết bị" : "Chỉnh sửa thiết bị"}
    onCancel={() => handlModal()}
    >
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
             label="Loại thiết bị"
            >
             {
                <Select onChange={(value:any) => {
                   setMaLoai(value)
                } } options={Array.isArray(data) ? data.map((item:any) => {
                    return {
                        value: item?.Ma_Loai_TTB,
                        label: item?.Ten_Loai
                    }
                }) :[]} allowClear showSearch placeholder="Chọn loại trang thiết bị"/>
             }

            </Form.Item>
            <Form.Item
            required
             label="Trang thiết bị"
             rules={[
                {
                    required:true,
                    message:"Hãy chọn trang thiết bị"
                }
             ]}
             name={"Ma_TTB"}
            >
             {
                action === "Add" ? <Select allowClear showSearch filterOption={filterOption}  mode="multiple" options={ttbs} placeholder='Chọn thiết bị' /> 
                : <Select allowClear showSearch filterOption={filterOption}  options={ttbs} placeholder='Chọn thiết bị' /> 
             }

            </Form.Item>
        
        <Row>

                <Col span={4}></Col>
                <Col span={16}
                >
                    <Form.Item>
                        <div style={{ display: "flex", marginTop: "15px", alignItems: "center", justifyContent: "center" }}>

                            {
                                action === "Add" ? <Button type="primary" htmlType="submit" >Thêm mới</Button> : <Button style={{ width: "80px" }} type="primary" htmlType="submit">Lưu</Button>
                            }
                            <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handlModal()} >Hủy</Button>

                        </div>
                    </Form.Item>

                </Col>
                <Col span={4}></Col>

            </Row>
            </Form>
    </Modal>
    </Fragment>
}

export default ModalAddChiTietMuonTra