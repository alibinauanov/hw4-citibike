import React from 'react';

function YAxis(props) {
    const { yScale, height, axisLabel } = props;

    if (yScale) {
        return (
            <g>
                {/* Y-axis line */}
                <line x1="0" x2="0" y1="0" y2={height} stroke="black" />

                {/* Y-axis ticks */}
                {yScale.ticks().map((tick, i) => (
                    <g key={i} transform={`translate(0, ${yScale(tick)})`}>
                        <line x2="6" stroke="black" />
                        <text
                            style={{ textAnchor: 'end', fontSize: '12px' }}
                            x="-9"
                            dy=".32em"
                        >
                            {tick}
                        </text>
                    </g>
                ))}
                
                {/* Y-axis label */}
                <text
                    style={{ textAnchor: 'middle', fontSize: '15px' }}
                    transform={`translate(-50, ${height / 2})rotate(-90)`}  // Rotate the label for Y axis
                >
                    {axisLabel}
                </text>
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default YAxis;
