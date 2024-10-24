import React from 'react';

function Points(props) {
    const { data, xScale, yScale, height, width, hoveredStation, setHoveredStation, setTooltipX, setTooltipY } = props;

    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const getRadius = (selectedStation, station) => {
        return station === selectedStation ? 10 : 5;
    };

    const handleMouseEnter = (station, event) => {
        setHoveredStation(station);  // Set hovered station
        setTooltipX(event.pageX);    // Set X coordinate for tooltip
        setTooltipY(event.pageY);    // Set Y coordinate for tooltip
    };

    const handleMouseOut = () => {
        setHoveredStation(null);  // Clear hovered station
        setTooltipX(null);        // Clear tooltip X coordinate
        setTooltipY(null);        // Clear tooltip Y coordinate
    };

    if (data) {
        return (
            <g>
                {hoveredStation && (
                    <rect x={0} y={0} width={width} height={height} fill="yellow" />
                )}
                {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={xScale(d.start)}
                        cy={yScale(d.end)}
                        r={getRadius(hoveredStation, d.station)}
                        fill={getColor(hoveredStation, d.station)}
                        stroke={d.station === hoveredStation ? 'black' : 'none'}
                        onMouseEnter={(event) => handleMouseEnter(d.station, event)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
                {hoveredStation && data.map((d, i) =>
                    d.station === hoveredStation ? (
                        <circle
                            key={`selected-${i}`}
                            cx={xScale(d.start)}
                            cy={yScale(d.end)}
                            r={10}
                            fill="red"
                            stroke="black"
                        />
                    ) : null
                )}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Points;
