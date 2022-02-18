// ES6 Class
class BarChart {

  constructor(_config, _data, _selected_id, _data_selection, _legend) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 800,
      containerHeight: _config.containerHeight || 300,
      margin: { top: 10, bottom: 30, right: 50, left: 50 }
    }

    this.myMap = ChoroplethMap.Singleton;
    this.selected_id = _selected_id;
    this.data = d3.group(_data.get(this.selected_id), d => d.Year).get('2021');
    this.data_selections = _data_selection;
    this.legend = _legend;

    // Call a class function
    this.initVis();
  }
    initVis() {
      let vis = this;
  
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
  
      vis.xScale = d3.scaleBand()
          .range([0, vis.width])
          .paddingInner(0.2)
          .paddingOuter(0.2);
  
      vis.yScale = d3.scaleLinear()
          .range([vis.height, 0]);
      
      // Initialize axes
      vis.xAxis = d3.axisBottom(vis.xScale);
      vis.yAxis = d3.axisLeft(vis.yScale).ticks(6);
  
      // Define size of SVG drawing area
      vis.svg = d3.select(document.getElementById(vis.config.parentElement))
          .attr('width', vis.config.containerWidth)
          .attr('height', vis.config.containerHeight);
  
      // Append group element that will contain our actual chart
      vis.chart = vis.svg.append('g')
          .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
      // Append empty x-axis group and move it to the bottom of the chart
      vis.xAxisG = vis.chart.append('g')
          .attr('class', 'axis x-axis')
          .attr('transform', `translate(0,${vis.height})`);
      
      // Append y-axis group
      vis.yAxisG = vis.chart.append('g')
          .attr('class', 'axis y-axis');
      
      vis.updateVis();
    }
  
    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
      let vis = this;
  
      vis.xScale.domain(this.data_selections);
      vis.yScale.domain([0, vis.data['Days with AQI']]);
  
      vis.renderVis();
    }
  
    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
      let vis = this;
      
      console.log(vis.data);
      vis.chart.selectAll('category')
          .data(vis.data_selections)
        .join('rect')
          .attr('x', d => vis.xScale(d))
          .attr('y', d => vis.yScale(vis.data[d]))
          .attr('height', d => vis.yScale(vis.data[d]))
          .attr('width', vis.xScale.bandwidth());
  
      // Update the axes
      vis.xAxisG.call(vis.xAxis);
      vis.yAxisG.call(vis.yAxis);
    }
  
  
  
    
  }