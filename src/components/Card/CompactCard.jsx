import React from 'react';

const CompactCard = ({ param }) => {
    const Png = param.png;
    return (
        <div className="CompactCard">
            <div className="radialBar" data-testid="radial-bar">
                Chart
            </div>
            <div className="detail">
                <Png />
                <span data-testid="detail-value">${param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </div>
    )
}

export default CompactCard