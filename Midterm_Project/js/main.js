/**
 * Load TopoJSON data of the world and the data of the world wonders
 */

Promise.all([
  d3.json('data/counties-10m.json'),
  d3.csv('data/fips.csv')
]).then(data => {
  const geoData = data[0];
  const valueData = data[1];

  // Combine both datasets by adding the population density to the TopoJSON file
  console.log(geoData);
  geoData.objects.counties.geometries.forEach(d => {
    console.log(d);
    for (let i = 0; i < valueData.length; i++) {
      if (d.id === valueData[i].cnty_fips) {
        d.properties.pop = +valueData[i].Value;
      }

    }
  });

  const choroplethMap = new ChoroplethMap({
    parentElement: '.viz',
  }, geoData);

  const myLine2 = new Line({
    parentElement: '.graph1',
  }, geoData);

  // const myLine = new Line({
  //   parentElement = 'graph2',
  // }, geoData);

})
.catch(error => console.error(error));
