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
    open: boolean,
    lichhoc: any,
    trangThietBi: any,
    curData: any,
    getData: any
}

async function fetchTTB(search: string): Promise<any[]> {
    return TrangthietbiServices.get( {
        page : 1,
        size : 100,
        ...(search && search !== "" && {Ten_TTB : search})
      }
    ).then((res) => {
     
      if(res.status) {
          const temp = res?.data?.data.map((item: any) => {
            return {
              label: item?.Ten_TTB,
              value: item?.Ma_TTB
            }
        })
        return temp
      }else {
        return []
      }
      
    }).catch((err :any) => console.log(err))
  }
const ModalMuonTra = (props: props) => {
    const [form] = Form.useForm()
    const {action, handleModal, open, trangThietBi, curData, getData} =  props
    const canbo = useSelector((state: any) => state.auth.user_info)
    const phongshoc = useSelector((state :any) => state.phonghoc.phonghocs)
    const [valueCheckbox, setValueCheckbox] = useState<any>()
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
                handleModal()
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
                Ma_LH: dunglich ? valueCheckbox : null
            }
            muontraServices.update(curData?.Ma_LSM, dataSumit).then((res) => {
                if(res.status) {
                    getData()
                    handleModal()
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
      form.setFieldsValue({
        ChuThich: curData?.ChuThich,
        SoDienThoai: curData?.SoDienThoai,
        NguoiMuon: curData?.NguoiMuon,
        lst_id_ttb: curData?.lst_id_ttb ? curData?.lst_id_ttb : []
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

    return <Fragment>
        {contextHolder}
        <Modal 
        open={open} 
        footer={null} 
        width={800}
        title={action === "Add" ? "Thêm mới thông tin mượn trang thiết bị" : "Chỉnh sửa thông tin mượn trang thiết bị"}
        onCancel={() => handleModal()}
        >
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
                    <Select defaultValue={curData?.LichHoc?.Ma_PH} onChange={(value) => handlChangeSelectLop(value)} style={{width:"100%"}} allowClear showSearch options={Array.isArray(phongshoc?.data) ? phongshoc?.data.map((item: any) => {
                            return {
                                ...item,
                                value: item?.Ma_PH ,
                                label: item?.TenPhong
                            }
                        }) : []} placeholder="Chọn  phòng học"
                            filterOption={filterOption}/>
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
            <Form.Item
                style={{marginTop:"8px"}}
                name="lst_id_ttb"
                label="Chọn trang thiết bị muốn mượn"
                rules={[
                    {
                        required:true,
                        message:"Hãy chọn thiết bị muốn mượn"
                    }
                ]}
            >
                {/* <Select allowClear showSearch options={trangThietBi} mode="multiple" placeholder="Chọn thiết bị"/> */}
                <DebounceSelect mode="multiple"  fetchOptions={fetchTTB} initOption={trangThietBi} placeholder='Chọn thiết bị' />

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
                            <Button style={{ width: "80px", marginLeft: "7px" }} onClick={() => handleModal()} >Hủy</Button>

                        </div>
                    </Form.Item>

                </Col>
                <Col span={4}></Col>

            </Row>
          </Form>
        </Modal>
    </Fragment>
}

export default ModalMuonTra 