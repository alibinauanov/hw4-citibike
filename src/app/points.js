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
        setHoveredStation(station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    };

    const handleMouseOut = () => {
        setHoveredStation(null);
        setTooltipX(null);
        setTooltipY(null);
    };

    if (data) {
        return (
            <g>
                {/* Yellow background when hovering */}
                {hoveredStation && (
                    <rect 
                        x={0} 
                        y={0} 
                        width={width} 
                        height={height} 
                        fill="yellow" 
                        opacity={0.3}  // Semi-transparent yellow background
                    />
                )}
                
                {/* Points */}
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
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Points;
