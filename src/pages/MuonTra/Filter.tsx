import React from "react";
import { Row, Col, Input, Divider, Select } from "antd";
import DebounceSelect from "../../components/DebouceSelect";
import { canboServices } from "../../utils/services/canbo";

interface UserValue {
    label: string;
    value: string;
  }

  interface props {
    setSearchTenNguoiMuon: any,
    setCurrentPage: any,
    canbos: any[],
    setSearchMaCB: any
  }
  
async function fetchCanbo(search: string): Promise<UserValue[]> {
    return canboServices.get( {
        page : 1,
        size : 100,
        ...(search && search !== "" && {Ten_CB : search})
      }
    ).then((res) => {
     
      if(res.status) {
          const temp = res?.data?.data.map((item: any) => {
            return {
              label: item?.Ten_CB,
              value: item?.Ma_CB
            }
        })
        return temp
      }else {
        return []
      }
      
    }).catch((err :any) => console.log(err))
  }
const Filter = (props: props) => {
    const {setSearchMaCB, setSearchTenNguoiMuon, setCurrentPage, canbos} = props
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return <Row gutter={15}>
    <Col span={6}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <label style={{ marginBottom: "4px" }}>Tên người mượn</label>
        <Input
          type="text"
          placeholder="Tên người mượn"
          style={{ height: "34px" }}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchTenNguoiMuon('')
            }
          }}
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              setSearchTenNguoiMuon(e.target?.value)
              setCurrentPage(1)
            }
          }}
        />
      </div>
    </Col>

    <Col span={6}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <label style={{ marginBottom: "4px" }}>Nhân viên phụ trách</label>
        {/* <DebounceSelect initOption={canbos} style={{width:"100%"}} onChange={(value) => setSearchMaCB(value) } fetchOptions={fetchCanbo} placeholder="Chọn nhân viên phụ trách"/> */}
        <Select filterOption={filterOption} allowClear showSearch options={canbos} style={{width:"100%"}} onChange={(value) => setSearchMaCB(value) } placeholder="Chọn nhân viên phụ trách"/>
      </div>
    </Col>
    <Divider style={{ margin: "10px" }}></Divider>
  </Row>
}

export default Filter