import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";
import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </Layout>
        <div
          className="footer"
          style={{ background: "#001529", padding: "30px 20px" }}
        >
          <Typography.Title
            level={4}
            style={{ color: "#fff", textAlign: "center", marginBottom: 10 }}
          >
            🚀 CryptoVerse
          </Typography.Title>
          <Typography.Paragraph
            style={{ color: "#ccc", textAlign: "center", marginBottom: 20 }}
          >
            Stay ahead with the latest crypto news, prices, and exchanges — all
            in one place.
          </Typography.Paragraph>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginBottom: 20,
            }}
          >
            <Link to="/" style={{ color: "#1890ff" }}>
              Home
            </Link>
            <Link to="/cryptocurrencies" style={{ color: "#1890ff" }}>
              Cryptocurrencies
            </Link>
            <Link to="/exchanges" style={{ color: "#1890ff" }}>
              Exchanges
            </Link>
            <Link to="/news" style={{ color: "#1890ff" }}>
              News
            </Link>
          </Space>
          <Typography.Text
            style={{ display: "block", textAlign: "center", color: "#888" }}
          >
            © {new Date().getFullYear()} CryptoVerse. All rights reserved.
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default App;
