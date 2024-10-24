import React from 'react';

function Bars(props) {
    const { data, xScale, yScale, height, hoveredStation, setHoveredStation } = props;

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const handleMouseEnter = (station) => {
        setHoveredStation(station);  // Set hovered station
    };

    const handleMouseOut = () => {
        setHoveredStation(null);  // Clear hovered station
    };

    if (data) {
        return (
            <g>
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}
                        height={height - yScale(d.start)}
                        fill={getColor(hoveredStation, d.station)}
                        stroke="black"
                        onMouseEnter={() => handleMouseEnter(d.station)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Bars;
