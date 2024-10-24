import React from 'react';

function XAxis(props) {
    const { xScale, height, width, axisLabel } = props;

    if (xScale) {
        return (
            <g transform={`translate(0, ${height})`}>
                {/* X-axis label */}
                <text
                    style={{ textAnchor: 'middle', fontSize: '15px' }}
                    x={width / 2}
                    y={40}  // Adjusted position for axis label text
                >
                    {axisLabel}
                </text>

                <line x1="0" x2={width} y1="0" y2="0" stroke="black" />

                {/* X-axis ticks */}
                {xScale.bandwidth ? (
                    // For categorical scales like scaleBand
                    xScale.domain().map((station, i) => (
                        <g key={i} transform={`translate(${xScale(station)}, 0)`}>
                            <line y2="6" stroke="black" />
                            <text
                                style={{ textAnchor: 'start', fontSize: '12px' }} // Left-align the text
                                x={xScale.bandwidth() / 2}  // Adjust text position within bar
                                dy="0.71em"
                                y="-10"  // Lowered text for better visibility
                                transform="rotate(80)"  // Rotated for readability
                            >
                                {station}
                            </text>
                        </g>
                    ))
                ) : (
                    // For linear scales
                    xScale.ticks().map((tick, i) => (
                        <g key={i} transform={`translate(${xScale(tick)}, 0)`}>
                            <line y2="6" stroke="black" />
                            <text
                                style={{ textAnchor: 'middle', fontSize: '12px' }}
                                x="0"
                                dy="0.71em"
                                y="10"
                            >
                                {tick}
                            </text>
                        </g>
                    ))
                )}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default XAxis;
