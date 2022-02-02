class Line {

    constructor(_config, _data= [{x: 0, y: 10}, {x: 100, y: 75}, {x: 300, y: 90}, {x: 350, y: 20}]) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 10, bottom: 30, right: 10, left: 30 },
            data: _data
        }

        // Call a class function
        this.initVis();
    }

    initVis() {
        d3.select(_config.parentElement).append('path')
            .attr('d', line(this.config.data))
            .attr('stroke','red')
            .attr('fill','none');

        updateVis(); //leave this empty for now...
    }


    //leave this empty for now
    updateVis() { 
      
        renderVis(); 

    }


  //leave this empty for now...
    renderVis() { 

    }



}