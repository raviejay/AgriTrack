import { useState } from "react";
import { Layout, Menu, Button, Dropdown, Space, message } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  InboxOutlined,
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import logo from "../images/logo.png";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // To programmatically navigate to other pages

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Clear the token from localStorage and redirect to login page
    localStorage.removeItem("authToken");
    message.success({
      content: "Logout success!",
      duration: 4,
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item
        key="details"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile Details
      </Menu.Item>
      <Menu.Item key="logout" icon={<UserOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={250}
      style={{ backgroundColor: "#6A9C89" }}
    >
      {/* Sidebar header */}
      <div className="sidebar-header">
        {/* Logo and button for expanding/collapsing */}
        {!collapsed && (
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">AgriTrack</span>
          </div>
        )}
        <Button
          className={`toggle-btn ${collapsed ? "collapsed" : ""}`}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
        />
      </div>

      {/* Menu Items */}
      <Menu
        style={{ backgroundColor: "#6A9C89" }}
        defaultSelectedKeys={["/"]}
        mode="inline"
      >
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/data-entry" icon={<FormOutlined />}>
          <Link to="/data-entry">Data Entry</Link>
        </Menu.Item>
        <Menu.Item key="/inventory" icon={<InboxOutlined />}>
          <Link to="/inventory">Inventory</Link>
        </Menu.Item>
        <Menu.Item key="/analytics" icon={<LineChartOutlined />}>
          <Link to="/analytics">Analytics</Link>
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>

      {/* Profile Section with Dropdown */}
      <div className="profile">
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <UserOutlined />
              {!collapsed && <span className="profile-text">Profile</span>}
            </Space>
          </a>
        </Dropdown>
      </div>
    </Sider>
  );
};

export default Sidebar;
