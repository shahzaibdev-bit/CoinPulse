import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Row, Col, Typography, Select, Spin } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import LineChart from "./LineChart"; // Assuming you have a LineChart component

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails({ crypto }) {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      {isFetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      ) : null}
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
          </Title>
          <p>
            {cryptoDetails?.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
          <Select
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="Select time Period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </Select>

          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />

          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails?.name} Value Statistics
                </Title>
                <p>
                  An overview showing the statistics of {cryptoDetails?.name},
                  such as the base and quote currency, the rank, and trading
                  volume.
                </p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats" key={title}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>

            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">
                  Others Statistics
                </Title>
                <p>
                  An overview showing the statistics of all cryptocurrencies,
                  such as the number of markets, exchanges, and total supply.
                </p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats" key={title}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
        </Col>
        <Col className="coin-desc-link">
          {cryptoDetails?.description && (
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails.name}
              </Title>
              <Text>{HTMLReactParser(cryptoDetails.description)}</Text>
            </Row>
          )}
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Links
            </Title>
            {cryptoDetails?.links?.map((link, i) => (
              <Row
                className="coin-link"
                key={i}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => window.open(link.url, "_blank")}
              >
                <Title level={5} className="link-name" style={{ margin: 0 }}>
                  {link.type}
                </Title>
                <Text style={{ color: "#1890ff" }}>{link.name}</Text>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
}

export default CryptoDetails;
