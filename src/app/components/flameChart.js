import React, { Component } from 'react';
import * as d3 from 'd3';
import { flamegraph, defaultFlamegraphTooltip } from 'd3-flame-graph';


export default class FlameChart extends Component {
  constructor(props) {
    super(props);
    this.flamegraphRef = React.createRef();
    this.createFlameGraph = this.createFlameGraph.bind(this);
  }

  componentDidMount() {
    const { name, children, value } = this.props;
    this.createFlameGraph({ name, children, value })
  }

  componentDidUpdate() {
    const { name, children, value } = this.props;
    this.createFlameGraph({ name, children, value })
  }

  createFlameGraph(data) {
    let pageWidth = window.innerWidth
    console.log(window.innerWidth)
    let margin = { right: 30, left: 30, }

    let chart = flamegraph()
      .width(pageWidth - margin.right - margin.left)
      .cellHeight(20)
      .transitionDuration(750)
      .minFrameSize(5)
      .transitionEase(d3.easeCubic)
      .sort(true)
      .differential(false)
      .elided(false)
      .selfValue(false)

    let tip = defaultFlamegraphTooltip()
      .html(function (d) { return "Name: " + d.data.name + "<br>Value: " + d.data.value + "ms"; });
    chart.tooltip(tip);

    d3.select(this.flamegraphRef.current)
      .datum(data)
      .call(chart);

    if (document.querySelectorAll('.partition').length > 1) {
      document.querySelectorAll('.partition')[1].remove();
    }
  }

  render() {
    return (
      <div>
        <h3 id="flame-title">Render Times Flame Graph</h3>
        <div className="flameDiv" ref={this.flamegraphRef}></div>
      </div>
    )
  }
}