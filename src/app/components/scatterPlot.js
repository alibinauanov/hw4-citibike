"use client";

import Points from './points';
import XAxis from './xAxis';
import YAxis from './yAxis';

function ScatterPlot(props) {
    const { offsetX, offsetY, data, xScale, yScale, height, width, hoveredStation, setHoveredStation, setTooltipX, setTooltipY } = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points 
                data={data} 
                xScale={xScale} 
                yScale={yScale} 
                height={height} 
                width={width}
                hoveredStation={hoveredStation}      // Pass down hoveredStation
                setHoveredStation={setHoveredStation} // Pass down setHoveredStation
                setTooltipX={setTooltipX}            // Pass down setTooltipX
                setTooltipY={setTooltipY}            // Pass down setTooltipY
            />
            <YAxis yScale={yScale} height={height} axisLable={"Trip duration end in"} />
            <XAxis xScale={xScale} height={height} width={width} axisLable={"Trip duration start from"} />
        </g>
    );
}

export default ScatterPlot;
