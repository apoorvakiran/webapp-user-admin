import { AnimateSharedLayout } from 'framer-motion';
import React, { useState } from 'react';

const Card = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div className="card">
                <AnimateSharedLayout>
                    {
                        expanded ? (
                            'Expanded'
                        ) :
                            <CompactCard param={props} />
                    }
                </AnimateSharedLayout>
            </div>
        </>

    );
};

// compact Card
function CompactCard({ param }) {
    const Png = param.png;
    return (
        <div className="CompactCard">
            <div className="radialBar">
                Chart
            </div>
            <div className="detail">
                <Png />
                <span>${param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </div>
    );
}

export default Card;
