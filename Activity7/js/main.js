console.log("Hello world");

d3.csv('data/disasters.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    //process the data - this is a forEach function.  You could also do a regular for loop.... 
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      	d.cost = +d.cost; // convert string 'cost' to number
      	d.daysFromYrStart = computeDays(d.start); //note- I just created this field in each object in the array on the fly

				let tokens = d.start.split("-");
  			d.year = +tokens[0];

  	});

    //for the line chart:
    //lets compute costs per year for the line chart
  	let minYear = d3.min( data, d => d.year);
  	let maxYear = d3.max( data, d=> d.year );

  	let costsPerYear = []; //this will be our data for the line chart
  	for(let i = minYear; i < maxYear; i++){

  		let justThisYear = data.filter( d => d.year == i ); //only include the selected year
  		let cost = d3.sum(justThisYear, d => d.cost); //sum over the filtered array, for the cost field

  		costsPerYear.push( {"year": i, "cost":cost});

  	}


  	// Create an instance (for example in main.js)
		let timelineCircles = new TimelineCircles({
			'parentElement': '#timeline',
			'containerHeight': 1100,
			'containerWidth': 1000
		}, data);

		let lineChart = new Line({
			'parentElement': '#line',
			'containerHeight': 200,
			'containerWidth': 1000
		}, costsPerYear);
		
		//TO DO:  Make a line chart object.  Make it 200 pixels tall by 1000 pixels wide. 
		//Be sure to send it the costsPerYear data 
		// The svg for this element has already been created in index.html, above the timeline circles- check it out


})
.catch(error => {
    console.error('Error loading the data');
});


function computeDays(disasterDate){
  	let tokens = disasterDate.split("-");

  	let year = +tokens[0];
  	let month = +tokens[1];
  	let day = +tokens[2];

    return (Date.UTC(year, month-1, day) - Date.UTC(year, 0, 0)) / 24 / 60 / 60 / 1000 ;

  }