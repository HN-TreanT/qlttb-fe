import Sider from "antd/es/layout/Sider";
import { Image, Menu } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import { RouterLinks } from "../../const/RouterLinks";
import SubMenu from "antd/es/menu/SubMenu";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faHardDrive, faBookmark} from '@fortawesome/free-regular-svg-icons'
import { faBars } from "@fortawesome/free-solid-svg-icons";
interface props {
  collapsed: any,
  setCollapsed: any
}
const menuItems = [
  {
    key: RouterLinks.MUON_TRANG_TB,
    label: "Mượn trả trang thiết bị",
    icon: (
      <FontAwesomeIcon icon={faHardDrive} style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }} />
    ),
    role: "U"
  },
  {
    key: "quanlycanbo",
    label: "Quản lý nhân viên",
    icon: (
      <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }} />
    ),
    role: "U",
    children: [
      {
        key: RouterLinks.CAN_BO,
        label: "Danh sách nhân viên",
        role: "A"
      },
      {
        key: RouterLinks.LICH_LAM_VIEC,
        label: "Lịch làm việc",
        role: "U"
      },
    ],
  },
  {
    key: "quanlyttb",
    label: "Quản lý trang thiết bị",
    role: "U",
    icon: (
      <FontAwesomeIcon icon={faHardDrive} style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }} />

    ),
    children: [
      {
        key: RouterLinks.TRANG_THIET_BI,
        label: "Trang thiết bị",
        role: "U"
      },
      {
        key: RouterLinks.LOAI_TTB,
        label: "Loại trang thiết bị",
        role: "U"
      },
      {
        key: RouterLinks.TINH_TRANG_TTB,
        label: "Tình trạng trang thiết bị",
        role: "U"
      },
      {
        key: RouterLinks.NHAP_THIET_BI,
        label: "Cập nhật trang thiết bị",
        role: "U"
      },
    ],
  },
  {
    key: "quanlysudungttb",
    label: "Quản lý mượn trả ",
    icon: (
      <FontAwesomeIcon icon={faBookmark} style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }} />
      
    ),
    role: "U",
    children: [
      // {
      //   key: RouterLinks.MUON_TRA,
      //   label: "Mượn trả",
      // },
      {
        key: RouterLinks.LS_SU_DUNG_TTB,
        label: "Lịch sử sử dụng",
        role: "U"
      },
     
    ],
  },

  {
    key: "quanlychung",
    label: "Quản lý chung ",
    icon: (
      <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.2rem", paddingRight: "0.5rem" }} />

    ),
    role: "A",
    children: [
      {
        key: RouterLinks.LICH_HOC_TAP,
        label: "Lịch học tập",
        role: "A"
      },
      {
        key: RouterLinks.DANH_SACH_LOP,
        label: "Danh sách lớp",
        role: "A"
      },
      {
        key: RouterLinks.DANH_SACH_PHONG,
        label: "Danh sách phòng",
        role: "A"
      },
    ],
  },

];
const Sidebar = () => {
  const role = localStorage.getItem("role")
  const navigate = useNavigate();
  const onClick = (e: any) => {
    navigate(e.key)
  }
  return (
    <Sider style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }} width={300} trigger={null}>
      <Image src={logo} preview={false} style={{ padding: 5 }} />
      <Menu
        selectedKeys={['/' + window.location.pathname.split("/")[1] + '/' + window.location.pathname.split("/")[2]]}
        defaultOpenKeys ={[window.location.pathname.split("/")[1]]}
        theme="dark"
        mode="inline"
        // items={menuItems}
        onClick={onClick}
      >

        {menuItems.map((item) => {
          if (item.children) {
            return (
              ((role === item?.role && role === "U") || role==="A") ? <SubMenu
              key={item.key}
            
              title={
                <span>
                  {" "}
                  {item.icon}
                  {item.label}
                </span>
              }
            >
              {item.children.map((childItem) => (
               ((role === childItem?.role && role === "U") || role==="A") ?  <Menu.Item
                  key={childItem.key}

                >
                  
                  {childItem.label}
                </Menu.Item> : ""
              ))}
            </SubMenu> : ""
            
            );
          } else {
            return (
              ((role === item?.role && role === "U") || role==="A") ?  <Menu.Item
                key={item.key}
                icon={item.icon}
              >
                {item.label}
                {/* <Link to={item.key}>{item.label}</Link> */}
              </Menu.Item> : ""
            );
          }
        })}
      </Menu>

    </Sider>
  );
};

export default memo(Sidebar);
