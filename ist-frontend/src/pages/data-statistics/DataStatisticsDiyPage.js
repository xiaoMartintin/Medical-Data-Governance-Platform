import React, { useState } from 'react';
import DataStatisticsDiyCard from "./components/DataStatisticsDiyCard";
import { Button, Row, Col } from "antd";

const DataStatisticsDiyPage = () => {
    const [cards, setCards] = useState([]);

    const addCard = () => {
        setCards(prevCards => [...prevCards, {}]);
    };

    return (
        <div>
            <Button onClick={addCard}>添加卡片</Button>
            <Row gutter={18}>
                {cards.map((card, index) => (
                    <Col span={12} key={index}>
                        <DataStatisticsDiyCard />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default DataStatisticsDiyPage;
