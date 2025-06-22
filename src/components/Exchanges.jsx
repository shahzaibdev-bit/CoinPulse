import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar, Spin } from "antd";
import HTMLReactParser from "html-react-parser";

/* ⬇️  NOTE: now pulling data from the CoinGecko slice */
import { useGetExchangesQuery } from "../services/cryptoExchangesApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList = [], isLoading } = useGetExchangesQuery();

  // CoinGecko returns an array directly (not data.exchanges), so no extra nesting
  // Each item example:
  // {
  //   id: "binance",
  //   name: "Binance",
  //   image: "https://assets.coingecko.com/...",
  //   trade_volume_24h_btc: 357000,
  //   trust_score_rank: 1,
  //   year_established: 2017,
  //   url: "https://www.binance.com",
  //   description: ...
  // }

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "80vh" }}
      >
        <Spin tip="Loading exchanges..." size="large" />
      </div>
    );
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Vol (BTC)</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>Year</Col>
      </Row>

      <Row>
        {exchangesList.slice(0, 50).map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>{" "}
                      <Avatar
                        className="exchange-image"
                        src={exchange.image}
                        alt={exchange.name}
                      />{" "}
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>

                    <Col span={6}>
                      {millify(exchange.trade_volume_24h_btc)} BTC
                    </Col>

                    <Col span={6}>{exchange.trust_score}</Col>

                    <Col span={6}>{exchange.year_established || "N/A"}</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "No description.")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
