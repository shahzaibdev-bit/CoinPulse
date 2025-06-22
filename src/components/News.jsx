import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Spin, Input } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;

function News({ simplified }) {
  const { data, isLoading } = useGetCryptoNewsQuery();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data?.data) {
      const filtered = data.data.filter((news) =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setArticles(filtered);
    }
  }, [data, searchTerm]);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "80vh" }}
      >
        <Spin tip="Loading…" size="large" />
      </div>
    );
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto" style={{ marginBottom: "20px" }}>
          <Input
            placeholder="Search News by Title"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[24, 24]}>
        {articles.slice(0, simplified ? 6 : 20).map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div
                  className="news-image-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Title level={4} className="news-title">
                    {news.title}
                  </Title>
                  {news.thumbnail && (
                    <img
                      src={news.thumbnail}
                      alt="news"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <p>{news.description}</p>
                <div style={{ marginTop: "10px" }}>
                  <Text type="secondary">
                    {moment(news.createdAt).fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default News;
