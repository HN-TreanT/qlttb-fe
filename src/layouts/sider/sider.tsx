import Sider from "antd/es/layout/Sider";
import { Image, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import { RouterLinks } from "../../const/RouterLinks";
import {
  ReconciliationOutlined,
  HomeOutlined,
  InboxOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  SettingOutlined,
  TableOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import SubMenu from "antd/es/menu/SubMenu";

interface props {
  collapsed: any,
  setCollapsed: any
}
const menuItems = [
  {
    key: "qlcb",
    label: "Quản lý cán bộ",
    icon: (
      <ShopOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
    children: [
      {
        key: RouterLinks.CAN_BO,
        label: "Danh sách cán bộ",
      },
      {
        key: RouterLinks.LICH_LAM_VIEC,
        label: "Lịch làm việc",
      },
    ],
  },
  {
    key: "qlttb",
    label: "Quản lý trang thiết bị",
    icon: (
      <ShopOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
    children: [
      {
        key: RouterLinks.TRANG_THIET_BI,
        label: "Trang thiết bị",
      },
      {
        key: RouterLinks.LOAI_TTB,
        label: "Loại trang thiết bị",
      },
      {
        key: RouterLinks.TINH_TRANG_TTB,
        label: "Tình trạng trang thiết bị",
      },
    ],
  },

  {
    key: "muontra",
    label: "Quản lý mượn trả ",
    icon: (
      <ShopOutlined style={{ fontSize: "1.3rem", paddingRight: "0.5rem" }} />
    ),
    children: [
      {
        key: RouterLinks.MUON_TRA,
        label: "Mượn trả",
      },
      {
        key: RouterLinks.LS_SU_DUNG_TTB,
        label: "Lịch sử sử dụng",
      },
      {
        key: RouterLinks.LICH_HOC_TAP,
        label: "Lịch học tập",
      },
      {
        key: RouterLinks.DANH_SACH_LOP,
        label: "Danh sách lớp",
      },
      {
        key: RouterLinks.DANH_SACH_PHONG,
        label: "Danh sách phòng",
      },

    ],
  },

];


const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = (e: any) => {
    // console.log(e.key)
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
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={onClick}
      >

        {menuItems.map((item) => {
          if (item.children) {
            return (
              <SubMenu
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
                  <Menu.Item
                    key={childItem.key}

                  >
                    {/* <Link to={childItem.url}>{childItem.label}</Link> */}
                    {item.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item
                key={item.key}
                icon={item.icon}
              >
                {item.label}
                {/* <Link to={item.url}>{item.label}</Link> */}
              </Menu.Item>
            );
          }
        })}
      </Menu>

    </Sider>
  );
};

export default Sidebar;
