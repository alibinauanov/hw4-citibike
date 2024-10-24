import Bars from './bars';
import XAxis from './xAxis';
import YAxis from './yAxis';

function BarChart(props) {
    const { offsetX, offsetY, data, xScale, yScale, height, width, hoveredStation, setHoveredStation } = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars 
                data={data} 
                xScale={xScale} 
                yScale={yScale} 
                height={height}
                hoveredStation={hoveredStation}      // Pass down hoveredStation state
                setHoveredStation={setHoveredStation} // Pass down setHoveredStation function
            />
            <YAxis yScale={yScale} height={height} axisLable={"Bikers start from"} />
            <XAxis xScale={xScale} height={height} width={width} />
        </g>
    );
}

export default BarChart;
