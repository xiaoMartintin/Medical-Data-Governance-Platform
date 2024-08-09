import React, {useEffect, useState} from 'react';
import DataStatisticsDiyCard from "./components/DataStatisticsDiyCard";
import {Button, Row, Col, Pagination} from "antd";
import { v4 as uuidv4 } from 'uuid';

const DataStatisticsDiyPage = () => {
    const initialCards = JSON.parse(localStorage.getItem('cards')) || [];
    const [cards, setCards] = useState([...initialCards]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const handlePageChange = (page) => {
    //     setCurrentPage(page)
    // }
    // const pageSize = 4;
    //
    // const currentCards = cards.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
        // localStorage.clear();
    }, [cards]);

    const addCard = () => {
        setCards(prevCards => [...prevCards, { id: uuidv4() }]);
        console.log('cards:', cards)
        console.log('current cards: ', JSON.parse(localStorage.getItem('cards')))
    };

    const deleteCard = (id) => {
        // console.log('delete card:', id)
        setCards(prevCards => prevCards.filter((card) => card.id !== id));
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
                flexWrap: 'wrap'
            }}>
                {cards.map((card) => (
                    <DataStatisticsDiyCard onDelete={deleteCard} key={card.id} id={card.id}/>
                ))}
            </div>
        </div>
    );
}

export default DataStatisticsDiyPage;
