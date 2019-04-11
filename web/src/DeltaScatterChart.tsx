import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import * as React from "react";
import {SAMPLE_LABELS} from "./DLWApp";


class CustomizedAxisTick extends React.PureComponent<any> {
    render() {
        return (
            <g transform={`translate(${this.props.x},${this.props.y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{SAMPLE_LABELS[this.props.payload.value]}</text>
            </g>
        );
    }
}

interface DeltaScatterChartProps {
    delta_units: string
    chart_data_d_meas: object[]
    chart_data_o18_meas: object[]
}

export class DeltaScatterChart extends React.Component<DeltaScatterChartProps> {

    render() {
        return (
            <ScatterChart height={400} width={500} margin={{top: 20, right: 5, bottom: 20, left: 20}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" dataKey="x" name="Time of Collection"
                       domain={[-0.5, 4.5]} tick={<CustomizedAxisTick/>} height={50}
                       ticks={[0, 1, 2, 3, 4]} interval={0}/>
                <YAxis yAxisId="2H" type="number" dataKey="y" name="Measured 2H" domain={[-200, 1000]}
                       unit={' ' + this.props.delta_units} ticks={[0, 200, 400, 600, 800]}/>
                <YAxis yAxisId="O18" type="number" dataKey="y" name="Measured O18" domain={[-25, 125]}
                       ticks={[0, 25, 50, 75, 100]} unit={' ' + this.props.delta_units} orientation="right"/>
                <Tooltip formatter={(value) => {
                    return typeof value === "number" ? SAMPLE_LABELS[value] : value;
                }}/>
                <Scatter yAxisId="2H" name="Measured 2H" data={this.props.chart_data_d_meas} fill="#ff9900"/>
                <Scatter yAxisId="O18" name="Measured O18" data={this.props.chart_data_o18_meas} fill="#0000ff"/>
                <Legend verticalAlign="top" align="right" height={30}/>
            </ScatterChart>
        );
    }
}