import React, { Fragment, useEffect, useState } from "react";
import {Modal, message, Row, Col, Form, Button, Select, Input, TimePicker, Card, Checkbox, Switch} from 'antd'
import { useSelector } from "react-redux";
import { lichhoctapServices } from "../../utils/services/lichhoctapService";
import { muontraServices } from "../../utils/services/muontraService";
import CardInfoLichHoc from "../../components/CardInfoLichHoc";
import { TrangthietbiServices } from "../../utils/services/trangthietbiServices";
import DebounceSelect from "../../components/DebouceSelect";
interface props{
    action: string,
    handleModal : any,
    lichhoc: any,
    trangThietBi: any,
    curData: any,
    getData: any,
    setID: any,
    setCurrent: any,
    current: number
}

const ThongTinChung = (props: props) => {

    const [form] = Form.useForm()
    const {action, handleModal, trangThietBi, curData, getData, setCurrent, current, setID} =  props
    const canbo = useSelector((state: any) => state.auth.user_info)
    const phongshoc = useSelector((state :any) => state.phonghoc.phonghocs)
    // const [phonghocs, setPhongHocs] = useState<any>(phongshoc?.data ? phongshoc?.data : [])
    const [valueCheckbox, setValueCheckbox] = useState<any>()
    const [selectedPH, setSelectedPH] = useState<any> ()
    const [messageApi, contextHolder] = message.useMessage();
    const [lichhocs, setLichHoc] = useState<any>([])
    const [dunglich, setDungLich] = useState(true)
    const onFinish = (values :any) => {

        if (action === "Add") {
            const dataSubmit = {
                ...values,
                Ma_CB: canbo?.Ma_CB,
                Ma_LH: dunglich ? valueCheckbox : null
            }
            muontraServices.create(dataSubmit).then((res: any) => {
               if(res.status) {
                getData()
                setCurrent(current + 1)
                setID(res?.data.Ma_LSM)
                // handleModal()
                message.success("Thêm mới thành công")
               }
            }).catch((err: any) => {
                console.log(err)
                message.error("Thêm mới thất bại")
            })
        } else {
            const dataSumit = {
                ...values,
                Ma_CB: canbo?.Ma_CB,
                Ma_LH: dunglich ? valueCheckbox : null,
            }
            muontraServices.update(curData?.Ma_LSM, dataSumit).then((res) => {
                if(res.status) {
                    getData()
                    setCurrent(current + 1)
                    // handleModal()
                    message.success("Chỉnh sửa thành công")
                   }
            }).catch((err: any) => {
                message.error("Chỉnh sửa")
            })
        }
    }

    const getLichHoc = (Ma_PH: any) => {
        lichhoctapServices.get({
            page: 1,
            size : 4,
            ...(Ma_PH && {Ma_PH})
        }).then((res :any) => {
            if(res.status) {
                setLichHoc(res.data.data)
            }
        } ).catch((err :any) => {
            console.log(err)
        })
    }

    const getLichHocDetail = (Ma_LH :any) => {
        lichhoctapServices.getById(Ma_LH).then((res: any) => {
            if(res.status) {
                setLichHoc([res.data])
            }
        }).catch((err :any) => {
            console.log(err)
        })
    }

    const handlChangeSelectLop = (Ma_PH: any) => {
        setSelectedPH(Ma_PH)
       if(action === "Add") {
        if (Array.isArray(phongshoc?.data)) {
            const phonghoc = phongshoc.data.find((item:any) => item.Ma_PH === Ma_PH)
           if(Array.isArray(phonghoc?.TrangThietBi)) {
                const arrayTTb = phonghoc.TrangThietBi.map((item: any) => {
                    return item?.Ma_TTB
                })
                form.setFieldValue("lst_id_ttb", arrayTTb)
           } else {
            form.setFieldValue("lst_id_ttb", [])
           }
        }
       }
      
        
       if(Ma_PH) {
        getLichHoc(Ma_PH)
       } else {
        setLichHoc([])
       }
    }


  
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

    useEffect(() => {
      if(action === "Add") {
          setValueCheckbox(undefined)
          setSelectedPH(undefined)
      } else {
        setSelectedPH(curData?.LichHoc ? curData?.LichHoc?.Ma_PH : undefined)
        setValueCheckbox(curData?.Ma_LH)

      }
      form.setFieldsValue({
        ChuThich: curData?.ChuThich,
        SoDienThoai: curData?.SoDienThoai,
        NguoiMuon: curData?.NguoiMuon,
      })
      if(curData?.ChuThich) {
        setDungLich(false)
      } else {
        setDungLich(true)
        
      }

      if(curData?.Ma_LH) {
        getLichHocDetail(curData?.Ma_LH)
      } else {
        setLichHoc([])
      }
      
    }, [curData])

    return <>
    {contextHolder}
         <Form onFinish={onFinish} form={form} layout="vertical">
             <Row gutter={15}>
                <Col span={12}>
                    <Form.Item
                        style={{marginBottom:"4px"}}
                        label={
                        "Tên người mượn"
                        }
                        name='NguoiMuon'
                        rules={[
                            {
                            required: true,
                            message: 'Hãy nhập tên người mượn'
                            }
                        ]}
                        >
                    <Input placeholder="Nhập tên ngứoi mượn "/>
                        
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        style={{marginBottom:"4px"}}
                        label={
                        "Số điện thoại"
                        }
                        name='SoDienThoai'
                        rules={[
                            {
                            required: true,
                            message: 'Hãy nhập số điện thoại'
                            }
                        ]}
                        >
                    <Input placeholder="Nhập số điện thoại "/>
                        
                    </Form.Item>
                </Col>
            </Row>
            <Card style={{marginTop:"10px"}} 
                title={<Row>
                  <Col span={18}>              
                    <Form.Item 
                    rules={[
                        {
                            required:true,
                            message:"Vui lòng chọn phòng học"
                        }
                    ]}>
                        <Select 
                      
                        // defaultValue={curData?.LichHoc ? curData?.LichHoc?.Ma_LH : undefined} 
                            value={selectedPH}
                            onChange={(value) => handlChangeSelectLop(value)} style={{width:"100%", marginTop:"10px"}} allowClear showSearch options={Array.isArray(phongshoc?.data) ? phongshoc?.data.map((item: any) => {
                                return {
                                    ...item,
                                    value: item?.Ma_PH ,
                                    label: item?.TenPhong
                                }
                            }) : []} placeholder="Chọn  phòng học"
                                filterOption={filterOption}/>
                    </Form.Item>
                  </Col>
                  <Col style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}} span={6}>
                      <span style={{marginRight:"5px"}}>Đúng lịch</span>
                      <Switch checked={dunglich} onChange={(e) => {
                            setDungLich(e)
                      }}/>
                  </Col>

                </Row>}
                >
                      {
                        dunglich ? 
                            Array.isArray(lichhocs) ? lichhocs.map((item :any) => {
                                return  <CardInfoLichHoc handleChange={handleChangeCheckbox} infoLichHoc={item} valueSelected={valueCheckbox} valueCheckbox={item?.Ma_LH}/>
                            }) : ""
                        :  <Form.Item  name="ChuThich">
                            <Input.TextArea rows={4} placeholder="Chú thích"/>
                        </Form.Item>
                      }             
            </Card>
            
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
    </>
}

export default ThongTinChung