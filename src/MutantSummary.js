import React from 'react';
import './styles/App.css';
import './styles/MutantSummary.css';
import * as d3 from 'd3';

class MutantSummary extends React.Component {
    constructor(props) {
        super(props);
        
        if (!this.props.mutants) {
            throw "\"mutants\" not passed as a prop";
        }
    }

    pieRadius = 50;
    pieMargin = 10;
    colors = {
        "killed" : "green",
        "live" : "red",
        "equivalent" : "yellow"
    };

    extractSummaryInfo() {
        var summaryObj = {};
        summaryObj.killed = this.props.mutants.filter(m => m.killed && !m.equivalent).length;
        summaryObj.equivalent = this.props.mutants.filter(m => m.equivalent).length;
        summaryObj.live = this.props.mutants.filter(m => !m.killed && !m.equivalent).length;
        summaryObj.productive = this.props.mutants.filter(m => m.productive).length;
        return summaryObj;
    }

    drawToolTip(x, y, node, total) {
        d3.select("#tooltip")
            .style("left", `${x}px`)
            .style("top", `${y}px`)
            .style("background-color", this.colors[node.data[0]])
            .html(`${node.data[0]}<br/>${(node.data[1] * 100.0 / total).toFixed(1)}%`)
            .style("display", "inline");
    }

    hideToolTip() {
        d3.select("#tooltip")
            .style("display", "none");
    }

    drawPieChart() {
        const svg = d3.select("div#pieChart").append("svg")
                        .attr("width", this.pieRadius * 2 + this.pieMargin)
                        .attr("height", this.pieRadius * 2 + this.pieMargin);

        d3.select("div#pieChart").append("div")
            .attr("id", "tooltip");

        const g = svg.append("g")
                    .attr("transform", `translate(${this.pieRadius + this.pieMargin / 2}, ${this.pieRadius + this.pieMargin / 2})`);

        const pie = d3.pie().value(d => d[1]);
        const arc = d3.arc().innerRadius(0).outerRadius(this.pieRadius);
        const arcHover = d3.arc().innerRadius(0).outerRadius(this.pieRadius + this.pieMargin / 2);

        let summaryInfo = this.extractSummaryInfo();
        let total = this.props.mutants.length;
        delete summaryInfo.productive;

        const arcs = g.selectAll("arc").data(pie(Object.entries(summaryInfo)))
                        .enter().append("g")
                        .attr("class", "arc")
                        .on("mouseover", (d, i, nodes) => {
                            d3.select(nodes[i]).select("path").transition().duration(200).attr("d", arcHover);
                        }).on("mousemove", (d, i, nodes) => {
                            this.drawToolTip(d3.event.pageX, d3.event.pageY, d, total);
                        }).on("mouseout", (d, i, nodes) => {
                            d3.select(nodes[i]).select("path").transition().duration(200).attr("d", arc);
                            this.hideToolTip();
                        });

        arcs.append("path")
            .attr("fill", (d) => this.colors[d.data[0]])
            .attr("d", arc);
    }

    // Draws the pie chart after this component has been added to
    // the DOM
    componentDidMount() {
        this.drawPieChart();
    }

    // Updates the pie chart after some of the mutants have been modified
    componentDidUpdate(prevProps) {
        if (this.props.mutants !== prevProps.mutants) {
            d3.select("div#pieChart").select("svg").remove();
            this.drawPieChart();
        }
    }

    createTableRows(summaryInfo) {
        if (!summaryInfo.hasOwnProperty("killed") || 
            !summaryInfo.hasOwnProperty("equivalent") ||
            !summaryInfo.hasOwnProperty("live")) {
                throw "Missing attributes from summaryInfo";
            }
        let items = Object.entries(summaryInfo);
        
        let total = this.props.mutants.length;

        let table = [];
        items.forEach((el) => {
            let children = [];
            children.push(<td><span id={el[0]}>{el[0]} mutants</span></td>);
            children.push(<td>{el[1]}</td>);
            children.push(<td>{`${((el[1] * 100.0) / total).toFixed(1)}%`}</td>);
            
            table.push(<tr>{children}</tr>);
        });

        return table;
    }

    render() {
        let summaryInfo = this.extractSummaryInfo();

        // TODO: Better way to format the summary numbers? 
        return (
            <div className="topLevel">
                <div className="sumPanel" id="sumPanel1">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>count</th>
                                <th>percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTableRows(summaryInfo)}
                        </tbody>
                    </table>
                </div>
                <div className="sumPanel" id="pieChart">
                </div>
                <div id="clear"></div>
            </div>
        );
    }
}

export default MutantSummary;