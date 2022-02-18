class MultiLinePollutants {

  constructor(_config, _data, _selected_id, _data_selection, _legend) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 500,
      containerHeight: _config.containerHeight || 300,
      margin: { top: 10, bottom: 30, right: 50, left: 50 }
    }

    this.myMap = ChoroplethMap.Singleton;
    this.selected_id = _selected_id;
    this.data = _data.get(this.selected_id);
    this.data_selections = _data_selection;
    this.legend = _legend;

    // Call a class function
    this.initVis();
  }

  initVis() {
      console.log(this.data);

    let vis = this; //this is a keyword that can go out of scope, especially in callback functions,
                    //so it is good to create a variable that is a reference to 'this' class instance

    //set up the width and height of the area where visualizations will go- factoring in margins
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Define size of SVG drawing area
    vis.svg = d3.select(document.getElementById(vis.config.parentElement))
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    vis.colors = ["#8dd3c7","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"];

    for (let i = 0; i < vis.data_selections.length; i++) {

        this.data_selection = vis.data_selections[i];
        //reusable functions for x and y
            //if you reuse a function frequetly, you can define it as a parameter
            //also, maybe someday you will want the user to be able to re-set it.
        vis.xValue = d => d.Year;
        vis.yValue = d => d[this.data_selection];

        //setup scales
        vis.xScale = d3.scaleLinear()
            .domain([1980, 2021]) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .domain( [0, 365] )
            .range([vis.height, 0]);
            // .nice(); //this just makes the y axes behave nicely by rounding up

        // Append group element that will contain our actual chart (see margin convention)
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale).tickFormat(d3.format("d"));
        vis.yAxis = d3.axisLeft(vis.yScale);

        // Append x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`)
            .call(vis.xAxis);

        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

            
    // Initialize area generator- helper function
        // vis.area = d3.area()
        //     .x(d => vis.xScale(vis.xValue(d)))
        //     .y1(d => vis.yScale(vis.yValue(d)))
        //     .y0(vis.height);

        // Add area path
        // vis.chart.append('path')
        //     .data([vis.data])
        //     .attr('fill', '#e9eff5')
        //     .attr('d', vis.area);


        //Initialize line generator helper function
        vis.line = d3.line()
        .x(d => vis.xScale(vis.xValue(d)))
        .y(d => vis.yScale(vis.yValue(d)));


        // Add line path
        vis.chart.append('path')
            .data([vis.data])
            .attr('stroke',  vis.colors[i])
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', vis.line);
        
        var text = document.createTextNode(`${this.data_selection}`);
        var container = document.createElement('p');
        container.appendChild(text);
        container.setAttribute('class', 'centered');
        container.style.color = vis.colors[i];
        
        document.getElementById(vis.legend).appendChild(container);

        vis.updateVis();
    }


  }


 updateVis() {


 }


 //leave this empty for now...
 renderVis() {

  }



}