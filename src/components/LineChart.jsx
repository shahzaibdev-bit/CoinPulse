import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

/* ────  Chart.js v3+ REQUIRES explicit scale/element registration  ──── */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  /* ── build arrays for chart ───────────────────────────────────────── */
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(+coinHistory.data.history[i].price); // cast to number
    coinTimeStamp.push(
      new Date(coinHistory.data.history[i].timestamp * 1000) // API gives seconds
        .toLocaleDateString()
    );
  }

  /* ── Chart.js dataset object MUST be plural "datasets" ───────────── */
  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        borderColor: "#0071bd",
        backgroundColor: "#0071bd",
        fill: false,
      },
    ],
  };

  /* ── Updated Scale structure for Chart.js v3 ─────────────────────── */
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { beginAtZero: true },
      },
      x: {
        // category scale is now "x"
        display: true,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>

      {/* key={coinName} prevents "canvas already in use" on remount */}
      <Line key={coinName} data={data} options={options} />
    </>
  );
};

export default LineChart;
