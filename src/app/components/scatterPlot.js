"use client";

import Points from '../points';
import XAxis from './xAxis';
import YAxis from './yAxis';

function ScatterPlot(props) {
    const { data, xScale, yScale, height, width, hoveredStation, setHoveredStation, setTooltipX, setTooltipY } = props;

    return (
        <g>
            <Points 
                data={data} 
                xScale={xScale} 
                yScale={yScale} 
                height={height} 
                width={width}
                hoveredStation={hoveredStation}
                setHoveredStation={setHoveredStation}
                setTooltipX={setTooltipX}
                setTooltipY={setTooltipY}
            />
            <YAxis 
                yScale={yScale} 
                height={height} 
                axisLabel={"Trip duration end in"} 
            />
            <XAxis 
                xScale={xScale} 
                height={height} 
                width={width} 
                axisLabel={"Trip duration start from"} 
            />
        </g>
    );
}

export default ScatterPlot;
