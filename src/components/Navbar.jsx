import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";
import coinpulse_logo from "../images/coinpulse-logo.svg";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (screenSize < 786) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={coinpulse_logo} size={50} shape="circle" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CoinPulse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          mode="vertical"
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "cryptos",
              icon: <FundOutlined />,
              label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
            },
            {
              key: "exchanges",
              icon: <MoneyCollectOutlined />,
              label: <Link to="/exchanges">Exchanges</Link>,
            },
            {
              key: "news",
              icon: <BulbOutlined />,
              label: <Link to="/news">News</Link>,
            },
          ]}
        />
      )}
      {/* <Button className="menu-control-container"></Button> */}
    </div>
  );
}

export default Navbar;
