import React, { useState } from 'react'
import {
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import Sidebar from './sider/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import './Layout.scss'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons"
import {faUserCircle} from "@fortawesome/free-regular-svg-icons"
import { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouterLinks } from '../const/RouterLinks';
const { Header, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate()
  const canbo = useSelector((state: any) => state.auth.user_info)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const hanldeLogout = () => {
    localStorage.clear()
    navigate(RouterLinks.LOGIN)
  }
  const items: MenuProps['items'] = [
    {
      label: <div onClick={hanldeLogout} style={{color:"red"}}><FontAwesomeIcon style={{marginRight:"7px"}} icon={faArrowRightFromBracket}/>Đăng xuất</div>,
      key: '0',
    },
   
  ];

  return (
    <Layout >
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 300 }}>
        <Header style={{ padding: 0, background: colorBgContainer, display:"flex", justifyContent:"flex-end"}}>
            <Dropdown menu={{items}} trigger={['click']}>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginRight:"38px", cursor:"pointer"}}>
                {/* <UserOutlined  style={{marginRight:"5px", fontSize:"20px"}}/> */}
                <FontAwesomeIcon icon={faUserCircle} style={{marginRight:"5px", fontSize:"25px"}}/>
                <div>{canbo?.Ten_CB}</div>   
              </div>
            </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0', overflow: 'initial',
          }}
        >
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
