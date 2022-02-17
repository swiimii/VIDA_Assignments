/**
 * Load TopoJSON data of the world and the data of the world wonders
 */
let dropDown = document.getElementById('myDropdown');
for(let i = 1980; i <= 2021; i++) {
  let item = document.createElement('a')
  item.onclick = () => { 
      ChoroplethMap.Singleton.updateVis(`${i}`)
    };
  item.text=`${i}`;
  dropDown.appendChild(item)
}

Promise.all([
  d3.json('data/counties-10m.json'),
  d3.csv('data/fips.csv'),
  d3.csv('data/annual_qui_by_county_all.csv')
]).then(data => {
  const geoData = data[0];
  const fipsData = data[1];
  const valueData = data[2]

  // Add fips data to value data
  console.log(geoData);
  valueData.forEach(valueDataElement => {
    for (let i = 0; i < fipsData.length; i++) {
      if (fipsData[i].county === valueDataElement.County && fipsData[i].state === valueDataElement.State) {
        valueDataElement.cnty_fips = fipsData[i].cnty_fips;
      }
    }
  });

  // const valueDataByYear = d3.group(valueData, d=> d.Year);
  // const valueDataByFips = d3.group(valueDataByYear, d => d.entries().next().cnty_fips)

  const valueDataByFips = d3.group(valueData, d=> d.cnty_fips);

  geoData.objects.counties.geometries.forEach(d => {
    if (valueDataByFips.has(d.id)) {
      d.properties.air_data = valueDataByFips.get(d.id);
      d.properties.air_data = d3.group(d.properties.air_data, d=>d.Year);
    }
  });

  const choroplethMap = new ChoroplethMap({
    parentElement: '.viz',
  }, geoData, valueDataByFips);

  // const myLine2 = new Line({
  //   parentElement: '.graph1',
  // }, geoData);

  // const myLine = new Line({
  //   parentElement = 'graph2',
  // }, geoData);

})
.catch(error => console.error(error));
