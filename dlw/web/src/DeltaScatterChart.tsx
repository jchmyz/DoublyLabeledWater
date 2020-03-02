import {CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from "recharts";
import * as React from "react";


class CustomizedAxisTick extends React.PureComponent<any> {
    render() {
        return (
            <g transform={`translate(${this.props.x},${this.props.y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{this.props.labels[this.props.payload.value]}</text>
            </g>
        );
    }
}

interface DeltaScatterChartProps {
    delta_units: string
    chart_data_d_meas: object[]
    chart_data_o18_meas: object[]
    x_domain: [number, number]
    x_ticks: number[]
    labels: string[]
}

export class DeltaScatterChart extends React.Component<DeltaScatterChartProps> {

    render() {
        return (
            <ScatterChart height={400} width={500} margin={{top: 20, right: 5, bottom: 20, left: 20}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" dataKey="x" name="Time of Collection"
                       domain={this.props.x_domain} tick={<CustomizedAxisTick labels={this.props.labels}/>} height={50}
                       ticks={this.props.x_ticks} interval={0}/>
                <YAxis yAxisId="2H" type="number" dataKey="y" name="Measured 2H" domain={[-200, 1000]}
                       unit={' ' + this.props.delta_units} ticks={[0, 200, 400, 600, 800]}/>
                <YAxis yAxisId="O18" type="number" dataKey="y" name="Measured O18" domain={[-25, 125]}
                       ticks={[0, 25, 50, 75, 100]} unit={' ' + this.props.delta_units} orientation="right"/>
                <Tooltip formatter={(value) => {
                    return typeof value === "number" ? this.props.labels[value] : value;
                }}/>
                <Scatter yAxisId="2H" name="Measured 2H" data={this.props.chart_data_d_meas} fill="#ff9900"/>
                <Scatter yAxisId="O18" name="Measured 18O" data={this.props.chart_data_o18_meas} fill="#0000ff"/>
                <Legend verticalAlign="top" align="right" height={30}/>
            </ScatterChart>
        );
    }
}