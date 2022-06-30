import React from 'react';
import { cardsData } from '../../Data/Data';
import Card from '../Card/Card';
import './cards.css';

const Cards = () => {
    return (
        <div className="cards">
            {cardsData.map((card, id) => {
                return (
                    <div className="parentContainer">
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Cards