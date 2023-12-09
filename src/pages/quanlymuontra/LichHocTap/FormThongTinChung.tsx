import React, { useEffect, useState } from "react";
import { Form, Row, Col, DatePicker, Select, Button, TimePicker } from 'antd'
import { message } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { lichhoctapServices } from "../../../utils/services/lichhoctapService";
import { lopServices } from "../../../utils/services/lopService";
import DebounceSelect from "../../../components/DebouceSelect";
import locale from 'antd/es/date-picker/locale/vi_VN'

const FormItem = Form.Item

interface UserValue {
    label: string;
    value: string;
  }
interface Props {
    curData: any,
    action: string,
    getData: any,
    setCurrent?: any
    current?: number,
    handleModal: any,
    setId?: any,
    lops: any[]

}


async function fetchClass(search: string): Promise<UserValue[]> {
    return lopServices.get({
        page: 1,
        size: 100,
        ...(search && search !== " " && { search })
    }).then((res) => {
        // console.log(res.data.data);
        const temp = res?.data.data.map((item: any) => {
            return {
               
                value: item?.Ma_Lop,
                label: item?.Ten_Lop
            };
        });
        return temp;
    });
}

const FormThongTinChung = (props: Props) => {
    const [form] = Form.useForm()
    const phongshoc = useSelector((state :any) => state.phonghoc.phonghocs)
    const { curData, action, getData, current, setCurrent, handleModal, setId, lops } = props
    const onFinish = async (values: any) => {
        try {
            const dataSubmit = {
                ...values,
                TG_BD: values?.TG_BD ? dayjs(values?.TG_BD).format('HH:mm:ss') : "",
                TG_KT: values?.TG_KT ? dayjs(values?.TG_KT).format('HH:mm:ss') : "",

            }
            if (action === "Add") {
                const res = await lichhoctapServices.create(dataSubmit)
                if (res.status) {           
                    getData()
                    handleModal()
                    // setCurrent(current + 1)   
                    // setId(res?.data?.Ma_LH)            
                    message.success("Thêm mới thành công")
                } 
            } else {
                const res = await lichhoctapServices.update(curData.Ma_LH, dataSubmit)
                if (res.status) {
                    getData()       
                    handleModal()
                    message.success("Chỉnh sửa thành công")
                } else {
                    message.error(res.message)
                }
            }
        } catch (err: any) {
            console.log(err)
            message.error(" thất bại")
        }

    }

    useEffect(() => {
        if (curData) {
        
            form.setFieldsValue({
                Ma_PH: curData?.Ma_PH,
                NgayHoc:curData?.NgayHoc ? dayjs(curData?.NgayHoc) :null,          
                TG_BD: curData?.TG_BD ? dayjs(curData?.TG_BD,"HH:mm:ss") : null,
                TG_KT: curData?.TG_KT ? dayjs(curData?.TG_KT, "HH:mm:ss") : null,
                id_lops: curData?.id_lops || []

            })
        }
    }, [curData, form])
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return  <Form onFinish={onFinish} layout="vertical" form={form} >

   <Row gutter={15}>
        <Col span={12}>
            <FormItem
                style={{ marginBottom: "4px" }}
                label={
                    "Phòng học"
                }
                name='Ma_PH'
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn phòng học'
                    }
                ]}
            >
               <Select allowClear showSearch options={Array.isArray(phongshoc?.data) ? phongshoc?.data.map((item: any) => {
                                return {
                                    ...item,
                                    value: item?.Ma_PH ,
                                    label: item?.TenPhong
                                }
                            }) : []} placeholder="Chọn  phòng học"
                                filterOption={filterOption}
              />
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                style={{ marginBottom: "4px" }}
                label={
                    "Ngày học"
                }
                name='NgayHoc'
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn ngày học'
                    }
                ]}
            >
                <DatePicker locale={locale} style={{width:"100%"}} placeholder='Chọn ngày học' />
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                style={{ marginBottom: "4px" }}
                label={
                    "Thời gian bắt đầu"
                }
                name='TG_BD'
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn thời gian bắt đầu'
                    }
                ]}
            >
                <TimePicker style={{width:"100%"}} placeholder='Chọn thời gian bắt đầu' />
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                style={{ marginBottom: "4px" }}
                label={
                    "Thời gian kết thúc"
                }
                name='TG_KT'
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn thời gian kết thúc'
                    }
                ]}
            >
                <TimePicker style={{width:"100%"}} placeholder='Chọn thời gian kết thúc' />
            </FormItem>
        </Col>
        <Col span={24}>
            <FormItem
                style={{ marginBottom: "4px" }}
                label={
                    "Các lớp tham gia"
                }
                name='id_lops'
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn các lớp tham gia'
                    }
                ]}
            >
                <DebounceSelect mode="multiple"  fetchOptions={fetchClass} initOption={lops} placeholder='Chọn các lớp tham gia' />
            </FormItem>
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
};

export default FormThongTinChung;
