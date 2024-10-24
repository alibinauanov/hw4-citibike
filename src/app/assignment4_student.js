"use client";  // Ensures the component renders on the client side

import React, { useState } from 'react';
import * as d3 from "d3";
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container } from 'react-bootstrap';
import ScatterPlot from './components/scatterPlot';  // Import your ScatterPlot component
import BarChart from './components/barChart';        // Import your BarChart component
import Tooltip from './components/tooltips';         // Import your Tooltip component

const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv';

// Custom hook to fetch CSV data
function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);

    React.useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, [csvPath]); // Added csvPath as a dependency to avoid the React hook warning
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = useState('4');  // Default month
    const [hoveredStation, setHoveredStation] = useState(null);  // Hook to track the hovered station
    const [tooltipX, setTooltipX] = useState(null);  // Hook for tooltip X position
    const [tooltipY, setTooltipY] = useState(null);  // Hook for tooltip Y position

    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };

    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 40, right: 20, bottom: 50, left: 60 };  // Adjust left margin for y-axis label
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom - 120;
    const innerWidth = WIDTH - margin.left - margin.right;

    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const data = dataAll.filter(d => d.month === MONTH[month]);  // Filter data by month

    // Scales for scatter plot
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])  // Domain covers the data range
        .range([0, innerWidth])  // Range covers the full width of the scatter plot
        .nice();

    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])  // Domain covers the data range
        .range([innerHeightScatter, 0])  // Range from bottom to top of the plot (invert)
        .nice();

    // Scales for bar chart
    const xScaleBar = d3.scaleBand()
        .domain(data.map(d => d.station))
        .range([0, innerWidth])
        .padding(0.1);

    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.start)])
        .range([innerHeightBar, 0]);

    // Handles month change via slider
    const changeHandler = (event) => {
        setMonth(event.target.value);
    };

    return (
        <Container>
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler} />
                    <input key="monthText" type="text" value={MONTH[month]} readOnly />
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    {/* Scatter Plot */}
                    <svg width={WIDTH} height={HEIGHT}>
                        <g transform={`translate(${margin.left}, ${margin.top})`}>
                            <ScatterPlot 
                                offsetX={margin.left} 
                                offsetY={margin.top} 
                                data={data} 
                                xScale={xScaleScatter} 
                                yScale={yScaleScatter} 
                                height={innerHeightScatter} 
                                width={innerWidth}
                                hoveredStation={hoveredStation}      // Pass down hoveredStation
                                setHoveredStation={setHoveredStation} // Pass down the setter function
                                setTooltipX={setTooltipX}            // Pass down the setter for tooltip X
                                setTooltipY={setTooltipY}            // Pass down the setter for tooltip Y
                            />
                        </g>
                    </svg>
                </Col>
                <Col>
                    {/* Bar Chart */}
                    <svg width={WIDTH} height={HEIGHT}>
                        <g transform={`translate(${margin.left}, ${margin.top})`}>
                            <BarChart 
                                offsetX={margin.left} 
                                offsetY={margin.top} 
                                data={data} 
                                xScale={xScaleBar} 
                                yScale={yScaleBar} 
                                height={innerHeightBar} 
                                width={innerWidth}
                                hoveredStation={hoveredStation}      // Pass down hoveredStation
                                setHoveredStation={setHoveredStation} // Pass down the setter function
                            />
                        </g>
                    </svg>
                </Col>
            </Row>
            {/* Tooltip component */}
            <Tooltip d={data.find(d => d.station === hoveredStation)} x={tooltipX} y={tooltipY} />
        </Container>
    );
}

export default Charts;
