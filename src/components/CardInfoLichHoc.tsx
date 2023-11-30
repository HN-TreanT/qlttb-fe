import React from "react";
import { Radio, Row, Col, Checkbox } from "antd";
import "./cardInfo.scss"
import dayjs from "dayjs";
interface props {
    valueCheckbox: any,
    infoLichHoc: any,
    handleChange: any,
    valueSelected: any
}
const CardInfoLichHoc = (props: props) => {
    const {valueCheckbox, handleChange, valueSelected, infoLichHoc} = props
    return <div className="card-info-lich-hoc">
           <div className="content-card-info">
              <Row gutter={15}>
                  <Col span={22}>
                     <Row gutter={15}>
                         <Col style={{display:"flex"}} span={12}>
                            <label style={{fontWeight:"600", marginRight:"3px"}}>Ngày học:</label>
                            <div>{infoLichHoc?.NgayHoc ? dayjs(infoLichHoc?.NgayHoc).format("DD/MM/YYYY") : ""}</div>
                         </Col>
                         <Col style={{display:"flex"}} span={12}>
                            <label style={{fontWeight:"600", marginRight:"3px"}}>Phòng học: </label>
                            <div>{infoLichHoc?.PhongHoc ? infoLichHoc.PhongHoc?.TenPhong: ""}</div>
                         </Col>
                         <Col style={{display:"flex"}} span={12}>
                            <label style={{fontWeight:"600", marginRight:"3px"}}>Thời gian bắt đầu:</label>
                            <div>{infoLichHoc?.TG_BD ? infoLichHoc?.TG_BD : ""}</div>
                         </Col>
                         <Col style={{display:"flex"}} span={12}>
                            <label style={{fontWeight:"600", marginRight:"3px"}}>Thời gian kết thúc: </label>
                            <div>{infoLichHoc?.TG_KT ? infoLichHoc?.TG_KT : ""}</div>
                         </Col>
                         <Col span={24}>
                           <label style={{fontWeight:"600", marginRight:"3px"}}>Lớp tham gia: </label>
                            <div>{Array.isArray(infoLichHoc?.LichHoc_Lop) ? infoLichHoc?.LichHoc_Lop.map((lop: any, index: number) => {
                              if (index === 0) {
                                 return  `${lop?.Lop.Ten_Lop}`
                              } else {
                                 return `, ${lop?.Lop.Ten_Lop}`
                              }
                             
                            }) : ""}</div>
                         </Col>
                     </Row>
                  </Col>
                  <Col style={{alignItems:"flex-start", display:"flex", justifyContent:"flex-end"}} span={2}>
                    <Checkbox checked={valueSelected === valueCheckbox} onChange={handleChange} value={valueCheckbox}/>

                  </Col>

              </Row>
           </div>
    </div>
}

export default CardInfoLichHoc