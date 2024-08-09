import React, { useState } from 'react';
import DataStatisticsDiyCard from "./components/DataStatisticsDiyCard";
import {Button, Row, Col, Pagination} from "antd";

const DataStatisticsDiyPage = () => {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const pageSize = 4;

    const currentCards = cards.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const addCard = () => {
        setCards(prevCards => [...prevCards, {}]);
    };

    return (
        <div>
            <Button onClick={addCard} type='primary' style={{marginBottom: 12}}>添加卡片</Button>
            {/*<Row gutter={18}>
                {cards.map((card, index) => (
                    <Col span={12} key={index}>
                        <DataStatisticsDiyCard />
                    </Col>
                ))}
            </Row>*/}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap'}}>
                {cards.map((card, index) => (
                        <DataStatisticsDiyCard />
                ))}
            </div>
        </div>
    );
}

export default DataStatisticsDiyPage;
